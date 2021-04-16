import { node, string } from "prop-types";
import React from "react";

const Avatar = ({ placeholder, height, width, textSize }) => {
  return (
    <div className={`avatar ${height} ${width}`}>
      <h5 className={`${textSize} `}>{placeholder}</h5>
    </div>
  );
};

Avatar.propTypes = {
  placeholder: node.isRequired,
  height: string.isRequired,
  width: string.isRequired,
  textSize: string.isRequired,
};

export default Avatar;
