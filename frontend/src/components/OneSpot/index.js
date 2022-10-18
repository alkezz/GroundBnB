import React, { useEffect } from 'react'
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import "./OneSpot.css"

function SpotById() {
    const b = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(spotActions.getOne(b.spotId))
    }, [dispatch, b.spotId])
    const allSpotsOBJ = useSelector(state => state.spots)
    console.log("ALLSPOTSOBJ", allSpotsOBJ)
    const spot = Object.values(allSpotsOBJ)[0]
    console.log(spot)
    return (
        <>
            {spot.SpotImages && (
                <div>
                    <div>
                        <h2>{spot.name}</h2>
                    </div>
                    <div>
                        <ul >
                            <li> starpic </li>
                            <li> {spot.avgStarRating} </li>
                            <span> </span>
                            <li> {spot.numReviews} Review(s) </li>
                            <span> </span>
                            <li><span>medal</span>Superhost</li>
                            <span> </span>
                            <li>{spot.city}, {spot.state}, {spot.country}</li>
                        </ul>
                    </div>
                    <div>
                        <img src={spot.SpotImages[0].url} alt="cave"></img>
                    </div>
                </div>
            )}
        </>
    )
}

export default SpotById
