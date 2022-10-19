import React, { useState, useEffect } from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import Geocode from 'react-geocode'
import MapContainer from '../Maps';
import { getKey } from '../../store/maps';

function CreateSpot() {
    const key = useSelector(state => state.maps.key)
    const dispatch = useDispatch();
    useEffect(() => {
        if (!key) {
            dispatch(getKey());
        }
    }, [dispatch, key]);
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [errors, setErrors] = useState([])
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
        setErrors(errors)
        if (errors.length) return
        // return dispatch(spotActions.createSpot({address, city, state, country,}))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button type='submit'>SUB</button>
            </form>
        </div>
    )
}

export default CreateSpot
