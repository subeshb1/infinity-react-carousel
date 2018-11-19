import React from "react";
import { mod } from "fp-small";

export function getStyledSlides(
  animation,
  slides,
  currentSlide,
  styles = {},
  show = 1
) {
  const slidesCount = slides.length;
  switch (animation) {
    case "horizontal":
    case "vertical":
      return slides.map((x, i) => {
        let style = x.props.style || {};
        return (
          <x.type
            key={i}
            {...x.props}
            style={{
              ...style,
              ...styles,
              ...(animation === "horizontal"
                ? { width: 100 / show + "%", left: `${(i * 100) / show}%` }
                : { height: 100 / show + "%", top: `${(i * 100) / show}%` }),
              zIndex: i === currentSlide ? 10 : 0
            }}
          />
        );
      });
    case "fade":
      return slides.map((x, i) => {
        let style = x.props.style || {};
        return (
          <x.type
            key={i}
            {...x.props}
            style={{
              ...style,
              ...styles,
              opacity: i === currentSlide ? 1 : 0,
              zIndex: i === currentSlide ? 10 : 0
            }}
          />
        );
      });
    default:
      return slides;
  }
}

export function getSliderStyles(animation, slide, show = 1, scroll = 1) {
  if (animation === "horizontal")
    return {
      left: `${-slide * ((100 / show) * scroll)}%`
    };
  else if (animation === "vertical")
    return {
      top: `${-slide * ((100 / show) * scroll)}%`
    };

  return {};
}
