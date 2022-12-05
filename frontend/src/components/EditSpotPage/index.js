import React, { useState, useEffect, Component } from 'react';
import * as spotActions from '../../store/spots';
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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
        if (!url.includes('https')) errors.push('Url must start with https')
        setErrors(errors)
        preview === 'true' ? preview = true : preview = false;
        if (errors.length) return
        if (preview === true) {
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
            const newImage = {
                url,
                preview
            }
            dispatch(spotActions.editSpot(newSpot, newImage)).then((data) => {
                history.push(`/spots/${data.id}`)
            })
        }
        else {
            const newSpot = {
                id,
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
            const image = {
                url: "https://images.pexels.com/photos/163872/italy-cala-gonone-air-sky-163872.jpeg",
                preview
            }
            dispatch(spotActions.editSpot(newSpot, image)).then((data) => {
                history.push(`/spots/${data.id}`)
            })
        }
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
                                    className={errors.includes("Address must be between 10 and 30 characters") ? 'error' : "user-signup-input"}
                                />
                            </div>
                            <div>
                                {errors.map((error, idx) =>
                                    error === "Address must be between 10 and 30 characters" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                    className={errors.includes("City must be 30 characters or less") ? 'error' : "user-signup-input"}
                                />
                            </div>
                            <div>
                                {errors.map((error, idx) =>
                                    error === "City must be 30 characters or less" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                        className={errors.includes("State must be 30 characters or less") ? 'error' : "user-signup-input"}
                                    />
                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "State must be 30 characters or less" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                        className={errors.includes("Country must be 30 characters or less") ? 'error' : "user-signup-input"}
                                    />
                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "Country must be 30 characters or less" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                        className={errors.includes("Name of location must be 30 characters or less") ? 'error' : "user-signup-input"}
                                    />
                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "Name of location must be 30 characters or less" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                        className={errors.includes("Description should be 50 characters or less!") ? 'error' : "user-signup-input"}
                                    />
                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "Description should be 50 characters or less!" ? <li key={idx} id='error-list'>{error}</li> : null
                                    )}
                                </div>
                            </label>
                        </div>
                        <div>
                            <label>
                                <div>
                                    <input
                                        type='text'
                                        value={url}
                                        placeholder="Upload a picture of your place!"
                                        onChange={(e) => setUrl(e.target.value)}
                                        className={errors.includes('Url must start with https') ? 'error' : "user-signup-input"}
                                    />

                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "Url must start with https" ? <li key={idx} id='error-list'>{error}</li> : null
                                    )}
                                </div>
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    value='true'
                                    name="preview"
                                    onChange={(e) => setPreview(e.target.value)}
                                />
                                Show Image Preview
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type='radio'
                                    value='false'
                                    name="preview"
                                    onChange={(e) => setPreview(e.target.value)}
                                />
                                Don't Show Image Preview
                            </label>
                        </div>
                        <div className='image-preview-warning'>
                            If you decide to select "Don't show preview image" a stock image will be provided for you
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
