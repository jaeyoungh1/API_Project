const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, Booking, SpotImage, ReviewImage, sequelize } = require('../../db/models');

router.get('/current', requireAuth, restoreUser, async (req,res,next) => {
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
    let Bookings = await bookings
    return res.json({ Bookings })
})

//update review
router.put('/:bookingId', requireAuth, restoreUser,  async (req, res, next) => {
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
        res.status(400)
        throw new Error('User is unauthorized to edit this booking')
    }

    const { startDate, endDate } = req.body

    const existingStartDate = await Booking.findAll({
        where: {
            startDate: startDate,
            spotId: currentBooking.spotId
        }
    })
    const existingEndDate = await Booking.findAll({
        where: {
            endDate: endDate,
            spotId: currentBooking.spotId
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

    let today = new Date().toJSON().slice(0, 10);
    if (endDate < today) {
        res.status(403)
        return res.json({
            "message": "Past bookings can't be modified",
            "statusCode": res.statusCode
        })
    }

    await currentBooking.set({
        startDate: startDate,
        endDate: endDate
    })
    await currentBooking.save()

    return res.json(currentBooking)
})

module.exports = router;