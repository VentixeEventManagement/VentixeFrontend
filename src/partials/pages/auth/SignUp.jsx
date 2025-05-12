import React, { lazy, useEffect, useState } from 'react'
import "./SignUp.css"
import { signUpUser } from '../../../features/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../../components/spinner/Spinner'

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setEmail("");
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
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="form-group">
            <input type="email" id='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <input type="password" id='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <input type="password" id='confirmpassword' placeholder='Confirm password' onChange={(e) => setConfirmPassword(e.target.value)} />
            {passwordMismatch && <span className="error-message">Password does not match.</span>}
          </div>
          <button type='submit' disabled={loading}>Sign up</button>
          <span className="signin-redirect">Already have an account? <a href="/login">Sign In</a></span>

          {error && <span className="error-message">{error}</span>}

        </form>
      </div>
    </div>
  )
}

export default SignUp