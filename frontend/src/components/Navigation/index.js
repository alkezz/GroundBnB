import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as spotActions from '../../store/spots'
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import '../Navigation/Navigation.css';

function Navigation({ isLoaded }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const spots = useSelector(state => state.spots)
    const objArr = Object.keys(spots)
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <div className='log-out-create-spot-div'>
                    <div className='become-host-div'>
                        <Link to='/spot/create' className='become-host-link'>Become a Host</Link>
                    </div>
                    &nbsp;
                    <div className='profile-button-div'>
                        <ProfileButton className='profile-button' user={sessionUser} />
                    </div>
                </div>
                <br />
            </>
        );
    } else {
        sessionLinks = (
            <>
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
