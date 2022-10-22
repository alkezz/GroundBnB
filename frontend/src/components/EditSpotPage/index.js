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
    // console.log("rge", useSelector(state => state.spots[id]))
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
        if (address.length <= 0) errors.push("A valid address is required!")
        if (city.length <= 0) errors.push("A valid city is required!")
        if (state.length <= 0) errors.push("State or Municipality")
        if (country.length <= 0) errors.push("Valid country is required!")
        if (name.length <= 0) errors.push("Name of location required! Be creative :)")
        if (description.length <= 0) errors.push("Please add a description for your location!")
        if (price <= 1) errors.push("Please enter a valid price per night, can not be below $1!")
        if (!url.includes('https')) errors.push('Please enter a valid url!')
        setErrors(errors)
        console.log(preview)
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
                                    className={errors.includes('A valid address is required!') ? 'error' : "user-signup-input"}
                                />
                            </div>
                            <div>
                                {errors.map((error, idx) =>
                                    error === "A valid address is required!" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                    className={errors.includes('A valid city is required!') ? 'error' : "user-signup-input"}
                                />
                            </div>
                            <div>
                                {errors.map((error, idx) =>
                                    error === "A valid city is required!" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                        className={errors.includes("State or Municipality") ? 'error' : "user-signup-input"}
                                    />
                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "State or Municipality" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                        className={errors.includes('Valid country is required!') ? 'error' : "user-signup-input"}
                                    />
                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "Valid country is required!" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                        className={errors.includes('Name of location required! Be creative :)') ? 'error' : "user-signup-input"}
                                    />
                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "Name of location required! Be creative :)" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                        className={errors.includes('Please add a description for your location!') ? 'error' : "user-signup-input"}
                                    />
                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "Please add a description for your location!" ? <li key={idx} id='error-list'>{error}</li> : null
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
                                        className={errors.includes('Please enter a valid url!') ? 'error' : "user-signup-input"}
                                    />

                                </div>
                                <div>
                                    {errors.map((error, idx) =>
                                        error === "Please enter a valid url!" ? <li key={idx} id='error-list'>{error}</li> : null
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
