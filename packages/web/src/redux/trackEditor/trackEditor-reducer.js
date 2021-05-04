import * as TrackEditorTypes from "./trackEditor-types";

const initialState = {
  isUpdatingTrack: false,
  trackUpdateSuccess: false,
  trackUpadateError: null,
  trackToUpdate: {},
};

const TrackEditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case TrackEditorTypes.TRACK_TO_UPDATE:
      return {
        ...state,
        trackToUpdate: action.payload,
      };
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
        trackToUpdate: action.payload,
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
