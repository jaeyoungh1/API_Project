const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking } = require('../../db/models');

//get all spots
router.get('/', async (req,res,next) => {
    const spots = Spot.findAll()
    return res.json(spots)
})

module.exports = router;