import React from 'react'
import { Link } from 'react-router'
import { logout } from '../api';

const NavBar = ({ user, showLogin, onLogout }) => {
  const handleLogin = () => {
    showLogin(true);
  }
  const handleLogout = async () => {
    await logout();
    onLogout();
  }

  return (<div className='nav-bar'>
    <h1>🎬 Movie Booking</h1>
    <div>
      {!user && <button onClick={handleLogin}>Login</button>}
      {user && <button onClick={handleLogout}>Logout</button>}
    </div>
  </div>)
}

export default NavBar