import React from 'react';
import { useSelector } from 'react-redux'; 
import Button from './Button'; 
import SignUpForm from './SignUpForm'; // 
import LoginForm from './LoginForm'; // 

function HomePage() {
  const [showForm, setShowForm] = useState(null); 
  const token = useSelector(state => state.auth.token); 
  const user = useSelector(state => state.auth.user); 

  const handleShowSignUpForm = () => {
    setShowForm('signup'); // Show the sign-up form when the button is clicked
  };

  const handleShowLoginForm = () => {
    setShowForm('login');
  };


  if (token) {
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
        {showForm === null && (
          <>
            <Button text="Log in" className="btn btn-primary" onClick={handleShowLoginForm} />
            <Button text="Sign Up" className="btn btn-secondary" onClick={handleShowSignUpForm} />
          </>
        )}
        {showForm === 'signup' && <SignUpForm />}
        {showForm === 'login' && <LoginForm />}
      </div>
    );
  }
}

export default HomePage;