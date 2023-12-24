import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice'

function NavBar() {
  const token = useSelector(state => state.auth.token); 
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  return (
    <nav>
      <ul>
        <li><NavLink to="/">Jobly</NavLink></li>
        {token ? (
          <>
            <li><NavLink to="/companies">Companies</NavLink></li>
            <li><NavLink to="/jobs">Jobs</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
            <li><a href="/" onClick={handleLogout}>Log out</a></li>
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