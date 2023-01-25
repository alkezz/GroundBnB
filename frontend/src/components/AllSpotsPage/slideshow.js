import React, { useEffect, useState } from 'react'
import * as spotActions from '../../store/spots';
import * as reviewActions from '../../store/reviews'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';

const SlideShow = ({ key, spot }) => {
    const [index, setActiveStep] = useState(0);
    const [showArrows, setShowArrows] = useState(false)
    const CollectionSize = 4
    const history = useHistory()
    const goToNextPicture = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const goToPrevPicture = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
    console.log("INDEX", index)
    let pictureLocation
    if (index === 0) {
        pictureLocation = (
            <div style={{ zIndex: "999", position: "relative", top: "-35px", left: "140px" }}>
                <i onClick={() => setActiveStep(0)} style={{ color: "white", zIndex: "999", position: "relative", top: "0", fontSize: "6px" }} class="fa-solid fa-circle"></i>
                &nbsp;
                <i onClick={() => setActiveStep(1)} style={{ color: "#dddddd", zIndex: "999", position: "relative", top: "0", fontSize: "6px" }} class="fa-solid fa-circle"></i>
                &nbsp;
                <i onClick={() => setActiveStep(2)} style={{ color: "#dddddd", zIndex: "999", position: "relative", top: "0", fontSize: "6px" }} class="fa-solid fa-circle"></i>
                &nbsp;
                <i onClick={() => setActiveStep(3)} style={{ color: "#dddddd", zIndex: "999", position: "relative", top: "0", fontSize: "6px" }} class="fa-solid fa-circle"></i>
            </div>
        )
    }
    if (index === 1) {
        pictureLocation = (
            <div style={{ zIndex: "999", position: "relative", top: "-35px", left: "140px" }}>
                <i onClick={() => setActiveStep(0)} style={{ color: "#dddddd", zIndex: "999", position: "relative", top: "0", fontSize: "6px" }} class="fa-solid fa-circle"></i>
                &nbsp;
                <i onClick={() => setActiveStep(1)} style={{ color: "white", zIndex: "999", position: "relative", top: "0", fontSize: "6px" }} class="fa-solid fa-circle"></i>
                &nbsp;
                <i onClick={() => setActiveStep(2)} style={{ color: "#dddddd", zIndex: "999", position: "relative", top: "0", fontSize: "6px" }} class="fa-solid fa-circle"></i>
                &nbsp;
                <i onClick={() => setActiveStep(3)} style={{ color: "#dddddd", zIndex: "999", position: "relative", top: "0", fontSize: "6px" }} class="fa-solid fa-circle"></i>
            </div>
        )
    }
    if (index === 2) {
        pictureLocation = (
            <div style={{ zIndex: "999", position: "relative", top: "-35px", left: "140px" }}>
                <i onClick={() => setActiveStep(0)} style={{ color: "#dddddd", zIndex: "999", position: "relative", top: "0", fontSize: "6px" }} class="fa-solid fa-circle"></i>
                &nbsp;
                <i onClick={() => setActiveStep(1)} style={{ color: "#dddddd", zIndex: "999", position: "relative", top: "0", fontSize: "6px" }} class="fa-solid fa-circle"></i>
                &nbsp;
                <i onClick={() => setActiveStep(2)} style={{ color: "white", zIndex: "999", position: "relative", top: "0", fontSize: "6px" }} class="fa-solid fa-circle"></i>
                &nbsp;
                <i onClick={() => setActiveStep(3)} style={{ color: "#dddddd", zIndex: "999", position: "relative", top: "0", fontSize: "6px" }} class="fa-solid fa-circle"></i>
            </div>
        )
    }
    if (index === 3) {
        pictureLocation = (
            <div style={{ zIndex: "999", position: "relative", top: "-35px", left: "140px" }}>
                <i onClick={() => setActiveStep(0)} style={{ color: "#dddddd", zIndex: "999", position: "relative", top: "0", fontSize: "6px" }} class="fa-solid fa-circle"></i>
                &nbsp;
                <i onClick={() => setActiveStep(1)} style={{ color: "#dddddd", zIndex: "999", position: "relative", top: "0", fontSize: "6px" }} class="fa-solid fa-circle"></i>
                &nbsp;
                <i onClick={() => setActiveStep(2)} style={{ color: "#dddddd", zIndex: "999", position: "relative", top: "0", fontSize: "6px" }} class="fa-solid fa-circle"></i>
                &nbsp;
                <i onClick={() => setActiveStep(3)} style={{ color: "white", zIndex: "999", position: "relative", top: "0", fontSize: "6px" }} class="fa-solid fa-circle"></i>
            </div>
        )
    }
    return (
        <>
            <Link to={`/spots/${spot.id}`} style={{ zIndex: "999" }} onMouseEnter={() => setShowArrows(true)}>
                <img src={spot?.SpotImages[index]?.url} alt='cave'></img>
            </Link>
            {showArrows && (
                <>
                    <div style={{ top: "-350px", position: "relative", height: "310px", width: "335px", marginLeft: "-10px", marginTop: "45px" }} onMouseLeave={() => setShowArrows(false)}>
                        <i onClick={() => index !== CollectionSize - 1 ? goToNextPicture() : setActiveStep(0)} style={{ fontSize: "26px", color: "white", position: "relative", right: "-300px", marginTop: "150px" }} class="fa-solid fa-circle-chevron-right"></i>
                        <i onClick={() => index !== 0 ? goToPrevPicture() : setActiveStep(3)} style={{ fontSize: "26px", color: "white", position: "relative", left: "-15px" }} class="fa-solid fa-circle-chevron-left"></i>
                    </div>
                    <div style={{ position: "relative", top: "-355px" }}>
                        {pictureLocation}
                    </div>
                </>
            )}
            {!showArrows && (
                <div>
                    {pictureLocation}
                </div>
            )}
        </>
    )
}

export default SlideShow
