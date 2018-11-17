import React, { Component } from "react";
import Carousel from "../Carousel";
import { mod } from "fp-small";
const animateArr = ["fade", "slide-horizontal", "slide-vertical"];
export default class CarouselState extends Component {
  state = {
    currentSlide: 0,
    interval: 100,
    slideCount: 0
  };
  componentDidMount() {
    const { initialSlide, children } = this.props;
    const slideCount = React.Children.count(children);
    console.log(slideCount);
    this.setState({
      currentSlide: initialSlide < slideCount - 1 ? initialSlide : 0,
      slideCount
    });
  }

  changeSlide = (slide = 0) => {
    console.log(slide);
    this.setState({ currentSlide: slide });
  };

  onAction = val => () => {
    console.log("HEre");
    this.setState(({ currentSlide, slideCount }) => {
      let slide = mod(slideCount, currentSlide + val);
      console.log(slide);
      return { currentSlide: slide };
    });
  };

  render() {
    const { currentSlide } = this.state;
    const { animation, ...otherProps } = this.props;

    return (
      <Carousel
        {...otherProps}
        slide={currentSlide}
        onNext={this.onAction(1)}
        onPrevious={this.onAction(-1)}
        onSlideChange={this.changeSlide}
        animation={
          animation === "random"
            ? animateArr[parseInt(Math.random() * 3)]
            : animation
        }
      />
    );
  }
}

CarouselState.Slide = Carousel.Slide;
