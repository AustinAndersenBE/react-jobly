import React from 'react';
import LoginForm from './LoginForm';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page-container">
      <div className="login-flex-container">
        <h2 className="login-heading">Log In</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;