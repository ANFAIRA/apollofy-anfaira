import api from "../../api";
import * as trackDeleteTypes from "./trackDelete-types";

export const deleteTrackRequest = () => ({
  type: trackDeleteTypes.DELETE_TRACK_REQUEST,
});

export const deleteTrackError = (message) => ({
  type: trackDeleteTypes.DELETE_TRACK_ERROR,
  payload: message,
});

export const deleteTrackSuccess = (trackId) => ({
  type: trackDeleteTypes.DELETE_TRACK_SUCCESS,
  payload: trackId,
});

export const deleteTrackReset = () => ({
  type: trackDeleteTypes.DELETE_TRACK_RESET,
});

export function deleteTrack(trackId) {
  return async function deleteTrackThunk(dispatch) {
    dispatch(deleteTrackRequest());
    try {
      const response = await api.deleteTrackApi(trackId);
      if (response.errorMessage) {
        return dispatch(deleteTrackError(response.errorMessage));
      }
      return dispatch(deleteTrackSuccess(response.data));
    } catch (error) {
      return dispatch(deleteTrackError(error.message));
    }
  };
}
