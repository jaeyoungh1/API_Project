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
            },
            {
                model: SpotImage,
                attributes: [],
                where: { preview: true }
            }
        ],
        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating" // change this to avgrating
                ],
                [
                    sequelize.col("SpotImages.imgUrl"),
                    "previewImage"
                ]
            ]
        },
        group: ['Spot.id']
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
            },
            {
                model: SpotImage,
                attributes: [],
                where: {preview: true}
            }
        ],
        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating" // change this to avgrating
                ],
                [
                    sequelize.col("SpotImages.imgUrl"),
                    "previewImage" 
                ]
            ]
        },
        group: ['Spot.id']
    })
    
    return res.json({ Spots: spots })
})

//get spots details by id
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
                model: Review,
                attributes: []
            },
        ],
        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgStarRating"
                ]
            ],
            exclude: ['previewImage']
        }
    })

    const images = await Spot.findByPk(req.params.spotId, {
        include: {
            model: SpotImage,
            // as: 'SpotImages',
            attributes: ['id', 'imgUrl', 'preview']
        },
    })
    const owner = await Spot.findByPk(req.params.spotId, {
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
    })
    const numReviews = await Review.count({
        where: {spotId: spot.id}
    })
    console.log(numReviews)

    const result = await spots.toJSON()
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
            res.status(400)
            throw new Error('User is unauthorized to edit this spot')
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
        res.status(400)
        throw new Error('User may not book a spot that belongs to them-- are you money laundering?? 💸')
    }

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
            spotId: spot.id
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
    console.log(newBooking.startDate)
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