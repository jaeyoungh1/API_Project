const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, Booking, SpotImage, ReviewImage, sequelize } = require('../../db/models');

router.get('/current', requireAuth, restoreUser, async (req, res, next) => {
    const { user } = req;
    let currentUser = user.toSafeObject()
    let currentUserId = currentUser.id

    let bookings = await Booking.findAll({
        where: { userId: currentUserId },
        include: [
            {
                model: Spot,
                attributes: { exclude: ['updatedAt', 'createdAt', 'description', 'avgRating'] }
            }
        ]
    })

    let Bookings = []

    for (let i = 0; i < bookings.length; i++) {
        let previewImage = await SpotImage.findAll({
            where: {
                spotId: bookings[i].spotId,
                preview: true
            },
            attributes: ['url']
        })
        let url;
        let previewImgObj = await previewImage[0]
        
        if (previewImgObj) {
            let imgobj = await previewImgObj.toJSON()
            url = imgobj.url
        } else url = null
        
       
        let bookingObj = await bookings[i]
        let bookingJSON = await bookingObj.toJSON()
        bookingJSON.Spot.previewImage = url
        Bookings.push(bookingJSON)
    }

    
    return res.json({ Bookings })
})

//update booking                 
router.put('/:bookingId', requireAuth, restoreUser, async (req, res, next) => {
    const { user } = req;
    let currentUser = user.toSafeObject()
    let currentUserId = currentUser.id

    const currentBooking = await Booking.findByPk(req.params.bookingId)

    if (!currentBooking) {
        res.status(404)
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": res.statusCode
        })
    }

    if (currentUserId !== currentBooking.userId) {
        res.status(403)
        return res.json(
            {
                "message": "Forbidden",
                "statusCode": 403
            }
        )
    }

    const { startDate, endDate } = req.body
    let errors = {}

    if (startDate > endDate) {
        let err = new Error("Validation error")
        err.status = 400
        errors.endDate = "endDate cannot be on or before startDate"
        err.errors = errors
        return next(err)
    }

    const { Op } = require("sequelize");
    let bookings = await Booking.findAll({
        where: {
            userId: {
                [Op.not]: currentUserId},
            spotId: currentBooking.spotId
        }
    })

    for (let i = 0; i < bookings.length; i++) {
        if ((startDate >= bookings[i].startDate && startDate <= bookings[i].endDate) ||
            (endDate >= bookings[i].startDate && endDate <= bookings[i].endDate)) {
            let err = new Error("Sorry, this spot is already booked for the specified dates")
            err.status = 403
            if ((startDate >= bookings[i].startDate && startDate <= bookings[i].endDate)) {

                errors.startDate = "Start date conflicts with an existing booking"
            }
            if ((endDate >= bookings[i].startDate && endDate <= bookings[i].endDate)) {

                errors.endDate = "End date conflicts with an existing booking"
            }
            err.errors = errors
            return next(err)

        }
    }

    let today = new Date().toJSON().slice(0, 10);
    let currentEndDate = await currentBooking.endDate
    // console.log(currentEndDate)

    if (currentEndDate < today) {
        res.status(403)
        return res.json({
            "message": "Past bookings can't be modified",
            "statusCode": res.statusCode
        })
    } else {


        await currentBooking.set({
            startDate: startDate,
            endDate: endDate
        })
        await currentBooking.save()

        return res.json(currentBooking)
    }
})

//delete booking
router.delete('/:bookingId', requireAuth, restoreUser, async (req, res, next) => {
    const { user } = req;
    let currentUser = user.toSafeObject()
    let currentUserId = currentUser.id

    const currentBooking = await Booking.findByPk(req.params.bookingId)

    if (!currentBooking) {
        res.status(404)
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": res.statusCode
        })
    }

    if (currentUserId !== currentBooking.userId) {
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    let today = new Date().toJSON().slice(0, 10);
    let startDate = currentBooking.startDate
    // console.log(new Date(startDate) > new Date(today))

    // console.log(new Date(startDate), new Date(today))

    if (new Date(startDate) < new Date(today)) {
        res.status(403)
        return res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": res.statusCode
        })
    }

    await currentBooking.destroy()

    res.status(200)
    return res.json({
        "message": "Successfully deleted",
        "statusCode": res.statusCode
    })
})

module.exports = router;