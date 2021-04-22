import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bool, func } from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadSong,
  uploadSongReset,
} from "../../redux/uploader/uploader-actions";
import { uploaderSelector } from "../../redux/uploader/uploader-selectors";
import { fileTypes } from "../../services/cloudinary";
import Input from "../Input";

const close = <FontAwesomeIcon icon={faTimes} size="2x" />;

function SongModal({ showModal, setShowModal }) {
  const dispatch = useDispatch();
  const { isUploadingSong, uploadSongSuccess, uploadSongError } = useSelector(
    uploaderSelector,
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  // const [song, setSong] = useState();
  // const [image, setImage] = useState();

  function onSubmit(data) {
    dispatch(
      uploadSong({
        track: data.song[0],
        title: data.title,
        genre: data.genre,
        artist: data.artist,
      }),
    );
  }

  // function handleSetSong(uploadFile) {
  //   setSong(uploadFile);
  // }

  // function handleSetImage(uploadFile) {
  //   setImage(uploadFile);
  // }

  function handleCloseBtn() {
    setShowModal(false);
  }

  useEffect(() => {
    dispatch(uploadSongReset());
    uploadSongSuccess && setShowModal(false);
  }, [dispatch, uploadSongSuccess, setShowModal]);

  // useEffect(() => {
  //   register("song", { required: true });
  // }, []);

  return (
    <article className="md:w-3/6 md:mx-auto left-0 right-0 bg-dark mt-20 rounded-md">
      <div className="relative h-10">
        <button
          className="absolute top-3 right-5"
          type="button"
          onClick={handleCloseBtn}
        >
          <i className="text-gray-400 hover:text-gray-100">{close}</i>
        </button>
      </div>
      <div>
        <h2 className="text-center text-xl font-semibold">Upload a song</h2>
        <form
          className="flex flex-col px-20 py-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* <input
          name="image"
          type="file"
          placeholder="image"
          className="form-input"
          fileType={fileTypes.IMAGE}
          onFileSelected={(files) => {
            handleSetImage(files[0]);
          }}
          {...register("image", { required: true })}
        /> */}
          <div className="flex w-full items-center justify-center bg-grey-lighter mb-5">
            <label
              htmlFor="song"
              className={
                errors.song
                  ? "w-full flex flex-col items-center px-4 py-6 rounded-lg shadow-lg tracking-wide uppercase border-4 border-red-500 cursor-pointer bg-white text-red-500 hover:bg-red-500 hover:text-white"
                  : "w-full flex flex-col items-center px-4 py-6 rounded-lg shadow-lg tracking-wide uppercase border border-indigo-500 cursor-pointer bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white"
              }
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                Select a file
              </span>
              <input
                id="song"
                name="song"
                type="file"
                placeholder="song"
                className="form-input hidden"
                fileType={fileTypes.AUDIO}
                // onChange={(files) => {
                //   handleSetSong(files[0]);
                // }}
                {...register("song", { required: true })}
              />
            </label>
          </div>
          {errors.song && <p className="-mt-5 mb-5 pt-2">Song is required</p>}
          {isUploadingSong && <p>Uploading song...</p>}
          {uploadSongSuccess && <p>Upload successful!</p>}
          {uploadSongError && <p>Upload error!</p>}
          <Input
            name="title"
            type="text"
            placeholder="title"
            inputClass="form-input"
            onChange={(e) => setValue("title", e.target.value)}
            validation={{
              required: { value: true, message: "Title is required" },
              maxLength: { value: 5, message: "Error max length 5" },
              pattern: { value: /[A-Za-z]{3}/, message: "Error pattern" },
            }}
            register={register}
            errors={errors.title}
          />

          <Input
            name="genre"
            type="text"
            placeholder="genre"
            inputClass="form-input"
            onChange={(e) => setValue("genre", e.target.value)}
            validation={{
              required: { value: true, message: "Genre is required" },
            }}
            register={register}
            errors={errors.genre}
          />
          <Input
            name="artist"
            type="text"
            placeholder="artist"
            inputClass="form-input"
            onChange={(e) => setValue("artist", e.target.value)}
            validation={{
              required: { value: true, message: "Artist is required" },
            }}
            register={register}
            errors={errors.artist}
          />
          <button
            className="btn rounded-full bg-indigo-500 hover:bg-indigo-600 w-full py-3 text-xl font-semibold mt-5"
            type="submit"
          >
            Upload
          </button>
        </form>
      </div>
    </article>
  );
}

SongModal.propTypes = {
  showModal: bool.isRequired,
  setShowModal: func.isRequired,
};
export default SongModal;
