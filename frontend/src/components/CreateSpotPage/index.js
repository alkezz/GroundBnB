import React, { useState, useEffect, Component } from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getKey } from '../../store/maps';
import { csrfFetch } from '../../store/csrf';
import Geocode from "react-geocode"
import Fade from '@mui/material/Fade';
import { Grow } from '@mui/material';
import Slide from '@mui/material/Slide';
import './CreateSpotForm.css'
let key
function CreateSpot() {
    const history = useHistory()
    const dispatch = useDispatch();
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [url, setUrl] = useState("")
    let [preview, setPreview] = useState(true)
    const [errors, setErrors] = useState([])
    const formData = new FormData()
    const formData2 = new FormData()
    const formData3 = new FormData()
    const formData4 = new FormData()
    key = useSelector((state) => state.maps.key);
    Geocode.setLanguage("en")
    Geocode.setApiKey(key)
    let urlArray = []
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const errors = []
        if (address.length < 10 || address.length > 30) errors.push("Address must be between 10 and 30 characters")
        if (city.length <= 0 || city.length > 15) errors.push("City must be 15 characters or less")
        if (state.length <= 0 || state.length > 15) errors.push("State must be 15 characters or less")
        if (country.length <= 0 || country.length > 30) errors.push("Country must be 30 characters or less")
        if (name.length <= 0 || name.length >= 30) errors.push("Name of location must be 30 characters or less")
        if (description.length <= 0 || description.length > 60) errors.push("Description should be 60 characters or less!")
        if (price <= 1) errors.push("Please enter a valid price per night, can not be below $1!")
        setErrors(errors)
        preview === 'true' ? preview = true : preview = false;
        if (errors.length) return
        const latAndLng = await Geocode.fromAddress(`${address}, ${city} ${state}`)
        setLat(latAndLng.results[0].geometry.location.lat)
        setLng(latAndLng.results[0].geometry.location.lng)
        const spot = {
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
        dispatch(spotActions.createSpot(spot, urlArray)).then((data) => {
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
    }
    const fourHandleImageUpload = async (e, id) => {
        e.preventDefault()
        let correctFile
        let imageInput = document.querySelector("#file-input-4")
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
    }
    return (
        <Grow in={true}>
            <div className='center-create-spot-form-div'>
                <form onSubmit={handleSubmit}>
                    <h1 id='finish-signup'>Create a spot</h1>
                    <label>
                        <div>
                            <input
                                type="text"
                                placeholder='Address'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className={errors.includes('Address must be between 10 and 15 characters') ? 'error' : "user-signup-input"}
                            />
                        </div>
                        <div>
                            {errors.map((error, idx) =>
                                error === "Address must be between 10 and 15 characters" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                className={errors.includes('City must be 15 characters or less') ? 'error' : "user-signup-input"}
                            />
                        </div>
                        <div>
                            {errors.map((error, idx) =>
                                error === "City must be 15 characters or less" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                    className={errors.includes("State must be 15 characters or less") ? 'error' : "user-signup-input"}
                                />
                            </div>
                            <div>
                                {errors.map((error, idx) =>
                                    error === "State must be 15 characters or less" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                    className={errors.includes('Country must be 10 characters or less') ? 'error' : "user-signup-input"}
                                />
                            </div>
                            <div>
                                {errors.map((error, idx) =>
                                    error === "Country must be 10 characters or less" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                    className={errors.includes('Please enter a valid price per night, can not be below $1!') ? 'error' : "user-signup-input"}
                                />
                            </div>
                            <div>
                                {errors.map((error, idx) =>
                                    error === "Please enter a valid price per night, can not be below $1!" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                    className={errors.includes('Name of location must be 10 characters or less') ? 'error' : "user-signup-input"}
                                />
                            </div>
                            <div>
                                {errors.map((error, idx) =>
                                    error === "Name of location must be 10 characters or less" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                    className={errors.includes('Description should be 20 characters or less!') ? 'error' : "user-signup-input"}
                                />
                            </div>
                            <div>
                                {errors.map((error, idx) =>
                                    error === "Description should be 20 characters or less!" ? <li key={idx} id='error-list'>{error}</li> : null
                                )}
                            </div>
                        </label>
                    </div>
                    <div>
                        <span>Upload your spot pictures</span>
                        <label>
                            <div>
                                <i className="fa-solid fa-paperclip"></i>
                                <input onChange={handleImageUpload} type="file" name="file" id='file-input' encType="multipart/form-data" />
                            </div>
                            <div>
                                {errors.map((error, idx) =>
                                    error === "Url must start with https" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                    error === "Url must start with https" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                    error === "Url must start with https" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                    error === "Url must start with https" ? <li key={idx} id='error-list'>{error}</li> : null
                                )}
                            </div>
                        </label>
                    </div>
                    <br></br>
                    <button type="submit" className='new-spot-submit'>
                        Submit Spot
                    </button>
                </form>
            </div>
        </Grow>
    )
}

export default CreateSpot
