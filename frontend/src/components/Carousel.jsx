import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    infinite: true,       // Loop the slides
    speed: 500,           // Transition speed
    slidesToShow: 3,      // Show 3 slides at a time
    slidesToScroll: 1,    // Scroll one slide at a time
    autoplay: true,       // Automatically change slides
    autoplaySpeed: 3000,  // Change slides every 3 seconds
    arrows: false,        // Remove the previous/next arrows
    dots: true            // Show navigation dots
  };

  return (
    <div className="w-full mx-auto"> {/* Full width container */}
      <Slider {...settings} className="">  {/* Add a custom class */}
        <div>
          <img src="./img/blood.webp" alt="Slide 1" className="w-full h-[40vh] object-fill" />
        </div>
        <div>
          <img src="./img/heat.avif" alt="Slide 2" className="w-full h-[40vh] object-fill" />
        </div>
        <div>
          <img src="./img/road.webp" alt="Slide 3" className="w-full h-[40vh] object-fill " />
        </div>
        <div>
          <img src="./img/travel.jpg" alt="Slide 4" className="w-full h-[40vh] object-fill" />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
