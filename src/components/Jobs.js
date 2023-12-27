import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs } from '../store/slices/jobsSlice';
import SearchBarJob from './SearchBarJob';
import JobCard from './JobCard';

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, isLoading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <SearchBarJob />
      <div className="jobs-list">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;