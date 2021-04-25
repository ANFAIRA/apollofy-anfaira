import React, { useEffect, useState } from "react";
import { bool, func, object } from "prop-types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  uploadSong,
  uploadSongReset,
} from "../../redux/uploader/uploader-actions";
import { uploaderSelector } from "../../redux/uploader/uploader-selectors";
import { trackEditorSelector } from "../../redux/trackEditor/trackEditor-selectors";

import {
  updateSong,
  updateTrackReset,
} from "../../redux/trackEditor/trackEditor-actions";

import { fileTypes } from "../../services/cloudinary";
import Input from "../Input";

const closeBtn = <FontAwesomeIcon icon={faTimes} size="2x" />;

function SongModal({
  setShowModal,
  isEditModal,
  setIsEditModal,
  selectedTrack,
  setSelectedTrack,
}) {
  const dispatch = useDispatch();
  const { isUploadingSong, uploadSongSuccess, uploadSongError } = useSelector(
    uploaderSelector,
  );
  const { isUpdatingTrack, trackUpdateSuccess, trackUpdateError } = useSelector(
    trackEditorSelector,
  );

  const { _id, thumbnail, title, artist, genre } = isEditModal
    ? selectedTrack
    : "";

  const modal = isEditModal
    ? { title: "Edit song information", type: "edit", button: "Update" }
    : { title: "Upload a song", type: "upload", button: "Upload" };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: { _id, thumbnail, title, artist, genre },
  });

  const [image, setImage] = useState();
  const [src, setSrc] = useState();
  const [songTitle, setSongTitle] = useState();

  function onSubmit(data) {
    !isEditModal
      ? dispatch(
          uploadSong({
            track: data.song[0],
            thumbnail: image,
            title: data.title,
            genre: data.genre,
            artist: data.artist,
          }),
        )
      : dispatch(
          updateSong({
            thumbnail: image,
            title: data.title,
            genre: data.genre,
            artist: data.artist,
            _id: data._id,
          }),
        );
  }

  const handleImg = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setSrc(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSong = (e) => setSongTitle(e.target.files[0].name);

  // TODO: Add dialogue menu with button for removing image
  // function handleRemoveImg() {
  //   setSrc(null);
  // }

  function handleCloseBtn() {
    setShowModal(false);
    setIsEditModal(false);
    setSelectedTrack(null);
  }

  useEffect(() => {
    dispatch(uploadSongReset());
    dispatch(updateTrackReset());
    uploadSongSuccess && setShowModal(false);
    trackUpdateSuccess && setShowModal(false);
  }, [dispatch, uploadSongSuccess, trackUpdateSuccess, setShowModal]);

  return (
    <article className="md:w-3/6 md:mx-auto left-0 right-0 bg-dark mt-20 rounded-md">
      <div className="relative h-10">
        <button
          className="absolute top-3 right-5"
          type="button"
          onClick={handleCloseBtn}
        >
          <i className="text-gray-400 hover:text-gray-100">{closeBtn}</i>
        </button>
      </div>
      <div>
        <h2 className="text-center text-xl font-semibold">{modal.title}</h2>
        <form
          className="flex flex-col px-10 sm:px-20 py-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex">
            {isEditModal && (
              <div className="mr-2 h-full md:w-60 w-full mb-5">
                <label htmlFor="photo" className="mt-2 mb-5">
                  {src ? (
                    <img
                      src={src}
                      alt="thumbnail"
                      className="md:w-40 md:h-40"
                    />
                  ) : (
                    <img
                      src={thumbnail}
                      alt="thumbnail"
                      className="md:w-40 md:h-40"
                    />
                  )}

                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    id="photo"
                    className="hidden"
                    onChange={handleImg}
                  />
                </label>
              </div>
            )}

            {!isEditModal &&
              (src ? (
                <div className="mr-2 h-full md:w-60 w-full">
                  <label htmlFor="photo" className="mt-2 mb-5 cursor-pointer">
                    <img
                      src={src}
                      alt="thumbnail"
                      className="md:w-40 md:h-40"
                    />
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      id="photo"
                      className="hidden"
                      onChange={handleImg}
                    />
                  </label>
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-grey-lighter mb-5 mr-2">
                  <label
                    htmlFor="photo"
                    className={
                      errors.image
                        ? "w-full sm:w-40 sm:h-40 flex flex-col items-center px-4 py-6 rounded-lg shadow-lg tracking-wide uppercase border-4 border-red-500 cursor-pointer bg-white text-red-500 hover:bg-red-500 hover:text-white"
                        : "w-full h-full sm:h-40 flex flex-col items-center px-4 py-6 rounded-lg shadow-lg tracking-wide uppercase border border-indigo-500 cursor-pointer bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white"
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
                      Select an Image
                    </span>
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      id="photo"
                      className="hidden"
                      onChange={handleImg}
                    />
                  </label>
                </div>
              ))}

            {!isEditModal &&
              (songTitle ? (
                <div className="flex flex-col w-full h-40 items-center justify-center bg-grey-lighter mb-5 ml-2">
                  <label
                    htmlFor="song"
                    className="w-full h-full sm:h-40 flex flex-col items-center justify-center font-semibold px-4 py-6 rounded-lg shadow-lg tracking-wide uppercase border border-indigo-500 cursor-pointer bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white"
                  >
                    {songTitle}
                    <input
                      id="song"
                      name="song"
                      type="file"
                      placeholder="song"
                      className="form-input hidden"
                      fileType={fileTypes.AUDIO}
                      {...register("song", { required: true })}
                      onChange={handleUploadSong}
                    />
                  </label>
                  {errors.song && <p className="mb-5">Song is required</p>}
                </div>
              ) : (
                <div className="flex flex-col w-full h-40 items-center justify-center bg-grey-lighter mb-5 ml-2">
                  <label
                    htmlFor="song"
                    className={
                      errors.song
                        ? "w-full sm:h-40  flex flex-col items-center px-4 py-6 rounded-lg shadow-lg tracking-wide uppercase border-4 border-red-500 cursor-pointer bg-white text-red-500 hover:bg-red-500 hover:text-white"
                        : "w-full h-full sm:h-40 flex flex-col items-center px-4 py-6 rounded-lg shadow-lg tracking-wide uppercase border border-indigo-500 cursor-pointer bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white"
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
                      Select a song
                    </span>
                    <input
                      id="song"
                      name="song"
                      type="file"
                      placeholder="song"
                      className="form-input hidden"
                      fileType={fileTypes.AUDIO}
                      {...register("song", { required: true })}
                      onChange={handleUploadSong}
                    />
                  </label>
                  {errors.song && <p className="mb-5">Song is required</p>}
                </div>
              ))}
          </div>
          {isUploadingSong && <p className="mb-3">Uploading song...</p>}
          {uploadSongSuccess && <p className="mb-3">Upload successful!</p>}
          {uploadSongError && <p className="mb-3">Upload error!</p>}
          {isUpdatingTrack && <p className="mb-3">Updating song...</p>}
          {trackUpdateSuccess && <p className="mb-3">Update successful!</p>}
          {trackUpdateError && <p className="mb-3">Update error!</p>}

          <Input
            name="title"
            type="text"
            placeholder="title"
            inputClass="form-input"
            onChange={(e) => setValue("title", e.target.value)}
            validation={{
              required: { value: true, message: "Title is required!" },
              maxLength: { value: 20, message: "Error max length 20 char!" },
              pattern: {
                value: /[A-Za-z]{2}/,
                message: "Error pattern does not match!",
              },
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
              required: { value: true, message: "Genre is required!" },
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
              required: { value: true, message: "Artist is required!" },
            }}
            register={register}
            errors={errors.artist}
          />
          <button
            className="btn rounded-full bg-indigo-500 hover:bg-indigo-600 w-full py-3 text-xl font-semibold mt-5"
            type="submit"
          >
            {modal.button}
          </button>
        </form>
      </div>
    </article>
  );
}

SongModal.propTypes = {
  setShowModal: func.isRequired,
  setIsEditModal: func.isRequired,
  isEditModal: bool.isRequired,
  selectedTrack: object.isRequired,
  setSelectedTrack: func.isRequired,
};

export default SongModal;
