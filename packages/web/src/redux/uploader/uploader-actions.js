import api from "../../api";
import { getCurrentUserToken } from "../../services/auth";
import { fileTypes, getFileUrl } from "../../services/cloudinary";
import * as UploaderTypes from "./uploader-types";
import { addUploadedSong } from "../song/song-actions";

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

export function uploadSong({ song, thumbnail, title, artist, genre }) {
  return async function uploadThunk(dispatch) {
    dispatch(uploadSongRequest());

    try {
      const userToken = await getCurrentUserToken();

      if (!userToken) {
        return dispatch(uploadSongError("User token null!"));
      }

      const urlRes = await getFileUrl({
        file: song,
        fileType: fileTypes.AUDIO,
      });

      if (urlRes.status >= 400) {
        return dispatch(uploadSongError(urlRes.statusText));
      }

      const { url, duration } = urlRes.data;

      const getGenreRes = await api.getGenres({
        Authorization: `Bearer ${userToken}`,
      });

      const existingGenres = getGenreRes.data.data;

      const genreExists = existingGenres.filter(
        (existingGenre) =>
          existingGenre.name.toLowerCase() === genre.toLowerCase(),
      );

      const genreRes =
        genreExists.length > 0
          ? genreExists[0]._id
          : api.createGenre({
              body: { name: genre },
              header: {
                Authorization: `Bearer ${userToken}`,
              },
            });

      const songRes = await api.createSong({
        body: {
          title: title,
          thumbnail: thumbnail,
          url: url,
          duration: duration,
          artist: artist,
          genre: genreRes,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      await api.addSongToGenre({
        songId: songRes.data.data._id,
        genreId: genreRes,
      });

      if (songRes.errorMessage) {
        return dispatch(uploadSongError(songRes.errorMessage));
      }

      dispatch(uploadSongSuccess(songRes.data));
      dispatch(addUploadedSong(songRes.data));
      return dispatch(uploadSongReset());
    } catch (err) {
      return dispatch(uploadSongError(err.message));
    }
  };
}

export function uploadImage({ file, name = "", onUploadProgress = (_) => {} }) {
  return async function uploadImageThunk(dispatch) {
    dispatch(uploadImageRequest());

    try {
      const urlRes = await getFileUrl({
        file: file,
        fileType: fileTypes.IMAGE,
        onUploadProgress: onUploadProgress,
      });

      const imageUrl = urlRes.data.url;

      const imgRes = api.createSong({
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
