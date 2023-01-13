import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../../context/Modal"
import EditSpot from ".";

const EditSpotModal = ({ user, reviews }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='add-review-button' onClick={() => setShowModal(true)}>Edit Spot</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditSpot onClick={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default EditSpotModal
