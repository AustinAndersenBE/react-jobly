import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyToJob } from '../store/slices/userSlice';
import './ApplyButton.css';

const ApplyButton = ({ jobId }) => {
  const dispatch = useDispatch();

  // Get state to see if user has applied to job
  const hasApplied = useSelector(state => state.user.applications.has(jobId));

  const handleApply = () => {
    dispatch(applyToJob({ jobId }));
  };

  return (
    <button className="apply-button" onClick={handleApply} disabled={hasApplied}>
      {hasApplied ? 'Applied' : 'Apply'}
    </button>
  );
};

export default ApplyButton;