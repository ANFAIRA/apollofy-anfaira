import * as UploaderTypes from "./uploader-types";
import { getFileUrl, fileTypes } from "../../services/cloudinary";
import api from "../../api";
import { getCurrentUserToken } from "../../services/auth";

export const uploadSongRequest = () => ({
  type: UploaderTypes.UPLOAD_SONG_REQUEST,
});

export const uploadSongError = (message) => ({
  type: UploaderTypes.UPLOAD_SONG_ERROR,
  payload: message,
});

export const uploadSongSuccess = (songUrl) => ({
  type: UploaderTypes.UPLOAD_SONG_SUCCESS,
  payload: songUrl,
});

export const uploadSongReset = () => ({
  type: UploaderTypes.UPLOAD_SONG_RESET,
});

export const uploadImageRequest = () => ({
  type: UploaderTypes.UPLOAD_IMAGE_REQUEST,
});

export const uploadImageError = (message) => ({
  type: UploaderTypes.UPLOAD_IMAGE_ERROR,
  payload: message,
});

export const uploadImageSuccess = (imageUrl) => ({
  type: UploaderTypes.UPLOAD_IMAGE_SUCCESS,
  payload: imageUrl,
});

export function uploadSong({ track, title }) {
  return async function uploadThunk(dispatch) {
    dispatch(uploadSongRequest());
    console.log(track);
    console.log(title);

    try {
      const userToken = await getCurrentUserToken();

      if (!userToken) {
        return dispatch(uploadSongError("User token null!"));
      }

      const urlRes = await getFileUrl({
        file: track,
        fileType: fileTypes.AUDIO,
      });

      console.log(urlRes);

      if (urlRes.status >= 400) {
        return dispatch(uploadSongError(urlRes.statusText));
      }

      const { url, duration } = urlRes.data;
      console.log(urlRes.data);

      const songRes = await api.createTrack({
        body: {
          title: title,
          url: url,
          duration: duration,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (songRes.errorMessage) {
        return dispatch(uploadSongError(songRes.errorMessage));
      }

      return dispatch(uploadSongSuccess(url));
    } catch (err) {
      return dispatch(uploadSongError(err.message));
    }
  };
}

export function uploadImage({
  file,
  name = "",
  genre = "",
  onUploadProgress = (_) => {},
}) {
  return async function uploadImageThunk(dispatch) {
    dispatch(uploadImageRequest());

    try {
      const urlRes = await getFileUrl({
        file: file,
        fileType: fileTypes.IMAGE,
        onUploadProgress: onUploadProgress,
      });

      const imageUrl = urlRes.data.url;

      const imgRes = api.createTrack({
        title: name,
        url: imageUrl,
      });

      if (imgRes.errorMessage) {
        return dispatch(uploadImageError(imgRes.errorMessage));
      }

      return dispatch(uploadImageSuccess(imgRes.data));
    } catch (err) {
      return dispatch(uploadImageError(err));
    }
  };
}
