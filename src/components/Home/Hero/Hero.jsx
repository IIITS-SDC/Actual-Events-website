import React from 'react'


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
function Hero() {
  return (
    <div className='hero-container'>
        <h1 className="title">Welcome to Clubs of IIIT Sricity</h1>
        <p className="description">
          Discover the vibrant clubs of IIIT Sricity<br />
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
     </div>
  )
}

export default Hero