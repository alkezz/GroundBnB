import { csrfFetch } from './csrf';
const GET_SPOTS = '/spots/getSpots'
const GET_ONE_SPOT = '/spots/getOneSpot'
const CREATE_SPOT = '/spots/createSpot'
const EDIT_SPOT = '/spots/editSpot'
const DELETE_SPOT = '/spots/deleteSpot'
const RESET_DATA = '/spots/resetData'

const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}
const getOneSpot = (spot) => {
    return {
        type: GET_ONE_SPOT,
        spot
    }
}

const actionCreateSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

const actionEditSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot
    }
}

const actionDeleteSpot = (spot) => {
    return {
        type: DELETE_SPOT,
        spot
    }
}

const actionResetState = () => {
    return {
        type: RESET_DATA
    }
}


export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')
    if (response.ok) {
        const data = await response.json()
        dispatch(getSpots(data.Spots))
        return data.Spots
    }
}

export const getOne = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(getOneSpot(data))
        return data
    }
    return response
}

export const editSpot = (spot, urlArray) => async (dispatch) => {
    const { id, address, city, state, country, name, description, price, lat, lng } = spot
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            lat,
            lng
        })
    })
    if (response.ok) {
        const data = await response.json()
        const spotId = data.id
        const spot = await csrfFetch(`/api/spots/${spotId}`)
        const spotToJson = await spot.json()
        for (let i = 0; i < spotToJson.SpotImages.length; i++) {
            const img = spotToJson.SpotImages[i]
            await csrfFetch(`/api/spot-images/${img.id}`, {
                method: 'DELETE'
            })
            //     if (deleteSpot.ok) {
            //         const newImage = await csrfFetch(`/api/spots/${spotId}/images`, {
            //             method: 'POST',
            //             body: JSON.stringify({
            //                 url,
            //                 preview: true
            //             })
            //         })
            // }
            // if (newImage.ok) {
            //     const jsonSpotImage = await newImage.json()
            //     data['previewImage'] = jsonSpotImage
            //     dispatch(actionEditSpot(data))
            //     return data
            // }
            // return deleteSpot
        }
        for (let i = 0; i < urlArray.length; i++) {
            const url = urlArray[i]
            console.log("URL IN STORE", url)
            const spotId = data.id
            const spotImage = await csrfFetch(`/api/spots/${spotId}/images`, {
                method: 'POST',
                body: JSON.stringify({
                    url,
                    preview: true
                })
            })
            if (spotImage.ok) {
                const jsonSpotImage = await spotImage.json()
                if (i === 0) {
                    data['previewImage'] = jsonSpotImage
                }
            }
        }
        dispatch(actionEditSpot(data))
        return data
    }
    return response
}

export const createSpot = (spot, urlArray) => async (dispatch) => {
    const { address, city, state, country, name, description, price, lat, lng } = spot
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify({
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
    })
    if (response.ok) {
        // const { url, preview } = image
        const data = await response.json()
        const { id } = data
        for (let i = 0; i < urlArray.length; i++) {
            const url = urlArray[i]
            console.log("URL IN STORE", url)
            const spotImage = await csrfFetch(`/api/spots/${id}/images`, {
                method: 'POST',
                body: JSON.stringify({
                    url,
                    preview: true
                })
            })
            if (spotImage.ok) {
                const jsonSpotImage = await spotImage.json()
                if (i === 0) {
                    data['previewImage'] = jsonSpotImage
                }
            }
        }
        dispatch(actionCreateSpot(data));
        return data
    }
    return response
}

export const deleteSpot = (spot) => async (dispatch) => {
    const { id } = spot
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(actionDeleteSpot(spot))
        return response
    }
    return response
}

export const resetState = () => async (dispatch) => {
    dispatch(actionResetState())
    return
}

const initialState = {}

const spotReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_SPOTS: {
            action.spots.forEach((spot) => {
                newState[spot.id] = spot
            })
            return newState
        }
        case GET_ONE_SPOT:
            newState[action.spot.id] = action.spot
            return newState;
        case CREATE_SPOT:
            newState = { ...state }
            newState[action.spot.id] = action.spot
            return newState
        case EDIT_SPOT:
            newState = { ...state }
            newState[action.spot.id] = action.spot
            return newState
        case DELETE_SPOT: {
            newState = { ...state }
            const id = action.spot.id
            delete newState[id]
            return { ...newState }
        }
        case RESET_DATA:
            return { ...newState }
        default:
            return state
    }
}

export default spotReducer
