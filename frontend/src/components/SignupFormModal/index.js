import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignupForm';
import '../SignupFormPage/SignUpForm.css';

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);
    //Creating a modal varaible to store whether the modal can be shown or not
    return (
        <div>
            <div className='signup-button'>
                <button onClick={() => setShowModal(true)}>Sign up</button>
                {/* //Clicking the buton makes the modal show up */}
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        {/* //clicking again makes it disappear or outside the box */}
                        <SignUpForm />
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default SignupFormModal;
