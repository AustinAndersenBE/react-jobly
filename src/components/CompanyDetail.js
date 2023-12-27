import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompany } from '../store/slices/companiesSlice';
import JobCard from './JobCard';

const CompanyDetail = () => {
  const { handle } = useParams();
  const dispatch = useDispatch();
  const { currentCompany, isLoading, error } = useSelector((state) => state.companies);

  useEffect(() => {
    dispatch(fetchCompany(handle));
  }, [dispatch, handle]);

  if (isLoading) {
    return <div>Loading company details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!currentCompany) {
    return <div>Company not found.</div>;
  }

  return (
    <div className="company-detail">
      <div className="company-info">
        <h1 className="company-name">{currentCompany.name}</h1>
        <p className="company-description">{currentCompany.description}</p>
      </div>
      <div className="job-listings">
        {currentCompany.jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default CompanyDetail;