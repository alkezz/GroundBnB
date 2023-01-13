import React, { useState, useEffect, Component } from 'react';
import * as spotActions from '../../store/spots';
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import "./EditSpotPage.css"

function EditSpot() {
    const dispatch = useDispatch()
    const history = useHistory()
    const id = Number(useParams().spotId)
    const spot = useSelector(state => state.spots[id])
    //! DONT NEED VALUES TO PERSIST AFTER RELOAD, JUST HAVE IT SHOW UP ON FIRST RENDER AND ITS FINE!\\
    useEffect(() => {
        dispatch(spotActions.getOne(id))
    }, [dispatch, id])
    // const { url, preview } = Object.values(spot)[0].SpotImages[0]
    const [address, setAddress] = useState(spot === undefined ? "" : spot.address)
    const [city, setCity] = useState(spot === undefined ? "" : spot.city)
    const [state, setState] = useState(spot === undefined ? "" : spot.state)
    const [country, setCountry] = useState(spot === undefined ? "" : spot.country)
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [name, setName] = useState(spot === undefined ? "" : spot.name)
    const [description, setDescription] = useState(spot === undefined ? "" : spot.description)
    const [price, setPrice] = useState(spot === undefined ? "" : spot.price)
    const [url, setUrl] = useState("")
    let [preview, setPreview] = useState(true)
    const [errors, setErrors] = useState([])
    const formData = new FormData()
    const formData2 = new FormData()
    const formData3 = new FormData()
    const formData4 = new FormData()
    let urlArray = []
    if (!spot) return null
    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        const errors = []
        if (address.length < 10 || address.length > 30) errors.push("Address must be between 10 and 30 characters")
        if (city.length <= 0 || city.length > 30) errors.push("City must be 30 characters or less")
        if (state.length <= 0 || state.length > 30) errors.push("State must be 30 characters or less")
        if (country.length <= 0 || country.length > 30) errors.push("Country must be 30 characters or less")
        if (name.length <= 0 || name.length > 30) errors.push("Name of location must be 30 characters or less")
        if (description.length <= 0 || description.length > 50) errors.push("Description should be 50 characters or less!")
        if (price <= 1) errors.push("Please enter a valid price per night, can not be below $1!")
        setErrors(errors)
        if (errors.length) return
        if (urlArray.length !== 4) return window.alert("You must upload 4 pictures!")
        const newSpot = {
            id: id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }
        dispatch(spotActions.editSpot(newSpot, urlArray)).then((data) => {
            history.push(`/spots/${data.id}`)
        })
    }

    const handleImageUpload = async (e, id) => {
        e.preventDefault()
        let correctFile
        console.log("HIT")
        let imageInput = document.querySelector("#file-input")
        // console.log(imageInput.files)
        for (let i = 0; i < imageInput.files.length; i++) {
            let img = imageInput.files[i]
            console.log("IMG", img)
            if (img.type !== "image/jpeg" && img.type !== "image/png") {
                correctFile = false
            }
        }
        if (correctFile === false) return window.alert("Please use correct file extensions (jpg, jpeg, png)")
        let img = imageInput.files[0]
        formData.append('image', img)
        const picture = await csrfFetch("/api/spots/images/upload", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData
        })
        const url = await picture.json()
        urlArray.push(url)
        console.log("URLARRAY", urlArray)
    }
    const twoHandleImageUpload = async (e, id) => {
        e.preventDefault()
        let correctFile
        console.log("HIT")
        let imageInput = document.querySelector("#file-input-2")
        // console.log(imageInput.files)
        for (let i = 0; i < imageInput.files.length; i++) {
            let img = imageInput.files[i]
            console.log("IMG", img)
            if (img.type !== "image/jpeg" && img.type !== "image/png") {
                correctFile = false
            }
        }
        if (correctFile === false) return window.alert("Please use correct file extensions (jpg, jpeg, png)")
        let img = imageInput.files[0]
        formData2.append('image', img)
        const picture = await csrfFetch("/api/spots/images/upload", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData2
        })
        const url = await picture.json()
        urlArray.push(url)
        console.log("URLARRAY", urlArray)
    }
    const threeHandleImageUpload = async (e, id) => {
        e.preventDefault()
        let correctFile
        console.log("HIT")
        let imageInput = document.querySelector("#file-input-3")
        // console.log(imageInput.files)
        for (let i = 0; i < imageInput.files.length; i++) {
            let img = imageInput.files[i]
            console.log("IMG", img)
            if (img.type !== "image/jpeg" && img.type !== "image/png") {
                correctFile = false
            }
        }
        if (correctFile === false) return window.alert("Please use correct file extensions (jpg, jpeg, png)")
        let img = imageInput.files[0]
        formData3.append('image', img)
        const picture = await csrfFetch("/api/spots/images/upload", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData3
        })
        const url = await picture.json()
        urlArray.push(url)
        console.log("URLARRAY", urlArray)
    }
    const fourHandleImageUpload = async (e, id) => {
        e.preventDefault()
        let correctFile
        console.log("HIT")
        let imageInput = document.querySelector("#file-input-4")
        // console.log(imageInput.files)
        for (let i = 0; i < imageInput.files.length; i++) {
            let img = imageInput.files[i]
            console.log("IMG", img)
            if (img.type !== "image/jpeg" && img.type !== "image/png") {
                correctFile = false
            }
        }
        if (correctFile === false) return window.alert("Please use correct file extensions (jpg, jpeg, png)")
        let img = imageInput.files[0]
        formData4.append('image', img)
        const picture = await csrfFetch("/api/spots/images/upload", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData4
        })
        const url = await picture.json()
        urlArray.push(url)
        console.log("URLARRAY", urlArray)
    }
    return (
        <>
            {spot?.id && (
                <div className='center-edit-form-div'>
                    <form onSubmit={handleSubmit}>
                        <h1 id='finish-signup'>Edit your spot!</h1>
                        <label>
                            <div>
                                <input
                                    type="text"
                                    placeholder='Address'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className={errors.includes("Address must be between 10 and 30 characters") ? 'edit-spot-error-input' : "user-signup-input"}
                                />
                            </div>
                            <div>
                                {errors.map((error, idx) =>
                                    error === "Address must be between 10 and 30 characters" ? <li key={idx} id='edit-spot-errors'>{error}</li> : null
                                )}
                            </div>
                        </label>
                        <label>
                            <div>
                                <input
                                    type="text"
                                    value={city}
                                    placeholder='City'
                                    onChange={(e) => setCity(e.target.value)}
                                    className={errors.includes("City must be 30 characters or less") ? 'edit-spot-error-input' : "user-signup-input"}
                                />
                            </div>
                            <div>
                                {errors.map((error, idx) =>
                                    error === "City must be 30 characters or less" ? <li key={idx} id='edit-spot-errors'>{error}</li> : null
                                )}
                            </div>
                        </label>
                        <div>
                            <label>
                                <div>
                                    <input
                                        type="text"
                                        value={state}
                                        placeholder='State'
                                        onChange={(e) => setState(e.target.value)}
                                        className={errors.includes("State must be 30 characters or less") ? 'edit-spot-error-input' : "user-signup-input"}
                                    />
                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "State must be 30 characters or less" ? <li key={idx} id='edit-spot-errors'>{error}</li> : null
                                    )}
                                </div>
                            </label>
                        </div>
                        <div>
                            <label>
                                <div>
                                    <input
                                        type="text"
                                        value={country}
                                        placeholder='Country'
                                        onChange={(e) => setCountry(e.target.value)}
                                        className={errors.includes("Country must be 30 characters or less") ? 'edit-spot-error-input' : "user-signup-input"}
                                    />
                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "Country must be 30 characters or less" ? <li key={idx} id='edit-spot-errors'>{error}</li> : null
                                    )}
                                </div>
                            </label>
                        </div>
                        <div>
                            <label>
                                <div>
                                    <input
                                        type="text"
                                        value={price}
                                        placeholder='Price per night'
                                        onChange={(e) => setPrice(e.target.value)}
                                        className={errors.includes('Please enter a valid price per night, can not be below $1!') ? 'edit-spot-error-input' : "user-signup-input"}
                                    />
                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "Please enter a valid price per night, can not be below $1!" ? <li key={idx} id='edit-spot-errors'>{error}</li> : null
                                    )}
                                </div>
                            </label>
                        </div>
                        <br />
                        <br />
                        <div>
                            <label>
                                <div>
                                    <input
                                        type="text"
                                        value={name}
                                        placeholder='Name of place'
                                        onChange={(e) => setName(e.target.value)}
                                        className={errors.includes("Name of location must be 30 characters or less") ? 'edit-spot-error-input' : "user-signup-input"}
                                    />
                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "Name of location must be 30 characters or less" ? <li key={idx} id='edit-spot-errors'>{error}</li> : null
                                    )}
                                </div>
                            </label>
                        </div>
                        <div>
                            <label>
                                <div>
                                    <textarea
                                        type="textarea"
                                        value={description}
                                        placeholder='Describe your place'
                                        onChange={(e) => setDescription(e.target.value)}
                                        className={errors.includes("Description should be 50 characters or less!") ? 'edit-spot-error-input' : "user-signup-input"}
                                    />
                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "Description should be 50 characters or less!" ? <li key={idx} id='edit-spot-errors'>{error}</li> : null
                                    )}
                                </div>
                            </label>
                        </div>
                        <br />
                        <div>
                            <span style={{ display: "flex", justifyContent: "center", width: "100%" }}>Upload your spot pictures</span>
                            <span style={{ display: "flex", justifyContent: "center", width: "100%", fontSize: "12px" }}>Please make sure to upload 4 pictures</span>
                            <span style={{ display: "flex", justifyContent: "center", width: "100%", fontSize: "12px" }}>Valid file extensions: JPG/JPEG/PNG</span>
                            <br />
                            <label>
                                <div>
                                    <i className="fa-solid fa-paperclip"></i>
                                    <input onChange={handleImageUpload} type="file" name="file" id='file-input' encType="multipart/form-data" />
                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "Url must start with https" ? <li key={idx} id='edit-spot-errors'>{error}</li> : null
                                    )}
                                </div>
                            </label>
                            <br />
                            <label>
                                <div>
                                    <i className="fa-solid fa-paperclip"></i>
                                    <input onChange={twoHandleImageUpload} type="file" name="file" id='file-input-2' encType="multipart/form-data" />
                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "Url must start with https" ? <li key={idx} id='edit-spot-errors'>{error}</li> : null
                                    )}
                                </div>
                            </label>
                            <br />
                            <label>
                                <div>
                                    <i className="fa-solid fa-paperclip"></i>
                                    <input onChange={threeHandleImageUpload} type="file" name="file" id='file-input-3' encType="multipart/form-data" />
                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "Url must start with https" ? <li key={idx} id='edit-spot-errors'>{error}</li> : null
                                    )}
                                </div>
                            </label>
                            <br />
                            <label>
                                <div>
                                    <i className="fa-solid fa-paperclip"></i>
                                    <input onChange={fourHandleImageUpload} type="file" name="file" id='file-input-4' encType="multipart/form-data" />
                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "Url must start with https" ? <li key={idx} id='edit-spot-errors'>{error}</li> : null
                                    )}
                                </div>
                            </label>
                        </div>
                        <br></br>
                        <button type="submit" className='spot-submit'>
                            Submit Spot
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}

export default EditSpot
