import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../store/slices/authSlice';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './ProfileForm.css';


const profileSchema = yup.object({
  firstName: yup.string().required('First name is required').min(1, 'Must be at least 1 character').max(30, 'Must be at most 30 characters'),
  lastName: yup.string().required('Last name is required').min(1, 'Must be at least 1 character').max(30, 'Must be at most 30 characters'),
  email: yup.string().required('Email is required').email('Must be a valid email').min(6, 'Must be at least 6 characters').max(60, 'Must be at most 60 characters'),
});


const ProfileForm = ({ user }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    }
  });

  const onSubmit = (data) => {
    // we also pass in the username because the api route uses it
    dispatch(updateUserProfile({ username: user.username, updateData: data }));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled>
          <label>Username</label>
          <input defaultValue={user?.username} {...register('username')} />
        </fieldset>
        <label>First Name</label>
        <input {...register('firstName')} />
        {errors.firstName && <p>{errors.firstName.message}</p>}
        <label>Last Name</label>
        <input {...register('lastName')} />
        {errors.lastName && <p>{errors.lastName.message}</p>}
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileForm;