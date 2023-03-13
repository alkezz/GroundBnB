import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";
import EditSpot from ".";

const EditSpotModal = ({ spots }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='delete-buttons' onClick={() => setShowModal(true)}>Edit Spot</button>
            {showModal && (
                <Modal style={{ width: "fit-content", height: "50%" }} open={showModal} onClose={() => setShowModal(false)}>
                    <EditSpot spots={spots} onClick={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default EditSpotModal
