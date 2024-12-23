import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, useParams } from 'react-router-dom';
import { Search, Filter, Instagram, Linkedin, Github, Facebook, Mail } from 'lucide-react';
import clubData from '../../data/club_data.json';
import './Club.css';

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

const ClubList = () => {
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setClubs(clubData.clubs);
  }, []);

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || club.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="club-container">
      <div className="club-content">
        <h1>Discover IIIT Sricity Clubs</h1>
        <p className="club-subtitle">Where Passion Meets Purpose</p>
        
        <div className="search-filter-container">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search clubs..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              <Filter size={20} />
              All
            </button>
            <button
              className={`filter-btn ${filter === 'technical' ? 'active' : ''}`}
              onClick={() => setFilter('technical')}
            >
              Technical
            </button>
            <button
              className={`filter-btn ${filter === 'non-technical' ? 'active' : ''}`}
              onClick={() => setFilter('non-technical')}
            >
              Non-Technical
            </button>
          </div>
        </div>

        <div className="clubs-grid">
          {filteredClubs.map(club => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ClubDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [club, setClub] = useState(null);

  useEffect(() => {
    const foundClub = clubData.clubs.find(c => c.id === parseInt(id));
    setClub(foundClub);
  }, [id]);

  if (!club) {
    return <div className="club-content">Loading...</div>;
  }

  const SocialIcon = ({ platform }) => {
    const icons = {
      instagram: Instagram,
      linkedin: Linkedin,
      github: Github,
      facebook: Facebook
    };
    const Icon = icons[platform];
    return Icon ? <Icon size={24} className="social-icon" /> : null;
  };

  return (
    <div className="club-container">
      <div className="club-content">
        <div className="club-detail">
          <button
            onClick={() => navigate('/club')}
            className="back-button"
          >
            ← Back to Clubs
          </button>
          
          <h1>{club.name}</h1>
          <p className="club-full-description">{club.fullDescription}</p>
          
          <div className="club-images">
            {club.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${club.name} ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="club-info-section">
            <h2>Club Information</h2>
            <div className="info-content">
              <div className="info-block">
                <h3>Club Lead</h3>
                <p>{club.leadName}</p>
                <div className="email-container">
                  <Mail size={16} />
                  <span>{club.leadEmail}</span>
                </div>
              </div>
              
              <div className="info-block">
                <h3>Social Links</h3>
                <div className="social-links">
                  {Object.entries(club.socialLinks).map(([platform]) => (
                    <SocialIcon key={platform} platform={platform} />
                  ))}
                </div>
              </div>

              <div className="info-block">
                <h3>Upcoming Events</h3>
                <ul>
                  {club.events.map((event, index) => (
                    <li key={index}>{event}</li>
                  ))}
                </ul>
              </div>

              <div className="info-block">
                <h3>Achievements</h3>
                <ul>
                  {club.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Club = () => {
  return (
    <Routes>
      <Route path="/" element={<ClubList />} />
      <Route path="/:id" element={<ClubDetail />} />
    </Routes>
  );
};

export default Club;