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
import "infinity-react-transition/dist/transition.css";
setAddon(JSXAddon);

addDecorator(withKnobs);
storiesOf("Variants", module)
  .addWithJSX("without state", () => {
    return (
      <Carousel
        slide={number("Slide Number", 0)}
        noControl={boolean("Slide Control", false)}
        animation={select(
          "Animation",
          {
            FADE: "fade",
            HORIZONTAL: "horizontal",
            VERTICAL: "vertical"
          },
          "fade"
        )}
        duration={text("Duration", "1s")}
        timingFunction={text("Timing Function", "ease")}
        style={{
          height: "100vh"
        }}
      >
        <Carousel.Slide>
          <div className="center-slide">
            <div>First</div>
          </div>
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
            HORIZONTAL: "horizontal",
            VERTICAL: "vertical",
            RANDOM: "random"
          },
          "horizontal"
        )}
        duration={text("Duration", "1s")}
        timingFunction={text("Timing Function", "ease")}
        show={number("Show", 1)}
        scroll={number("Scroll", 1)}
      >
        <Carousel.Slide>
          <div className="center-slide">
            <CarouselState
              noControl={boolean("Slide Control", false)}
              animation={select(
                "Animation",
                {
                  FADE: "fade",
                  HORIZONTAL: "horizontal",
                  VERTICAL: "vertical",
                  RANDOM: "random"
                },
                "horizontal"
              )}
              duration={text("Duration", "1s")}
              timingFunction={text("Timing Function", "ease")}
              show={number("Show", 1)}
              scroll={number("Scroll", 1)}
              style={{ width: 200, height: 300, margin: 50 }}
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
              <Carousel.Slide>
                <div className="center-slide">Fifth</div>
              </Carousel.Slide>
              <Carousel.Slide>
                <div className="center-slide">Sixth</div>
              </Carousel.Slide>
            </CarouselState>
          </div>
        </Carousel.Slide>
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
        <Carousel.Slide>
          <div className="center-slide">Fifth</div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="center-slide">Sixth</div>
        </Carousel.Slide>
      </CarouselState>
    );
  });
