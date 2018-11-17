import React, { Component } from "react";
import Carousel from "../Carousel";
import fp from "fp-small";

function mod(m, val) {
  while (val < 0) {
    val += m;
  }
  return val % m;
}
export default class CarouselState extends Component {
  state = {
    currentSlide: 0,
    interval: 100,
    slideCount: 0
  };
  componentDidMount() {
    const { initialSlide, children } = this.props;
    const slideCount = React.Children.count(children);

    this.setState({
      currentSlide: initialSlide < slideCount ? initialSlide : 0,
      slideCount
    });
  }

  changeSlide = (slide = 0) => {
    this.setState({ currentSlide: slide });
  };

  onAction = () => val => {
    this.setState(({ currentSlide, total }) => {
      let slide = mod(total, currentSlide + val);
      return { currentSlide: slide };
    });
  };

  render() {
    const { currentSlide } = this.state;
    // const { children } = this.state;
    return (
      <Carousel
        {...this.props}
        slide={currentSlide}
        onNext={this.onAction(1)}
        onPrevious={this.onAction(1)}
        onSlide={this.changeSlide}
      />
    );
  }
}

CarouselState.Slide = Carousel.Slide;
