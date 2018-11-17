import React from "react";
import { mod } from "fp-small";

export function getStyledSlides(animation, slides, currentSlide, styles = {}) {
  const slidesCount = slides.length;
  switch (animation) {
    case "slide-horizontal":
      return slides.map((x, i) => {
        return (
          <x.type
            key={i}
            {...x.props}
            style={{
              ...styles,
              transform: `translateX(${i * 100}%)`,
              zIndex: i === currentSlide ? 10 : 0
            }}
          />
        );
      });
    case "slide-vertical":
      return slides.map((x, i) => {
        return (
          <x.type
            key={i}
            {...x.props}
            style={{
              transform: `translateY(${i * 100}%)`,
              zIndex: i === currentSlide ? 10 : 0
            }}
          />
        );
      });
    case "fade":
      return slides.map((x, i) => {
        return (
          <x.type
            key={i}
            {...x.props}
            style={{
              ...styles,
              opacity: i === currentSlide ? 1 : 0,
              zIndex: i === currentSlide ? 10 : 0
            }}
          />
        );
      });
    case "3d":
      return slides.map((x, i) => {
        let style = {};
        if (i === currentSlide) {
          style = {
            transform: "rotateY(0deg) translateZ(50vw)"
            // zIndex: i === currentSlide ? 10 : 0
          };
        } else if (i === mod(slidesCount, currentSlide - 1)) {
          style = {
            transform: "rotateY(-90deg) translateZ(50vw)"
          };
        } else if (i === mod(slidesCount, currentSlide + 1)) {
          style = {
            transform: "rotateY( 90deg) translateZ(50vw) "
          };
        }
        return <x.type key={i} {...x.props} style={style} />;
      });
    default:
      return slides;
  }
}

export function getSliderStyles(animation, slide) {
  switch (animation) {
    case "slide-horizontal":
      return {
        transform: `translateX(${-slide * 100}%)`
      };
    case "slide-vertical":
      return {
        transform: `translateY(${-slide * 100}%)`
      };
    case "3d":
      return {
        transform: `translateZ(-50vw) rotateY( -90deg)`
      };

    default:
      return {};
  }
}
