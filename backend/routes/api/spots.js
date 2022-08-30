const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, Booking, SpotImage, ReviewImage, sequelize } = require('../../db/models');


//get all spots
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({

        // include: [
        //     {
        //         model: Review,
        //         attributes: []
        //     }
        // ],
        // attributes: {
        //     include: [
        //         [
        //             sequelize.fn("AVG", sequelize.col("Reviews.stars")),
        //             "avgRating" // change this to integers
        //         ]
        //     ]
        // },
    });
    // const avgRating = await spots.

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

const validateSpotBody = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 0, max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

//create spot
router.post('/',
    requireAuth,
    validateSpotBody,
    async (req, res, _next) => {
        const { user } = req;
        let currentUser = user.toSafeObject()
        let currentUserId = currentUser.id

        let { address, city, state, country, lat, lng, name, description, price } = req.body

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

//edit spot based on spotid
router.put('/:spotId/',
    requireAuth,
    validateSpotBody,
    async (req, res, next) => {

        const spot = await Spot.findByPk(req.params.spotId, {
            attributes: { exclude: ['previewImage'] } // remove this later
        })
        //unauthorized editor 
        const { user } = req;
        let currentUser = user.toSafeObject()
        let currentUserId = currentUser.id

        if (currentUserId !== spot.ownerId) {
            res.status(400)
            throw new Error('User is unauthorized to edit this spot')
        }

        //unable to find spot error
        if (!spot) {
            res.status(404)
            return res.json({
                "message": "Spot couldn't be found",
                "statusCode": res.statusCode
            })
        }

        let { address, city, state, country, lat, lng, name, description, price } = req.body

        spot.set({
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

        await spot.save()
        return res.json(spot)
    })

//add image to spot based on spotid
router.post('/:spotId/images', requireAuth, async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
        })
    }
    const { user } = req;
    let currentUser = user.toSafeObject()
    let currentUserId = currentUser.id

    if (currentUserId !== spot.ownerId) {
        res.status(400)
        throw new Error('User is unauthorized to add images to this spot')
    }

    const { url, preview } = req.body;

    const newImg = await spot.createSpotImage({
        imgUrl: url,
        preview: preview
    })

    const result = await SpotImage.findByPk(newImg.id, {
        attributes: { exclude: ['spotId', 'updatedAt', 'createdAt'] }
    })

    return res.json(result)
})

//get spot's reviews
router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
        })
    }

    const reviews = await spot.getReviews({
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'imgUrl']
            }
        ]
    })
    let Reviews = await reviews
    return res.json({ Reviews })
})

const validateReviewBody = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

//create a review for a spot
router.post('/:spotId/reviews', requireAuth, validateReviewBody, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const { review, stars } = req.body;

    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
        })
    }

    const { user } = req;
    let currentUser = user.toSafeObject()
    let currentUserId = currentUser.id

    const existingReview = await Review.findAll({
        where: {
            userId: currentUserId,
            spotId: req.params.spotId
        }
    })
    if (existingReview) {
        res.status(403)
        return res.json({
            "message": "User already has a review for this spot",
            "statusCode": res.statusCode
        })
    }

    const newReview = await Review.create({
        userId: currentUserId,
        spotId: req.params.spotId,
        review: review,
        stars: stars
    })

    return res.json(newReview)
})

//delete spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)

    // no spot id error
    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
        })
    }
    //unauthorized editor 
    const { user } = req;
    let currentUser = user.toSafeObject()
    let currentUserId = currentUser.id

    if (currentUserId !== spot.ownerId) {
        res.status(400)
        throw new Error('User is unauthorized to delete this spot')
    }

    await spot.destroy()

    res.status(200)
    return res.json({
        "message": "Successfully deleted",
        "statusCode": res.statusCode
    })
})

module.exports = router;