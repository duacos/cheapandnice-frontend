import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

const MainSlider = () => {
  const slides = [
    {
      image:
        "https://www.futureworld.com.np/wp-content/uploads/2017/02/ipad-pro-banner-global.jpg",
    },
    {
      image:
        "https://thedigital.agency/wp-content/uploads/2019/04/BlackFriday_StoreWF.jpg",
    },

    {
      image:
        "https://file.hstatic.net/1000347078/collection/banner_macbook_92054b106e2d457f9391d59825973023.jpg",
    },
  ];
  return (
    <Slider autoplay={3000}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className="slider-content"
          style={{
            background: `url('${slide.image}') no-repeat center center`,
            width: "100%",
          }}
        >
          <div className="slider-text" key={index}></div>
        </div>
      ))}
    </Slider>
  );
};

export default MainSlider;
