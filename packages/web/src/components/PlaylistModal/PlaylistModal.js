import { bool, func, object, oneOfType, string } from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist } from "../../redux/playlist/playlist-actions";
import { playlistStateSelector } from "../../redux/playlist/playlist-selector";
import { updatePlaylist } from "../../redux/playlistEditor/playlistEditor-actions";
import CloseBtn from "../CloseBtn";
import Input from "../Input";
import "./PlaylistModal.scss";

function PlaylistModal({
  setShowPlaylistModal,
  isEditModal,
  selectedPlaylist,
}) {
  const dispatch = useDispatch();
  const { playlistCreation } = useSelector(playlistStateSelector);

  const { _id, thumbnail, title, description } = isEditModal
    ? selectedPlaylist
    : "";

  const modal = isEditModal
    ? { title: "Edit playlist information", type: "edit", button: "Update" }
    : { title: "Create a playlist", type: "upload", button: "Create" };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      _id,
      thumbnail,
      title,
      description,
      type: "playlist",
      publicAccessible: true,
    },
  });

  const [image, setImage] = useState();
  const [src, setSrc] = useState();

  function onSubmit(data) {
    setShowPlaylistModal(false);
    !isEditModal
      ? dispatch(
          createPlaylist({
            _id: data._id,
            thumbnail: image,
            title: data.title,
            type: data.type,
            publicAccessible: data.publicAccessible,
            description: data.description,
          }),
        )
      : dispatch(
          updatePlaylist({
            _id: data._id,
            thumbnail: image,
            title: data.title,
            type: data.type,
            publicAccessible: data.publicAccessible,
            description: data.description,
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

  useEffect(() => {
    playlistCreation && setShowPlaylistModal(false);
  }, [dispatch, setShowPlaylistModal, playlistCreation]);

  return (
    <article className="md:w-2/6 md:mx-auto left-0 right-0 bg-dark mt-20 rounded-md">
      <CloseBtn setShowModal={setShowPlaylistModal} />
      <div>
        <h2 className="text-center text-xl font-semibold">{modal.title}</h2>
        <form
          className="flex flex-col px-10 sm:px-20 py-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex pb-5">
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
          </div>

          <Input
            name="title"
            type="text"
            placeholder="title"
            inputClass="form-input"
            onChange={(e) => setValue("title", e.target.value)}
            validation={{
              required: { value: true, message: "Title is required!" },
              maxLength: { value: 20, message: "Error max length 30 char!" },
              pattern: {
                value: /[A-Za-z]{2}/,
                message: "Error pattern does not match!",
              },
            }}
            register={register}
            errors={errors.title}
          />

          <Input
            name="description"
            type="text"
            placeholder="description"
            inputClass="form-input"
            onChange={(e) => setValue("description", e.target.value)}
            register={register}
            validation={{ required: { value: false } }}
          />

          <div className="flex justify-between">
            <div className="switch-field">
              <input
                type="radio"
                id="playlist"
                name="type"
                value="playlist"
                checked
                onChange={(e) => setValue("type", e.target.value)}
              />
              <label htmlFor="playlist">Playlist</label>
              <input
                type="radio"
                id="album"
                name="type"
                value="album"
                onChange={(e) => setValue("type", e.target.value)}
              />
              <label htmlFor="album">Album</label>
            </div>

            <div className="switch-field">
              <input
                type="radio"
                id="public"
                name="publicAccessible"
                value="public"
                checked
                onChange={(e) => setValue("publicAccessible", e.target.value)}
              />
              <label htmlFor="public">Public</label>
              <input
                type="radio"
                id="private"
                name="publicAccessible"
                value="private"
                onChange={(e) => setValue("publicAccessible", e.target.value)}
              />
              <label htmlFor="private">Private</label>
            </div>
          </div>

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

PlaylistModal.propTypes = {
  setShowPlaylistModal: func.isRequired,
  isEditModal: oneOfType([bool, string]),
  selectedPlaylist: object,
};
PlaylistModal.defaultProps = {
  selectedPlaylist: {},
  isEditModal: "",
};

export default PlaylistModal;
