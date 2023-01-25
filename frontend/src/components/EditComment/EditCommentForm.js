import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import * as reviewActions from "../../store/reviews"
import * as spotActions from "../../store/spots"
import "./EditCommentForm.css"

const EditCommentForm = ({ user, reviews }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [stars, setStars] = useState(reviews?.stars)
    const [review, setReview] = useState(reviews?.review)
    const [count, setCount] = useState(reviews?.review.length)
    const { spotId } = useParams()
    const [errors, setErrors] = useState([])
    const [update, setUpdate] = useState(false)
    let errorArray = []
    useEffect(() => {
        (async () => {
            // await dispatch(spotActions.getOne(spotId))
            await dispatch(reviewActions.getReviews(spotId))
        })();
    }, [dispatch, setUpdate, update, spotId])
    const handleReview = async (e) => {
        e.preventDefault()
        if (stars <= 0 || stars === undefined) {
            errorArray.push("Please make sure your review has at least one star")
        }
        if (review.length < 10) {
            errorArray.push("Please make sure your review is at least 10 characters")
        }
        setErrors(errorArray)
        if (errors.length > 0) {
            return
        }
        const editedReview = {
            id: reviews.id,
            userId: user.id,
            review,
            stars
        }
        await dispatch(reviewActions.editReview(editedReview))
        // await dispatch(spotActions.getOne(spotId))
        await setUpdate(false)
    }

    return (
        <div className='edit-comment-modal-container'>
            <h3 style={{ marginLeft: "110px" }}>Edit Review:</h3>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "21%" }}>
                {errors.length > 0 && (
                    <div style={{ backgroundColor: "red", width: "78%", marginBottom: "25px", paddingTop: "20px", display: "flex", paddingLeft: "10px" }}>
                        <i style={{ color: "white", paddingBottom: "10px" }} className="fa-solid fa-circle-xmark fa-3x"></i>
                        <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px", marginRight: "10px", justifyContent: "center" }}>
                            {errors.map((error) => {
                                return <>
                                    <div style={{ color: "white" }}>{error}</div>
                                    <br />
                                </>
                            })}
                        </div>
                    </div>
                )}
                {/* <input
                        max={5}
                        min={1}
                        type="number"
                        placeholder='Stars'
                        defaultValue={1}
                    /> */}
                <div style={{ display: "flex", flexDirection: "row", paddingBottom: "15px" }}>
                    <button className='stars-button' value={1} onClick={(e) => {
                        if (stars <= 0) {
                            setStars(1)
                        } else if (stars >= 1) {
                            setStars(1)
                        } else {
                            setStars(0)
                        }
                    }}>
                        {stars >= 1 && (
                            <i style={{ fontSize: "18px" }} class="fa-solid fa-star fa-2x"></i>
                        )}
                        {stars === undefined || stars <= 0 && (
                            <i id="one-spot-star" class="fa-regular fa-star"></i>
                        )}
                    </button>
                    <button className='stars-button' value={2} onClick={(e) => {
                        if (stars <= 1) {
                            setStars(2)
                        } else if (stars >= 2) {
                            setStars(2)
                        } else {
                            setStars(0)
                        }
                    }} style={{ background: "none", width: "fit-content", border: "none", cursor: "pointer" }}>
                        {stars >= 2 && (
                            <i style={{ fontSize: "18px" }} class="fa-solid fa-star"></i>
                        )}
                        {stars === undefined || stars <= 1 && (
                            <i id="one-spot-star" style={{ fontSize: "18px" }} class="fa-regular fa-star"></i>
                        )}
                    </button>
                    <button className='stars-button' value={3} onClick={(e) => {
                        if (stars <= 2) {
                            setStars(3)
                        } else if (stars >= 3) {
                            setStars(3)
                        } else {
                            setStars(0)
                        }
                    }} style={{ background: "none", width: "fit-content", border: "none", cursor: "pointer" }}>
                        {stars >= 3 && (
                            <i style={{ fontSize: "18px" }} class="fa-solid fa-star"></i>
                        )}
                        {stars === undefined || stars <= 2 && (
                            <i id="one-spot-star" style={{ fontSize: "18px" }} class="fa-regular fa-star"></i>
                        )}
                    </button>
                    <button className='stars-button' value={4} onClick={(e) => {
                        if (stars <= 3) {
                            setStars(4)
                        } else if (stars >= 4) {
                            setStars(4)
                        } else {
                            setStars(0)
                        }
                    }} style={{ background: "none", width: "fit-content", border: "none", cursor: "pointer" }}>
                        {stars >= 4 && (
                            <i style={{ fontSize: "18px" }} class="fa-solid fa-star"></i>
                        )}
                        {stars === undefined || stars <= 3 && (
                            <i id="one-spot-star" style={{ fontSize: "18px" }} class="fa-regular fa-star"></i>
                        )}
                    </button>
                    <button className='stars-button' value={5} onClick={(e) => {
                        if (stars <= 4) {
                            setStars(5)
                        } else {
                            setStars(0)
                        }
                    }} style={{ background: "none", width: "fit-content", border: "none", cursor: "pointer" }}>
                        {stars === 5 && (
                            <i style={{ fontSize: "18px" }} class="fa-solid fa-star"></i>
                        )}
                        {stars === undefined || stars <= 4 && (
                            <i id="one-spot-star" style={{ fontSize: "18px" }} class="fa-regular fa-star"></i>
                        )}
                    </button>
                </div>
                <div>
                    <textarea value={review} onChange={(e) => { setReview(e.target.value); setCount(e.target.value.length) }} maxLength={60} type="text" style={{ width: "300px", height: "100px", resize: "none" }} />
                    <p style={{ marginTop: "-22px", marginLeft: "260px" }}>{count}/60</p>
                </div>
                <div className='center-review-button'>
                    <button onClick={(e) => { handleReview(e); setUpdate(!update) }} style={{ backgroundColor: "#d60565", color: "white", borderRadius: "5px", cursor: "pointer", width: "78%", height: "50px", fontWeight: "700", fontSize: "16px", border: "none" }}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default EditCommentForm
