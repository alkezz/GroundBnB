const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage, sequelize, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, handleSpotValidationErrors } = require('../../utils/validation');

router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        }
    })
    const payload = []
    for (let i = 0; i < bookings.length; i++) {
        const spots = await Spot.findOne({
            where: {
                id: bookings[i].spotId
            },
            attributes: {
                include: [
                    [Sequelize.col('SpotImages.url'), 'previewImage']
                ],
                exclude: ['createdAt', 'updatedAt', 'description']
            },
            include: [
                {
                    model: SpotImage,
                    attributes: []
                }
            ],
        })
        payload.push(spots.toJSON())
    }
    // payload.forEach(ele => {
    //     bookings.push(ele.toJSON())
    // })
    // for (let i = 0; i < payload.length; i++) {
    //     let newObj = { Spot: payload[i] }
    //     bookings.push(newObj)
    // }
    // Object.assign({ Spot: payload }, bookings)

    const newBook = await Booking.findAll({
        where: {
            userId: req.user.id
        }
        // include: [
        //     {
        //         model: Spot,
        //         attributes: {
        //             exclude: ['description', 'createdAt', 'updatedAt']
        //         }
        //     }
        // ]
    })
    for (let i = 0; i < newBook.length; i++) {
        newBook[i].setDataValue('Spot', payload[i])
    }
    res.json({
        Bookings: newBook
    })
    // res.json({
    //     Bookings: {
    //         bookings, Spot: payload
    //     }
    // })

})

router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body
    const updateBooking = await Booking.findByPk(req.params.bookingId)
    if (!updateBooking) {
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
    const spotBookings = await Booking.findAll({
        where: {
            spotId: updateBooking.spotId
        }
    })
    const currDate = new Date()
    // const updateDate = `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate() + 1}`
    if (updateBooking) {
        if (updateBooking.userId === req.user.id) {
            if (startDate < endDate) {
                for (let i = 0; i < spotBookings.length; i++) {
                    let newDate = `${spotBookings[i].startDate.getFullYear()}-${spotBookings[i].startDate.getMonth() + 1}-${spotBookings[i].startDate.getDate() + 1}`
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
                if (!(updateBooking.endDate < currDate)) {
                    await updateBooking.update({
                        startDate,
                        endDate
                    })
                    return res.json(updateBooking)
                } else {
                    return res.json({
                        "message": "Past bookings can't be modified",
                        "statusCode": 403
                    })
                }
            } else {
                return res.json({
                    "message": "Validation error",
                    "statusCode": 400,
                    "errors": {
                        "endDate": "endDate cannot come before startDate"
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
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
})

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const oldBooking = await Booking.findByPk(req.params.bookingId)
    if (!oldBooking) {
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
    const spot = await Spot.findByPk(oldBooking.spotId)
    const currDate = new Date()
    if (oldBooking) {
        if (spot.ownerId === req.user.id || oldBooking.userId === req.user.id) {
            if (currDate < oldBooking.startDate) {
                oldBooking.destroy()
                res.status(200).json({
                    message: "Successfully deleted",
                    statusCode: 200
                })
            } else {
                res.json({
                    "message": "Bookings that have been started can't be deleted",
                    "statusCode": 403
                })
            }
        }
    } else {
        res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
})

module.exports = router;
