import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom'; 
import './LoginForm.css';

const schema = yup.object().shape({
  username: yup.string().required('Required'),
  password: yup.string().required('Required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(loginUser(values));
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-form-container">
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