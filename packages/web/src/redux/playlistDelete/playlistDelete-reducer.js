import * as playlistDeleteTypes from "./playlistDelete-types";

const initialState = {
  isDeletingPlaylist: false,
  playlistDeleteSuccess: false,
  playlistDeleteError: null,
  playlistId: null,
};

const PlaylistDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case playlistDeleteTypes.DELETE_PLAYLIST_REQUEST:
      return {
        ...state,
        isDeletingPlaylist: true,
        playlistDeleteError: false,
      };
    case playlistDeleteTypes.DELETE_PLAYLIST_SUCCESS:
      return {
        ...state,
        isDeletingPlaylist: false,
        playlistDeleteSuccess: true,
        playlistDeleteError: false,
        playlistId: action.payload,
      };
    case playlistDeleteTypes.DELETE_PLAYLIST_ERROR:
      return {
        ...state,
        isDeletingPlaylist: false,
        playlistDeleteSuccess: false,
        playlistDeleteError: action.payload,
      };
    case playlistDeleteTypes.DELETE_PLAYLIST_RESET: {
      return {
        ...state,
        isDeletingPlaylist: false,
        playlistDeleteSuccess: false,
        playlistDeleteError: null,
      };
    }
    default:
      return state;
  }
};

export default PlaylistDeleteReducer;
