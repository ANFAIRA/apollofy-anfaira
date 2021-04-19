import React from "react";
import { string } from "prop-types";
import { func } from "prop-types";

const Input = ({
  name,
  type,
  inputClass,
  value,
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
      value={value}
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
  value: string.isRequired,
  onChange: func.isRequired,
  placeholder: string.isRequired,
  defaultValue: string.isRequired,
};

export default Input;
