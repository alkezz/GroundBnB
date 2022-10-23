import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css'

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        const errors = []
        if (credential.length <= 0) errors.push('Email is required')
        if (password.length <= 0) errors.push('Password is required')
        setErrors(errors)
    }, [credential.length, password.length])

    if (sessionUser) return (
        <Redirect to="/" />
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data) setErrors([data.message]);
            });
    }
    return (
        <>
            <form onSubmit={handleSubmit} className='login-form'>
                <h1 id='welcome-head'>Welcome to Airbnb</h1>
                <div>
                    {errors.map((error, idx) =>
                        error === "Invalid credentialis" ? <li key={idx} id='error-login'>Invalid Credentials!</li> : null
                    )}
                </div>
                <label>
                    <div>
                        <input
                            type="text"
                            placeholder='Username or Email'
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                            className={errors.includes('Email is required') ? 'log-in-error' : "user-input"}
                        />
                        <div>
                            {errors.map((error, idx) =>
                                error === "Email is required" ? <li key={idx} id='error-list'>{error}</li> : null
                            )}
                        </div>
                    </div>
                </label>
                <div>
                    <label>
                        <div>
                            <input
                                type="password"
                                value={password}
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className={errors.includes('Password is required') ? 'log-in-error' : "user-input"}
                            />
                            <div>
                                {errors.map((error, idx) =>
                                    error === "Password is required" ? <li key={idx} id='error-list'>{error}</li> : null
                                )}
                            </div>
                        </div>
                    </label>
                </div>
                <button type="submit" className='user-submit'>
                    Log In
                </button>
            </form>
        </>
    );
}

export default LoginFormPage;
