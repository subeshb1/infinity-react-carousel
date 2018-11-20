import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import "./index.css";
import { setOptions } from "@storybook/addon-options";
import { themes } from "@storybook/components";
import { Carousel } from "../src";
// setOptions({
//   theme: { ...themes.dark }
// });

storiesOf("Welcome", module).add(
  "to Infinity React Transition",
  withInfo()(() => {
    return (
      <Carousel>
        <Carousel.Slide>
          <div className="center-slide">Click Show info to view Api</div>
        </Carousel.Slide>
      </Carousel>
    );
  })
);
