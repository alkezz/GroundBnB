import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './SignUpForm.css'

function SignUpFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('')
    const [errors, setErrors] = useState([]);
    // useEffect(() => {
    //     const errors = []
    //     if (firstName.length <= 0) errors.push('First name is required')
    //     if (lastName.length <= 0) errors.push('Last name is required')
    //     if (password.length <= 0) errors.push('Password is required')
    //     if (email.length <= 0) errors.push("Email is required")
    //     setErrors(errors)
    // }, [firstName.length, lastName.length, password.length, email.length])

    if (sessionUser) return (
        <Redirect to="/" />
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const errors = []
        if (firstName.length <= 0) errors.push('First name is required')
        if (lastName.length <= 0) errors.push('Last name is required')
        if (password.length <= 0) errors.push('Password is required')
        if (new Date().getFullYear() - birthday.split('-')[0] < 18) errors.push("You must be 18 or older to use Groundbnb. Other people won't see your birthday.")
        if (email.length <= 0 || !email.includes('@')) errors.push("Email is required")
        if (username.length <= 0) errors.push("Username is required")
        setErrors(errors)
        if (errors.length) return;
        return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data) setErrors([data.errors]);
                console.log(data.errors)
            });
    }
    return (
        <form onSubmit={handleSubmit} className='signup-form'>
            {/* {console.log(errors)} */}
            <h1 id='finish-signup'>Finish signing up</h1>
            <label>
                <div>
                    <input
                        type="text"
                        placeholder='First name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={errors.includes('First name is required') ? 'error' : "user-signup-input"}
                    />
                </div>
                <div>
                    {errors.map((error, idx) =>
                        error === "First name is required" ? <li key={idx} id='error-list'>{error}</li> : null
                    )}
                </div>
            </label>
            <label>
                <div>
                    <input
                        type="text"
                        value={lastName}
                        placeholder='Last name'
                        onChange={(e) => setlastName(e.target.value)}
                        className={errors.includes('Last name is required') ? 'error' : "user-signup-input"}
                    />
                </div>
                <div>
                    {errors.map((error, idx) =>
                        error === "Last name is required" ? <li key={idx} id='error-list'>{error}</li> : null
                    )}
                    <div id='below-input-text'>Make sure it matches the name on your government ID.</div>
                </div>
            </label>
            <br />
            <div>
                <label>
                    <div>
                        <input
                            type="date"
                            value={birthday}
                            placeholder='Birthdate'
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                            className={errors.includes("You must be 18 or older to use Groundbnb. Other people won't see your birthday.") ? 'error' : "user-signup-input"}
                        />
                    </div>
                    <div>
                        {errors.map((error, idx) =>
                            error === "You must be 18 or older to use Groundbnb. Other people won't see your birthday." ? <li key={idx} id='error-list'>{error}</li> : null
                        )}
                        <div id='below-input-text'>
                            To sign up, you need to be at least 18. Your birthday won't
                            be shared with other people who use Groundbnb
                        </div>
                    </div>
                </label>
            </div>
            <br />
            <div>
                <label>
                    <div>
                        <input
                            type="text"
                            value={username}
                            placeholder='Username'
                            onChange={(e) => setUserName(e.target.value)}
                            className={errors.includes('Username is required') ? 'error' : "user-signup-input"}
                        />
                    </div>
                    <div>
                        {errors.map((error, idx) =>
                            error === "Username is required" ? <li key={idx} id='error-list'>{error}</li> : null
                        )}
                        {errors.map((error, idx) =>
                            error.username === "User with that username already exists" ? <li key={idx} id='error-list'>{error.username}</li> : null
                        )}
                    </div>
                </label>
            </div>
            <div>
                <label>
                    <div>
                        <input
                            type="email"
                            value={email}
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.includes('Email is required') ? 'error' : "user-signup-input"}
                        />
                    </div>
                    <div>
                        {errors.map((error, idx) =>
                            error === "Email is required" ? <li key={idx} id='error-list'>{error}</li> : null
                        )}
                        {errors.map((error, idx) =>
                            error.email === "User with that email already exists" ? <li key={idx} id='error-list'>{error.email}</li> : null
                        )}
                        <div id='below-input-text'>
                            We'll email you trip confirmations and receipts.
                        </div>
                    </div>
                </label>
            </div>
            <br />
            <div>
                <label>
                    <div>
                        <input
                            type="password"
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            className={errors.includes('Password is required') ? 'error' : "user-signup-input"}
                        />
                    </div>
                    <div>
                        {errors.map((error, idx) =>
                            error === "Password is required" ? <li key={idx} id='error-list'>{error}</li> : null
                        )}
                    </div>
                </label>
            </div>
            <button type="submit" className='signup-submit'>
                Sign up
            </button>
        </form>
    );
}

export default SignUpFormPage;
