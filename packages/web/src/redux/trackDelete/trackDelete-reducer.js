import * as trackDeleteTypes from "./trackDelete-types";

const initialState = {
  isDeletingTrack: false,
  trackDeleteSuccess: false,
  trackDeleteError: null,
  trackId: null,
};

const TrackDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case trackDeleteTypes.DELETE_TRACK_REQUEST:
      return {
        ...state,
        isDeletingTrack: true,
        trackDeleteError: false,
      };
    case trackDeleteTypes.DELETE_TRACK_SUCCESS:
      return {
        ...state,
        isDeletingTrack: false,
        trackDeleteSuccess: true,
        trackDeleteError: false,
        trackId: action.payload,
      };
    case trackDeleteTypes.DELETE_TRACK_ERROR:
      return {
        ...state,
        isDeletingTrack: false,
        trackDeleteSuccess: false,
        trackDeleteError: action.payload,
      };
    case trackDeleteTypes.DELETE_TRACK_RESET: {
      return {
        ...state,
        isDeletingTrack: false,
        trackDeleteSuccess: false,
        trackDeleteError: null,
      };
    }
    default:
      return state;
  }
};

export default TrackDeleteReducer;
