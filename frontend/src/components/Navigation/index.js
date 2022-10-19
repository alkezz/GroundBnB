import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import '../Navigation/Navigation.css';

function Navigation({ isLoaded }) {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='log-out-create-spot-div'>
                <button onClick={() => history.push("/spot/create")}>CREATE SPOT~!~~~~</button>
                <ProfileButton user={sessionUser} />
            </div>

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
        <ul>
            <li>
                <NavLink exact to="/">Home</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    );
}

export default Navigation;
