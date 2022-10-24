import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import * as reviewActions from "../../store/reviews"
import { useDispatch } from "react-redux";
import "./LoginFormModal.css"
import { useHistory, useParams } from "react-router-dom";

function LoginForm() {
    const history1 = useHistory().location.pathname
    console.log(history1.split('/'))
    const id = Number(history1.split('/')[2])
    console.log(id)
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
        ).then(async () => isNaN(id) ? null : await dispatch(reviewActions.getReviews(id)))
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
            <button className="demo-user-button" onClick={async (e) => {
                await dispatch(sessionActions.login({ credential: "Demo-User", password: "password" }));
                isNaN(id) ? console.log('noid') : await dispatch(reviewActions.getReviews(id))
            }
            }
            >Log in as Demo User</button>
        </>
    );
}

export default LoginForm;
