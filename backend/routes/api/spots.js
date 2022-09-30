const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage, sequelize, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, handleSpotValidationErrors } = require('../../utils/validation');

router.get('/', async (req, res) => {
    const payload = []
    const spots = await Spot.findAll()
    // console.log(spots)
    for (let i = 0; i < spots.length; i++) {
        const aggregateData = await Spot.findOne({
            where: {
                id: i + 1
            },
            include: {
                model: Review,
                attributes: []
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']
            ],
            group: ['Spot.id']
        });
        payload.push(aggregateData)
    }
    // const aggregateData = await Spot.findAll({
    //     include: {
    //         model: Review,
    //         attributes: []
    //     },
    //     attributes: [
    //         [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']
    //     ]
    // });
    const allSpots = await Spot.findAll({
        attributes: {
            include: [
                //         [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
                [Sequelize.col('SpotImages.url'), 'previewImage']
            ],
        },
        group: ['Spot.id', 'SpotImages.url'],
        include: [
            {
                model: Review,
                required: false,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: [],
                required: false
            }
        ]
    })
    for (let i = 0; i < allSpots.length; i++) {
        if (payload[i].dataValues.avgRating !== null) {
            allSpots[i].setDataValue('avgRating', payload[i].dataValues.avgRating)
        } else {
            allSpots[i].setDataValue('avgRating', 'No Reviews Yet!')
        }
    }
    res.status(200).json(allSpots)
})

router.get('/current', requireAuth, restoreUser, async (req, res) => {
    const { user } = req
    const aggregateData = await Spot.findAll({
        where: {
            ownerId: user.toSafeObject().id
        },
        group: ['Spot.id'],
        include: {
            model: Review,
            attributes: []
        },
        attributes: [
            [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']
        ]
    });
    const currSpots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        attributes: {
            include: [
                [Sequelize.col('SpotImages.url'), 'previewImage']
            ]
        },
        group: ['Spot.id', 'SpotImages.url'],
        include: [
            {
                model: Review,
                required: false,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: [],
                required: false
            }
        ],
    })
    if (currSpots.length >= 1) {
        for (let i = 0; i < aggregateData.length; i++) {
            currSpots[i].setDataValue('avgRating', aggregateData[i].dataValues.avgRating)
        }
        res.status(200).json(currSpots)
    } else {
        res.status(404).json({
            message: "You don't own any spots!",
            statusCode: 404
        })
    }
})

router.get('/:spotId/reviews', async (req, res) => {
    const exists = await Spot.findByPk(req.params.spotId)
    if (!exists) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    // const reviews = await Review.findAll({
    //     where: {
    //         spotId: req.params.spotId
    //     },
    //     include: [
    //         {
    //             model: ReviewImage
    //         },
    //         {
    //             model: User,
    //             attributes: ['id', 'firstName', 'lastName']
    //         },
    //     ]
    // })
    // if (reviews) {
    //     res.json(reviews)
    // } else {
    //     res.status(404).json({
    //         message: "Spot couldn't be found"
    //     })
    // }
    const spotReviews = await User.findAll({
        include: {
            model: Review,
            where: {
                spotId: req.params.spotId
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ]
        },
        attributes: []
    })
    res.status(200).json(spotReviews[0])
})

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const bookings = await User.findByPk(req.user.id, {
        include: [
            {
                model: Booking,
                attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
                // include: [
                //     {
                //         model: User,
                //         attributes: ['id', 'firstName', 'lastName']
                //     }
                // ],
            }
        ],
        attributes: []
    })
    const user = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
                through: {
                    attributes: []
                },
            }
        ],
        attributes: [],
    })
    if (!user) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    console.log(bookings.Bookings.length)
    if (bookings) {
        // for (let i = 0; i < bookings.Booking.length; i++) {

        // }
        if (bookings.dataValues.Bookings[0].dataValues.userId === req.user.id) {
            bookings.dataValues.Bookings.unshift(user.dataValues.Users[0])
        } else {
            return res.json(bookings)
        }
        return res.json(bookings)
    }
})

router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating'],
                [sequelize.fn('COUNT', sequelize.col('Reviews.review')), 'numReviews']
            ]
        },
        group: ['Spot.id', 'Reviews.stars', 'Reviews.review', 'SpotImages.id', 'Owner.id', 'Reviews.id'],
        include: [
            {
                model: Review,
                attributes: [],
                required: false
            },
            {
                model: SpotImage,
                attributes: {
                    exclude: ['spotId', 'createdAt', 'updatedAt']
                }
            },
            {
                model: User,
                as: 'Owner',
                attributes: {
                    exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
                }
            }
        ],
    })
    if (spot) {
        res.status(200).json(spot)
    } else {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})

const validateNewSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleSpotValidationErrors
]

router.post('/', [requireAuth, validateNewSpot], async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.status(201).json(newSpot)
})

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { user } = req
    const { url, preview } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    if (spot) {
        if (spot.ownerId === user.toSafeObject().id) {
            const newImage = await SpotImage.create({
                spotId: req.params.spotId,
                url,
                preview
            })
            res.status(200).json(newImage)
        } else {
            res.json({
                message: 'You must own this spot to add an image'
            })
        }
    } else {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})

const validateReview = [
    check('review').exists({ checkFalsy: true }).withMessage('Review text is required'),
    check('stars').exists({ checkFalsy: true }).isInt({ min: 1, max: 5 }).withMessage('Stars must be an integer from 1 to 5'),
    handleSpotValidationErrors
]

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const { review, stars } = req.body
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: Review,
                attributes: ['userId']
            }
        ]
    })
    if (spot) {
        const { user } = req
        for (let i = 0; i < spot.dataValues.Reviews.length; i++) {
            if (spot.dataValues.Reviews[i].dataValues.userId === req.user.id) {
                return res.status(403).json({
                    message: "User already has a review for this spot",
                    statusCode: 403
                })
            }
        }
        const newReview = await Review.create({
            spotId: Number(req.params.spotId),
            userId: req.user.id,
            review,
            stars
        })
        res.json(newReview)
    } else {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
})

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    const booking = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        }
    })
    if (spot) {
        if (spot.ownerId !== req.user.id) {
            if (startDate < endDate) {
                for (let i = 0; i < booking.length; i++) {
                    let newDate = `${booking[i].startDate.getFullYear()}-${booking[i].startDate.getMonth() + 1}-${booking[i].startDate.getDate() + 1}`
                    if (newDate === startDate
                        || newDate === endDate) {
                        return res.json({
                            "message": "Sorry, this spot is already booked for the specified dates",
                            "statusCode": 403,
                            "errors": {
                                "startDate": "Start date conflicts with an existing booking",
                                "endDate": "End date conflicts with an existing booking"
                            },
                        })
                    }
                }
                const newBooking = await Booking.create({
                    spotId: req.params.spotId,
                    userId: req.user.id,
                    startDate,
                    endDate
                })
                return res.json(newBooking)
            } else {
                return res.json({
                    "message": "Validation error",
                    "statusCode": 400,
                    "errors": {
                        "endDate": "endDate cannot be on or before startDate"
                    },
                })
            }
        } else {
            return res.json({
                message: 'Forbidden',
                statusCode: 403
            })
        }

    } else {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
})


router.put('/:spotId', requireAuth, validateNewSpot, async (req, res) => {
    const { user } = req
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    if (spot) {
        if (spot.ownerId === user.toSafeObject().id) {
            await spot.update({
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price
            })
            res.json(spot)
        } else {
            res.json({
                message: 'You must own this spot to edit it!'
            })
        }
    } else {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})

router.delete('/:spotId', requireAuth, async (req, res) => {
    const { user } = req
    const oldSpot = await Spot.findByPk(req.params.spotId)
    if (oldSpot) {
        if (oldSpot.ownerId === user.toSafeObject().id) {
            oldSpot.destroy()
            res.json({
                message: "Successfully deleted",
                statusCode: 200
            })
        } else {
            res.json({
                message: "You can't delete a spot you don't own!",
                statusCode: 404
            })
        }
    } else {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

})

module.exports = router;
