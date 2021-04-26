import * as TrackEditorTypes from "./trackEditor-types";

const initialState = {
  isUpdatingTrack: false,
  trackUpdateSuccess: false,
  trackUpadateError: null,
  selectedTrack: {},
};

const TrackEditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case TrackEditorTypes.UPDATE_TRACK_REQUEST:
      return {
        ...state,
        isUpdatingTrack: true,
        trackUpadateError: false,
      };
    case TrackEditorTypes.UPDATE_TRACK_SUCCESS:
      return {
        ...state,
        isUpdatingTrack: false,
        trackUpdateSuccess: true,
        trackUpadateError: false,
        selectedTrack: action.payload,
      };
    case TrackEditorTypes.UPDATE_TRACK_ERROR:
      return {
        ...state,
        isUpdatingTrack: false,
        trackUpdateSuccess: false,
        trackUpadateError: action.payload,
      };
    case TrackEditorTypes.UPDATE_TRACK_RESET: {
      return {
        ...state,
        isUpdatingTrack: false,
        trackUpdateSuccess: false,
        trackUpadateError: null,
      };
    }
    default:
      return state;
  }
};

export default TrackEditorReducer;
