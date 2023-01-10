import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';

const SessionUserProfile = () => {
    const dispatch = useDispatch()
    const [spots, setSpots] = useState([])
    const [bookings, setBookings] = useState([])
    useEffect(() => {
        (async () => {
            const userSpots = await dispatch(spotActions.getAllSpots())
            await setSpots(userSpots)
        })();
    }, [dispatch])
    console.log(spots, "USERSPOTS")
    return (
        <h1>YO</h1>
    )
}

export default SessionUserProfile
