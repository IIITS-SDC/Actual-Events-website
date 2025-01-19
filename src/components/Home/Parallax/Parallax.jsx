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
function Parallax() {
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
    <div className='parallax-container'> 
       <div className="carousel-container">
          <Slider {...carouselSettings}>
            {images.map((image, index) => (
              <div key={index} className="carousel-slide">
                <img src={image} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
    </div>
  )
}

export default Parallax