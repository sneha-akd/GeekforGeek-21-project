import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { login, logout, reset, signup } from '../api';

const MODE_SIGNUP = "Signup";
const MODE_LOGIN = "Login";
const MODE_PASSWORD = "Set Password";

const Login = ({ setUser, hideLogin, showModal }) => {
  const username = useRef(null);
  const password = useRef(null);
  const otp = useRef(null);
  const [error, setError] = useState(undefined);
  const [mode, setMode] = useState(MODE_LOGIN); // Modes are Signup and Login
  const [qr_code, setQrCode] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.current.value || !password.current.value) {
      alert("Please provide valid username/password");
      return;
    }

    if (mode === MODE_LOGIN) {
      login({
        username: username.current.value,
        password: password.current.value,
      }).then(response => {
        console.log("Axios login", response);
        if (response.status === 200) {
          setUser(response.data.data);
          setError(undefined);
        }
        else {
          setError(response.data.message);
        }
      }).catch(error => {
        console.error("Checking", error.message);
        setError(error.message);
      });
    } else if (mode === MODE_SIGNUP) {
      signup({
        username: username.current.value,
        password: password.current.value,
      }).then(response => {

        setQrCode(response.data);
        setError("Save this QR Code with authenticator app, will be needed to reset password");
      }).catch(error => {
        console.error("Error during Signup", error.message);
        setError(error.message);
      })
    } else {
      reset({
        username: username.current.value,
        password: password.current.value,
        otp: otp.current.value,
      }).then(response => {
        if (response.status === 200) {
          otp.current.value = "";
          setMode(MODE_LOGIN);
          setError(undefined);
        }
        else {
          setError(JSON.parse(response.data));
        }
      }).catch(error => {
        console.error("Error during reset password", error.message);
        setError(error.message);
      })
    }
  }

  const changeMode = (e) => {
    e.preventDefault();
    setMode((prev) => prev === MODE_SIGNUP ? MODE_LOGIN : MODE_SIGNUP);
  }

  const changePassword = (e) => {
    e.preventDefault();
    setMode(MODE_PASSWORD);
  }

  const handleCancel = () => {
    username.current.value = "";
    password.current.value = "";
    hideLogin();
  }

  // TODO Make this a modal dialog
  return (<div className='modal-dialog' onClick={(e) => {
    e.stopPropagation();
    handleCancel();
  }}>
    <div className='modal-container' onClick={(e) => {
      e.stopPropagation();
    }}>
      {typeof (showModal) === 'string' && <p>{showModal}</p>}
      <form onSubmit={handleSubmit} className='form-container'>
        <input className="form-input" type="text" ref={username} placeholder='User name' autoComplete="username" />
        <input className="form-input" type="password" ref={password} placeholder='Password' autoComplete="current-password" />
        {mode === MODE_PASSWORD && <input className="form-input" type="text" ref={otp} placeholder='Otp' />}
        <button className="form-input" type="submit">{mode}</button>
        <button className="form-input" type="button" onClick={handleCancel}>Cancel</button>
        <p className='modal-message'><a href="#" onClick={changeMode}>{mode === MODE_LOGIN ? MODE_SIGNUP : MODE_LOGIN}</a> instead</p>
        {mode === MODE_LOGIN && <p className='modal-message'><a href="#" onClick={changePassword}>forgot password</a></p>}
      </form>
      {error && <p className='modal-error'>{error}</p>}
      <div dangerouslySetInnerHTML={{ __html: qr_code }} />
    </div>
  </div>
  )
}

export default Login