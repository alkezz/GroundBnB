const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage, sequelize, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, handleSpotValidationErrors } = require('../../utils/validation');

router.get('/current', requireAuth, async (req, res) => {
    const bookings = await User.findByPk(req.user.id, {
        include: [
            {
                model: Booking,
                attributes: ['id', 'userId'],
                include: [
                    {
                        model: Spot
                    }
                ],
            },
        ],
        attributes: []
    })
    // const spots = await User.findByPk(req.user.id, {
    //     include: [
    //         {
    //             model: Spot,
    //             through: {
    //                 attributes: []
    //             },
    //         },
    //         {
    //             model: Review,
    //             attributes: []
    //         },
    //         {
    //             model: Booking,
    //             where: {
    //                 userId: req.user.id
    //             },
    //             attributes: []
    //         },
    //     ],
    //     attributes: []
    // })
    // console.log(bookings)
    res.json(bookings)
})

module.exports = router;
