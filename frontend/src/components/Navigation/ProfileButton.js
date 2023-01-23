import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import * as spotActions from '../../store/spots'
import './Navigation.css'

function ProfileButton({ user }) {
    const history = useHistory()
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector((state) => state.session.user)
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
            <button className='dropdown-btn' onClick={openMenu}>
                <div>
                    <i style={{ marginTop: "5px" }} class="fa-solid fa-bars"></i>
                </div>
                &nbsp;
                &nbsp;
                <div className='user-icon'>
                    <i style={{ color: "#717171" }} class="fa-solid fa-circle-user fa-2x"></i>
                </div>
            </button>
            {showMenu && (
                <div className='user-button'>
                    <div style={{ position: "absolute", zIndex: "999", backgroundColor: "white", border: "1px solid #dddddd", borderRadius: "15px", width: "170px", right: "0", top: "10px", height: "108px" }}>
                        <div className="selection-div" style={{ marginTop: "10px", height: "30px", borderRadius: "5px" }}>
                            <Link className='modal-button' onClick={() => history.push(`/user/${sessionUser.id}`)}>Profile</Link>
                        </div>
                        <div style={{ borderBottom: "1px solid #dddddd" }} />
                        <div style={{ height: "30px" }} className="selection-div">
                            <Link style={{ textDecoration: "none", color: "black", fontSize: "14px", fontWeight: "700", marginLeft: "5%" }} to="/spot/create">Groundbnb your cave</Link>
                        </div>
                        <div className="selection-div" style={{ height: "30px", borderRadius: "5px" }}>
                            <div>
                                <Link style={{ textDecoration: "none", color: "black", fontSize: "14px", fontWeight: "700", marginLeft: "5%" }} onClick={logout}>Log out</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProfileButton;
