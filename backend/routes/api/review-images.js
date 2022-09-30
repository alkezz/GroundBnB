const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage, sequelize, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, handleSpotValidationErrors } = require('../../utils/validation');

router.delete('/:imageId', requireAuth, async (req, res) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId)
    if (!reviewImage) {
        return res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }
    const review = await Review.findByPk(reviewImage.reviewId)
    if (review.userId === req.user.id) {
        reviewImage.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    } else {
        res.json({
            message: 'Forbidden',
            statusCode: 403
        })
    }
})

module.exports = router
