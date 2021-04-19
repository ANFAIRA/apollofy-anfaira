import React, { useState } from "react";
import { string } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./passwordInput.css";

const eye = <FontAwesomeIcon icon={faEye} />;
const slash = <FontAwesomeIcon icon={faEyeSlash} />;

function PasswordInput({
  name,
  type,
  inputClass,
  value,
  onChange,
  placeholder,
}) {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      <div className="pass-wrapper">
        <input
          id={name}
          name={name}
          className={inputClass}
          type={passwordShown ? "text" : type}
          value={value}
          onChange={onChange}
          required
          placeholder={placeholder}
        />
        <button onClick={togglePasswordVisiblity} type="button">
          <i>{passwordShown ? slash : eye}</i>
        </button>
      </div>
    </>
  );
}

PasswordInput.propTypes = {
  name: string.isRequired,
  type: string.isRequired,
  inputClass: string.isRequired,
  value: string.isRequired,
  onChange: string.isRequired,
  placeholder: string.isRequired,
};

export default PasswordInput;
