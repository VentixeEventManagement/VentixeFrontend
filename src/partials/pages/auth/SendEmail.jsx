import React, { useEffect, useState } from 'react'
import Spinner from '../../../components/spinner/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sendEmailRequest, resetStatus } from '../../../features/AuthSlice'
import "./SendEmail.css";

const SendEmail = () => {
    const navigate = useNavigate();
    const { loading, error, succeeded } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (succeeded) {
            navigate("/verify/", { state: { email } })
            dispatch(resetStatus());
        }
    }, [succeeded, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email)) {
            dispatch(sendEmailRequest(email));
        }
    }

    return (
        <div className='modal-wrapper'>
            {loading && <Spinner />}
            <div className="modal">
                <header className="modal-header">
                    <h1>Register</h1>
                    <h3 className="verify-text">Verify your account</h3>
                </header>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="email" id='send-email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <button className="modal-button" type='submit' disabled={loading}>Send verification email</button>

                    {!succeeded && <span className="error-message">{error}</span>}
                </form>
            </div>
        </div>
    )
}

export default SendEmail