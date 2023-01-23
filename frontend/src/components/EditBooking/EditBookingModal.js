import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../../context/Modal"
import EditBookingForm from ".";

const EditBookingModal = ({ booking }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='delete-buttons' onClick={() => setShowModal(true)}>Edit Booking</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditBookingForm booking={booking} onClick={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default EditBookingModal
