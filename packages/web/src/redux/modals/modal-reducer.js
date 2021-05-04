import * as ModalTypes from "./modal-types";

export const ModalInitialState = {
  showSongModal: false,
  showPlaylistModal: false,
  showDeleteModal: false,
  isEditModal: false,
};

const ModalReducer = (state = ModalInitialState, action) => {
  switch (action.type) {
    case ModalTypes.SHOW_SONG_MODAL:
      return {
        ...state,
        showSongModal: true,
      };

    case ModalTypes.HIDE_SONG_MODAL:
      return {
        ...state,
        showSongModal: false,
      };

    case ModalTypes.SHOW_PLAYLIST_MODAL:
      return {
        ...state,
        showPlaylistModal: true,
      };

    case ModalTypes.HIDE_PLAYLIST_MODAL:
      return {
        ...state,
        showPlaylistModal: false,
      };

    case ModalTypes.SHOW_DELETE_MODAL:
      return {
        ...state,
        showDeleteModal: true,
      };

    case ModalTypes.HIDE_DELETE_MODAL:
      return {
        ...state,
        showDeleteModal: false,
      };
    case ModalTypes.SET_EDIT_MODAL_TRUE:
      return {
        ...state,
        isEditModal: true,
      };
    case ModalTypes.SET_EDIT_MODAL_FALSE:
      return {
        ...state,
        isEditModal: false,
      };
    case ModalTypes.HIDE_ALL_MODALS:
      return {
        ...state,
        showSongModal: false,
        showPlaylistModal: false,
        showDeleteModal: false,
        isEditModal: false,
      };
    default:
      return { ...state };
  }
};

export default ModalReducer;
