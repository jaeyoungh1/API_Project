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
                model: SpotImage,
                where: {preview: true},
                attributes: ['imgUrl']
            },
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
                model: SpotImage,
                attributes: ['imgUrl']
            },
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

    const spots = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: SpotImage,
                as: 'SpotImages',
                attributes: ['id','imgUrl']
            },
            {
                model: Review,
                include: [{model: ReviewImage, attributes: ['id', 'imgUrl']}],
                attributes: ['id']
            }
        ],
        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgStarRating" // remove avgrating
                ]
            ]
        },
    })
    return res.json(spots)
})


module.exports = router;