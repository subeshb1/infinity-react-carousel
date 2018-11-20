import React, { Component } from "react";
import Carousel from "../Carousel";
import PropTypes from "prop-types";
import { mod } from "fp-small";
const animateArr = ["fade", "horizontal", "vertical"];
function getPageCoord(e, value = "pageX") {
  e.preventDefault();
  e.stopPropagation();
  if (e.type.includes("touch")) {
    return e.changedTouches[0][value];
  }

  return e[value];
}
export default class CarouselState extends Component {
  state = {
    currentSlide: 0
  };
  mouseIn = false;
  unmount = false;
  getTotalSlides() {
    const { children, scroll = 1 } = this.props;
    const slideCount = Math.ceil(React.Children.count(children) / scroll);
    return slideCount;
  }
  componentDidMount() {
    const { initialSlide } = this.props;
    this.setState({
      currentSlide: initialSlide < this.getTotalSlides() - 1 ? initialSlide : 0
    });

    if (this.props.automate) {
      this.createInterval();
    }
  }
  createInterval = () => {
    this.removeInterval();
    this.interval = setInterval(() => {
      if (!this.props.automate) this.removeInterval();
      if (!this.unmount) this.onAction(1)();
    }, this.props.interval);
  };
  removeInterval = () => {
    clearInterval(this.interval);
    this.interval = undefined;
  };

  onMouseEnter = () => {
    console.log("Enter");

    this.removeInterval();
  };
  onMouseLeave = () => {
    console.log("Leave");
    if (this.props.automate) this.createInterval();
  };
  componentWillUnmount() {
    this.unmount = true;
    this.removeInterval();
  }

  changeSlide = (slide = 0) => {
    this.setState({ currentSlide: slide });
  };

  onAction = val => () => {
    this.setState(({ currentSlide }) => {
      let slide = mod(this.getTotalSlides(), currentSlide + val);
      return { currentSlide: slide };
    });
  };

  onStart = e => {
    if (
      !this.props.touchScroll ||
      (this.props.animation && !this.props.animation.includes("al"))
    )
      return;
    if (this.pressed) {
      this.onEnd(e);
      return;
    }
    const horizontal =
      this.props.animation === "horizontal" || !this.props.animation;
    this.offsetKey = horizontal ? "offsetLeft" : "offsetTop";
    this.posKey = horizontal ? "left" : "top";
    this.pageKey = horizontal ? "pageX" : "pageY";
    this.dimension = horizontal ? "offsetWidth" : "offsetHeight";
    const slider = e.currentTarget;
    this.pressed = true;
    this.coord = getPageCoord(e, this.pageKey) - slider[this.offsetKey];
    this.offset = slider[this.offsetKey];
    this.pos = slider.style[this.posKey];
    slider.style.transitionProperty = "none";
    this.moved = false;
  };
  onEnd = e => {
    if (!this.pressed || !this.moved) {
      this.pressed = false;
      const slider = e.currentTarget;
      slider.style.transitionProperty = "all";
      return;
    }
    this.moved = false;

    const slider = e.currentTarget;
    slider.style[this.posKey] = this.pos;
    this.pressed = false;
    slider.style.transitionProperty = "all";

    if (
      Math.abs(this.offset - slider[this.offsetKey]) >
      slider[this.dimension] / (this.props.show || 1) / 5
    ) {
      if (this.offset > slider[this.offsetKey])
        this.state.currentSlide < this.getTotalSlides() - 1 &&
          this.onAction(1)();
      else this.state.currentSlide > 0 && this.onAction(-1)();
    }
  };

  onMove = e => {
    if (!this.pressed) return;
    this.moved = true;
    const slider = e.currentTarget;
    const coord = getPageCoord(e, this.pageKey) - this.offset;
    slider.style[this.posKey] = coord - this.coord + this.offset + "px";
  };

  render() {
    const { currentSlide } = this.state;
    const {
      animation,
      automate,
      interval,
      touchScroll,
      ...otherProps
    } = this.props;

    return (
      <Carousel
        {...otherProps}
        onStart={this.onStart}
        onEnd={this.onEnd}
        onMove={this.onMove}
        slide={currentSlide}
        onNext={this.onAction(1)}
        onPrevious={this.onAction(-1)}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
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

CarouselState.defaultProps = {
  touchScroll: true,
  interval: 5000,
  automate: true
};
CarouselState.propTypes = {
  /** Scroll when TouchMove  */
  touchScroll: PropTypes.bool,
  /** Set Interval  */
  interval: PropTypes.number,
  /** Automate Interval  */
  automate: PropTypes.bool
};
