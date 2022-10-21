import { csrfFetch } from './csrf';

const GET_REVIEWS = "/reviews/getReviews"
const CREATE_REVIEW = "/reviews/createReview"

const actionGetReviews = (review) => {
    return {
        type: GET_REVIEWS,
        review
    }
}

const actionCreateReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}


export const getReviews = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`)
    if (response.ok) {
        const data = await response.json()
        await dispatch(actionGetReviews(data))
        return data
    }
    return response
}

export const createReview = (newReview) => async (dispatch) => {
    const { userId, spotId, review, stars } = newReview
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        Headers: 'application/json',
        body: JSON.stringify({
            review,
            stars
        })
    })
    if (response.ok) {
        const data = await response.json()
        console.log("NEW REVIEW DATA", data)
        await dispatch(actionCreateReview(data))
        return response
    }
    return response
}



const initialState = {}
const reviewReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_REVIEWS:
            action.review.Reviews.forEach((review) => {
                newState[review.id] = review
            })
            return newState
        case CREATE_REVIEW:
            newState[action.review.id] = action.review
            return newState
        default:
            return newState
    }
}

export default reviewReducer
