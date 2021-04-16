import React, { useState } from "react";
import { node, string } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./passwordInput.css";

const eye = <FontAwesomeIcon icon={faEye} />;
const slash = <FontAwesomeIcon icon={faEyeSlash} />;

function PasswordInput({
  label,
  name,
  labelClass,
  type,
  inputClass,
  value,
  onChange,
}) {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <div className="pass-wrapper">
        <input
          id={name}
          name={name}
          className={inputClass}
          type={passwordShown ? "text" : type}
          value={value}
          onChange={onChange}
          required
        />
        <button onClick={togglePasswordVisiblity} type="button">
          <i>{passwordShown ? slash : eye}</i>
        </button>
      </div>
    </>
  );
}

PasswordInput.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  labelClass: string.isRequired,
  type: string.isRequired,
  inputClass: string.isRequired,
  value: string.isRequired,
  onChange: string.isRequired,
};

export default PasswordInput;
