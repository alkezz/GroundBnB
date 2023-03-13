import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as spotActions from '../../store/spots'
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import CreateSpotModal from '../CreateSpotPage/CreateSpotModal';
import '../Navigation/Navigation.css';

function Navigation({ isLoaded }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const spots = useSelector(state => state.spots)
    const objArr = Object.keys(spots)
    const [showLogInModal, setShowLogInModal] = useState(false);
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <nav className='log-out-create-spot-div' style={{ position: "sticky" }}>
                    <div style={{ marginTop: "12px" }} className='become-host-div'>
                        <CreateSpotModal />
                    </div>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <div className='profile-button-div'>
                        <ProfileButton className='profile-button' user={sessionUser} />
                    </div>
                </nav>
                <br />
            </>
        );
    } else {
        sessionLinks = (
            <>
                <div className='become-host-div'>
                    <Link className='become-host-link' onClick={() => setShowLogInModal(true)}>Groundbnb your home</Link>
                    {showLogInModal && (
                        <Modal onClose={() => setShowLogInModal(false)}>
                            {/* //clicking again makes it disappear or outside the box */}
                            <LoginForm />
                        </Modal>
                    )}
                </div>
                &nbsp;
                &nbsp;
                &nbsp;
                <LoginFormModal />
                {/* <SignupFormModal /> */}
            </>
        );
    }

    return (
        <>
            <br />
            <ul className='nav-ul'>
                <li>
                    <NavLink exact to="/" onClick={() => objArr.length <= 1 ? dispatch(spotActions.resetState()) : dispatch(spotActions.getAllSpots())} className="home-nav-link"></NavLink>
                </li>
                <li className='login-signup-button-li'>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
        </>
    );
}

export default Navigation;
