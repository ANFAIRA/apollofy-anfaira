import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import {
  updateSong,
  updateSongReset,
  setSongToUpdate,
} from "../../redux/song/song-actions";
import {
  uploadSong,
  uploadSongReset,
} from "../../redux/uploader/uploader-actions";
import {
  hideSongModal,
  setEditModalFalse,
} from "../../redux/modals/modal-actions";

import { uploaderSelector } from "../../redux/uploader/uploader-selectors";
import { modalStateSelector } from "../../redux/modals/modal-selectors";
import { songSelector } from "../../redux/song/song-selector";

import CloseBtn from "../CloseBtn";
import Input from "../Input";
import SongInput from "../SongInput";

function SongModal() {
  const dispatch = useDispatch();

  const { isEditModal } = useSelector(modalStateSelector);
  const { isUploadingSong, uploadSongSuccess, uploadSongError } = useSelector(
    uploaderSelector,
  );
  const {
    isUpdatingSong,
    songUpdateSuccess,
    songUpdateError,
    songEditing,
  } = useSelector(songSelector);

  const { _id, thumbnail, title, artist, genre } = isEditModal
    ? songEditing
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

  const [image, setImage] = useState(thumbnail);
  const [song, setSong] = useState();
  const [src, setSrc] = useState();

  function onSubmit(data) {
    !isEditModal
      ? dispatch(
          uploadSong({
            song: song,
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
    dispatch(setSongToUpdate({}));
    dispatch(hideSongModal());
    dispatch(setEditModalFalse());
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

  const handleUploadSong = (e) => {
    setSong(e.target.files[0]);
  };

  // TODO: Add dialogue menu with button for removing image
  // function handleRemoveImg() {
  //   setSrc(null);
  // }

  useEffect(() => {
    dispatch(uploadSongReset());
    dispatch(updateSongReset());
  }, [dispatch, uploadSongSuccess, songUpdateSuccess]);

  return (
    <article className="md:w-3/6 md:mx-auto left-0 right-0 bg-dark mt-20 rounded-md">
      <CloseBtn />
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
                        ? "w-full sm:w-40 sm:h-40 flex flex-col items-center px-4 py-6 rounded-lg shadow-lg songing-wide uppercase border-4 border-red-500 cursor-pointer bg-white text-red-500 hover:bg-red-500 hover:text-white"
                        : "w-full h-full sm:h-40 flex flex-col items-center px-4 py-6 rounded-lg shadow-lg songing-wide uppercase border border-indigo-500 cursor-pointer bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white"
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
              (song ? (
                <SongInput
                  placeholder={song.name}
                  onChange={handleUploadSong}
                  validation={{
                    required: { value: true, message: "Song is required!" },
                  }}
                  register={register}
                  errors={errors.title}
                />
              ) : (
                <SongInput
                  placeholder={
                    <>
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
                    </>
                  }
                  onChange={handleUploadSong}
                  validation={{
                    required: { value: true, message: "Song is required!" },
                  }}
                  register={register}
                  errors={errors.title}
                />
              ))}
          </div>

          {isUploadingSong && <p className="mb-3">Uploading song...</p>}
          {uploadSongSuccess && <p className="mb-3">Upload successful!</p>}
          {uploadSongError && <p className="mb-3">Upload error!</p>}

          {isUpdatingSong && <p className="mb-3">Updating song...</p>}
          {songUpdateSuccess && <p className="mb-3">Update successful!</p>}
          {songUpdateError && <p className="mb-3">Update error!</p>}

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

export default SongModal;
