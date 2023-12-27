import React from 'react';
import SignUpForm from './SignUpForm';
import './SignUp.css';

const SignUp = () => {
  return (
    <div className="sign-up-page-container">
      <div className="sign-up-flex-container">
        <h2 className="sign-up-heading">Sign Up</h2>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
