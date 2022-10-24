import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginFormModal.css';
import SignUpForm from '../SignupFormModal/SignupForm';
import { Link } from 'react-router-dom';
// import '../SignupFormPage/SignUpForm.css';
import './LoginFormModal.css'

function LoginFormModal() {
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showDropDown, setShowDropDown] = useState(true)
    //Creating a modal varaible to store whether the modal can be shown or not
    return (
        <div className='login-button-container'>
            {/* <button className='dropdown-btn' onClick={() => showDropDown === false ? setShowDropDown(true) : setShowDropDown(false)}>
                <div>
                    <i id='grip-line-icon' class="fa-solid fa-grip-lines"></i>
                </div>
                <div className='user-icon'>
                    <i id='user-icon' class="fa-solid fa-circle-user"></i>
                </div>
            </button> */}
            {showDropDown && (
                <ul className='user-button'>
                    <li>
                        <button className='modal-button' onClick={() => setShowSignUpModal(true)}>Sign up</button>
                        {/* //Clicking the buton makes the modal show up */}
                        {showSignUpModal && (
                            <Modal onClose={() => setShowSignUpModal(false)}>
                                {/* //clicking again makes it disappear or outside the box */}
                                <SignUpForm />
                            </Modal>
                        )}
                    </li>
                    <li>
                        <button className='modal-button' onClick={() => setShowLogInModal(true) && setShowDropDown(false)}>Log In</button>
                        {/* //Clicking the buton makes the modal show up */}
                        {showLogInModal && (
                            <Modal onClose={() => setShowLogInModal(false)}>
                                {/* //clicking again makes it disappear or outside the box */}
                                <LoginForm />
                            </Modal>
                        )}
                    </li>
                </ul>
            )}
        </div>
    );
}

export default LoginFormModal;
