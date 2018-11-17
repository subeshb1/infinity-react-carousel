import React from "react";
import PropTypes from "prop-types";
import "../carousel.css";
const Slide = ({ children, ...otherProps }) => (
  <div className="slide" {...otherProps}>
    {children}
  </div>
);

function getStyledSlides(slides, currentSlide) {
  return slides.map((x, i) => {
    return (
      <x.type
        key={i}
        {...x.props}
        style={{
          transform: `translateX(${-i * 100}%)`
        }}
      />
    );
  });
}

function getSliderStyles(slide) {
  return {
    transform: `translateX(${-slide * 100}%)`
  };
}

function Carousel({ children, slide, onPrevious, onNext, ...otherProps }) {
  const slides = getStyledSlides(
    React.Children.map(children, elem => {
      if (elem.type !== Slide)
        throw new TypeError("Carousel can only take Slide as Children");
      return elem;
    }),
    slide
  );

  return (
    <div className="carousel" style={{ height: "100vh" }}>
      <div className="slides" style={getSliderStyles(slide)}>
        {slides}
      </div>
      <div className="horizontal previous" onClick={onPrevious}>
        <span className="arrow" />
      </div>
      <div className="horizontal next" onClick={onNext}>
        <span className="arrow" />
      </div>
      <div className="horizontal-indicator indicators">
        {new Array(slides.length).fill(1).map((_, i) => (
          <div className={`${slide === i ? "active" : ""} item`} key={i} />
        ))}
      </div>
    </div>
  );
}

Carousel.Slide = Slide;

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  onSlideChange: PropTypes.func,
  slide: PropTypes.number
};

Carousel.defaultProps = {
  slide: 0,
  onNext: () => {},
  onPrevious: () => {}
};

export default Carousel;
