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

  // USERS

  function getUserById(userID) {
    return request({
      url: `/users/${userID}`,
      requestMethod: "GET",
    });
  }

  function getUsers(headers) {
    return request({
      url: "/users",
      requestMethod: "GET",
      headers: headers,
    });
  }

  function getFollowingUsers(headers) {
    return request({
      url: "/me/users/following",
      requestMethod: "GET",
      headers: headers,
    });
  }

  function getFollowersUsers(headers) {
    return request({
      url: "/me/users/followers",
      requestMethod: "GET",
      headers: headers,
    });
  }

  function followUser(headers, options) {
    return request({
      url: `/api/users/${options.userId}/follow`,
      requestMethod: "PATCH",
      headers: headers,
      body: options,
    });
  }

  function deleteSongFromAllUsers(options) {
    return request({
      url: "/api/users-song/",
      requestMethod: "DELETE",
      body: options,
    });
  }

  // SONG
  function createSong({ body, headers = {} }) {
    return request({
      url: "/api/songs",
      requestMethod: "POST",
      headers: headers,
      body: body,
    });
  }

  function getAllSongs(headers) {
    return request({
      url: "/api/songs",
      requestMethod: "GET",
      headers: headers,
    });
  }

  function updateSongInfo(options) {
    return request({
      url: "/api/songs",
      requestMethod: "PATCH",
      body: options,
    });
  }

  function likeSong(headers, options) {
    return request({
      url: `/songs/${options.songId}/like`,
      requestMethod: "PATCH",
      headers: headers,
      body: options,
    });
  }

  function getMeSongs(headers, options) {
    return request({
      url: "/api/me/songs",
      requestMethod: "GET",
      headers: headers,
      body: options,
    });
  }

  function deleteSongApi(options) {
    return request({
      url: "/api/songs",
      requestMethod: "DELETE",
      body: options,
    });
  }

  function getLikedSongs(headers, options) {
    return request({
      url: "/api/me/songs/liked",
      requestMethod: "GET",
      headers: headers,
      body: options,
    });
  }

  // PLAYLIST
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

  function deleteSongFromPlaylist(options) {
    return request({
      url: `/api/playlists/${options.playlistId}`,
      requestMethod: "DELETE",
      body: options,
    });
  }

  function deleteSongFromAllPlaylists(options) {
    return request({
      url: "/api/playlist-song/",
      requestMethod: "DELETE",
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
      url: `/api/playlists`,
      requestMethod: "PATCH",
      body: options,
    });
  }

  function updatePlaylistOrder(options) {
    return request({
      url: `/api/playlists/${options.playlistId}`,
      requestMethod: "PUT",
      body: options,
    });
  }

  function deletePlaylistFromAllUsers(options) {
    return request({
      url: "/api/users-playlist/",
      requestMethod: "DELETE",
      body: options,
    });
  }

  // GENRE
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

  function addSongToGenre(body) {
    return request({
      url: "/api/genres",
      requestMethod: "PATCH",
      body: body,
    });
  }

  function fetchPopularGenre(headers) {
    return request({
      url: "/api/genres/popular",
      requestMethod: "GET",
      headers: headers,
    });
  }

  function deleteSongFromGenre(options) {
    return request({
      url: "/api/genres",
      requestMethod: "DELETE",
      body: options,
    });
  }

  // PLAYBACK

  function addSongPlayback({ songID }) {
    return request({
      url: `/songs/${songID}/playback`,
      requestMethod: "POST",
    });
  }

  function deleteSongPlayback(options) {
    return request({
      url: `/songs/${options}/playback`,
      requestMethod: "DELETE",
      body: options,
    });
  }

  function deleteSongPlaybackMonthly(options) {
    return request({
      url: `/songs/${options}/playback-monthly`,
      requestMethod: "DELETE",
      body: options,
    });
  }

  function getPopularSongs(headers) {
    return request({
      url: "/api/songs/popular",
      requestMethod: "GET",
      headers: headers,
    });
  }

  return {
    signUp: signUp,
    signOut: signOut,
    updateUserInfo: updateUserInfo,
    createSong: createSong,
    getAllSongs: getAllSongs,
    // getSong: getSong,
    updateSongInfo: updateSongInfo,
    getMeSongs: getMeSongs,
    getLikedSongs: getLikedSongs,
    likeSong: likeSong,
    deleteSongApi: deleteSongApi,
    createPlaylist: createPlaylist,
    fetchPlaylists: fetchPlaylists,
    addSongToPlaylist: addSongToPlaylist,
    deleteSongFromPlaylist: deleteSongFromPlaylist,
    fetchPlaylistById: fetchPlaylistById,
    getOwnPlaylists: getOwnPlaylists,
    followPlaylist: followPlaylist,
    getFollowedPlaylists: getFollowedPlaylists,
    deletePlaylist: deletePlaylist,
    updatePlaylistInfo: updatePlaylistInfo,
    updatePlaylistOrder: updatePlaylistOrder,
    getGenres: getGenres,
    createGenre: createGenre,
    addSongToGenre: addSongToGenre,
    getUserById: getUserById,
    getUsers: getUsers,
    getFollowersUsers: getFollowersUsers,
    getFollowingUsers: getFollowingUsers,
    followUser: followUser,
    addSongPlayback: addSongPlayback,
    getPopularSongs: getPopularSongs,
    fetchPopularGenre: fetchPopularGenre,
    deleteSongFromGenre: deleteSongFromGenre,
    deleteSongFromAllPlaylists: deleteSongFromAllPlaylists,
    deleteSongFromAllUsers: deleteSongFromAllUsers,
    deleteSongPlayback: deleteSongPlayback,
    deleteSongPlaybackMonthly: deleteSongPlaybackMonthly,
    deletePlaylistFromAllUsers: deletePlaylistFromAllUsers,
  };
}

export default makeApi();
