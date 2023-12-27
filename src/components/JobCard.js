import React from 'react';
import './JobCard.css'; 
import ApplyButton from './ApplyButton';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h2 className="job-title">{job.title}</h2>
      <p className="job-salary">Salary: {job.salary}</p>
      <p className="job-equity">Equity: {job.equity}</p>
      <ApplyButton jobId={job.id} />
    </div>
  );
};

export default JobCard;