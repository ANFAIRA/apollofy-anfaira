import * as PlaylistEditorTypes from "./playlistEditor-types";

const initialState = {
  isUpdatingPlaylist: false,
  playlistUpdateSuccess: false,
  playlistUpadateError: null,
  selectedPlaylist: {},
};

const PlaylistEditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case PlaylistEditorTypes.UPDATE_PLAYLIST_REQUEST:
      return {
        ...state,
        isUpdatingPlaylist: true,
        playlistUpadateError: false,
      };
    case PlaylistEditorTypes.UPDATE_PLAYLIST_SUCCESS:
      return {
        ...state,
        isUpdatingPlaylist: false,
        playlistUpdateSuccess: true,
        playlistUpadateError: false,
        selectedPlaylist: action.payload,
      };
    case PlaylistEditorTypes.UPDATE_PLAYLIST_ERROR:
      return {
        ...state,
        isUpdatingPlaylist: false,
        playlistUpdateSuccess: false,
        playlistUpadateError: action.payload,
      };
    case PlaylistEditorTypes.UPDATE_PLAYLIST_RESET: {
      return {
        ...state,
        isUpdatingPlaylist: false,
        playlistUpdateSuccess: false,
        playlistUpadateError: null,
      };
    }
    default:
      return state;
  }
};

export default PlaylistEditorReducer;
