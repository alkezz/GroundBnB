import React, { useEffect } from 'react'
import * as spotActions from '../../store/spots';
import * as reviewActions from '../../store/reviews'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './AllSpots.css'

function AllSpotsPage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const allSpotsOBJ = useSelector(state => state.spots)
    useEffect(() => {
        dispatch(spotActions.getAllSpots())
    }, [dispatch])
    const allSpots = Object.values(allSpotsOBJ)
    console.log("ALLSOPOTS", allSpots)
    return (
        <div>
            {allSpots && (
                <div className='all-spots-div'>
                    {allSpots.map(spot =>
                        <button key={spot.id} id='spot-buttons' onClick={async (e) => {
                            history.push(`/spots/${spot.id}`)
                            await dispatch(spotActions.resetState())
                            // await dispatch(reviewActions.resetState())
                        }}>
                            <div className={`${spot.id}-div`}>
                                <li key={spot.id} style={{ listStyle: 'none' }}>
                                    <div className='under-pic-elements'>
                                        <div id={`preview-image-div`} style={{ cursor: "pointer" }}>
                                            <img src={spot.previewImage} alt='cave'></img>
                                        </div>
                                        <br />
                                        <div id={`state-div`} style={{ fontSize: "16px", display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                                            <div style={{ marginLeft: "10px", fontWeight: "750" }}>{spot.city}, {spot.state} &nbsp;</div>
                                            <div style={{ display: "flex", marginRight: "10px" }}>
                                                <div>
                                                    {isNaN(spot.avgRating) ? "" : <i class="fa-solid fa-star"></i>}
                                                </div>
                                                &nbsp;
                                                <div>{isNaN(spot.avgRating) ? "No Reviews Yet!" : spot.avgRating}
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <div id={`price-div`}>
                                            <span style={{ fontWeight: "900" }}>${spot.price}</span>/night
                                        </div>
                                        <br />
                                    </div>
                                </li>
                            </div>
                        </button>
                    )
                    }
                </div >
            )}
        </div >
    )
}

export default AllSpotsPage
