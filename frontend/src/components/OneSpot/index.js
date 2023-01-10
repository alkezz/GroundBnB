import React, { useEffect, useState } from 'react'
import * as spotActions from '../../store/spots';
import * as reviewActions from '../../store/reviews'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import "./OneSpot.css"

function SpotById() {
    let hasReview = false
    let todaysDate = new Date()
    let checkInDate = todaysDate.toISOString().substring(0, 10)
    todaysDate.setDate(todaysDate.getDate() + 1)
    let checkOutDay = todaysDate.toISOString().substring(0, 10)
    const history = useHistory();
    const id = Number(useParams().spotId)
    const stringId = useParams().spotId
    const spotId = useParams().spotId
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews)
    const allSpotsOBJ = useSelector(state => state.spots[id])
    const [startDate, setStartDate] = useState(checkInDate)
    const [endDate, setEndDate] = useState(checkOutDay)
    const [firstPictureId, setFirstPictureId] = useState()
    const [firstImage, setFirstImage] = useState()
    const [secondPictureId, setSecondPictureId] = useState()
    const [secondPicture, setSecondPicture] = useState()
    const [thirdPictureId, setThirdPictureId] = useState()
    const [thirdPicture, setThirdPicture] = useState()
    const formData = new FormData()
    useEffect(() => {
        dispatch(sessionActions.restoreUser())
        if (allSpotsOBJ?.SpotImages[1]) {
            setFirstPictureId(allSpotsOBJ.SpotImages[1].id)
            setFirstImage(firstImage)
        }
        if (allSpotsOBJ?.SpotImages[2]) {
            setSecondPictureId(allSpotsOBJ.SpotImages[2].id)
            setSecondPicture(allSpotsOBJ.SpotImages[2].url)
        }
        if (allSpotsOBJ?.SpotImages[3]) {
            setThirdPictureId(allSpotsOBJ.SpotImages[3].id)
            setThirdPicture(allSpotsOBJ.SpotImages[3].url)
        }
    }, [dispatch, allSpotsOBJ?.SpotImages[3]?.url, allSpotsOBJ?.SpotImages[3]?.id, allSpotsOBJ?.SpotImages[2]?.url, allSpotsOBJ?.SpotImages[2]?.id, allSpotsOBJ?.SpotImages[1]?.id, allSpotsOBJ?.SpotImages[1]?.url])
    useEffect(() => {
        (async () => {
            await dispatch(spotActions.getOne(id))
            await dispatch(reviewActions.getReviews(id))
        })();
    }, [dispatch, id, firstImage, firstPictureId, setFirstImage, setFirstPictureId])
    console.log(firstPictureId, "firstpic id")
    console.log(firstImage, "firstImage")
    const reviewArray = Object.values(reviews)
    for (let i = 0; i < reviewArray.length; i++) {
        if (user === null || reviewArray[i].userId === user.id) {
            hasReview = true
        }
    }
    const handleImageUpload = async (e, id) => {
        e.preventDefault()
        let correctFile
        console.log("HIT")
        let imageInput = document.querySelector("#file-input")
        console.log(imageInput.files)
        for (let i = 0; i < imageInput.files.length; i++) {
            let img = imageInput.files[i]
            if (img.type !== "image/jpeg" && img.type !== "image/png") {
                correctFile = false
            }
        }
        if (correctFile === false) return window.alert("Please use correct file extensions (jpg, jpeg, png)")
        let img = imageInput.files[0]
        formData.append('image', img)
        //delete the original picture
        if (allSpotsOBJ?.SpotImages[1] && id !== undefined) {
            const deletePicture = await csrfFetch(`/api/spot-images/${id}`, {
                method: "DELETE"
            })
            if (deletePicture.ok) {
                const picture = await csrfFetch("/api/spots/images/upload", {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    body: formData
                })
                const url = await picture.json()
                const newSpotImage = {
                    spotId,
                    url,
                    preview: false
                }
                const spotImage = await csrfFetch(`/api/spots/${spotId}/images`, {
                    method: "POST",
                    body: JSON.stringify(newSpotImage)
                })
                const image = await spotImage.json()
                setFirstPictureId(image.id)
                setFirstImage(url)
                await dispatch(spotActions.getOne(spotId))
            } else {
                console.log(await deletePicture.json())
            }
        } else {
            const picture = await csrfFetch("/api/spots/images/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: formData
            })
            const url = await picture.json()
            const newSpotImage = {
                spotId,
                url,
                preview: false
            }
            const spotImage = await csrfFetch(`/api/spots/${spotId}/images`, {
                method: "POST",
                body: JSON.stringify(newSpotImage)
            })
            const image = await spotImage.json()
            setFirstPictureId(image.id)
            setFirstImage(image.url)
            await dispatch(spotActions.getOne(spotId))
        }
    }
    const handleImageUploadTwo = async (e, id) => {
        e.preventDefault()
        let correctFile
        console.log("HIT")
        let imageInput = document.querySelector("#file-input-2")
        console.log(imageInput.files)
        for (let i = 0; i < imageInput.files.length; i++) {
            let img = imageInput.files[i]
            if (img.type !== "image/jpeg" && img.type !== "image/png") {
                correctFile = false
            }
        }
        if (correctFile === false) return window.alert("Please use correct file extensions (jpg, jpeg, png)")
        let img = imageInput.files[0]
        formData.append('image', img)
        //delete the original picture
        if (allSpotsOBJ?.SpotImages[2]) {
            const deletePicture = await csrfFetch(`/api/spot-images/${id}`, {
                method: "DELETE"
            })
            if (deletePicture.ok) {
                const picture = await csrfFetch("/api/spots/images/upload", {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    body: formData
                })
                const url = await picture.json()
                const newSpotImage = {
                    spotId,
                    url,
                    preview: false
                }
                const spotImage = await csrfFetch(`/api/spots/${spotId}/images`, {
                    method: "POST",
                    body: JSON.stringify(newSpotImage)
                })
                const image = await spotImage.json()
                setSecondPicture(image.url)
                setSecondPictureId(image.id)
                await dispatch(spotActions.getOne(spotId))
            } else {
                console.log(await deletePicture.json())
            }
        } else {
            const picture = await csrfFetch("/api/spots/images/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: formData
            })
            const url = await picture.json()
            const newSpotImage = {
                spotId,
                url,
                preview: false
            }
            const spotImage = await csrfFetch(`/api/spots/${spotId}/images`, {
                method: "POST",
                body: JSON.stringify(newSpotImage)
            })
            const image = await spotImage.json()
            setSecondPicture(image.url)
            setSecondPictureId(image.id)
            await dispatch(spotActions.getOne(spotId))
        }
    }
    const handleImageUploadThree = async (e, id) => {
        e.preventDefault()
        let correctFile
        console.log("HIT")
        let imageInput = document.querySelector("#file-input-3")
        console.log(imageInput.files)
        for (let i = 0; i < imageInput.files.length; i++) {
            let img = imageInput.files[i]
            if (img.type !== "image/jpeg" && img.type !== "image/png") {
                correctFile = false
            }
        }
        if (correctFile === false) return window.alert("Please use correct file extensions (jpg, jpeg, png)")
        let img = imageInput.files[0]
        formData.append('image', img)
        //delete the original picture
        if (allSpotsOBJ?.SpotImages[3]) {
            const deletePicture = await csrfFetch(`/api/spot-images/${id}`, {
                method: "DELETE"
            })
            if (deletePicture.ok) {
                const picture = await csrfFetch("/api/spots/images/upload", {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    body: formData
                })
                const url = await picture.json()
                const newSpotImage = {
                    spotId,
                    url,
                    preview: false
                }
                const spotImage = await csrfFetch(`/api/spots/${spotId}/images`, {
                    method: "POST",
                    body: JSON.stringify(newSpotImage)
                })
                const image = await spotImage.json()
                setThirdPicture(image.url)
                setThirdPictureId(image.id)
                await dispatch(spotActions.getOne(spotId))
            } else {
                console.log(await deletePicture.json())
            }
        } else {
            const picture = await csrfFetch("/api/spots/images/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: formData
            })
            const url = await picture.json()
            const newSpotImage = {
                spotId,
                url,
                preview: false
            }
            const spotImage = await csrfFetch(`/api/spots/${spotId}/images`, {
                method: "POST",
                body: JSON.stringify(newSpotImage)
            })
            const image = await spotImage.json()
            setThirdPicture(image.url)
            setThirdPictureId(image.id)
            await dispatch(spotActions.getOne(spotId))
        }
    }
    //! Filter SpotImages array for id and use that maybe?
    const handleBooking = async (e) => {
        e.preventDefault()
        const bookSpot = await csrfFetch(`/api/spots/${spotId}/bookings`, {
            method: "POST",
            body: JSON.stringify({
                startDate,
                endDate
            })
        })
        const response = await bookSpot.json()
        console.log(response)
    }
    if (!allSpotsOBJ) return null
    return (
        <>
            {allSpotsOBJ.SpotImages && (
                <div className='entire-one-spot-info'>
                    <div className='above-picture-info'>
                        <div className='one-spot-name'>
                            <h2>{allSpotsOBJ.name}</h2>
                        </div>
                        <div className='one-spot-stats'>
                            <ul className='spot-stats-ul'>
                                <li key={allSpotsOBJ.id} style={{ visibility: isNaN(allSpotsOBJ.avgStarRating) ? "hidden" : "visible" }}> <i class="fa-solid fa-star"></i> </li>
                                &nbsp;
                                <li key={allSpotsOBJ.id + 1}> {isNaN(allSpotsOBJ.avgStarRating) ? "No Reviews Yet!" : allSpotsOBJ.avgStarRating} </li>
                                &nbsp;
                                <span>·</span>
                                &nbsp;
                                <li key={allSpotsOBJ.id + 2}> {allSpotsOBJ.numReviews} Review(s) </li>
                                &nbsp;
                                <span>·</span>
                                &nbsp;
                                <li key={allSpotsOBJ.id + 3}><span><i class="fa-solid fa-medal"></i></span><span> </span>Superhost</li>
                                &nbsp;
                                <span>·</span>
                                &nbsp;
                                <li key={allSpotsOBJ.id + 4} style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{allSpotsOBJ.city}, {allSpotsOBJ.state}, {allSpotsOBJ.country}</li>
                            </ul>
                        </div>
                    </div>
                    <div id='img-div'>
                        <img id='one-allSpotsOBJ-image' src={allSpotsOBJ.SpotImages[0].url} alt="cave"></img>
                        <div className='first-image-upload-placeholder'>
                            {user && user?.id === allSpotsOBJ?.ownerId && (
                                <>
                                    <label htmlFor='file-input' onChange={(e) => handleImageUpload(e, firstPictureId)}>
                                        <div>
                                            {!firstPictureId && (
                                                <i class="fa-solid fa-circle-plus"></i>
                                            )}
                                            {firstPictureId && (
                                                <img style={{ height: "500px", width: "253px" }} src={firstImage}></img>
                                            )}
                                        </div>
                                    </label>
                                    <input onChange={(e) => firstPictureId !== undefined ? handleImageUpload(e, firstPictureId) : handleImageUpload(e)} style={{ visibility: "hidden" }} id='file-input' type='file' name='file' encType="multipart/form-data" />
                                </>
                            )}
                            {!user || user.id !== allSpotsOBJ.ownerId && (
                                <img src={firstPictureId ? firstImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"}></img>
                            )}
                        </div>
                        <div className='second-image-upload-placeholder'>
                            <div className='second-image-upload-container'>
                                {user && user.id === allSpotsOBJ.ownerId && (
                                    <>
                                        <label htmlFor='file-input-2' onChange={(e) => handleImageUploadTwo(e, allSpotsOBJ?.SpotImages[2].id)}>
                                            <div>
                                                {!secondPictureId && (
                                                    <i class="fa-solid fa-circle-plus"></i>
                                                )}
                                                {secondPictureId && (
                                                    <img style={{ height: "250px", width: "253px" }} src={secondPicture}></img>
                                                )}
                                            </div>
                                        </label>
                                        <input onChange={(e) => secondPictureId !== undefined ? handleImageUploadTwo(e, secondPictureId) : handleImageUploadTwo(e)} style={{ visibility: "hidden" }} id='file-input-2' type='file' name='file' encType="multipart/form-data" />
                                    </>
                                )}
                                {!user || user.id !== allSpotsOBJ.ownerId && (
                                    <img src={secondPictureId ? secondPicture : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"}></img>
                                )}
                            </div>
                            <div className='second-image-upload-container'>
                                {user && user.id === allSpotsOBJ.ownerId && (
                                    <>
                                        <label htmlFor='file-input-3' onChange={(e) => handleImageUploadThree(e, allSpotsOBJ?.SpotImages[3].id)}>
                                            <div>
                                                {!thirdPictureId && (
                                                    <i class="fa-solid fa-circle-plus"></i>
                                                )}
                                                {thirdPictureId && (
                                                    <img style={{ height: "250px", width: "253px" }} src={thirdPicture}></img>
                                                )}
                                            </div>
                                        </label>
                                        <input onChange={(e) => thirdPictureId !== undefined ? handleImageUploadThree(e, thirdPictureId) : handleImageUploadThree(e)} style={{ visibility: "hidden" }} id='file-input-3' type='file' name='file' encType="multipart/form-data" />
                                    </>
                                )}
                                {!user || user.id !== allSpotsOBJ.ownerId && (
                                    <img src={thirdPictureId ? thirdPicture : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"}></img>
                                )}
                            </div>
                        </div>
                    </div>
                    &nbsp;
                    <div id='under-picture-div'>
                        <div id='actual-text-div'>
                            <h2 style={{ width: "52%" }}>
                                {allSpotsOBJ.description}
                            </h2>
                            <h3>Hosted by {allSpotsOBJ.Owner.firstName}</h3>
                            {!user || user.id === allSpotsOBJ.ownerId && (
                                <div className='actual-button-container'>
                                    <div className='card-button-div-container' style={{ visibility: user === null || user.id !== allSpotsOBJ.ownerId ? "hidden" : "visible" }}>
                                        <div className='button-div-container'>
                                            <button onClick={() => history.push(`/spot/${id}/edit`)} className="edit-delete-button">Edit Spot</button>
                                            <button onClick={() => dispatch(spotActions.deleteSpot(allSpotsOBJ)).then(() => history.push('/'))} className="edit-delete-button">Delete Spot</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <br></br>
            <div style={{ borderBottom: '1px black solid', display: 'flex', marginLeft: '20%', marginRight: '40%' }}></div>
            <div>
                <div className='extra-info-div'>
                    <ul style={{ listStyle: 'none' }}>
                        <li key='closed-door'>
                            <i class="fa-solid fa-door-closed"></i> &nbsp;Self check-in
                        </li>
                        <br />
                        <li key='calender'>
                            <i class="fa-solid fa-calendar"></i> &nbsp; Free cancellation for 48 hours.
                        </li>
                        <br />
                        <li key='wifi'>
                            <i class="fa-solid fa-wifi"></i> &nbsp;Free WiFi
                        </li>
                    </ul>
                </div>
                <div style={{ borderBottom: '1px black solid', display: 'flex', marginLeft: '20%', marginRight: '40%' }}></div>
            </div>
            <div style={{ visibility: !user || user.id === allSpotsOBJ.ownerId ? "hidden" : "visible", display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid black", paddingBottom: "20px", borderRadius: "15px", backgroundColor: "#ffffff", width: "400px", height: "400px", marginBottom: "10px", marginLeft: "62%", bottom: "550px", position: "sticky", top: "110px", marginTop: "-220px" }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <h2 style={{ marginBottom: "10px" }}>${allSpotsOBJ.price} <span style={{ fontSize: "16px" }}>night</span></h2>
                    <div style={{ marginTop: "25px", fontWeight: "600", fontSize: "14px" }}>
                        <span key={allSpotsOBJ.id} style={{ visibility: isNaN(allSpotsOBJ.avgStarRating) ? "hidden" : "visible" }}> <i class="fa-solid fa-star"></i> </span>
                        <span style={{ marginTop: "5px" }} key={allSpotsOBJ.id + 1}> {isNaN(allSpotsOBJ.avgStarRating) ? "No Reviews Yet!" : allSpotsOBJ.avgStarRating} </span>
                        ·
                        &nbsp;
                        <span>{allSpotsOBJ.numReviews} reviews</span>
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <label style={{ border: "1px solid black", height: "55px", borderTopLeftRadius: "15px", borderBottomLeftRadius: "15px" }}>
                        <span style={{ fontWeight: "700", fontSize: "14px", marginLeft: "35px" }}>CHECK-IN</span>
                        <br />
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <input value={startDate} style={{ border: "none", marginRight: "10px" }} type="date" onChange={(e) => setStartDate(e.target.value)} />
                    </label>
                    <label style={{ borderTop: "1px solid black", borderRight: "1px solid black", borderBottom: "1px solid black", borderTopRightRadius: "15px", borderBottomRightRadius: "15px" }}>
                        <span style={{ fontWeight: "700", fontSize: "14px", marginLeft: "20px" }}>&nbsp;&nbsp;CHECKOUT</span>
                        <br />
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <input value={endDate} style={{ border: "none", marginRight: "10px" }} type="date" onChange={(e) => setEndDate(e.target.value)} />
                    </label>
                </div>
                <br />
                <br />
                {startDate && endDate && startDate > endDate && (
                    <>
                        <i style={{ color: "red" }} className="fa-solid fa-circle-xmark fa-3x"></i>
                        <h3 style={{ color: "red", marginLeft: "15px" }}>Please make sure your start date comes before your after date...</h3>
                    </>
                )}
                {startDate && endDate && startDate === endDate && (
                    <>
                        <i style={{ color: "red" }} className="fa-solid fa-circle-xmark fa-3x"></i>
                        <h3 style={{ color: "red", marginLeft: "15px" }}>Please make sure your start date and end date differ...</h3>
                    </>
                )}
                {startDate && endDate && startDate < endDate && (
                    <div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <span style={{ textDecoration: "underline" }}>
                                ${allSpotsOBJ.price} x {Math.floor((Date.parse(endDate) - Date.parse(startDate)) / 86400000)} nights:
                            </span>
                            <span>${allSpotsOBJ.price * Math.floor((Date.parse(endDate) - Date.parse(startDate)) / 86400000)}</span>
                        </div>
                        <br />
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <span style={{ textDecoration: "underline" }}>Cleaning fee:</span>
                            <span>$50</span>
                        </div>
                        <br />
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "350px" }}>
                            <span style={{ textDecoration: "underline" }}>Service fee:</span>
                            <span>$50</span>
                        </div>
                        <br />
                        <div style={{ borderBottom: "1px solid black" }} />
                        <br />
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <span style={{ fontWeight: "700" }}>Total before taxes</span>
                            <span style={{ fontWeight: "700" }}>${allSpotsOBJ.price * Math.floor((Date.parse(endDate) - Date.parse(startDate)) / 86400000) + 100}</span>
                        </div>
                        <br />
                        <br />
                        <br />
                        <button onClick={handleBooking} style={{ backgroundColor: "#d60565", color: "white", borderRadius: "5px", cursor: "pointer", width: "100%", height: "50px", fontWeight: "700", fontSize: "16px", border: "none" }}>Reserve</button>
                    </div>
                )}
            </div>
            <div style={{ marginTop: "-200px" }}>
                <h1 style={{ marginLeft: "21%" }}>Reviews:</h1>
                {reviewArray.length <= 0 && (
                    <>
                        <div style={{ marginLeft: '46.5%' }}>No Reviews Yet!</div>
                        <div style={{ visibility: user === null || user.id === allSpotsOBJ.ownerId ? 'hidden' : 'visible', marginLeft: '38%' }}>
                            Why don't you get started and create a review for this spot!
                        </div>
                    </>
                )}
                <div className='center-review-box'>
                    {reviewArray.length >= 1 && (
                        <div style={{ border: '1px black solid', width: "40%", marginLeft: "-350px" }} className='review-container-div'>
                            {reviewArray.map((review) =>
                                <div >
                                    <div className='single-review-container'>
                                        <div>
                                            <i class="fa-solid fa-circle-user"></i> {review.User?.firstName} {review.User?.lastName[0]} says:
                                        </div>
                                        &nbsp;
                                        <div>
                                            &nbsp; &nbsp; &nbsp; {review.review}
                                        </div>
                                        &nbsp;
                                        <div>
                                            {[...Array(review.stars)].map((_, i) =>
                                                <i key={i} class="fa-solid fa-star"></i>
                                            )}
                                            {/* <i class="fa-solid fa-star"></i> &nbsp;{review.stars} */}
                                        </div>
                                        <div>
                                            <button onClick={async (e) => {
                                                await dispatch(reviewActions.deleteReview(review))
                                                await dispatch(spotActions.getOne(id))
                                                await dispatch(reviewActions.getReviews(id))
                                            }} style={{ visibility: user === null || user.id !== review.userId ? 'hidden' : 'visible' }} className='add-review-button'>Delete Review</button>
                                        </div>
                                    </div>
                                    <div style={{ borderBottom: '1px solid black' }}></div>
                                </div>
                            )}
                        </div>

                    )}
                    {reviewArray.length <= 0 && (
                        <>
                            <div>
                                <div className='review-button-div'>
                                    <button style={{ visibility: user === null || user.id === allSpotsOBJ.ownerId ? 'hidden' : 'visible' }} className='add-review-button' onClick={() => history.push(`/spots/${stringId}/review/create`)}>Create a Review</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <br />
                <br />
                {reviewArray.length >= 1 && (
                    <div className='center-review-button'>
                        <button style={{ cursor: "pointer", visibility: (user === null || user.id === allSpotsOBJ.ownerId) || hasReview === true ? 'hidden' : 'visible' }} className='add-review-button' onClick={() => history.push(`/spots/${stringId}/review/create`)}>Create A Review</button>
                    </div>
                )}
            </div>
        </>
    )
}

export default SpotById
