import { csrfFetch } from './csrf';
const GET_SPOTS = '/spots/getSpots'
const GET_ONE_SPOT = '/spots/getOneSpot'
const CREATE_SPOT = '/spots/createSpot'
const EDIT_SPOT = '/spots/editSpot'
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

const actionResetState = () => {
    return {
        type: RESET_DATA
    }
}

const actionEditSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot
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

export const editSpot = (spot) => async (dispatch) => {
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
        dispatch(actionEditSpot(data))
        return data
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
        const data = await response.json()
        const { id } = data
        const { url, preview } = image
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
        case RESET_DATA:
            return { ...newState }
        default:
            return state
    }
}

export default spotReducer
