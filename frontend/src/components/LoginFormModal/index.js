import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginFormModal.css';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <div className='login-button'>
                <button>hi</button>
            </div>
            <div className='login-button'>
                <button onClick={() => setShowModal(true)}>Log In</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <LoginForm />
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default LoginFormModal;
