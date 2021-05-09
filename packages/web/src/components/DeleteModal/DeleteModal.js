import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { deleteSong, setSongToDelete } from "../../redux/song/song-actions";
import { songSelector } from "../../redux/song/song-selector";

import { hideDeleteModal } from "../../redux/modals/modal-actions";

import CloseBtn from "../CloseBtn";

function DeleteModal() {
  const dispatch = useDispatch();
  const {
    // isDeletingSong,
    // songDeleteSuccess,
    // songDeleteError,
    songDeleting,
  } = useSelector(songSelector);

  const { handleSubmit } = useForm({
    mode: "onBlur",
  });

  function handleCloseBtn() {
    dispatch(hideDeleteModal());
    dispatch(setSongToDelete(null));
  }

  function onSubmit() {
    dispatch(deleteSong({ _id: songDeleting }));
    dispatch(hideDeleteModal());
  }

  return (
    <article className="md:w-3/6 md:mx-auto left-0 right-0 bg-dark mt-40 rounded-md">
      <CloseBtn songDeleteModal />
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
          {/* {isDeletingSong && <p className="mb-3">Removing song...</p>}
          {songDeleteSuccess && <p className="mb-3">Successfully removed!</p>}
          {songDeleteError && (
            <p className="mb-3">An error occured while deleting the song!</p>
          )} */}
        </form>
      </div>
    </article>
  );
}

export default DeleteModal;
