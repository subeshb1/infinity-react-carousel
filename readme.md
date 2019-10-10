# Infinity React Carousel

## Usage

```
yarn add infinity-react-carousel
```

```js
//App.js
import { Carousel, CarouselState } from "infinity-react-carousel";

function App() {

return (
      <CarouselState
        slide={0}
        responsive={false}
        minDimension={200)}
        animation={
          {
            FADE: "fade",
            HORIZONTAL: "horizontal",
            VERTICAL: "vertical",
            UNCOVER: "uncover-horizontal",
            "UNCOVER DOWN": "uncover-vertical",
            SCROLL: "scroll-horizontal",
            "SCROLL VERTICAL": "scroll-vertical"
          },
          "scroll-horizontal"
        }
        duration={"1s"}
        timingFunction={"ease"}
        style={{
          height: "100vh"
        }}
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
          <div className="center-slide">
            First <a href="#last">Last</a>{" "}
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
        <Carousel.Slide>
          <div className="center-slide">Fifth</div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="center-slide">Sixth</div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="center-slide" id="last">
            Seventh
          </div>
        </Carousel.Slide>
      </CarouselState>
    );
}

```

Contributing

## Setup

Requirements: [nodejs](https://nodejs.org/en/)

### Install yarn

```
npm i -g yarn
```

### Clone the repo

```
git clone https://github.com/subeshb1/infinity-react-carousel.git
```

### Install dependencies

```
yarn
```

### Start StoryBook

```
yarn storybook
```

Then make your changes and make a pull request.
