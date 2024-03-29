import React, { useEffect, useState } from 'react'
import * as spotActions from '../../store/spots';
import * as reviewActions from '../../store/reviews'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import SlideShow from './slideshow';
import Maps from '../Maps/Maps';
import './AllSpots.css'

function AllSpotsPage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const allSpotsOBJ = useSelector(state => state.spots)
    const [update, setUpdate] = useState(false)
    const [spots, setSpots] = useState([])
    const [index, setActiveStep] = useState(0);
    const [activeMenu, setActiveMenu] = useState()
    const [pro, setPro] = useState()
    const CollectionSize = 4
    useEffect(() => {
        dispatch(spotActions.getAllSpots())
    }, [dispatch])
    const allSpots = Object.values(allSpotsOBJ)
    return (
        <div className='landing-page-container'>
            <div>
                <Maps allSpots={allSpots} />
            </div>
            <div className='all-spots'>
                {allSpots.map((spot, idx) =>
                    <div>
                        <div>
                            <div className={`${spot.id}-div`}>
                                <div key={spot.id}>
                                    <div className='under-pic-elements'>
                                        <div id={`preview-image-div`} style={{ cursor: "pointer" }}>
                                            <SlideShow spot={spot} />
                                        </div>
                                        <br />
                                        <div style={{ cursor: "pointer" }} onClick={(e) => history.push(`/spots/${spot.id}`)}>
                                            <div style={{ fontSize: "16px", fontWeight: "700" }}><Link style={{ fontWeight: "750", textDecoration: "none", color: "black" }} to={`/spots/${spot.id}`}>&nbsp;&nbsp;{spot.name}</Link></div>
                                            <div id={`state-div`} style={{ fontSize: "16px", display: "flex", flexDirection: "row", width: "97%", justifyContent: "space-between" }}>
                                                <Link to={`/spots/${spot.id}`} style={{ marginLeft: "10px", fontWeight: "750", textDecoration: "none", color: "black" }}>{spot.city}, {spot.state} &nbsp;</Link>
                                                <div style={{ display: "flex", marginRight: "10px" }}>
                                                    <div>
                                                        {isNaN(spot.avgRating) ? "" : <i style={{ fontSize: "12px", position: "relative", top: "-2px" }} class="fa-solid fa-star"></i>}
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
                                        </div>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllSpotsPage
