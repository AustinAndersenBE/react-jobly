import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice'

function NavBar() {
  const { token, user } = useSelector(state => state.auth); 
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  // Use useEffect to listen for changes in token and user
  useEffect(() => {}, [token, user]);

  return (
    <nav>
      <ul>
        <li><NavLink to="/">Jobly</NavLink></li>
        {token ? (
          <>
            <li><NavLink to="/companies">Companies</NavLink></li>
            <li><NavLink to="/jobs">Jobs</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
            <li>
              <a href="/" onClick={handleLogout}>Log Out</a>
              <span> ({user?.username})</span>
            </li>
          </>
        ) : (
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/signup">Signup</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;