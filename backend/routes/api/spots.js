const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, ReviewImage, SpotImage, sequelize, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/', async (req, res) => {
    const aggregateData = await Spot.findAll({
        include: {
            model: Review,
            attributes: []
        },
        attributes: [
            [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']
        ]
    });
    const allSpots = await Spot.findAll({
        // attributes: {
        //     include: [
        //         [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']
        //     ]
        // },
        // include: [{
        //     model: Review,
        //     attributes: []
        // }]
        include: {
            model: Review
        },
        attributes: {
            include: ['avgRating']
        }
    })
    for (let i = 0; i < allSpots.length; i++) {
        allSpots[i].avgRating = aggregateData.avgRating
    }
    // allSpots.avgRating = aggregateData.avgRating
    res.status(200).json(allSpots)
})

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    const currSpots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage,
                attributes: ['preview']
            }
        ],
        where: {
            ownerId: user.toSafeObject().id
        }
    })
    res.status(200).json(currSpots)
})

router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']
            ]
        },
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            },
            {
                model: User,
                as: 'Owner',
                attributes: {
                    exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
                }
            }
        ],
        attributes: {
        }
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

router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                address: 'Street address is required',
                city: 'City is required',
                state: 'State is required',
                country: 'Country is required',
                lat: 'Latitude is not valid',
                lng: 'Longitude is not valid',
                name: 'Name must be less than 50 characters',
                description: 'Description is required',
                price: 'Price per day is required'
            }
        })
    } else {
        const { user } = req
        const newSpot = await Spot.create({
            ownerId: user.toSafeObject().id,
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
    }
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

router.put('/:spotId', requireAuth, async (req, res) => {
    const { user } = req
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                address: 'Street address is required',
                city: 'City is required',
                state: 'State is required',
                country: 'Country is required',
                lat: 'Latitude is not valid',
                lng: 'Longitude is not valid',
                name: 'Name must be less than 50 characters',
                description: 'Description is required',
                price: 'Price per day is required'
            }
        })
    }
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
