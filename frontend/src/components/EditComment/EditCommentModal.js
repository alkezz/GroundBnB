import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../../context/Modal"
import EditCommentForm from "./EditCommentForm";

const EditCommentModal = ({ user, reviews }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='add-review-button' style={{ visibility: user === null || user.id !== reviews.userId ? 'hidden' : 'visible', cursor: "pointer" }} onClick={() => setShowModal(true)}>Edit Comment</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditCommentForm user={user} reviews={reviews} onClick={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default EditCommentModal
