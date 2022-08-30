const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, Booking, SpotImage, ReviewImage, sequelize } = require('../../db/models');


//get all spots
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({

        include: [
            {
                model: Review,
                attributes: []
            }
        ],
        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating" // change this to integers
                ]
            ]
        },
    });

    return res.json({ Spots: spots })
})

//get all spots from current user
router.get('/current', requireAuth, restoreUser, async (req, res, next) => {

    const { user } = req;
    let currentUser = user.toSafeObject()
    // console.log(currentUser.id)
    let currentUserId = currentUser.id
    const spots = await Spot.findAll({
        where: { ownerId: currentUserId },
        include: [
            {
                model: Review,
                attributes: []
            }
        ],
        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgStars" // change this to avgrating
                ]
            ]
        },
    })
    return res.json({ Spots: spots })
})

//get all spots by id
router.get('/:spotId', requireAuth, restoreUser, async (req, res, next) => {
 //404 if ID not found ICK messy bc of eagerloading
    let spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
        })
    }

    const spots = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: SpotImage,
                as: 'SpotImages',
                attributes: ['id', 'imgUrl', 'preview']
            },
            {
                model: Review,
                attributes: []
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ],
        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgStarRating" // remove avgrating
                ]
            ],
            exclude: ['previewImage']
        },
    })
    return res.json(spots)
})

//create spot
router.post('/', requireAuth, async (req, res, _net) => {
    const { user } = req;
    let currentUser = user.toSafeObject()
    let currentUserId = currentUser.id

    let {address, city, state, country, lat, lng, name, description, price} = req.body

    const newSpot = await Spot.create({
        ownerId: currentUserId,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    })
    return res.json(newSpot)
})


module.exports = router;