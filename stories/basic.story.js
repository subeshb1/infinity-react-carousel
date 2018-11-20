import React from "react";
import { storiesOf, addDecorator, setAddon } from "@storybook/react";
import { Carousel, CarouselState } from "../src";
import {
  withKnobs,
  text,
  boolean,
  number,
  select
} from "@storybook/addon-knobs";
import JSXAddon from "storybook-addon-jsx";
// import "infinity-react-transition/dist/transition.css";
setAddon(JSXAddon);

addDecorator(withKnobs);
storiesOf("Variants", module)
  .addWithJSX("without state", () => {
    return (
      <Carousel
        slide={number("Slide Number", 0)}
        animation={select(
          "Animation",
          {
            FADE: "fade",
            HORIZONTAL: "horizontal",
            VERTICAL: "vertical"
          },
          "horizontal"
        )}
        duration={text("Duration", "1s")}
        timingFunction={text("Timing Function", "ease")}
        style={{
          height: "100vh"
        }}
        noControl={boolean("Slide Control Off", false)}
        showChangeButtons={boolean("Change Buttons", true)}
        showIndicators={boolean("Indicators", true)}
        scroll={number("Number of Slides to Scroll", 1)}
        show={number("Number of Slides to Show", 1)}
        alignControl={select(
          "Control Alignment",
          {
            HORIZONTAL: "horizontal",
            VERTICAL: "vertical"
          },
          "horizontal"
        )}
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
        slide={number("Slide Number", 0)}
        animation={select(
          "Animation",
          {
            FADE: "fade",
            HORIZONTAL: "horizontal",
            VERTICAL: "vertical"
          },
          "horizontal"
        )}
        duration={text("Duration", "1s")}
        timingFunction={text("Timing Function", "ease")}
        style={{
          height: "100vh"
        }}
        noControl={boolean("Slide Control Off", false)}
        showChangeButtons={boolean("Change Buttons", true)}
        showIndicators={boolean("Indicators", true)}
        scroll={number("Number of Slides to Scroll", 1)}
        show={number("Number of Slides to Show", 1)}
        alignControl={select(
          "Align Control",
          {
            HORIZONTAL: "horizontal",
            VERTICAL: "vertical"
          },
          "horizontal"
        )}
        interval={number("Change Interval in millisecond", 3000)}
        automate={boolean("Automate ", true)}
        touchScroll={boolean("Touch Scroll ", true)}
      >
        <Carousel.Slide>
          <div className="center-slide">
            <CarouselState style={{ width: 200, height: 300, margin: 50 }}>
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
