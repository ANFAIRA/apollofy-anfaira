import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { bool, func } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  uploadSong,
  uploadSongReset,
} from "../../redux/uploader/uploader-actions";
import { uploaderSelector } from "../../redux/uploader/uploader-selectors";
import { fileTypes } from "../../services/cloudinary";
import Input from "../Input";

const close = <FontAwesomeIcon icon={faTimes} />;

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

  const [song, setSong] = useState();
  // const [image, setImage] = useState();

  function onSubmit(data) {
    console.log(data);
    console.log(data.song[0]);
    dispatch(
      uploadSong({
        track: data.song[0],
        title: data.title,
        genre: data.genre,
        artist: data.artist,
      }),
    );
  }

  function handleSetSong(uploadFile) {
    setSong(uploadFile);
  }

  // function handleSetImage(uploadFile) {
  //   setImage(uploadFile);
  // }

  function handleCloseBtn() {
    setShowModal(false);
  }

  useEffect(() => {
    dispatch(uploadSongReset());
  }, [dispatch]);

  return (
    <section className="flex flex-col w-4/6 align-middle bg-gray-800 mt-20">
      <div>
        <button type="button" onClick={handleCloseBtn}>
          <i>{close}</i>
        </button>
      </div>
      <form className="flex flex-col p-20" onSubmit={handleSubmit(onSubmit)}>
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
        <input
          name="song"
          type="file"
          placeholder="song"
          className="form-input"
          fileType={fileTypes.AUDIO}
          onFileSelected={(files) => {
            handleSetSong(files[0]);
          }}
          {...register("song", { required: true })}
        />

        {isUploadingSong && <p>Uploading song...</p>}
        {uploadSongSuccess && <p>Upload successful!</p>}
        {uploadSongError && <p>Upload error!</p>}
        <Input
          name="title"
          type="text"
          placeholder="title"
          inputClass="form-input"
          onChange={(e) => setValue("title", e.target.value)}
          {...register("title", { required: true })}
        />
        <p>{errors.title && "Song title is required"}</p>
        <Input
          name="genre"
          type="text"
          placeholder="genre"
          inputClass="form-input"
          onChange={(e) => setValue("genre", e.target.value)}
          {...register("genre", { required: true })}
        />
        <p>{errors.genre && "Song genre is required"}</p>
        <Input
          name="artist"
          type="text"
          placeholder="artist"
          inputClass="form-input"
          onChange={(e) => setValue("artist", e.target.value)}
          {...register("artist", { required: true })}
        />
        <p>{errors.artist && "Artist name is required"}</p>
        <button
          className="btn rounded-full bg-indigo-500 w-full py-3 text-xl font-semibold mt-5"
          type="submit"
        >
          Submit
        </button>
      </form>
    </section>
  );
}

SongModal.propTypes = {
  showModal: bool.isRequired,
  setShowModal: func.isRequired,
};
export default SongModal;
