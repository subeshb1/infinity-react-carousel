import React, { Component } from "react";
import Carousel from "../Carousel";
import PropTypes from "prop-types";
import { mod } from "fp-small";
const animateArr = ["fade", "horizontal", "vertical"];

function getPageCoord(e, value = "pageX") {
  e.stopPropagation();
  if (e.type.includes("touch")) {
    return e.changedTouches[0][value];
  }
  e.preventDefault();

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

    if (this.props.automate && !this.props.animation.includes("scroll")) {
      this.createInterval();
    }

    if (
      this.props.responsive &&
      this.props.animation &&
      this.props.animation !== "fade"
    ) {
      const horizontal = this.props.animation.includes("horizontal");
      this.handle = () => {
        this.setState({
          show: Math.floor(
            window[horizontal ? "innerWidth" : "innerHeight"] /
              this.props.minDimension
          )
        });
      };
      this.handle();
      window.addEventListener("resize", this.handle);
    }
  }

  createInterval = () => {
    this.removeInterval();
    this.interval = setInterval(() => {
      if (!this.props.automate || this.props.animation.includes("scroll"))
        this.removeInterval();
      if (!this.unmount) this.onAction(1)();
    }, this.props.interval);
  };
  removeInterval = () => {
    clearInterval(this.interval);
    this.interval = undefined;
  };

  onMouseEnter = () => {
    this.removeInterval();
  };
  onMouseLeave = () => {
    if (this.props.automate && !this.props.animation.includes("scroll"))
      this.createInterval();
  };
  componentWillUnmount() {
    this.unmount = true;
    this.removeInterval();
    window.removeEventListener("resize", this.handle);
  }

  changeSlide = (slide = 0, slider) => {
    if (
      slider &&
      this.props.animation &&
      this.props.animation.includes("scroll")
    ) {
      const dimension = this.props.animation.includes("horizontal")
        ? "offsetWidth"
        : "offsetHeight";
      const offsetKey = this.props.animation.includes("horizontal")
        ? "scrollLeft"
        : "scrollTop";
      slider[offsetKey] = (slider[dimension] * slide) / this.props.show;

      return;
    }
    this.setState({ currentSlide: slide });
  };

  onAction = val => (_, slider) => {
    if (
      slider &&
      this.props.animation &&
      this.props.animation.includes("scroll")
    ) {
      const dimension = this.props.animation.includes("horizontal")
        ? "offsetWidth"
        : "offsetHeight";
      const offsetKey = this.props.animation.includes("horizontal")
        ? "scrollLeft"
        : "scrollTop";
      slider[offsetKey] =
        Math.round(
          (slider[offsetKey] +
            val *
              ((slider[dimension] * this.props.scroll) /
                (this.state.show || this.props.show))) /
            ((slider[dimension] * this.props.scroll) /
              (this.state.show || this.props.show) || 1)
        ) *
        ((slider[dimension] * this.props.scroll) /
          (this.state.show || this.props.show) || 1);

      return;
    }
    this.setState(({ currentSlide }) => {
      let slide = mod(this.getTotalSlides(), currentSlide + val);
      return { currentSlide: slide };
    });
  };

  onStart = e => {
    if (
      !this.props.touchScroll ||
      (this.props.animation && this.props.animation === "fade")
    )
      return;
    if (this.pressed) {
      this.onEnd(e);
      return;
    }
    const slider = e.currentTarget;

    const horizontal =
      this.props.animation.includes("horizontal") || !this.props.animation;
    this.pageKey = horizontal ? "pageX" : "pageY";
    this.dimension = horizontal ? "offsetWidth" : "offsetHeight";

    if (this.props.animation.includes("scroll")) {
      if (e.type.includes("touch")) return;

      this.offsetKey = horizontal ? "scrollLeft" : "scrollTop";
      this.offset = slider[this.offsetKey];
      this.coord = getPageCoord(e, this.pageKey) - this.offset;
    } else {
      this.offsetKey = horizontal ? "offsetLeft" : "offsetTop";
      this.posKey = horizontal ? "left" : "top";
      this.dimension = horizontal ? "offsetWidth" : "offsetHeight";
      this.offset = slider[this.offsetKey];
      this.coord = getPageCoord(e, this.pageKey) - this.offset;
      this.pos = slider.style[this.posKey];
      slider.style.transitionProperty = "none";
    }
    this.pressed = true;
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
    this.pressed = false;
    const slider = e.currentTarget;
    const scrollDistance = Math.abs(this.offset - slider[this.offsetKey]);
    const slideDimension =
      slider[this.dimension] * (this.props.scroll||1) / (this.state.show || this.props.show || 1);

    if (!this.props.animation.includes("scroll")) {
      const totalSlides = this.getTotalSlides();
      const currentSlide = this.state.currentSlide;
      slider.style[this.posKey] = this.pos;
      slider.style.transitionProperty = "all";

      let slidesToScroll = Math.ceil(scrollDistance / slideDimension);
      if (scrollDistance > slideDimension / 5) {
        if (this.offset > slider[this.offsetKey]) {
          slidesToScroll =
            currentSlide + slidesToScroll < totalSlides - 1
              ? slidesToScroll
              : totalSlides - currentSlide - 1;
          this.onAction(slidesToScroll)();
        } else {
          slidesToScroll =
            currentSlide - slidesToScroll > 0
              ? slidesToScroll
              : currentSlide;
          this.state.currentSlide > 0 && this.onAction(-slidesToScroll)();
        }
      }
    } else {
      slider.style.scrollBehavior = "smooth";
      slider[this.offsetKey] =
        Math.round(slider[this.offsetKey] / slideDimension) * slideDimension;
    }
  };

  onMove = e => {
    if (!this.pressed) return;
    const slider = e.currentTarget;
    if (!this.moved) slider.style.scrollBehavior = "unset";
    this.moved = true;
    const coord = getPageCoord(e, this.pageKey) - this.offset;
    if (this.props.animation.includes("scroll")) {
      slider[this.offsetKey] = this.offset - (coord - this.coord);
    } else slider.style[this.posKey] = coord - this.coord + this.offset + "px";
  };

  render() {
    const { currentSlide } = this.state;
    const {
      animation,
      automate,
      interval,
      responsive,
      minDimension,
      touchScroll,
      show,
      ...otherProps
    } = this.props;

    return (
      <Carousel
        show={this.state.show || show}
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
  automate: true,
  animation: "horizontal",
  show: 1,
  scroll: 1,
  responsive: false,
  minDimension: 200
};
CarouselState.propTypes = {
  /** Scroll when TouchMove  */
  touchScroll: PropTypes.bool,
  /** Set Interval  */
  interval: PropTypes.number,
  /** Automate Interval  */
  automate: PropTypes.bool,
  responsive: PropTypes.bool
};
