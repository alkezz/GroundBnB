import React, { useState, useEffect, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as reviewActions from "../../store/reviews"


function CreateReview() {
    const dispatch = useDispatch()
    const history = useHistory()
    const spotId = Number(useParams().spotId)
    const userId = useSelector(state => state.session.user.id)
    const [review, setReview] = useState("")
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        const errors = []
        if (review.length <= 0) errors.push("Please enter a review!")
        if (stars <= 0 || stars > 5) errors.push("Stars must be an integer between 1 and 5!")
        if (errors.length) {
            setErrors(errors)
            return
        }
        const newReview = {
            spotId,
            userId,
            review,
            stars
        }
        async function getData() {
            await dispatch(reviewActions.createReview(newReview))
            history.push(`/spots/${spotId}`)
        }
        getData()
    }

    return (
        <form onSubmit={handleSubmit} className='login-form'>
            <h1 id='welcome-head'>Create a review!</h1>
            <label>
                <div>
                    <textarea
                        type="text"
                        placeholder='Review'
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className={errors.includes('Please enter a review!') ? 'error' : "user-input"}
                    />
                    <div>
                        {errors.map((error, idx) =>
                            error === "Please enter a review!" ? <li key={idx} id='error-list'>{error}</li> : null
                        )}
                    </div>
                </div>
            </label>
            <div>
                <label>
                    <div>
                        <input
                            type="number"
                            value={stars}
                            placeholder='Stars'
                            onChange={(e) => setStars(e.target.value)}
                            className={errors.includes('Stars must be an integer between 1 and 5!') ? 'error' : "user-input"}
                        />
                        <div>
                            {errors.map((error, idx) =>
                                error === "Stars must be an integer between 1 and 5!" ? <li key={idx} id='error-list'>{error}</li> : null
                            )}
                        </div>
                    </div>
                </label>
            </div>
            <button type="submit" className='user-submit'>
                Submit Review
            </button>
        </form>
    )
}

export default CreateReview
