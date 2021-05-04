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

export const showDeleteModal = () => ({
  type: ModalTypes.SHOW_DELETE_MODAL,
});

export const hideDeleteModal = () => ({
  type: ModalTypes.HIDE_DELETE_MODAL,
});

export const setEditModalTrue = () => ({
  type: ModalTypes.SET_EDIT_MODAL_TRUE,
});

export const setEditModalFalse = () => ({
  type: ModalTypes.SET_EDIT_MODAL_FALSE,
});

export const hideAllModals = () => ({
  type: ModalTypes.HIDE_ALL_MODALS,
});
