const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, Booking, SpotImage, ReviewImage, sequelize } = require('../../db/models');

//get current user's reviews
router.get('/current', requireAuth, restoreUser, async (req, res, next) => {
    const { user } = req;
    let currentUser = user.toSafeObject()
    let currentUserId = currentUser.id

    const reviews = await Review.findAll({
        where: {userId: currentUserId},
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {exclude: ['updatedAt', 'createdAt', 'description','avgRating']}
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


module.exports = router;