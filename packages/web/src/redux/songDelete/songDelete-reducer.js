import * as songDeleteTypes from "./songDelete-types";

const initialState = {
  isDeletingSong: false,
  songDeleteSuccess: false,
  songDeleteError: null,
  songId: null,
};

const SongDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case songDeleteTypes.DELETE_TRACK_REQUEST:
      return {
        ...state,
        isDeletingSong: true,
        songDeleteError: false,
      };
    case songDeleteTypes.DELETE_TRACK_SUCCESS:
      return {
        ...state,
        isDeletingSong: false,
        songDeleteSuccess: true,
        songDeleteError: false,
        songId: action.payload,
      };
    case songDeleteTypes.DELETE_TRACK_ERROR:
      return {
        ...state,
        isDeletingSong: false,
        songDeleteSuccess: false,
        songDeleteError: action.payload,
      };
    case songDeleteTypes.DELETE_TRACK_RESET: {
      return {
        ...state,
        isDeletingSong: false,
        songDeleteSuccess: false,
        songDeleteError: null,
      };
    }
    default:
      return state;
  }
};

export default SongDeleteReducer;
