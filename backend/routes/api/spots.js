const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        include: {
            model: Review
        }
    })
    res.status(200).json(allSpots)
})

router.get('/current', async (req, res) => {
    const { user } = req
    const currSpots = await Spot.findAll({
        include: User,
        where: {
            ownerId: user.toSafeObject().id
        }
    })
    res.status(200).json(currSpots)
})

module.exports = router;
