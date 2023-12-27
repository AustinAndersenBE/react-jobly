import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import Button from './Button';
import './HomePage.css';

function HomePage() {
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);

  if (token && user) {
    // Content for logged-in users
    return (
      <div className="text-center mt-5">
        <h1>Welcome back, {user.username}</h1>
        <p>All the jobs in one, convenient place.</p>
      </div>
    );
  } else {
    // Content for users who are not logged in
    return (
      <div className="text-center mt-5">
        <h1>Jobly</h1>
        <p>All the jobs in one, convenient place.</p>
        <Link to="/login">
          <Button text="Log in" className="btn btn-primary" />
        </Link>
        <Link to="/signup">
          <Button text="Sign Up" className="btn btn-secondary" />
        </Link>
      </div>
    );
  }
}

export default HomePage;