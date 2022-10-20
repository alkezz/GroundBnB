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
    console.log('THIS IS SPOT', spot)
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
    console.log('res', response)
    if (response.ok) {
        const data = await response.json()
        console.log("NEW DATAATATATA", data)
        dispatch(getOneSpot(data))
    }
    return response
}

export const editSpot = (spot, image) => async (dispatch) => {
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
        const { url, preview } = image
        const spotId = data.id
        const spot = await csrfFetch(`/api/spots/${spotId}`)
        const spotToJson = await spot.json()
        const imageId = spotToJson.SpotImages[0].id
        const deleteSpot = await csrfFetch(`/api/spot-images/${imageId}`, {
            method: 'DELETE'
        })
        console.log(deleteSpot)
        if (deleteSpot.ok) {
            const newImage = await csrfFetch(`/api/spots/${spotId}/images`, {
                method: 'POST',
                body: JSON.stringify({
                    url,
                    preview
                })
            })
            if (newImage.ok) {
                const jsonSpotImage = await newImage.json()
                data['previewImage'] = jsonSpotImage
                dispatch(actionEditSpot(data))
                return data
            }
            return deleteSpot
        }
        return response
    }
    return response
}

export const createSpot = (spot, image) => async (dispatch) => {
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
        const { url, preview } = image
        console.log("url IN THUNK", url)
        const data = await response.json()
        const { id } = data
        const spotImage = await csrfFetch(`/api/spots/${id}/images`, {
            method: 'POST',
            body: JSON.stringify({
                url,
                preview
            })
        })
        if (spotImage.ok) {
            const jsonSpotImage = await spotImage.json()
            data['previewImage'] = jsonSpotImage
            console.log("CREATE SPOT DATA", data)
            dispatch(actionCreateSpot(data));
            return data
        }
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
    let newState = { ...state };
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
            console.log('IN REDUCER FOR CREATE SPOT')
            newState[action.spot.id] = action.spot
            console.log("NEW STATE", newState)
            return newState
        case EDIT_SPOT:
            newState[action.spot.id] = action.spot
            return newState
        case DELETE_SPOT:
            delete newState.action.spot
            return newState
        case RESET_DATA:
            return { ...newState }
        default:
            return state
    }
}

export default spotReducer
