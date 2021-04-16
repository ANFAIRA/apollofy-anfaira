import React from "react";
import { node, string } from "prop-types";

const Input = ({
  label,
  name,
  labelClass,
  type,
  inputClass,
  value,
  onChange,
}) => (
  <>
    <label htmlFor={name} className={labelClass}>
      {label}
    </label>
    <input
      id={name}
      name={name}
      className={inputClass}
      type={type}
      value={value}
      onChange={onChange}
    />
  </>
);

Input.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  labelClass: string.isRequired,
  type: string.isRequired,
  inputClass: string.isRequired,
  value: string.isRequired,
  onChange: string.isRequired,
};

export default Input;
