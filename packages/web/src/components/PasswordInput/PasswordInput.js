import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { func, object, string } from "prop-types";
import React, { useState } from "react";
import "./passwordInput.css";

const eye = <FontAwesomeIcon icon={faEye} />;
const slash = <FontAwesomeIcon icon={faEyeSlash} />;

const PasswordInput = ({
  name,
  type,
  inputClass,
  onChange,
  placeholder,
  register,
  validation,
  errors,
}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className="relative">
      <div className="pass-wrapper">
        <input
          id={name}
          name={name}
          className={inputClass}
          type={passwordShown ? "text" : type}
          onChange={onChange}
          placeholder={placeholder}
          {...register(name, validation)}
          validation={validation}
        />
        <button onClick={togglePasswordVisibility} type="button">
          <i>{passwordShown ? slash : eye}</i>
        </button>
      </div>
      {errors && (
        <p className="absolute w-full -mt-8 mb-3 border-t-4 border-red-600">
          {errors.message}
        </p>
      )}
    </div>
  );
};

PasswordInput.propTypes = {
  name: string.isRequired,
  type: string.isRequired,
  inputClass: string.isRequired,
  onChange: func.isRequired,
  placeholder: string.isRequired,
  register: func.isRequired,
  validation: object.isRequired,
  errors: string,
};

PasswordInput.defaultProps = {
  errors: "",
};

export default PasswordInput;
