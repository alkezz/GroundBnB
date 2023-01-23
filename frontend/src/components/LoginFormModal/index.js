import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginFormModal.css';
import SignUpForm from '../SignupFormModal/SignupForm';
import { Link } from 'react-router-dom';
// import '../SignupFormPage/SignUpForm.css';
import './LoginFormModal.css'
import { useSelector } from 'react-redux';

function LoginFormModal() {
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showDropDown, setShowDropDown] = useState(true)
    const sessionUser = useSelector((state) => state.session.user)
    //Creating a modal varaible to store whether the modal can be shown or not
    return (
        <div className='login-button-container'>
            <button className='dropdown-btn' onClick={() => showDropDown === false ? setShowDropDown(true) : setShowDropDown(false)}>
                <div>
                    <i style={{ marginTop: "5px" }} class="fa-solid fa-bars"></i>
                </div>
                &nbsp;
                &nbsp;
                <div className='user-icon'>
                    <i style={{ color: "#717171" }} class="fa-solid fa-circle-user fa-2x"></i>
                </div>
            </button>
            {showDropDown && (
                <div className='user-button'>
                    <div style={{ position: "absolute", zIndex: "999", backgroundColor: "white", border: "1px solid #dddddd", borderRadius: "15px", width: "170px", right: "0", top: "10px", height: "108px" }}>
                        <div className="selection-div" style={{ marginTop: "10px", height: "30px", borderRadius: "5px" }}>
                            <Link className='modal-button' onClick={() => setShowSignUpModal(true)}>Sign up</Link>
                            {/* //Clicking the buton makes the modal show up */}
                            {showSignUpModal && (
                                <Modal onClose={() => setShowSignUpModal(false)}>
                                    {/* //clicking again makes it disappear or outside the box */}
                                    <SignUpForm />
                                </Modal>
                            )}
                        </div>
                        <div className="selection-div" style={{ height: "30px", borderRadius: "5px" }}>
                            <Link className='modal-button' onClick={() => setShowLogInModal(true) && setShowDropDown(false)}>Log In</Link>
                            {/* //Clicking the buton makes the modal show up */}
                            {showLogInModal && (
                                <Modal onClose={() => setShowLogInModal(false)}>
                                    {/* //clicking again makes it disappear or outside the box */}
                                    <LoginForm />
                                </Modal>
                            )}
                        </div>
                        <div style={{ borderBottom: "1px solid #dddddd" }} />
                        <div className="selection-div" style={{ height: "30px", borderRadius: "5px" }}>
                            {sessionUser && (
                                <Link to="/spot/create">Groundbnb your cave</Link>
                            )}
                            {!sessionUser && (
                                <div>
                                    <Link style={{ textDecoration: "none", color: "black", fontSize: "14px", fontWeight: "700", marginLeft: "5%" }} onClick={() => setShowLogInModal(true) && setShowDropDown(false)}>Groundbnb your cave</Link>
                                    {showLogInModal && (
                                        <Modal onClose={() => setShowLogInModal(false)}>
                                            {/* //clicking again makes it disappear or outside the box */}
                                            <LoginForm />
                                        </Modal>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginFormModal;
