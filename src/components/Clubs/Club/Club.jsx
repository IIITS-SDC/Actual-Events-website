// ClubCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './clubs.css'; // Shared styles for club card and list

const ClubCard = ({ club }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="club-card" 
      onClick={() => navigate(`/club/${club.id}`)}
    >
      <h3>{club.name}</h3>
      <p className="club-description">{club.description}</p>
      <div className="club-footer">
        <div className="club-members">
          <span>{club.members} Members</span>
        </div>
        <span className={`club-status ${club.isActive ? 'active' : 'inactive'}`}>
          {club.isActive ? 'Active Club' : 'Inactive Club'}
        </span>
      </div>
    </div>
  );
};

export default ClubCard;
