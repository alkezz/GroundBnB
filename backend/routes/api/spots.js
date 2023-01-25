const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage, sequelize, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, handleSpotValidationErrors } = require('../../utils/validation');
const { json } = require('sequelize');
const { singlePublicFileUpload } = require("../../awsS3")
const { singleMulterUpload } = require("../../awsS3")
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})
router.get('/', async (req, res) => {
    let { page, size } = req.query
    if (!page) page = 1
    if (!size) size = 100
    if (page > 10) page = 10
    if (size > 100) size = 100
    page = parseInt(page)
    size = parseInt(size)
    const pagination = {}
    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    const payload = []
    const spots = await Spot.findAll()

    // const a = await Review.findAll({
    //     where: {
    //         spotId: req.params.spotId
    //     },
    //     attributes: {
    //         include: [
    //             [Sequelize.fn("COUNT", Sequelize.col("id")), 'numReviews'],
    //             [Sequelize.fn("AVG", Sequelize.col("stars")), 'avgStarRating']
    //         ]
    //     },
    // })
    // const newData = await Review.findAll({
    //     where: {
    //         spotId: 1
    //     },
    //     attributes: {
    //         include: [
    //             [Sequelize.fn("AVG", Sequelize.col("stars")), 'avgRating'],
    //         ]
    //     },
    //     group: ["stars", "spotId", "id"]
    // });

    // console.log("NEW DATA", newData)
    // let arr = []
    // for (let i = 0; i < newData.length; i++) {
    //     arr.push(newData[i].toJSON())
    // }
    // console.log("ARRAY", arr)
    // let sum = 0
    // for (let i = 0; i < arr.length; i++) {
    //     sum += Number(arr[i].stars)
    // }
    // const avgRating = sum / arr.length
    // console.log("AVG RATING", avgRating)
    for (let i = 0; i < spots.length; i++) {
        const newData = await Review.findAll({
            where: {
                spotId: i + 1
            },
            // attributes: {
            //     include: [
            //         [Sequelize.fn("AVG", Sequelize.col("stars")), 'avgRating'],
            //     ]
            // },
            // group: ["stars", "spotId", "id"]
        });
        let average = 0
        let sum = 0
        for (let j = 0; j < newData.length; j++) {
            const jsonData = newData[j].toJSON()
            sum += jsonData.stars
        }
        average = (sum / newData.length).toFixed(2)
        payload.push(average)
        // const jsonAggregate = newData[0].toJSON()
        // console.log(newData)
        // payload.push(jsonAggregate)
    }
    console.log('PAYLOAD', payload)
    // for (let i = 0; i < spots.length; i++) {
    //     const aggregateData = await Spot.findOne({
    //         where: {
    //             id: i + 1
    //         },
    //         include: {
    //             model: Review,
    //             attributes: []
    //         },
    //         attributes: [
    //             [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']
    //         ],
    //         group: ['Spot.id', 'Reviews.stars']
    //     });
    //     const jsonAggregate = aggregateData.toJSON()
    //     // console.log('AGGREGATEDATA', jsonAggregate.avgRating)
    //     payload.push(aggregateData)
    // }
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
        order: [['id', 'ASC']],
        subQuery: false,
        attributes: {
            include: [
                // [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
                [Sequelize.col('SpotImages.url'), 'previewImage']
            ],
        },
        include: [
            {
                model: SpotImage,
                attributes: {
                    exclude: ['spotId', 'createdAt', 'updatedAt']
                },
                required: false
            }
        ],
        group: ['SpotImages.url', 'Spot.id', 'SpotImages.id'],
        ...pagination
    })
    for (let i = 0; i < allSpots.length; i++) {
        if (payload[i] !== null || payload[i] !== undefined) {
            allSpots[i].setDataValue('avgRating', payload[i])
        } else {
            allSpots[i].setDataValue('avgRating', 'No Reviews Yet!')
        }
    }
    res.status(200).json({
        Spots: allSpots, page, size
    })
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
            if (aggregateData[i].dataValues.avgRating !== null) {
                currSpots[i].setDataValue('avgRating', aggregateData[i].dataValues.avgRating)
            } else {
                currSpots[i].setDataValue('avgRating', "No reviews yet!")
            }
        }
        res.status(200).json(currSpots)
    } else {
        const err = new Error("You don't own any spots yet!")
        err.status = 404
        res.status(404).json({
            message: err.message,
            statusCode: err.status
        })
    }
})

router.get('/:spotId/reviews', async (req, res) => {
    const exists = await Spot.findByPk(req.params.spotId)
    if (!exists) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        return res.status(404).json({
            message: err.message,
            statusCode: err.status
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
    // const spotReviews = await User.findAll({
    //     include: {
    //         model: Review,
    //         where: {
    //             spotId: req.params.spotId
    //         },
    //         include: [
    //             {
    //                 model: User,
    //                 attributes: ['id', 'firstName', 'lastName']
    //             },
    //             {
    //                 model: ReviewImage,
    //                 attributes: ['id', 'url']
    //             }
    //         ]
    //     },
    //     attributes: []
    // })
    const spotReviews = await Review.findAll({
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
    })
    res.status(200).json({ Reviews: spotReviews })
})

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    // const bookings = await User.findByPk(req.user.id, {
    //     include: [
    //         {
    //             model: Booking,
    //             attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
    //             // include: [
    //             //     {
    //             //         model: User,
    //             //         attributes: ['id', 'firstName', 'lastName']
    //             //     }
    //             // ],
    //         }
    //     ],
    //     attributes: []
    // })
    // const user = await Spot.findByPk(req.params.spotId, {
    //     include: [
    //         {
    //             model: User,
    //             attributes: ['id', 'firstName', 'lastName'],
    //             through: {
    //                 attributes: []
    //             },
    //         }
    //     ],
    //     attributes: [],
    // })
    // if (!user) {
    //     res.json({
    //         message: "Spot couldn't be found",
    //         statusCode: 404
    //     })
    // }
    // if (bookings) {
    //     // for (let i = 0; i < bookings.Booking.length; i++) {

    //     // }
    //     if (bookings.dataValues.Bookings[0].dataValues.userId === req.user.id) {
    //         bookings.dataValues.Bookings.unshift(user.dataValues.Users[0])
    //     } else {
    //         return res.json(bookings)
    //     }
    //     return res.json(bookings)
    // }
    const spot = await Spot.findByPk(req.params.spotId)
    if (spot) {
        if (spot.ownerId === req.user.id) {
            const bookings = await Booking.findAll({
                where: {
                    spotId: spot.id
                },
                include: [
                    {
                        model: User,
                        attributes: ['id', 'firstName', 'lastName']
                    }
                ]
            })
            return res.status(200).json({ Bookings: bookings })
        } else {
            const bookings = await Booking.findAll({
                where: {
                    spotId: spot.id
                },
                attributes: ['spotId', 'startDate', 'endDate']
            })
            return res.status(200).json({ Bookings: bookings })
        }
    } else {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})

router.get('/:spotId', async (req, res) => {
    const spotReviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        // attributes: {
        //     include: [
        //         [Sequelize.fn("COUNT", Sequelize.col("id")), 'numReviews'],
        //         [Sequelize.fn("AVG", Sequelize.col("stars")), 'avgStarRating']
        //     ]
        // },
        // group: ['id', 'stars', 'spotId']
    })
    let count = 0
    let sum = 0
    for (let i = 0; i < spotReviews.length; i++) {
        const jsonData = spotReviews[i].toJSON()
        count += 1
        sum += jsonData.stars
    }
    let average = (sum / spotReviews.length).toFixed(1)
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
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
        group: ["Spot.id", "SpotImages.id", "Owner.id",],
    })
    spot.setDataValue('numReviews', count)
    spot.setDataValue('avgStarRating', average)
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

router.post('/images/upload', singleMulterUpload("image"), requireAuth, async (req, res) => {
    const imageUrl = await singlePublicFileUpload(req.file)
    return res.json(imageUrl)
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
            res.status(200).json({
                id: newImage.id,
                url: url,
                preview: preview
            })
        } else {
            res.status(403).json({
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

// router.put('/:spotId/images', requireAuth, async (req, res) => {
//     const { user } = req
//     const { url, preview } = req.body
//     const spot = await Spot.findByPk(req.params.spotId)
//     if (spot) {
//         if (spot.ownerId === user.toSafeObject().id) {
//             const newImage = await SpotImage.update({
//                 spotId: req.params.spotId,
//                 url,
//                 preview
//             })
//             res.status(200).json({
//                 id: newImage.id,
//                 url: url,
//                 preview: preview
//             })
//         } else {
//             res.status(403).json({
//                 message: 'You must own this spot to add an image'
//             })
//         }
//     } else {
//         res.status(404).json({
//             message: "Spot couldn't be found",
//             statusCode: 404
//         })
//     }
// })

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
        res.status(201).json(newReview)
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
                        return res.status(403).json({
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
                return res.status(200).json(newBooking)
            } else {
                return res.status(400).json({
                    "message": "Validation error",
                    "statusCode": 400,
                    "errors": {
                        "endDate": "endDate cannot be on or before startDate"
                    },
                })
            }
        } else {
            return res.status(403).json({
                message: 'Forbidden',
                statusCode: 403
            })
        }

    } else {
        res.status(404).json({
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
            return res.status(200).json(spot)
        } else {
            res.status(403).json({
                message: 'You must own this spot to edit it!'
            })
        }
    } else {
        res.status(404).json({
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
            res.status(200).json({
                message: "Successfully deleted",
                statusCode: 200
            })
        } else {
            res.status(403).json({
                message: "Forbidden",
                statusCode: 403
            })
        }
    } else {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

})

module.exports = router;
