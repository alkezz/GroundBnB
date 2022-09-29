const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage, sequelize, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, handleSpotValidationErrors } = require('../../utils/validation');

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    // const currReviews = await Review.findAll({
    //     where: {
    //         userId: req.user.id
    //     },
    //     include: [
    //         {
    //             model: User,
    //             attributes: ['id', 'firstName', 'lastName']
    //         },
    //         {
    //             model: Spot,

    //             include: [
    //                 {
    //                     model: SpotImage,
    //                     required: false,
    //                     attributes: [
    //                         [Sequelize.col('url'), 'previewImage']
    //                     ],
    //                 }
    //             ]
    //         },
    //         {
    //             model: ReviewImage,
    //             required: false
    //         }
    //     ],
    // })
    //!LAZY LOADING INSTEAD OF EAGER LOADING
    //!COMMENTED CODE ABOVE "WORKS" BUT LAZY LOADING BETTER
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
        ]
    })
    const spots = await Spot.findAll()
    const payload = []
    for (let i = 0; i < spots.length; i++) {
        for (let j = i + 1; j < spots.length; j++) {
            if (reviews[i] !== undefined) {
                if (spots[i].dataValues.id === reviews[j].dataValues.spotId) {
                    payload.push(spots[i])
                }
            }
        }
    }
    console.log(payload)
    res.status(200).json(reviews)
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
