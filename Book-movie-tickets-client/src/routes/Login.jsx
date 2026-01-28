import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { login, logout } from '../api';

const Login = ({ setUser, hideLogin, showModal }) => {
  const username = useRef(null);
  const password = useRef(null);
  const [error, setError] = useState(undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.current.value || !password.current.value) {
      alert("Please provide valid username/password");
      return;
    }

    login({
      username: username.current.value,
      password: password.current.value,
    }).then(response => {
      console.log("Axios login", response);
      if (response.status === 200) {
        setUser(response.data.data);
      }
      else {
        setError(response.data.message);
      }
    }).catch(error => {
      console.error("Checking", error.message);
      setError(error.message);
    });
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
        <button className="form-input" type="submit">Login</button>
        <button className="form-input" type="button" onClick={handleCancel}>Cancel</button>
      </form>
      {error && <p style={{
        color: "red",
        backgroundColor: "gray",
        borderRadius: 10,
        padding: "8px 16px"
      }}>{error}</p>}
    </div>
  </div>
  )
}

export default Login