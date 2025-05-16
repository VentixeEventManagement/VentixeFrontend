import React, { useEffect, useState } from 'react'
import Spinner from '../../../components/spinner/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sendEmailRequest } from '../../../features/AuthSlice'
import "./SendEmail.css";

const SendEmail = () => {
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (submitted && !loading && !error) {
            navigate("/verify/", { state: { email } })
        }
    }, [submitted, loading, error, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendEmailRequest(email));
        setSubmitted(true);
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

                    {error && <span className="error-message">{error}</span>}
                </form>
            </div>
        </div>
    )
}

export default SendEmail