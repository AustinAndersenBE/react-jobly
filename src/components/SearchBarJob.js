import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { fetchJobs } from '../store/slices/jobsSlice';
import './SearchBarJob.css';

const schema = yup.object().shape({
  title: yup.string().trim().min(1, 'Must be 1 character or more'),
  minSalary: yup.number().min(0, 'Must be a positive number').nullable(),
  hasEquity: yup.boolean(),
});

const SearchBarJob = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const handleSearch = (data) => {
    const filters = {
      title: data.title,
      minSalary: data.minSalary,
      hasEquity: data.hasEquity,
    };
    dispatch(fetchJobs(filters));
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="search-bar-job">
      <input
        {...register('title')}
        type="text"
        placeholder="Enter job title..."
        className="search-input"
      />
      {errors.title && <p>{errors.title.message}</p>}
      <input
        {...register('minSalary')}
        type="number"
        placeholder="Min salary"
        className="search-input"
      />
      {errors.minSalary && <p>{errors.minSalary.message}</p>}
      <label className="search-checkbox">
        <input
          {...register('hasEquity')}
          type="checkbox"
        />
        Has Equity
      </label>
      {errors.hasEquity && <p>{errors.hasEquity.message}</p>}
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default SearchBarJob;