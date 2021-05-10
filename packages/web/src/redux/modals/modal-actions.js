import * as ModalTypes from "./modal-types";

export const showSongModal = () => ({
  type: ModalTypes.SHOW_SONG_MODAL,
});

export const hideSongModal = () => ({
  type: ModalTypes.HIDE_SONG_MODAL,
});

export const showPlaylistModal = () => ({
  type: ModalTypes.SHOW_PLAYLIST_MODAL,
});

export const hidePlaylistModal = () => ({
  type: ModalTypes.HIDE_PLAYLIST_MODAL,
});

export const showPlaylistDeleteModal = () => ({
  type: ModalTypes.SHOW_PLAYLIST_DELETE_MODAL,
});

export const hidePlaylistDeleteModal = () => ({
  type: ModalTypes.HIDE_PLAYLIST_DELETE_MODAL,
});

export const showDeleteModal = () => ({
  type: ModalTypes.SHOW_DELETE_MODAL,
});

export const hideDeleteModal = () => ({
  type: ModalTypes.HIDE_DELETE_MODAL,
});

export const setEditModal = () => ({
  type: ModalTypes.SET_EDIT_MODAL,
});

export const hideAllModals = () => ({
  type: ModalTypes.HIDE_ALL_MODALS,
});
