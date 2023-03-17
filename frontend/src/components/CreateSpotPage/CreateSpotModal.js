import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";
import CreateSpot from ".";

const CreateSpotModal = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div onClick={(e) => setShowModal(true)} style={{ cursor: "pointer" }} className='become-host-link'>Groundbnb your home</div>
            {showModal && (
                <Modal style={{ display: "flex", justifyContent: "center", marginTop: "70px" }} open={showModal} onClose={() => setShowModal(false)}>
                    <CreateSpot />
                </Modal>
            )}
        </>
    )
}

export default CreateSpotModal
