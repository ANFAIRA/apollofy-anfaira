import React from "react";
import { string, func } from "prop-types";

const Input = ({
  name,
  type,
  inputClass,
  onChange,
  placeholder,
  defaultValue,
}) => (
  <>
    <input
      id={name}
      name={name}
      className={inputClass}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  </>
);

Input.propTypes = {
  name: string.isRequired,
  type: string.isRequired,
  inputClass: string.isRequired,
  onChange: func.isRequired,
  placeholder: string,
  defaultValue: string.isRequired,
};

Input.defaultProps = {
  placeholder: "",
};

export default Input;
