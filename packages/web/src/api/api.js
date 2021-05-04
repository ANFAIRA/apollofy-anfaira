import { urlWithQuery } from "../utils/utils";
import { makeRequest } from "./api-utils";

function makeApi(request = makeRequest()) {
  function signUp(headers, options) {
    return request({
      url: "/sign-up",
      requestMethod: "POST",
      headers: headers,
      body: options,
    });
  }

  function signOut(headers) {
    return request({
      url: "/sign-out",
      requestMethod: "POST",
      headers: headers,
    });
  }

  function updateUserInfo(headers, options) {
    return request({
      url: "/api/account",
      requestMethod: "PATCH",
      headers: headers,
      body: options,
    });
  }

  function createTrack({ body, headers = {} }) {
    return request({
      url: "/api/tracks",
      requestMethod: "POST",
      headers: headers,
      body: body,
    });
  }

  function getAllSongs(headers) {
    return request({
      url: "/api/tracks",
      requestMethod: "GET",
      headers: headers,
    });
  }

  // function getSong(headers) {
  //   return request({
  //     url: "/api/tracks/:id",
  //     requestMethod: "GET",
  //     headers: headers,
  //   })
  // }

  function updateSongInfo(options) {
    return request({
      url: "/api/tracks",
      requestMethod: "PATCH",
      body: options,
    });
  }

  function likeSong(headers, options) {
    return request({
      url: `/tracks/${options.songId}/like`,
      requestMethod: "PATCH",
      headers: headers,
      body: options,
    });
  }

  function getMeSongs(headers, options) {
    return request({
      url: "/api/me/tracks",
      requestMethod: "GET",
      headers: headers,
      body: options,
    });
  }

  function deleteTrackApi(options) {
    return request({
      url: "/api/tracks",
      requestMethod: "DELETE",
      body: options,
    });
  }

  function getLikedSongs(headers, options) {
    return request({
      url: "/api/me/tracks/liked",
      requestMethod: "GET",
      headers: headers,
      body: options,
    });
  }

  function createPlaylist({ body, headers }) {
    return request({
      url: "/api/playlists",
      requestMethod: "POST",
      headers: headers,
      body: body,
    });
  }

  function fetchPlaylists({ headers }) {
    return request({
      url: urlWithQuery("/api/playlists", "fullFetch", true),
      requestMethod: "GET",
      headers: headers,
    });
  }

  function fetchPlaylistById(options) {
    return request({
      url: `/api/playlists/${options}`,
      requestMethod: "GET",
      body: options,
    });
  }

  function getOwnPlaylists(headers) {
    return request({
      url: urlWithQuery("/api/me/playlists", "fullFetch", true),
      requestMethod: "GET",
      headers: headers,
    });
  }

  function addSongToPlaylist(options) {
    return request({
      url: `/api/playlists/${options.playlistId}`,
      requestMethod: "PATCH",
      body: options,
    });
  }

  function followPlaylist(headers, options) {
    return request({
      url: `/api/playlist/${options.playlistId}/follow`,
      requestMethod: "PATCH",
      headers: headers,
      body: options,
    });
  }

  function deletePlaylist(options) {
    return request({
      url: "/api/playlists",
      requestMethod: "DELETE",
      body: options,
    });
  }

  function getFollowedPlaylists(headers) {
    return request({
      url: urlWithQuery("/api/me/playlist/follow", "fullFetch", true),
      requestMethod: "GET",
      headers: headers,
    });
  }

  function updatePlaylistInfo(options) {
    return request({
      url: "/api/playlists",
      requestMethod: "PATCH",
      body: options,
    });
  }

  function getGenres(headers) {
    return request({
      url: "/api/genres",
      requestMethod: "GET",
      headers: headers,
    });
  }

  function createGenre({ headers, body }) {
    return request({
      url: "/api/genres",
      requestMethod: "POST",
      headers: headers,
      body: body,
    });
  }

  function addTrackToGenre(body) {
    return request({
      url: "/api/genres",
      requestMethod: "PATCH",
      body: body,
    });
  }

  return {
    signUp: signUp,
    signOut: signOut,
    updateUserInfo: updateUserInfo,
    createTrack: createTrack,
    getAllSongs: getAllSongs,
    // getSong: getSong,
    updateSongInfo: updateSongInfo,
    getMeSongs: getMeSongs,
    getLikedSongs: getLikedSongs,
    likeSong: likeSong,
    deleteTrackApi: deleteTrackApi,
    createPlaylist: createPlaylist,
    fetchPlaylists: fetchPlaylists,
    addSongToPlaylist: addSongToPlaylist,
    fetchPlaylistById: fetchPlaylistById,
    getOwnPlaylists: getOwnPlaylists,
    followPlaylist: followPlaylist,
    getFollowedPlaylists: getFollowedPlaylists,
    deletePlaylist: deletePlaylist,
    updatePlaylistInfo: updatePlaylistInfo,
    getGenres: getGenres,
    createGenre: createGenre,
    addTrackToGenre: addTrackToGenre,
  };
}

export default makeApi();
