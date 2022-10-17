import React, { useEffect } from 'react'
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './AllSpots.css'

function AllSpotsPage() {
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
                        <button id='spot-buttons' onClick={() => console.log('yes')}>
                            <div className={`${spot.id}-div`}>
                                <li key={spot.id} style={{ listStyle: 'none' }}>
                                    <div>
                                        <div id={`${spot.id}-preview-image-div`}>
                                            {spot.previewImage}
                                        </div>
                                        <br />
                                        <div id={`${spot.id}-state-div`}>
                                            {spot.city}, {spot.state} <span>{spot.avgRating} stars</span>
                                        </div>
                                        <br />
                                        <div id={`${spot.id}-price-div`}>
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
