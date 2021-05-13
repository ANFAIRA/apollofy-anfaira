import { node } from "prop-types";
import React from "react";
import useSizeElement from "../../hooks/useSizeElement";
import useSliding from "../../hooks/useSliding";
import "./Slider.scss";
import SlideButton from "./SliderButton";

const Slider = ({ children }) => {
  const { width, elementRef } = useSizeElement();
  const {
    handlePrev,
    handleNext,
    slideProps,
    containerRef,
    hasNext,
    hasPrev,
  } = useSliding(width, React.Children.count(children));

  return (
    <div className="slider">
      {hasPrev && <SlideButton onClick={handlePrev} type="prev" />}
      <div ref={containerRef} className="slider--wrapper" {...slideProps}>
        <div ref={elementRef} className="slider--container">
          {children}
        </div>
      </div>
      {hasNext && <SlideButton onClick={handleNext} type="next" />}
    </div>
  );
};

Slider.propTypes = {
  children: node.isRequired,
};

export default Slider;
