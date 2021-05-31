import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  deletePlaylist,
  setPlaylistToDelete,
} from "../../redux/playlist/playlist-actions";
import { deletePlaylistFromAllUsers } from "../../redux/user/user-actions";
import { selectPlaylistState } from "../../redux/playlist/playlist-selector";
import { fetchUsers } from "../../redux/user/user-actions";
import { userTypes } from "../../redux/user/user-types";
import { hidePlaylistDeleteModal } from "../../redux/modals/modal-actions";

import CloseBtn from "../CloseBtn";

function PlaylistDeleteModal() {
  const dispatch = useDispatch();
  const {
    isDeletingPlaylist,
    playlistDeleteSuccess,
    playlistDeleteError,
    playlistDeleting,
  } = useSelector(selectPlaylistState);

  const history = useHistory();

  const { handleSubmit } = useForm({
    mode: "onBlur",
  });

  function handleCloseBtn() {
    dispatch(hidePlaylistDeleteModal());
    dispatch(setPlaylistToDelete(null));
  }

  function onSubmit() {
    dispatch(deletePlaylistFromAllUsers(playlistDeleting));
    dispatch(deletePlaylist({ _id: playlistDeleting }));
    dispatch(fetchUsers(userTypes.ALL_USERS));
    history.push(`/`);
    dispatch(hidePlaylistDeleteModal());
  }

  return (
    <article className="md:w-3/6 md:mx-auto left-0 right-0 bg-dark mt-40 rounded-md">
      <CloseBtn />
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

export default PlaylistDeleteModal;
