'use strict'; //delete later if needed
const express = require('express')
const router = express.Router();

const { check, param } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, Booking, SpotImage, ReviewImage, sequelize } = require('../../db/models');

const { Op } = require("sequelize")

const validatePagination = [
    check('page')
        .custom(val => {
            if (!val) return true
            if (val) {
                val = parseInt(val)
                if (Number.isInteger(val) && val >= 0 && val <= 10) return true
            }
        })
        .withMessage("Page must be greater than or equal to 0"),
    check('size')
        .custom(val => {
            if (!val) return true
            if (val) {
                val = parseInt(val)
                if (Number.isInteger(val) && val >= 0 && val <= 10) return true
            }
        })
        .withMessage("Size must be greater than or equal to 0"),
    check('minLat')
        .custom(val => {
            if (!val) return true
            if (val) {
                if (!isNaN(val) && val.includes('.')) return true
            }
        })
        .withMessage("Minimum latitude is invalid",),
    check('maxLat')
        .custom(val => {
            if (!val) return true
            if (val) {
                if (!isNaN(val) && val.includes('.')) return true
            }
        })
        .withMessage("Maximum latitude is invalid",),
    check('minLng')
        .custom(val => {
            if (!val) return true
            if (val) {
                if (!isNaN(val) && val.includes('.')) return true
            }
        })
        .withMessage("Minimum longitude is invalid"),
    check('maxLng')
        .custom(val => {
            if (!val) return true
            if (val) {
                if (!isNaN(val) && val.includes('.')) return true
            }
        })
        .withMessage("Maximum longitude is invalid"),
    check('minPrice')
        .custom(val => {
            if (!val) return true
            if (val) {
                if (val > 0) return true
            }
        })
        .withMessage("Minimum price must be greater than or equal to 0"),
    check('maxPrice')
        .custom(val => {
            if (!val) return true
            if (val) {
                if (val > 0) return true
            }
        })
        .withMessage("Maximum price must be greater than or equal to 0"),

    handleValidationErrors
];
//get all spots
router.get('/', validatePagination, async (req, res, next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query
    let pagination = {}
    let where = {}

    if (!page) page = 0;
    if (!size) size = 20
    if (!minPrice) minPrice = 0;
    if (!maxPrice) maxPrice = 0;

    page = parseInt(page)
    size = parseInt(size)
    pagination.limit = size;
    pagination.offset = size * (page - 1)
    if (pagination.offset < 0) pagination.offset = 0

    minLat = parseInt(minLat)
    maxLat = parseInt(maxLat)
    minLng = parseInt(minLng)
    maxLng = parseInt(maxLng)
    minPrice = parseInt(minPrice)
    maxPrice = parseInt(maxPrice)

    if (minPrice) {
        where.price = { [Op.gte]: minPrice }
    }
    if (minLat) {
        where.lat = { [Op.gte]: minLat }
    }
    if (minLng) {
        where.price = { [Op.gte]: minLng }
    }
    if (maxPrice) {
        where.price = { [Op.lte]: maxPrice }
    }
    if (maxLat) {
        where.lat = { [Op.lte]: maxLat }
    }
    if (maxLng) {
        where.price = { [Op.lte]: maxLng }
    }

    // const testSpots = await Spot.findAll()

    const spots = await Spot.findAll({
        // required: true,
        // duplicating: false,
        include: [
            {
                model: Review,
                attributes: [],
            },
            {
                model: SpotImage,
                attributes: []
            },
        ],
        ...pagination,
        where,
        subQuery: false,
        duplicating: false,
        attributes: {
            include: [
                [
                    sequelize.fn('ROUND', sequelize.fn("AVG", sequelize.col("Reviews.stars")), 2),
                    "avgRating"
                ],
                [
                    sequelize.col("SpotImages.url"),
                    "previewImage"
                ]
            ],
        },        
        group: ["Spot.id", "SpotImages.url"],
        raw:true
    });

    // for (let i = 0; i < spots.length; i++) {
    //     spots[i].
    // }


    // return res.json(testSpots)
    return res.json({ Spots: spots, page, size })
})

//get all spots from current user
router.get('/current', requireAuth, restoreUser, async (req, res, next) => {

    const { user } = req;
    let currentUser = user.toSafeObject()
    let currentUserId = currentUser.id
    const spots = await Spot.findAll({
        where: { ownerId: currentUserId },
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: []
            }
        ],
        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating" // change this to avgrating
                ],
                [
                    sequelize.col("SpotImages.url"),
                    "previewImage"
                ]
            ]
        },
        group: ["Spot.id", "SpotImages.url"],
        raw:true
    })

    return res.json({ Spots: spots })
})

//get spots details by id
router.get('/:spotId',  async (req, res, next) => {
    //404 if ID not found hmmm messy bc of eagerloading
    let spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
        })
    }

    const spots = await Spot.findByPk(req.params.spotId)

    const avgReview = await Review.findAll({
        where: {spotId: req.params.spotId},
        attributes: [[
            sequelize.fn("AVG", sequelize.col("stars")),
            "avgStarRating"
        ]]
    })

    const images = await Spot.findByPk(req.params.spotId, {
        include: {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        }
    })

    const owner = await Spot.findByPk(req.params.spotId, {
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
    })
    const numReviews = await Review.count({
        where: { spotId: spot.id }
    })
    let avgRating = await avgReview[0]
    let average = await avgRating.toJSON()
    let averageNum = Number(average.avgStarRating).toFixed(2)

    const result = await spots.toJSON()
    result.avgStarRating = averageNum
    result.numReviews = numReviews
    result.SpotImages = images.SpotImages
    result.Owner = owner.User

    // res.json(await images.SpotImages)
    return res.json(result)
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
        //unable to find spot error
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
            res.status(403)
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            })        }


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
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })    }

    const { url, preview } = req.body;

    const newImg = await spot.createSpotImage({
        url: url,
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
                attributes: ['id', 'url']
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
    if (existingReview.length > 0) {
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

//get spot's bookings
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { user } = req;
    let currentUser = user.toSafeObject()
    let currentUserId = currentUser.id

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
        })
    }

    if (currentUserId == spot.ownerId) {
        const bookings = await spot.getBookings({
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastname']
                }
            ]
        })
        let Bookings = await bookings
        return res.json({ Bookings })
    }

    const bookings = await spot.getBookings({
        attributes: ['spotId', 'startDate', 'endDate']
    })
    let Bookings = await bookings
    return res.json({ Bookings })
})


//create a new booking
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { user } = req;
    let currentUser = user.toSafeObject()
    let currentUserId = currentUser.id

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
        })
    }

    if (currentUserId === spot.ownerId) {
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })    }

    const { startDate, endDate } = req.body

    const existingStartDate = await Booking.findAll({
        where: {
            startDate: startDate,
            spotId: spot.id
        }
    })
    const existingEndDate = await Booking.findAll({
        where: {
            endDate: endDate,
            spotId: spot.id //may need to edit this so that it encompasses a range of dates
        }
    })

    //hmm messy error handling, change later
    const errs = {}
    if (existingStartDate.length > 0) errs.startDate = "Start date conflicts with an existing booking"
    if (existingEndDate.length > 0) errs.endDate = "End date conflicts with an existing booking"

    if (existingStartDate.length > 0 || existingEndDate.length > 0) {
        res.status(403)
        return res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": res.statusCode,
            "errors": errs
        })
    }


    const newBooking = await Booking.create({
        startDate: startDate,
        endDate: endDate,
        userId: currentUserId,
        spotId: spot.id
    })
    return res.json(newBooking)
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
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })    }

    await spot.destroy()

    res.status(200)
    return res.json({
        "message": "Successfully deleted",
        "statusCode": res.statusCode
    })
})

module.exports = router;