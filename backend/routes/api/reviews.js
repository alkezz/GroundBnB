const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage, sequelize, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, handleSpotValidationErrors } = require('../../utils/validation');

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    const currReviews = await Review.findAll({
        // where: {
        //     userId: user.toSafeObject().id
        // },
        include: [ReviewImage],
    })
    res.status(200).json(currReviews)
})

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { user } = req
    const { url } = req.body
    const review = await Review.findByPk(req.params.reviewId)
    console.log(review.dataValues.userId)
    if (review) {
        if (user.toSafeObject().id === review.dataValues.userId) {
            const newImage = await ReviewImage.create({
                reviewId: Number(req.params.reviewId),
                url
            })
            return res.json(newImage)
        } else {
            res.status(404).json({
                message: 'You must be the owner of this review to add an image',
                statusCode: 404
            })
        }
    }
})

module.exports = router;
