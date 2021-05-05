import * as SongEditorTypes from "./songEditor-types";

const initialState = {
  isUpdatingSong: false,
  songUpdateSuccess: false,
  songUpadateError: null,
  selectedSong: {},
};

const SongEditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SongEditorTypes.UPDATE_TRACK_REQUEST:
      return {
        ...state,
        isUpdatingSong: true,
        songUpadateError: false,
      };
    case SongEditorTypes.UPDATE_TRACK_SUCCESS:
      return {
        ...state,
        isUpdatingSong: false,
        songUpdateSuccess: true,
        songUpadateError: false,
        selectedSong: action.payload,
      };
    case SongEditorTypes.UPDATE_TRACK_ERROR:
      return {
        ...state,
        isUpdatingSong: false,
        songUpdateSuccess: false,
        songUpadateError: action.payload,
      };
    case SongEditorTypes.UPDATE_TRACK_RESET: {
      return {
        ...state,
        isUpdatingSong: false,
        songUpdateSuccess: false,
        songUpadateError: null,
      };
    }
    default:
      return state;
  }
};

export default SongEditorReducer;
