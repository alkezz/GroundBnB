import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import * as spotActions from '../../store/spots'
import './Navigation.css'

function ProfileButton({ user }) {
    const history = useHistory()
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        dispatch(spotActions.getAllSpots())
        history.push("/")
    };

    return (
        <>
            <button className="profile-button" onClick={openMenu}>
                <i className="fa-solid fa-user"></i>
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>{user.username}</li>
                    <div style={{ borderBottom: '1px black solid' }}></div>
                    <li>{user.email}</li>
                    <div style={{ borderBottom: '1px black solid' }}></div>
                    <li>
                        <button style={{ height: '30px' }} className="log-out-button" onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
