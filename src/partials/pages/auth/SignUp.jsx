import React, { useEffect, useState } from 'react'
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
  const [confirmassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      setEmail("");
      setPassword("");
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUser({ email, password }))
  }

  const confirmPassword = (e) => {

  }

  return (
    <div className='modal-wrapper'>
      {loading && <Spinner />}
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="form-group">
            <input type="email" id='email' placeholder='Email' onChange={handleEmailChange} required />
          </div>
          <div className="form-group">
            <input type="password" id='password' placeholder='Password' onChange={handlePasswordChange} required />
          </div>
          <div className="form-group">
            <input type="password" id='confirmpassword' placeholder='Confirm password' onChange={setConfirmPassword}/>
          </div>
          <button type='submit' disabled={loading}>Sign up</button>
          <span className="signin-redirect">Already have an account? <a href="/login">Sign In</a></span>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default SignUp