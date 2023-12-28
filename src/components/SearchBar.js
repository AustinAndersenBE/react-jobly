import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { fetchCompanies } from '../store/slices/companiesSlice';
import './SearchBar.css';


//search bar is used in companies

// Define validation schema with Yup
const schema = yup.object().shape({
  searchTerm: yup.string().min(1, 'Must be 1 character or more'),
  minEmployees: yup.number().min(0, 'Must be 0 or more').transform(value => (isNaN(value) ? undefined : value)),
  maxEmployees: yup.number().min(0, 'Must be 0 or more').transform(value => (isNaN(value) ? undefined : value)),
});

const SearchBar = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const handleSearch = (data) => {
    const filters = {
      name: data.searchTerm,
      minEmployees: data.minEmployees,
      maxEmployees: data.maxEmployees,
    };
    dispatch(fetchCompanies(filters));
    reset();
  };

  return (
    // RHF calls handleSearch with form data once form is submitted
    <form onSubmit={handleSubmit(handleSearch)} className="search-bar">
      <input
        {...register('searchTerm')} // if we didn't use register, we would have to useState and set the value of the input to the state, and onChange we would have to update the state
        type="text"
        placeholder="Enter company name..."
        className="search-input"
      />
      {errors.searchTerm && <p>{errors.searchTerm.message}</p>}
      <input
        {...register('minEmployees')}
        type="number"
        placeholder="Min employees"
        className="search-input"
      />
      {errors.minEmployees && <p>{errors.minEmployees.message}</p>}
      <input
        {...register('maxEmployees')}
        type="number"
        placeholder="Max employees"
        className="search-input"
      />
      {errors.maxEmployees && <p>{errors.maxEmployees.message}</p>}
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;