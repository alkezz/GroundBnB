import { csrfFetch } from './csrf';
const GET_SPOTS = '/spots/getSpots'

const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}

export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')
    if (response.ok) {
        const data = await response.json()
        console.log('this is data', data.Spots)
        dispatch(getSpots(data.Spots))
        return data.Spots
    }
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
        // newState = Object.assign({}, state);
        // newState = action.spots;
        // return newState;
        default:
            return state
    }
}

export default spotReducer
