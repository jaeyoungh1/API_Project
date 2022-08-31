const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, Booking, SpotImage, ReviewImage, sequelize } = require('../../db/models');

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const image = await ReviewImage.findByPk(req.params.imageId)

    if (!image) {
        res.status(404)
        return res.json({
            "message": "Review Image couldn't be found",
            "statusCode": res.statusCode
        })
    }
    //unauthorized editor 
    const { user } = req;
    let currentUser = user.toSafeObject()
    let currentUserId = currentUser.id


    let review = await image.getReview()
    if (currentUserId !== review.userId) {
        res.status(400)
        throw new Error('User is unauthorized to delete this image')
    }

    await image.destroy()

    res.status(200)
    return res.json({
        "message": "Successfully deleted",
        "statusCode": res.statusCode
    })
})

module.exports = router;