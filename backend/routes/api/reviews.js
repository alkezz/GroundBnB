const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage, sequelize, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, handleSpotValidationErrors } = require('../../utils/validation');

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    const currReviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'updatedAt', 'createdAt']
                },
                include: [
                    {
                        model: SpotImage,
                        required: false,
                        attributes: [[Sequelize.col('url'), 'previewImage']],
                    }
                    //     //Spot.SpotImages.previewImage
                    //     // Spot.SpotImages.url
                ],
            },
            {
                model: ReviewImage,
                required: false
            }
        ],
    })
    //!LAZY LOADING INSTEAD OF EAGER LOADING
    //!COMMENTED CODE ABOVE "WORKS" BUT LAZY LOADING BETTER
    // const reviews = await User.findByPk(req.user.id, {
    //     include: [
    //         {
    //             model: Review,
    //             include: [
    //                 {
    //                     model: User,
    //                     attributes: ['id', 'firstName', 'lastName']
    //                 },
    //                 {
    //                     model: Spot,
    //                     attributes: [[Sequelize.col('SpotImages.url'), 'previewImage']],
    //                     include: [
    //                         {
    //                             model: SpotImage,
    //                         }
    //                     ],
    //                 },
    //                 {
    //                     model: ReviewImage,
    //                     attributes: ['id', 'url']
    //                 }
    //             ],

    //         },
    //     ],
    //     attributes: []
    // })
    // const spots = await Spot.findAll({
    //     attributes: {
    //         include: [
    //             //         [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
    //             [Sequelize.col('SpotImages.url'), 'previewImage']
    //         ],
    //         exclude: ['createdAt', 'updatedAt', 'description']
    //     },
    //     include: [
    //         {
    //             model: SpotImage,
    //             attributes: []
    //         },
    //         {
    //             model: Review
    //         }
    //     ],
    // })
    // //! SEEMS LIKE A BIT MUCH TRY TO REFACTOR OR GO A DIFFERENT ROUTE
    // //! FOR THIS ENDPOINT, TRY LAZY LOADING IF NOT DO EAGER
    // const reviewImages = await ReviewImage.findAll({
    //     include: {
    //         model: Review,
    //         where: {
    //             userId: req.user.id
    //         },
    //         attributes: []
    //     },
    //     attributes: ['id', 'url']
    // })

    // const spotArray = []
    // for (let j = 0; j < reviews.length; j++) {
    //     for (let i = 0; i < spots.length; i++) {
    //         if (reviews[j] !== undefined) {
    //             if (spots[i].dataValues.id === reviews[j].dataValues.spotId) {
    //                 spotArray.push(reviews[j])
    //                 spotArray.push(spots[i])
    //                 spotArray.push(reviewImages[j])
    //             }
    //         }
    //     }
    // }
    // console.log(reviewArray[0])
    //! for (let i = 0; i < reviewImages.length; i++) {
    //!     for (let j = 0; j < reviews.length; j++) { DONT NEED THESE FOR LOOPS
    //!         if (reviews[j] !== undefined) {
    //!            if (reviewImages[i].dataValues.reviewId === reviews[j].dataValues.id) {
    //            !         payload.push(reviewImages[i])
    //                 }
    //         }
    //     }
    // }
    res.status(200).json(currReviews)
})

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body
    const reviewImages = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    })
    const review = await Review.findByPk(req.params.reviewId)
    if (review) {
        if (req.user.id === review.dataValues.userId) {
            if (reviewImages.length <= 10) {
                const newImage = await ReviewImage.create({
                    reviewId: Number(req.params.reviewId),
                    url
                })
                return res.json({
                    id: newImage.id,
                    url: url
                })
            } else {
                return res.status(403).json({
                    message: "Maximum number of images for this resource was reached",
                    statusCode: 403
                })
            }
        } else {
            res.status(404).json({
                message: 'You must be the owner of this review to add an image',
                statusCode: 404
            })
        }
    } else {
        res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
})

const validateReview = [
    check('review').exists({ checkFalsy: true }).withMessage('Review text is required'),
    check('stars').exists({ checkFalsy: true }).isInt({ min: 1, max: 5 }).withMessage('Stars must be an integer from 1 to 5'),
    handleSpotValidationErrors
]

router.put('/:reviewId', [requireAuth, validateReview], async (req, res) => {
    const { review, stars } = req.body
    const reviewToEdit = await Review.findByPk(req.params.reviewId)
    if (reviewToEdit) {
        if (reviewToEdit.dataValues.userId === req.user.id) {
            await reviewToEdit.update({
                review,
                stars
            })
            return res.json(reviewToEdit)
        } else {
            return res.json({
                message: 'Forbidden',
                statusCode: 403
            })
        }
    } else {
        res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
})

router.delete('/:reviewId', [requireAuth], async (req, res) => {
    const oldReview = await Review.findByPk(req.params.reviewId)
    if (oldReview) {
        if (oldReview.dataValues.userId === req.user.id) {
            oldReview.destroy()
            return res.json({
                message: 'Successfully deleted',
                statusCode: 200
            })
        } else {
            return res.status(403).json({
                message: 'Forbidden',
                statusCode: 403
            })
        }
    } else {
        res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
})

module.exports = router;
