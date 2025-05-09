import React, { useEffect, useState } from 'react'
import { signInUser } from '../../../features/SignInSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./SignIn.css/"

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.signin)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    dispatch(signInUser({ email, password }))
  }

  return (
    <div className='modal-wrapper'>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className="form-group">
            <input type="email" id='email' placeholder='Email' onChange={handleEmailChange} required />
          </div>
          <div className="form-group">
            <input type="password" id='password' placeholder='Password' onChange={handlePasswordChange} required />
          </div>
          <button type='submit' disabled={loading}>Sign in</button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default SignIn