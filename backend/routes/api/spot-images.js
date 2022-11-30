const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, Booking, SpotImage, ReviewImage, sequelize } = require('../../db/models');


router.delete('/:imageId',
    requireAuth, async (req, res, next) => {
        const image = await SpotImage.findByPk(req.params.imageId)

        if (!image) {
            res.status(404)
            return res.json({
                "message": "Spot Image couldn't be found",
                "statusCode": res.statusCode
            })
        }
        //unauthorized editor 
        const { user } = req;
        let currentUser = user.toSafeObject()
        let currentUserId = currentUser.id


        let spot = await image.getSpot()
        if (currentUserId !== spot.ownerId) {
            res.status(403)
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            })
        }

        await image.destroy()

        res.status(200)
        return res.json({
            "message": "Successfully deleted",
            "statusCode": res.statusCode
        })
    })

module.exports = router;