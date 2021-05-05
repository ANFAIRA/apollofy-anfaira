import React, { useEffect } from "react";
import { func, object } from "prop-types";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteSong,
  deleteSongReset,
} from "../../redux/songDelete/songDelete-actions";

import { songDeleteSelector } from "../../redux/songDelete/songDelete-selectors";

import CloseBtn from "../CloseBtn";

function DeleteModal({ setShowDeleteModal, selectedSong, setSelectedSong }) {
  const dispatch = useDispatch();
  const { isDeletingSong, songDeleteSuccess, songDeleteError } = useSelector(
    songDeleteSelector,
  );

  const { _id } = selectedSong;

  const { handleSubmit } = useForm({
    mode: "onBlur",
  });

  function handleCloseBtn() {
    setShowDeleteModal(false);
    setSelectedSong(null);
  }

  function onSubmit() {
    dispatch(deleteSong({ _id: _id }));
  }

  useEffect(() => {
    dispatch(deleteSongReset());
    songDeleteSuccess && setShowDeleteModal(false);
  }, [dispatch, songDeleteSuccess, setShowDeleteModal]);

  return (
    <article className="md:w-3/6 md:mx-auto left-0 right-0 bg-dark mt-40 rounded-md">
      <CloseBtn setShowModal={setShowDeleteModal} />
      <div>
        <form
          className="flex flex-col px-10 sm:px-20 py-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <h2 className="text-center text-xl font-semibold mb-8">
              Are you sure you want to delete the song?
            </h2>
            <div className="flex">
              <button
                type="submit"
                className="btn border-gray-400 border-2 rounded-full w-full py-3 text-xl font-semibold mr-3"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={handleCloseBtn}
                className="btn border-gray-400 border-2 rounded-full w-full py-3 text-xl font-semibold ml-3"
              >
                Cancel
              </button>
            </div>
          </div>
          {isDeletingSong && <p className="mb-3">Removing song...</p>}
          {songDeleteSuccess && <p className="mb-3">Successfully removed!</p>}
          {songDeleteError && (
            <p className="mb-3">An error occured while deleting the song!</p>
          )}
        </form>
      </div>
    </article>
  );
}

DeleteModal.propTypes = {
  setShowDeleteModal: func.isRequired,
  selectedSong: object.isRequired,
  setSelectedSong: func.isRequired,
};

export default DeleteModal;
