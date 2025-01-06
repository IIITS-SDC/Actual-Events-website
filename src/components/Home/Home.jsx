import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  const images = [
    "/src/assets/event 3.jpeg",  // Increased image size
    "/src/assets/event1.jpeg",
    "/src/assets/event2.jpeg",
    "/src/assets/event2.jpeg"
  ];

  return (
    <div className="home-container">
      {/* Shooting Stars */}
      {[...Array(50)].map((_, i) => (
        <ShootingStar key={i} />
      ))}

      {/* Main Content */}
      <main className="main-content">
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
        
        {/* Image Carousel */}
        <div className="carousel-container">
          <Slider {...carouselSettings}>
            {images.map((image, index) => (
              <div key={index} className="carousel-slide">
                <img src={image} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      </main>
    </div>
  );
}

export default Home;