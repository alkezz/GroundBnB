import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginFormModal.css';
import SignUpForm from '../SignupFormModal/SignupForm';
// import '../SignupFormPage/SignUpForm.css';

function LoginFormModal() {
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false)
    //Creating a modal varaible to store whether the modal can be shown or not
    return (
        <div className='login-button-container'>
            <div className='login-button'>
                <button className='dropdown-btn' onClick={() => showDropDown === false ? setShowDropDown(true) : setShowDropDown(false)}>
                    <div>
                        <i class="fa-solid fa-grip-lines"></i>
                    </div>
                    <div className='user-icon'>
                        <i class="fa-solid fa-circle-user"></i>
                    </div>
                </button>
                {showDropDown && (
                    <>
                        <div className='login-button'>
                            <button className='modal-button' onClick={() => setShowSignUpModal(true)}>Sign up</button>
                            {/* //Clicking the buton makes the modal show up */}
                            {showSignUpModal && (
                                <Modal onClose={() => setShowSignUpModal(false)}>
                                    {/* //clicking again makes it disappear or outside the box */}
                                    <SignUpForm />
                                </Modal>
                            )}
                        </div>
                        <div className='login-button'>
                            <button className='modal-button' onClick={() => setShowLogInModal(true) && setShowDropDown(false)}>Log In</button>
                            {/* //Clicking the buton makes the modal show up */}
                            {showLogInModal && (
                                <Modal onClose={() => setShowLogInModal(false)}>
                                    {/* //clicking again makes it disappear or outside the box */}
                                    <LoginForm />
                                </Modal>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default LoginFormModal;
