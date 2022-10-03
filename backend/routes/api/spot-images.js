const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage, sequelize, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, handleSpotValidationErrors } = require('../../utils/validation');

router.delete('/:imageId', requireAuth, async (req, res) => {
    const spotImage = await SpotImage.findByPk(req.params.imageId)
    if (!spotImage) {
        return res.status(404).json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }
    const spot = await Spot.findByPk(spotImage.spotId)
    if (spotImage) {
        if (spot.ownerId === req.user.id) {
            spotImage.destroy()
            res.status(200).json({
                "message": "Successfully deleted",
                "statusCode": 200
            })
        } else {
            res.status(403).json({
                message: 'Forbidden',
                statusCode: 403
            })
        }
    }
})

module.exports = router
