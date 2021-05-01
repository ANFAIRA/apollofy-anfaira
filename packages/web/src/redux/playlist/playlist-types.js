export const CREATE_PLAYLIST_REQUEST = "CREATE_PLAYLIST_REQUEST";
export const CREATE_PLAYLIST_SUCCESS = "CREATE_PLAYLIST_SUCCESS";
export const CREATE_PLAYLIST_ERROR = "CREATE_PLAYLIST_ERROR";

export const FETCH_PLAYLISTS_REQUEST = "FETCH_PLAYLISTS_REQUEST";
export const FETCH_PLAYLISTS_ERROR = "FETCH_PLAYLISTS_ERROR";

export const FETCH_PLAYLIST_BY_ID_SUCCESS = "FETCH_PLAYLIST_BY_ID_SUCCESS";
export const FETCH_PLAYLISTS_SUCCESS = "FETCH_PLAYLISTS_SUCCESS";

export const ADD_SONG_TO_PLAYLIST_REQUEST = "ADD_SONG_TO_PLAYLIST_REQUEST";
export const ADD_SONG_TO_PLAYLIST_SUCCESS = "ADD_SONG_TO_PLAYLIST_SUCCESS";
export const ADD_SONG_TO_PLAYLIST_ERROR = "ADD_SONG_TO_PLAYLIST_ERROR";

export const FETCH_PLAYLIST_SUCCESS = "FETCH_PLAYLIST_SUCCESS";

export const FOLLOW_PLAYLIST_REQUEST = "FOLLOW_PLAYLIST_REQUEST";
export const FOLLOW_PLAYLIST_SUCCESS = "FOLLOW_PLAYLIST_SUCCESS";
export const FOLLOW_PLAYLIST_ERROR = "FOLLOW_PLAYLIST_ERROR";

export const playlistTypes = {
  ALL: "ALL",
  OWN: "OWN",
  FOLLOWING: "FOLLOWING",
  RECOMMENDED: "RECOMMENDED",
  LISTENED_RECENTLY: "LISTENED_RECENTLY",
  BASED_ON_LISTENED: "BASED_ON_LISTENED",
  POPULAR: "POPULAR",
};
