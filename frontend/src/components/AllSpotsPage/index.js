import React, { useEffect } from 'react'
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './AllSpots.css'

function AllSpotsPage() {
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(spotActions.getAllSpots())
    }, [dispatch])
    const allSpotsOBJ = useSelector(state => state.spots)
    const allSpots = Object.values(allSpotsOBJ)
    return (
        <div>
            {allSpots && (
                <div className='all-spots-div'>
                    {allSpots.map(spot =>
                        <button id='spot-buttons' onClick={() => history.push(`/spots/${spot.id}`)}>
                            <div className={`${spot.id}-div`}>
                                <li key={spot.id} style={{ listStyle: 'none' }}>
                                    <div className='under-pic-elements'>
                                        <div id={`preview-image-${spot.id}-div`}>
                                            <img src={spot.previewImage} alt='cave'></img>
                                        </div>
                                        <br />
                                        <div id={`state-div`}>
                                            {spot.city}, {spot.state} <span>{spot.avgRating} stars</span>
                                        </div>
                                        <br />
                                        <div id={`price-div`}>
                                            ${spot.price} night
                                        </div>
                                        <br />
                                    </div>
                                </li>
                            </div>
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default AllSpotsPage
