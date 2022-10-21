import React, { useEffect } from 'react'
import * as spotActions from '../../store/spots';
import * as reviewActions from '../../store/reviews'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import "./OneSpot.css"

function SpotById() {
    const history = useHistory();
    const id = Number(useParams().spotId)
    const stringId = useParams().spotId
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews)
    console.log("REVIEWS USESELECTOR", reviews)
    useEffect(() => {
        dispatch(sessionActions.restoreUser())
        async function getData() {
            await dispatch(spotActions.getOne(id))
            await dispatch(reviewActions.getReviews(id))
        }
        getData()
    }, [dispatch, id])
    const reviewArray = Object.values(reviews)
    console.log(reviewArray)
    const allSpotsOBJ = useSelector(state => state.spots[id])
    if (!allSpotsOBJ) return null
    console.log(allSpotsOBJ)
    return (
        <>
            {allSpotsOBJ.SpotImages && (
                <div className='entire-one-spot-div'>
                    <div className='one-spot-name'>
                        <h2>{allSpotsOBJ.name}</h2>
                    </div>
                    <div className='one-spot-stats'>
                        <ul >
                            <li> <i class="fa-solid fa-star"></i> </li>
                            <span> </span>
                            <li> {allSpotsOBJ.avgStarRating} </li>
                            <span> </span>
                            <span>·</span>
                            <span> </span>
                            <li> {allSpotsOBJ.numReviews} Review(s) </li>
                            <span> </span>
                            <span>·</span>
                            <span> </span>
                            <li><span><i class="fa-solid fa-medal"></i></span><span> </span>Superhost</li>
                            <span> </span>
                            <span>·</span>
                            <span> </span>
                            <li style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{allSpotsOBJ.city}, {allSpotsOBJ.state}, {allSpotsOBJ.country}</li>
                        </ul>
                    </div>
                    <div id='img-div'>
                        <img id='one-allSpotsOBJ-image' src={allSpotsOBJ.SpotImages[0].url} alt="cave"></img>
                    </div>
                    <br />
                    <div id='under-picture-text'>
                        <div id='actual-text-div'>
                            <h2>
                                {allSpotsOBJ.description} Hosted by {allSpotsOBJ.Owner.firstName}
                            </h2>
                            <h3>${allSpotsOBJ.price}/night</h3>
                        </div>
                        <div className='button-div-container'>
                            <button style={{ visibility: user === null || user.id !== allSpotsOBJ.ownerId ? "hidden" : "visible" }} onClick={() => history.push(`/spot/${id}/edit`)} className="edit-delete-button">Edit Spot</button>
                            <button style={{ visibility: user === null || user.id !== allSpotsOBJ.ownerId ? "hidden" : "visible" }} onClick={() => dispatch(spotActions.deleteSpot(allSpotsOBJ)).then(() => history.push('/'))} className="edit-delete-button">Delete Spot</button>
                        </div>
                    </div>
                </div>
            )}
            <br></br>
            <div style={{ borderBottom: '1px black solid', width: '50%', display: 'flex', marginLeft: '25%' }}></div>
            <br></br>
            <div className='center-review-box'>
                {reviewArray.length >= 1 && (
                    <div style={{ border: '1px black solid' }} className='review-container-div'>
                        {reviewArray.map((review) =>
                            <>
                                <div>
                                    Review from: {review.User.firstName}
                                </div>
                                <div>
                                    &nbsp; &nbsp; &nbsp; {review.review}
                                </div>
                                <div>
                                    <i class="fa-solid fa-star"></i> &nbsp;{review.stars}
                                </div>
                                <div style={{ borderBottom: '1px solid black' }}></div>
                            </>
                        )}
                    </div>
                )}
                {reviewArray.length <= 0 && (
                    <>
                        <div>
                            <div>
                                No Reviews yet!
                            </div>
                            <div style={{ visibility: user === null || user.id === allSpotsOBJ.ownerId ? 'hidden' : 'visible' }}>
                                Why don't you get started and create a review for this spot!
                            </div>
                            <div className='review-button-div'>
                                <button style={{ visibility: user === null || user.id === allSpotsOBJ.ownerId ? 'hidden' : 'visible' }} className='add-review-button' onClick={() => history.push(`/spots/${stringId}/review/create`)}>Create a Review</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {reviewArray.length >= 1 && (
                <div className='review-button-div'>
                    <button style={{ visibility: user === null || user.id === allSpotsOBJ.ownerId ? 'hidden' : 'visible' }} className='add-review-button' onClick={() => history.push(`/spots/${stringId}/review/create`)}>Create a Review</button>
                </div>
            )}
        </>
    )
}

export default SpotById
