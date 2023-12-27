import React from 'react';
import { useSelector } from 'react-redux';
import ProfileForm from './ProfileForm';

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <h1>Profile</h1>
      
      <ProfileForm user={user} />
    </div>
  );
};

export default Profile;