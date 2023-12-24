import React from 'react';
import './CompanyCard.css';

const CompanyCard = ({ company }) => {
  return (
    <div className="company-card">
      <h2 className="company-name">{company.name}</h2>
      <p className="company-description">{company.description}</p>
    </div>
  );
};

export default CompanyCard;

