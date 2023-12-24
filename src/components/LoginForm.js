import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux'; // import useDispatch
import { loginUser } from '../store/slices/authSlice'; // import loginUser action
import './LoginForm.css';

// Define validation schema with Yup
const schema = yup.object().shape({
  username: yup.string().required('Required'),
  password: yup.string().required('Required'),
});

const LoginForm = () => {
  const dispatch = useDispatch(); 
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    dispatch(loginUser(values)); // dispatch loginUser action
  };

  return (
    <div className="login-form-container">
      <h2 className="text-center">Log In</h2> {/* heading for the form */}
      <form onSubmit={handleSubmit(onSubmit)} className="text-center mt-5">
        <input {...register('username')} placeholder="Username" />
        <p>{errors.username?.message}</p>
        <input {...register('password')} placeholder="Password" type="password" />
        <p>{errors.password?.message}</p>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;