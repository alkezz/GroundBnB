import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginFormModal.css"
import { useHistory } from "react-router-dom";

function LoginForm() {
    const dispatch = useDispatch();
    const history = useHistory()
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const errors = []
        if (credential.length <= 0) errors.push('Please provide a valid email or username.')
        if (password.length <= 0) errors.push('Password is required.')
        setErrors(errors)
        if (errors.length) {
            return
        }
        dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data) setErrors([data.message]);
            }
        ).then(() => errors.length >= 1 ? null : history.push('/'))
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='login-form'>
                <h1 id='welcome-head'>Welcome to GroundBnB</h1>
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
                            className={errors.includes('Please provide a valid email or username.') ? 'log-in-error' : "user-input"}
                        />
                        <div>
                            {errors.map((error, idx) =>
                                error === 'Please provide a valid email or username.' ? <li key={idx} id='log-in-error-list'>{error}</li> : null
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
                                className={errors.includes('Password is required.') ? 'log-in-error' : "user-input"}
                            />
                            <div>
                                {errors.map((error, idx) =>
                                    error === "Password is required." ? <li key={idx} id='log-in-error-list'>{error}</li> : null
                                )}
                            </div>
                        </div>
                    </label>
                </div>
                <button type="submit" className='user-submit'>
                    Log In
                </button>
            </form>
            <button className="demo-user-button" onClick={async () => await dispatch(sessionActions.login({ credential: "FakeUser1", password: "password1" }))}>Log in as Demo User</button>
        </>
    );
}

export default LoginForm;
