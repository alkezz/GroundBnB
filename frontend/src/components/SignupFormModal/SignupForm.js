import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './SignupForm.css'

function SignUpFormPage() {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassowrd] = useState('')
    const [errors, setErrors] = useState([]);
    // useEffect(() => {
    //     const errors = []
    //     if (firstName.length <= 0) errors.push('First name is required')
    //     if (lastName.length <= 0) errors.push('Last name is required')
    //     if (password.length <= 0) errors.push('Password is required')
    //     if (email.length <= 0) errors.push("Email is required")
    //     setErrors(errors)
    // }, [firstName.length, lastName.length, password.length, email.length])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const errors = []
        if (firstName.length <= 0) errors.push('First name is required')
        if (lastName.length <= 0) errors.push('Last name is required')
        if (password.length < 6) errors.push('Password must be 6 characters or more')
        if (email.length < 3 || !email.includes('@')) errors.push("A valid email that is at least 3 characters is required")
        if (username.length > 30 || username.length < 4) errors.push("Username must be a length between 4 and 30 characters")
        if (password !== confirmPassword) errors.push("Passwords don't match, please check again")
        setErrors(errors)
        if (errors.length) return;
        return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data) setErrors([data.message]);
            });
    }
    return (
        <form onSubmit={handleSubmit} className='signup-form'>
            <h1 id='finish-signup'>Finish signing up</h1>
            <label>
                <div>
                    <input
                        type="text"
                        placeholder='First name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={errors.includes('First name is required') ? 'error' : "new-user-input"}
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
                        className={errors.includes('Last name is required') ? 'error' : "new-user-input"}
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
                            type="text"
                            value={username}
                            placeholder='Username'
                            onChange={(e) => setUserName(e.target.value)}
                            className={errors.includes('Username must be a length between 4 and 30 characters') ? 'error' : "new-user-input"}
                        />
                    </div>
                    <div>
                        {errors.map((error, idx) =>
                            error === "Username must be a length between 4 and 30 characters" ? <li key={idx} id='error-list'>{error}</li> : null
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
                            className={errors.includes('A valid email that is at least 3 characters is required') ? 'error' : "new-user-input"}
                        />
                    </div>
                    <div>
                        {errors.map((error, idx) =>
                            error === "A valid email that is at least 3 characters is required" ? <li key={idx} id='error-list'>{error}</li> : null
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
                            className={errors.includes('Password must be 6 characters or more') ? 'error' : "new-user-input"}
                        />
                    </div>
                    <div>
                        {errors.map((error, idx) =>
                            error === "Password must be 6 characters or more" ? <li key={idx} id='error-list'>{error}</li> : null
                        )}
                    </div>
                </label>
            </div>
            <div>
                <label>
                    <div>
                        <input
                            type="password"
                            value={confirmPassword}
                            placeholder='Confirm Password'
                            onChange={(e) => setConfirmPassowrd(e.target.value)}
                            className={errors.includes("Passwords don't match, please check again") ? 'error' : "new-user-input"}
                        />
                    </div>
                    <div>
                        {errors.map((error, idx) =>
                            error === "Passwords don't match, please check again" ? <li key={idx} id='error-list'>{error}</li> : null
                        )}
                    </div>
                </label>
            </div>
            <button type="submit" className='signup-button'>
                Sign up
            </button>
        </form>
    );
}

export default SignUpFormPage;
