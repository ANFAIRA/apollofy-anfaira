import React from "react";
import { string } from "prop-types";

const Input = ({ name, type, inputClass, value, onChange, placeholder }) => (
  <>
    <input
      id={name}
      name={name}
      className={inputClass}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </>
);

Input.propTypes = {
  name: string.isRequired,
  type: string.isRequired,
  inputClass: string.isRequired,
  value: string.isRequired,
  onChange: string.isRequired,
  placeholder: string.isRequired,
};

export default Input;
