import React from "react";
import PropTypes from "prop-types";
import "../carousel.css";
import { getSliderStyles, getStyledSlides } from "./utils";
const Slide = ({ children, ...otherProps }) => (
  <div className="slide" {...otherProps}>
    {children}
  </div>
);

function Carousel({
  children,
  animation,
  slide,
  onPrevious,
  onNext,
  alignControl,
  noControl,
  onSlideChange,
  timingFunction,
  duration,
  ...otherProps
}) {
  const slides = React.Children.map(children, elem => {
    if (elem.type !== Slide)
      throw new TypeError("Carousel can only take Slide as Children");
    return elem;
  });
  const slidesCount = slides.length;
  const currentSlide =
    slide > slidesCount - 1 || slide < 0 || slide === undefined ? 0 : slide;
  const styledSlides = getStyledSlides(animation, slides, currentSlide, {
    transitionTimingFunction: timingFunction,
    transitionDuration: duration
  });

  return (
    <div className="carousel" style={{ height: "100vh" }}>
      <div
        className="slides"
        style={{
          ...getSliderStyles(animation, currentSlide),
          transitionTimingFunction: timingFunction,
          transitionDuration: duration
        }}
      >
        {styledSlides}
      </div>
      {!noControl && (
        <>
          <div className={`${alignControl} previous`} onClick={onPrevious}>
            <span className="arrow" />
          </div>
          <div className={`${alignControl} next`} onClick={onNext}>
            <span className="arrow" />
          </div>
          <div className={`${alignControl}-indicator indicators`}>
            {new Array(slidesCount).fill(1).map((_, i) => (
              <div
                className={`${currentSlide === i ? "active" : ""} item`}
                key={i}
                onClick={() => onSlideChange(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

Carousel.Slide = Slide;

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  onSlideChange: PropTypes.func,
  slide: PropTypes.number,
  noControl: PropTypes.bool,
  alignControl: PropTypes.oneOf(["horizontal", "vertical"]),
  animation: PropTypes.oneOf([
    "fade",
    "slide-horizontal",
    "slide-vertical",
    "3d"
  ]),
  duration: PropTypes.string,
  timingFunction: PropTypes.string
};

Carousel.defaultProps = {
  slide: 0,
  onNext: () => {},
  onPrevious: () => {},
  onSlideChange: () => {},
  noControl: false,
  alignControl: "horizontal",
  animation: "slide-horizontal",
  duration: "1s",
  timingFunction: "ease"
};

export default Carousel;
