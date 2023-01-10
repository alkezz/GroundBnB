import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import "./ProfilePage.css"
import { useJsApiLoader } from "@react-google-maps/api";

const ProfilePage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [spots, setSpots] = useState([])
    const [bookings, setBookings] = useState([])
    const [showSpots, setShowSpots] = useState(true)
    const [showBookings, setShowBookings] = useState(false)
    const [update, setUpdate] = useState(true)
    const ownerId = useParams().userId
    const userId = useParams().userId
    const sessionUser = useSelector((state) => state.session.user)
    console.log("SESSION", sessionUser.id)
    console.log(userId)
    console.log(sessionUser.id === Number(userId))
    useEffect(() => {
        (async () => {
            const userSpots = await dispatch(spotActions.getAllSpots())
            await setSpots(userSpots)
            const userBookings = await csrfFetch("/api/bookings/current")
            const userBookingsData = await userBookings.json()
            await setBookings(userBookingsData.Bookings)
        })();
    }, [dispatch, setBookings, setSpots, update])
    let profileUserSpots = []
    console.log("BOOKINGS", bookings)
    spots.forEach((spot) => {
        if (spot.ownerId === Number(ownerId)) {
            profileUserSpots.push(spot)
        }
    })
    console.log("FILTER", profileUserSpots)
    const handleDeleteBooking = async (e, bookingId) => {
        e.preventDefault()
        const deleteBooking = await csrfFetch(`/api/bookings/${bookingId}`, {
            method: "DELETE",
            body: JSON.stringify({
                bookingId
            })
        })
        console.log(deleteBooking.status, "STATUS")
        if (deleteBooking.status === 403) {
            window.alert("ioejfadsk")
        }
        if (deleteBooking.ok) {
            setUpdate(true)
            const data = await deleteBooking.json()
            console.log("DATA", data)
        }

    }
    const handleDeleteSpot = async (e, spot) => {
        e.preventDefault()
        setUpdate(true)
        await dispatch(spotActions.deleteSpot(spot))
    }
    return (
        <div className="profile-container">
            <div className="user-card-left">
                <div className="user-profile-pic" style={{ display: "flex", justifyContent: "center" }}>
                    <i style={{ fontSize: "75px" }} className="fa-solid fa-circle-user fa-4x"></i>
                </div>
                <div className="user-info">
                    <br />
                    <div>
                        <span>Spots:</span>
                        &nbsp;
                        <span>{profileUserSpots.length}</span>
                    </div>
                    <br />
                    <div>
                        <span>Reviews:</span>
                        &nbsp;
                        <span>1</span>
                    </div>
                </div>
                <br />
                <div className="my-external-links" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                    <Link target="_blank" to={{ pathname: "https://www.github.com/alkezz" }}><i style={{ color: "black" }} class="fa-brands fa-github fa-2x"></i></Link>
                    <Link target="_blank" to={{ pathname: "https://www.linkedin.com/in/ali-ezzeddine-17b2b6248/" }}><i style={{ color: "blue" }} class="fa-brands fa-linkedin fa-2x"></i></Link>
                    <Link target="_blank" to={{ pathname: "https://www.ali-ezzeddine.com/" }}><i style={{ color: "yellow" }} class="fa-solid fa-star fa-2x"></i></Link>
                </div>
            </div>
            {/* style={{ visibility: Number(sessionUser.id) === Number(userId) ? "visible" : "hidden" }} */}
            <div className="spots-bookings-container">
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <button onClick={(e) => { setShowSpots(true); setShowBookings(!showBookings) }} className="profile-buttons">Spots</button>
                    <button onClick={(e) => { setShowSpots(!showSpots); setShowBookings(true) }} style={{ visibility: Number(sessionUser.id) === Number(userId) ? "visible" : "hidden" }} className="profile-buttons">Bookings</button>
                </div>
                <br />
                {showSpots && (
                    <div className="user-spots">
                        {profileUserSpots.map((spot) => {
                            return <div style={{ marginLeft: "30px" }}>
                                <img onClick={(e) => history.push(`/spots/${spot.id}`)} style={{ width: "300px", height: "300px", cursor: "pointer" }} src={spot.previewImage} />
                                <br />
                                <span style={{ fontWeight: "700" }}>{spot.name}</span>
                                <br />
                                <button style={{ visibility: Number(sessionUser.id) === Number(userId) ? "visible" : "hidden" }} onClick={(e) => { handleDeleteSpot(e, spot); setUpdate(!update) }} className="delete-buttons">Delete Spot</button>
                                <button style={{ visibility: Number(sessionUser.id) === Number(userId) ? "visible" : "hidden" }} onClick={() => history.push(`/spot/${spot.id}/edit`)} className="delete-buttons">Edit Spot</button>
                            </div>
                        })}
                    </div>
                )}
                {showBookings && (
                    <div className="user-bookings">
                        {bookings.map((booking) => {
                            return <div style={{ marginLeft: "30px" }}>
                                <img onClick={(e) => history.push(`/spots/${booking.Spot.id}`)} style={{ width: "300px", height: "300px", cursor: "pointer" }} src={booking.Spot.previewImage} />
                                <br />
                                <span style={{ fontWeight: "700" }}>{booking.Spot.name}</span>
                                <br />
                                <button onClick={(e) => { handleDeleteBooking(e, booking.id); setUpdate(!update) }} className="delete-buttons">Delete booking</button>
                            </div>
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfilePage
