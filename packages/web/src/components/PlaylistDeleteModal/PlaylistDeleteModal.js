import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { func, object } from "prop-types";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  deletePlaylist,
  deletePlaylistReset,
} from "../../redux/playlistDelete/playlistDelete-actions";

import { playlistDeleteSelector } from "../../redux/playlistDelete/playlistDelete-selectors";

import CloseBtn from "../CloseBtn";

function PlaylistDeleteModal({
  setShowDeleteModal,
  selectedPlaylist,
  setSelectedPlaylist,
}) {
  const dispatch = useDispatch();
  const {
    isDeletingPlaylist,
    playlistDeleteSuccess,
    playlistDeleteError,
  } = useSelector(playlistDeleteSelector);

  const history = useHistory();

  console.log(selectedPlaylist);

  const { _id } = selectedPlaylist;

  const { handleSubmit } = useForm({
    mode: "onBlur",
  });

  function handleCloseBtn() {
    setShowDeleteModal(false);
    setSelectedPlaylist(null);
  }

  function onSubmit() {
    dispatch(deletePlaylist({ _id: _id }));
    history.push(`/`);
    console.log("On submit");
  }

  useEffect(() => {
    dispatch(deletePlaylistReset());
    playlistDeleteSuccess && setShowDeleteModal(false);
  }, [dispatch, playlistDeleteSuccess, setShowDeleteModal]);

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
              Are you sure you want to delete the playlist?
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
          {isDeletingPlaylist && <p className="mb-3">Removing playlist...</p>}
          {playlistDeleteSuccess && (
            <p className="mb-3">Successfully removed!</p>
          )}
          {playlistDeleteError && (
            <p className="mb-3">
              An error occured while deleting the playlist!
            </p>
          )}
        </form>
      </div>
    </article>
  );
}

PlaylistDeleteModal.propTypes = {
  setShowDeleteModal: func.isRequired,
  selectedPlaylist: object.isRequired,
  setSelectedPlaylist: func.isRequired,
};

export default PlaylistDeleteModal;
