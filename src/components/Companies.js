import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanies } from '../store/slices/companiesSlice'
import CompanyCard from './CompanyCard';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

const Companies = () => {
  const dispatch = useDispatch();
  const { companies, isLoading, error } = useSelector((state) => state.companies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading companies...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
       <SearchBar />
      <div className="companies-list">
        {/* Map over companies array and render a CompanyCard for each company */}
        {companies.map((company) => (
          <Link to={`/companies/${company.handle}`} key={company.handle}>
            <CompanyCard company={company} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Companies;