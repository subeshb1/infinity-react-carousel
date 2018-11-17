import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import Carousel from "../CarouselState";
storiesOf("Basic Usage", module).add("to Infinity React Transition", () => {
  return (
    <Carousel>
      <Carousel.Slide>
        <div className="image">
          <img
            src="https://www.hikvision.com/ueditor/net/upload/2016-03-24/c7518925-e031-4f70-a248-5b468bbdc5dd.jpg"
            alt=""
          />
        </div>
      </Carousel.Slide>
      <Carousel.Slide>
        <div className="image">
          <img
            src="https://i.ytimg.com/vi/PlnyTPhII60/maxresdefault.jpg"
            alt=""
          />
        </div>
      </Carousel.Slide>
      <Carousel.Slide>
        <div className="image">
          <img
            src="https://www.hikvision.com/ueditor/net/upload/2016-03-24/c7518925-e031-4f70-a248-5b468bbdc5dd.jpg"
            alt=""
          />
        </div>
      </Carousel.Slide>
      <Carousel.Slide>
        <div className="image">
          <img
            src="https://i.ytimg.com/vi/PlnyTPhII60/maxresdefault.jpg"
            alt=""
          />
        </div>
      </Carousel.Slide>
      
    </Carousel>
  );
});
