import React, { useEffect, useState } from 'react'
import { signInUser } from '../../../features/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Spinner from '../../../components/spinner/Spinner'
import "./SignIn.css"

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-userId', "cookie-role"]);

  useEffect(() => {
    if (isAuthenticated) {
      setEmail("");
      setPassword("");
      navigate("/dashboard")
      setCookie("userId", user.userId, { path: "/" });
      setCookie("userRole", user.roleName, { path: "/" });
    }
  }, [isAuthenticated, navigate])

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    console.log("USER ID: ", cookies);
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
      {loading && <Spinner />}
      <div className="modal">
        <header className="modal-header">
          <h1>Sign In</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="email" id='signin-email' placeholder='Email' onChange={handleEmailChange} required />
          </div>
          <div className="form-group">
            <input type="password" id='signin-password' placeholder='Password' onChange={handlePasswordChange} required />
          </div>
          <button className="modal-button" type='submit' disabled={loading}>Sign in</button>

          <span className="signup-redirect">Don't have an account? <a href="/sendemail">Sign up</a></span>

          {error && <span className="error-message">{error}</span>}
        </form>
      </div>
    </div>
  )
}

export default SignIn