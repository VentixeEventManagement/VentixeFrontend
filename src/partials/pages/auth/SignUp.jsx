import React, { useEffect, useState } from 'react'
import "./SignUp.css"
import { signUpUser } from '../../../features/SignUpSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.signup)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  })

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUser({ email, password }))

    if (isAuthenticated) {
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className='modal-wrapper'>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h1>Sign up</h1>
          <div className="form-group">
            <input type="email" id='email' placeholder='Email' onChange={handleEmailChange} required />
          </div>
          <div className="form-group">
            <input type="password" id='password' placeholder='Password' onChange={handlePasswordChange} required />
          </div>
          <div className="form-group">
            <input type="password" id='confirmpassword' placeholder='Confirm password' />
          </div>
          <button type='submit' disabled={loading}>Sign up</button>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {isAuthenticated && <p>You're signed up!</p>}
        </form>
      </div>
    </div>
  )
}

export default SignUp