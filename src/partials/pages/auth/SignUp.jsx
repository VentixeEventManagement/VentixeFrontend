import React, { lazy, useEffect, useState } from 'react'
import "./SignUp.css"
import { signUpUser } from '../../../features/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Spinner from '../../../components/spinner/Spinner'

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth)
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const email = location.state?.email;

  useEffect(() => {
    if (isAuthenticated) {
      setPassword("");
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    checkPasswordIfMatch();
  }

  const checkPasswordIfMatch = () => {
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);
    dispatch(signUpUser({ email, password }));
  }

  return (
    <div className='modal-wrapper'>
      {loading && <Spinner />}
      <div className="modal">
        <header className="modal-header">
          <h1>Register</h1>
          <h3>Enter password to sign up</h3>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="email" id='signup-email' placeholder='Email' value={email} readOnly />
          </div>
          <div className="form-group">
            <input type="password" id='signup-password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <input type="password" id='confirm-password' placeholder='Confirm password' onChange={(e) => setConfirmPassword(e.target.value)} required />
            {passwordMismatch && <span className="error-message">Password does not match.</span>}
          </div>
          <button className="modal-button" type='submit' disabled={loading}>Sign up</button>
          <span className="signin-redirect">Already have an account? <a href="/login">Sign In</a></span>

          {error && <span className="error-message">{error}</span>}

        </form>
      </div>
    </div>
  )
}

export default SignUp