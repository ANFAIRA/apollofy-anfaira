import React from "react";
import { string, func, object, array } from "prop-types";

const Input = ({
  name,
  type,
  inputClass,
  onChange,
  placeholder,
  defaultValue,
  register,
  validation,
  errors,
}) => {
  return (
    <>
      <input
        id={name}
        name={name}
        className={inputClass}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name, validation)}
        validation={validation}
      />
      {errors && (
        <p className="-mt-5 mb-3 border-t-4 border-red-600">{errors.message}</p>
      )}
    </>
  );
};

Input.propTypes = {
  name: string.isRequired,
  type: string.isRequired,
  inputClass: string.isRequired,
  onChange: func.isRequired,
  placeholder: string,
  defaultValue: string,
  register: func.isRequired,
  validation: object.isRequired,
  errors: array.isRequired,
};

Input.defaultProps = {
  placeholder: "",
  defaultValue: "",
};

export default Input;
