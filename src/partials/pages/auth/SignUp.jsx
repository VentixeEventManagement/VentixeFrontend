import React from 'react'
import "./SignUp.css"

const SignUp = () => {

  return (
    <div className='modal-wrapper'>
      <div className="card">
        <form >
          <h1>Sign up</h1>
          <div className="form-group">
            <input type="email" id='email' placeholder='Email' />
          </div>
          <div className="form-group">
            <input type="password" id='password' placeholder='Password' />
          </div>
          <div className="form-group">
            <input type="password" id='confirmpassword' placeholder='Confirm password' />
          </div>
          <button type='submit'>Sign up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp