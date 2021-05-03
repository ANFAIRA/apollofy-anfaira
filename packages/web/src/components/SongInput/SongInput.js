import { func, object, oneOfType, string } from "prop-types";
import React from "react";
import { fileTypes } from "../../services/cloudinary";

const SongInput = ({
  defaultValue,
  onChange,
  placeholder,
  register,
  validation,
  errors,
}) => {
  return (
    <div className="flex flex-col w-full h-40 items-center justify-center bg-grey-lighter mb-5 ml-2">
      <label
        htmlFor="song"
        className="w-full h-full sm:h-40 flex flex-col items-center justify-center font-semibold px-4 py-6 rounded-lg shadow-lg tracking-wide uppercase border border-indigo-500 cursor-pointer bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white"
      >
        {placeholder}
        <input
          id="song"
          name="song"
          className="form-input hidden"
          type="file"
          placeholder={placeholder}
          defaultValue={defaultValue}
          filetype={fileTypes.AUDIO}
          {...register("song", validation)}
          onChange={onChange}
          validation={validation}
        />
      </label>
      {errors && <p className="mb-5">Song is required</p>}
    </div>
  );
};

SongInput.propTypes = {
  onChange: func.isRequired,
  placeholder: oneOfType([string, object]),
  defaultValue: string,
  register: func.isRequired,
  validation: object.isRequired,
  errors: string,
};

SongInput.defaultProps = {
  defaultValue: "",
  errors: "",
  placeholder: "",
};

export default SongInput;
