import React from "react";
import { storiesOf, addDecorator, setAddon } from "@storybook/react";
import { Carousel, CarouselState } from "../";
import {
  withKnobs,
  text,
  boolean,
  number,
  select
} from "@storybook/addon-knobs";
import JSXAddon from "storybook-addon-jsx";
setAddon(JSXAddon);

addDecorator(withKnobs);
storiesOf("Basic Usage", module)
  .addWithJSX("without state", () => {
    return (
      <Carousel
        slide={number("Slide Number", 0)}
        noControl={boolean("Slide Control", false)}
        animation={select(
          "Animation",
          {
            FADE: "fade",
            HORIZONTAL: "slide-horizontal",
            VERTICAL: "slide-vertical"
          },
          "fade"
        )}
        duration={text("Duration", "1s")}
        timingFunction={text("Timing Function", "ease")}
      >
        <Carousel.Slide>
          <div className="center-slide">First</div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="center-slide">Second</div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="center-slide">Third</div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="center-slide">Fourth</div>
        </Carousel.Slide>
      </Carousel>
    );
  })
  .addWithJSX("with state handled", () => {
    return (
      <CarouselState
        noControl={boolean("Slide Control", false)}
        animation={select(
          "Animation",
          {
            FADE: "fade",
            HORIZONTAL: "slide-horizontal",
            VERTICAL: "slide-vertical",
            RANDOM: "random"
          },
          "fade"
        )}
        duration={text("Duration", "1s")}
        timingFunction={text("Timing Function", "ease")}
      >
        <Carousel.Slide>
          <div className="center-slide">First</div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="center-slide">Second</div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="center-slide">Third</div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="center-slide">Fourth</div>
        </Carousel.Slide>
      </CarouselState>
    );
  });
