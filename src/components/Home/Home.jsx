import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const ShootingStar = () => (
  <div 
    className="shooting-star" 
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${2 + Math.random() * 3}s`,
      animationDelay: `${Math.random() * 2}s`
    }} 
  />
);

function Home() {
  return (
    <div className="home-container">
      {/* Shooting Stars */}
      {[...Array(50)].map((_, i) => (
        <ShootingStar key={i} />
      ))}

      {/* Main Content */}
      <main className="main-content">
        <h1 className="title">Welcome to IIIT Sricity Clubs</h1>
        <p className="description">
          Discover the vibrant clubs of IIIT Sricity
          Catch up on all events, workshops, and activities happening in the clubs of IIIT Sricity.
          Learn new skills, meet new people, and grow together!
        </p>
        <div className="button-container">
          <Link to="/club" className="primary-button">
            Explore Clubs
          </Link>
          <Link to="/events" className="secondary-button">
            Upcoming Events
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Home;