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
      this.interval = this.createInterval();
    }
  }
  createInterval = () => {
    return setInterval(() => {
      if (!this.unmount) this.onAction(val);
    }, this.props.interval);
  };
  removeInterval = () => {
    if (this.interval !== undefined) clearInterval(this.interval);
    this.interval = undefined;
  };

  onMouseEnter = () => {
    
    this.createInterval();
  };
  onMouseLeave = () => {
    this.removeInterval();
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
    if (!this.props.touchScroll || this.props.animation === "fade") return;
    if (this.pressed) {
      this.onEnd();
      return;
    }
    const horizontal = this.props.animation === "horizontal";
    this.offsetKey = horizontal ? "offsetLeft" : "offsetTop";
    this.posKey = horizontal ? "left" : "top";
    this.pageKey = horizontal ? "pageX" : "pageY";
    const slider = e.currentTarget;
    this.pressed = true;
    this.coord = getPageCoord(e, this.pageKey) - slider[this.offsetKey];
    this.offset = slider[this.offsetKey];
    this.pos = slider.style[this.posKey];
    slider.style.transitionProperty = "none";
  };
  onEnd = e => {
    if (!this.pressed) return;
    const slider = e.currentTarget;
    slider.style[this.posKey] = this.pos;
    this.pressed = false;
    slider.style.transitionProperty = "all";

    if (
      Math.abs(this.offset - slider[this.offsetKey]) >
      slider.offsetWidth / 5
    ) {
      if (this.offset > slider[this.offsetKey])
        this.state.currentSlide < this.getTotalSlides() - 1 &&
          this.onAction(1)();
      else this.state.currentSlide > 0 && this.onAction(-1)();
    }
  };

  onMove = e => {
    if (!this.pressed) return;
    const slider = e.currentTarget;
    const x = getPageCoord(e, this.pageKey) - this.offset;
    slider.style[this.posKey] = x - this.coord + this.offset + "px";
  };

  render() {
    const { currentSlide } = this.state;
    const { animation, ...otherProps } = this.props;

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
  /** Scroll when TouchMove  */
  touchScroll: true,
  /** Set Interval  */
  interval: 2000,
  /** Automate Interval  */
  automate: false
};
CarouselState.propTypes = {
  touchScroll: PropTypes.bool,
  interval: PropTypes.number,
  automate: PropTypes.bool
};
