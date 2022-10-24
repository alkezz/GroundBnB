import React, { useState, useEffect, Component } from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getKey } from '../../store/maps';
import './CreateSpotForm.css'

function CreateSpot() {
    const history = useHistory()
    const key = useSelector(state => state.maps.key)
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
    useEffect(() => {
        if (!key) {
            dispatch(getKey());
        }
        // const errors = []
        // if (address.length < 10 || address.length > 15) errors.push("Address must be between 10 and 15 characters")
        // if (city.length <= 0 || city.length > 15) errors.push("City must be 15 characters or less")
        // if (state.length <= 0 || state.length > 15) errors.push("State must be 15 characters or less")
        // if (country.length <= 0 || country.length > 10) errors.push("Country must be 10 characters or less")
        // if (name.length <= 0 || name.length > 10) errors.push("Name of location must be 10 characters or less")
        // if (description.length <= 0 || description.length > 20) errors.push("Description should be 20 characters or less!")
        // if (price <= 1) errors.push("Please enter a valid price per night, can not be below $1!")
        // if (!url.includes('https')) errors.push('Url must start with https')
        // setErrors(errors)
    }, [dispatch, key]);
    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        const errors = []
        if (address.length < 10 || address.length > 15) errors.push("Address must be between 10 and 15 characters")
        if (city.length <= 0 || city.length > 15) errors.push("City must be 15 characters or less")
        if (state.length <= 0 || state.length > 15) errors.push("State must be 15 characters or less")
        if (country.length <= 0 || country.length > 10) errors.push("Country must be 10 characters or less")
        if (name.length <= 0 || name.length > 10) errors.push("Name of location must be 10 characters or less")
        if (description.length <= 0 || description.length > 20) errors.push("Description should be 20 characters or less!")
        if (price <= 1) errors.push("Please enter a valid price per night, can not be below $1!")
        if (!url.includes('https')) errors.push('Url must start with https')
        setErrors(errors)
        preview === 'true' ? preview = true : preview = false;
        if (errors.length) return
        if (preview === true) {
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
            const image = {
                url,
                preview
            }
            dispatch(spotActions.createSpot(spot, image)).then((data) => {
                history.push(`/spots/${data.id}`)
            })
        } else {
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
            const image = {
                url: "https://images.pexels.com/photos/163872/italy-cala-gonone-air-sky-163872.jpeg",
                preview
            }
            dispatch(spotActions.createSpot(spot, image)).then((data) => {
                history.push(`/spots/${data.id}`)
            })
        }
    }

    return (
        <div className='center-create-spot-form-div'>
            <form onSubmit={handleSubmit}>
                <h1 id='finish-signup'>Create your own spot!</h1>
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
                            value={true}
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
                            value={false}
                            name="preview"
                            onChange={(e) => setPreview(e.target.value)}
                        />
                        Don't Show Image Preview
                    </label>
                </div>
                <div className='image-preview-warning'>
                    If you decide to select "Don't show preview image" <br /> a stock image will be provided for you
                </div>
                <br></br>
                <button type="submit" className='new-spot-submit'>
                    Submit Spot
                </button>
            </form>
        </div>
    )
}

export default CreateSpot
