import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import * as reviewActions from "../../store/reviews"
import * as spotActions from "../../store/spots"
import { csrfFetch } from '../../store/csrf';

const EditBookingForm = ({ booking }) => {
    let todaysDate = new Date()
    const history = useHistory()
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(booking.startDate.substring(0, 10))
    const [endDate, setEndDate] = useState(booking.endDate.substring(0, 10))
    const [errors, setErrors] = useState([])
    const [update, setUpdate] = useState(false)
    useEffect(() => {
        (async () => {
            await csrfFetch("/api/bookings/current")
        })();
    }, [csrfFetch, update, setUpdate, startDate, setStartDate])
    const handleEditBooking = async (e) => {
        e.preventDefault()
        const editBooking = await csrfFetch(`/api/bookings/${booking.id}`, {
            method: "PUT",
            body: JSON.stringify({
                startDate,
                endDate
            })
        })
        if (editBooking.ok) {
            const data = await editBooking.json()
            await setUpdate(false)
            console.log("DATA", data)
        }
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid black", paddingBottom: "50px", borderRadius: "15px", backgroundColor: "#ffffff", width: "400px", height: "400px", marginBottom: "10px", marginLeft: "62%", bottom: "550px", position: "sticky", top: "110px", marginTop: "-220px", boxShadow: "2px 2px 2px black" }}>
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
                    <h3 style={{ color: "red", marginLeft: "15px" }}>Please make sure your start date comes before your end date...</h3>
                </>
            )}
            {startDate && endDate && startDate === endDate && (
                <>
                    <i style={{ color: "red" }} className="fa-solid fa-circle-xmark fa-3x"></i>
                    <h3 style={{ color: "red", marginLeft: "15px" }}>Please make sure your start date and end date differ...</h3>
                </>
            )}
            {startDate && endDate && startDate < todaysDate.toISOString().substring(0, 10) && (
                <>
                    <i style={{ color: "red" }} className="fa-solid fa-circle-xmark fa-3x"></i>
                    <h3 style={{ color: "red", marginLeft: "15px" }}>Please make sure your start date does not come before todays date...</h3>
                </>
            )}
            {startDate && endDate && startDate < endDate && startDate >= todaysDate.toISOString().substring(0, 10) && (
                <div>
                    <button onClick={(e) => { handleEditBooking(e); setUpdate(!update) }} style={{ backgroundColor: "#d60565", color: "white", borderRadius: "5px", cursor: "pointer", width: "100%", height: "50px", fontWeight: "700", fontSize: "16px", border: "none" }}>Reserve</button>
                </div>
            )}
        </div>
    )
}

export default EditBookingForm
