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
    const [reviews, setReviews] = useState([])
    const [pastBookings, setPastBookings] = useState([])
    const [showSpots, setShowSpots] = useState(true)
    const [showBookings, setShowBookings] = useState(false)
    const [update, setUpdate] = useState(true)
    const [style, setStyle] = useState({ display: "none" })
    const ownerId = useParams().userId
    const userId = useParams().userId
    const sessionUser = useSelector((state) => state.session.user)
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
    spots.forEach((spot) => {
        if (spot.ownerId === Number(ownerId)) {
            profileUserSpots.push(spot)
        }
    })
    const pastBookingsArray = []
    const currentBookingsArray = []
    const futureBookingsArray = []
    const date = new Date()
    for (let i = 0; i < bookings?.length; i++) {
        let currBooking = bookings[i]
        if (currBooking?.endDate <= date.toISOString().substring(0, 10)) {
            pastBookingsArray.push(currBooking)
        } else if (currBooking?.startDate < date.toISOString().substring(0, 10) &&
            currBooking?.endDate > date.toISOString().substring(0, 10)) {
            currentBookingsArray.push(currBooking)
        } else if (currBooking?.startDate > date.toISOString().substring(0, 10) &&
            currBooking?.endDate > date.toISOString().substring(0, 10)) {
            futureBookingsArray.push(currBooking)
        }
    }
    const handleDeleteBooking = async (e, bookingId) => {
        e.preventDefault()
        const deleteBooking = await csrfFetch(`/api/bookings/${bookingId}`, {
            method: "DELETE",
            body: JSON.stringify({
                bookingId
            })
        })
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
    const handleDeleteOldBooking = (e, id) => {
        e.preventDefault()
        const indexOfOldBooking = pastBookingsArray.findIndex(x => x.id === id)
        pastBookingsArray.splice(indexOfOldBooking, 1)
        setUpdate(false)
    }
    console.log("profileUSERSPOTS", pastBookingsArray)
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
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", position: "sticky", top: "20px" }}>
                    <button onClick={(e) => { setShowSpots(true); setShowBookings(false) }} className="profile-buttons">Spots</button>
                    <button onClick={(e) => { setShowSpots(false); setShowBookings(true) }} style={{ visibility: Number(sessionUser.id) === Number(userId) ? "visible" : "hidden" }} className="profile-buttons">Bookings</button>
                </div>
                <br />
                {showSpots && profileUserSpots.length <= 0 && (
                    <div className="user-spots" style={{ display: "flex", justifyContent: "center" }}>
                        <h2>You currently are not hosting any spots</h2>
                    </div>
                )}
                {showSpots && profileUserSpots.length >= 1 && (
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
                    <>
                        <h2 style={{ marginLeft: "10px" }}>Future Bookings</h2>
                        <div className="user-bookings">
                            {futureBookingsArray.length >= 1 && (
                                futureBookingsArray.map((booking) => {
                                    return <div style={{ marginLeft: "30px" }}>
                                        <img onClick={(e) => history.push(`/spots/${booking.Spot.id}`)} style={{ width: "300px", height: "300px", cursor: "pointer" }} src={booking.Spot.previewImage} />
                                        <br />
                                        <span style={{ fontWeight: "700" }}>{booking.Spot.name}</span>
                                        <br />
                                        <br />
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <span style={{ fontWeight: "700" }}>Start Date:</span>
                                            <span style={{ fontWeight: "700" }}>End Date:</span>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <span>{booking.startDate.substring(0, 10)}</span>
                                            <span>{booking.endDate.substring(0, 10)}</span>
                                        </div>
                                        <br />
                                        <button onClick={(e) => { handleDeleteBooking(e, booking.id); setUpdate(!update) }} className="delete-buttons">Delete booking</button>
                                    </div>
                                })
                            )}
                            {futureBookingsArray.length <= 0 && (
                                <h3 style={{ marginLeft: "33px", marginTop: "-20px" }}>You have no future bookings</h3>
                            )}
                        </div>
                        <h2 style={{ marginLeft: "10px" }}>Current Bookings</h2>
                        <div className="user-bookings">
                            {currentBookingsArray.length >= 1 && (
                                currentBookingsArray.map((booking) => {
                                    return <div style={{ marginLeft: "30px" }}>
                                        <img onClick={(e) => history.push(`/spots/${booking.Spot.id}`)} style={{ width: "300px", height: "300px", cursor: "pointer" }} src={booking.Spot.previewImage} />
                                        <br />
                                        <span style={{ fontWeight: "700" }}>{booking.Spot.name}</span>
                                        <br />
                                        <br />
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <span style={{ fontWeight: "700" }}>Start Date:</span>
                                            <span style={{ fontWeight: "700" }}>End Date:</span>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <span>{booking.startDate.substring(0, 10)}</span>
                                            <span>{booking.endDate.substring(0, 10)}</span>
                                        </div>
                                    </div>
                                })
                            )}
                            {currentBookingsArray.length <= 0 && (
                                <h3 style={{ marginLeft: "35px", marginTop: "-20px" }}>You have no current bookings</h3>
                            )}
                        </div>
                        <h2 style={{ marginLeft: "10px" }}>Past Bookings</h2>
                        <div className="user-bookings">
                            {pastBookingsArray.length >= 1 && (
                                pastBookingsArray.map((booking) => {
                                    return <div style={{ marginLeft: "30px" }}>
                                        {/* <button onClick={(e) => { handleDeleteOldBooking(e, booking.id); setUpdate(!update) }} id="x-button" style={{ border: "none", background: "none", zIndex: "999", position: "absolute", marginLeft: "260px", marginTop: "15px" }}>
                                            <i style={{ color: "red", fontSize: "16px" }} class="fa-solid fa-circle-xmark"></i>
                                        </button> */}
                                        <img onClick={(e) => history.push(`/spots/${booking.Spot.id}`)} style={{ width: "300px", height: "300px", cursor: "pointer", position: "relative" }} src={booking.Spot.previewImage} />
                                        <br />
                                        <span style={{ fontWeight: "700" }}>{booking.Spot.name}</span>
                                        <br />
                                        <br />
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <span style={{ fontWeight: "700" }}>Start Date:</span>
                                            <span style={{ fontWeight: "700" }}>End Date:</span>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <span>{booking.startDate.substring(0, 10)}</span>
                                            <span>{booking.endDate.substring(0, 10)}</span>
                                        </div>
                                    </div>
                                })
                            )}
                            {pastBookingsArray.length <= 0 && (
                                <h3 style={{ marginLeft: "35px", marginTop: "-20px" }}>You have no past bookings</h3>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProfilePage
