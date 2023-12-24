import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux'; // import useDispatch
import { registerUser } from '../store/slices/authSlice'; // import registerUser action
import './SignUpForm.css';

// Define validation schema with Yup
const schema = yup.object().shape({
  username: yup.string().required('Required').min(1, 'Must be 1 character or more').max(30, 'Must be 30 characters or less'),
  password: yup.string().required('Required').min(5, 'Must be 5 characters or more').max(20, 'Must be 20 characters or less'),
  firstName: yup.string().required('Required').min(1, 'Must be 1 character or more').max(30, 'Must be 30 characters or less'),
  lastName: yup.string().required('Required').min(1, 'Must be 1 character or more').max(30, 'Must be 30 characters or less'),
  email: yup.string().required('Required').min(6, 'Must be 6 characters or more').max(60, 'Must be 60 characters or less').email('Must be a valid email'),
});

const SignUpForm = () => {

  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    dispatch(registerUser(values)); 
  };

  return (
    <div className="sign-up-form-container"> 
      <h2 className="text-center">Sign Up</h2> {/* heading for the form */}
      <form onSubmit={handleSubmit(onSubmit)} className="text-center mt-5"> 
        <input {...register('username')} placeholder="Username" />
        <p>{errors.username?.message}</p>
        <input {...register('password')} placeholder="Password" type="password" />
        <p>{errors.password?.message}</p>
        <input {...register('firstName')} placeholder="First name" />
        <p>{errors.firstName?.message}</p>
        <input {...register('lastName')} placeholder="Last name" />
        <p>{errors.lastName?.message}</p>
        <input {...register('email')} placeholder="Email" type="email" />
        <p>{errors.email?.message}</p>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
