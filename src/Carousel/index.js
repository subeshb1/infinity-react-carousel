import React from "react";
import PropTypes from "prop-types";
import "../carousel.css";
import Chevron from "../chevron.svg";
import { getSliderStyles, getStyledSlides } from "./utils";

const Slide = ({ children, className, ...otherProps }) => (
  <div className={className || "" + " slide"} {...otherProps}>
    {children}
  </div>
);

function Carousel({
  children,
  animation,
  slide,
  onPrevious,
  onNext,
  onMouseEnter,
  onMove,
  onStart,
  onEnd,
  onSlideChange,
  alignControl,
  noControl,
  timingFunction,
  show,
  scroll,
  onMouseLeave,
  showIndicators,
  showChangeButtons,
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
  const styledSlides = getStyledSlides(
    animation,
    slides,
    currentSlide,
    {
      transitionTimingFunction: timingFunction,
      transitionDuration: duration
    },
    show
  );

  return (
    <div
      className="carousel"
      style={{ height: "100vh" }}
      {...otherProps}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="slides"
        onTouchStart={onStart}
        onTouchEnd={onEnd}
        onTouchMove={onMove}
        onMouseLeave={onEnd}
        onMouseDown={onStart}
        onMouseMove={onMove}
        onMouseUp={onEnd}
        style={{
          ...getSliderStyles(animation, currentSlide, show, scroll),
          transitionTimingFunction: timingFunction,
          transitionDuration: duration
        }}
      >
        {styledSlides}
      </div>
      {!noControl && (
        <>
          {showChangeButtons && (
            <>
              <div className={`${alignControl} previous`} onClick={onPrevious}>
                <img src={Chevron} className="arrow" />
              </div>
              <div className={`${alignControl} next`} onClick={onNext}>
                <img src={Chevron} className="arrow" />
              </div>
            </>
          )}
          {showIndicators && (
            <div className={`${alignControl}-indicator indicators`}>
              {new Array(Math.ceil(slidesCount / scroll))
                .fill(1)
                .map((_, i) => (
                  <div
                    className={`${currentSlide === i ? "active" : ""} item`}
                    key={i}
                    onClick={() => onSlideChange(i)}
                  />
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

Carousel.Slide = Slide;

Carousel.propTypes = {
  /** Carousel.Slide Childrens */
  children: PropTypes.arrayOf(PropTypes.element),
  /** Triggered when next action is fired */
  onNext: PropTypes.func,
  /** Triggered when previous action is fired */
  onPrevious: PropTypes.func,
  /** Triggered when slide Change action is fired */
  onSlideChange: PropTypes.func,
  /** The Current Slide */
  slide: PropTypes.number,
  /** Control Display */
  noControl: PropTypes.bool,
  /** Control Alignment */
  alignControl: PropTypes.oneOf(["horizontal", "vertical"]),
  /** Animation Type */
  animation: PropTypes.oneOf([
    "fade",
    "horizontal",
    "vertical",
    "uncover",
    "uncover-down"
  ]),
  /** Slide Change Duration */
  duration: PropTypes.string,
  /** Transition Timing Function */
  timingFunction: PropTypes.string,
  /** Scroll n number of slides */
  scroll: PropTypes.number,
  /** Show n number of slides */
  show: PropTypes.number,
  /** Show indicators */
  showIndicators: PropTypes.bool,
  /** Show Change Buttons */
  showChangeButtons: PropTypes.bool
};

Carousel.defaultProps = {
  slide: 0,
  onNext: () => {},
  onPrevious: () => {},
  onSlideChange: () => {},
  onStart: () => {},
  onMove: () => {},
  onEnd: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  noControl: false,
  alignControl: "horizontal",
  animation: "horizontal",
  duration: "1s",
  timingFunction: "ease",
  scroll: 1,
  show: 1,
  showIndicators: true,
  showChangeButtons: true
};

export default Carousel;
