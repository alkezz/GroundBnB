import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginFormModal.css';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);
    //Creating a modal varaible to store whether the modal can be shown or not
    return (
        <div>
            <div className='login-button'>
                <button>hi</button>
            </div>
            <div className='login-button'>
                <button onClick={() => setShowModal(true)}>Log In</button>
                //Clicking the buton makes the modal show up
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                    //clicking again makes it disappear or outside the box
                        <LoginForm />
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default LoginFormModal;
