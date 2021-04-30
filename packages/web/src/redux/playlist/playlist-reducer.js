import * as PlaylistType from "./playlist-types";

export const PlaylistInitState = {
  playlistCreation: false,
  playlistCreationError: null,
  playlistUpdate: false,
  playlistUpdateError: null,
  playlistsLoading: false,
  playlistsLoadingError: null,
  playlistsFetched: false,
  playlistLoading: false,
  playlistLoadingError: null,
  playlistFetched: false,
  playlistByID: {},
  trackByID: {},
  addingSong: false,
  addSongError: null,
  followPlaylist: false,
  followPlaylistError: null,
  playlistIds: {
    ALL: [],
    OWN: [],
    FOLLOWING: [],
    RECOMMENDED: [],
    LISTENED_RECENTLY: [],
    BASED_ON_LISTENED: [],
    POPULAR: [],
  },
};

const PlaylistReducer = (state = PlaylistInitState, action) => {
  switch (action.type) {
    case PlaylistType.CREATE_PLAYLIST_REQUEST: {
      return {
        ...state,
        playlistCreation: true,
        playlistCreationError: null,
      };
    }
    case PlaylistType.CREATE_PLAYLIST_ERROR: {
      return {
        ...state,
        playlistCreation: false,
        playlistCreationError: action.payload,
      };
    }
    case PlaylistType.CREATE_PLAYLIST_SUCCESS: {
      return {
        ...state,
        playlistCreation: false,
        playlistCreationError: null,
      };
    }
    case PlaylistType.FETCH_PLAYLISTS_REQUEST: {
      return {
        ...state,
        playlistsLoading: true,
        playlistsLoadingError: null,
      };
    }
    case PlaylistType.FETCH_PLAYLISTS_ERROR: {
      return {
        ...state,
        playlistsLoading: false,
        playlistsLoadingError: action.payload,
      };
    }
    case PlaylistType.FETCH_PLAYLISTS_SUCCESS: {
      const actionType = action.payload.type;
      const newIds = { ...state.playlistIds };
      newIds[actionType] = [...action.payload.playlistIds];

      return {
        ...state,
        playlistsLoading: false,
        playlistsLoadingError: null,
        playlistsFetched: true,
        playlistByID: {
          ...state.playlistByID,
          ...action.payload.playlistByID,
        },
        trackByID: {
          ...state.trackByID,
          ...action.payload.trackByID,
        },
        playlistIds: newIds,
      };
    }
    case PlaylistType.FETCH_PLAYLIST_BY_ID_SUCCESS: {
      const playlistID = action.payload._id;
      return {
        ...state,
        playlistLoading: false,
        playlistLoadingError: null,
        playlistFetched: true,
        playlistByID: {
          ...state.playlistByID,
          [playlistID]: {
            ...action.payload,
            author: Object.values(action.payload.author),
          },
        },
      };
    }
    case PlaylistType.ADD_SONG_TO_PLAYLIST_REQUEST: {
      return {
        ...state,
        addingSong: true,
        addSongError: null,
      };
    }
    case PlaylistType.ADD_SONG_TO_PLAYLIST_ERROR: {
      return {
        ...state,
        addingSong: false,
        addSongError: action.payload,
      };
    }
    case PlaylistType.ADD_SONG_TO_PLAYLIST_SUCCESS: {
      return {
        ...state,
        addingSong: false,
        addSongError: null,
      };
    }

    case PlaylistType.playlistTypes.FOLLOW_PLAYLIST_REQUEST: {
      return { ...state, followPlaylist: true, followPlaylistError: null };
    }
    case PlaylistType.playlistTypes.FOLLOW_PLAYLIST_ERROR: {
      return {
        ...state,
        followPlaylist: false,
        followPlaylistError: action.payload,
      };
    }
    case PlaylistType.playlistTypes.FOLLOW_PLAYLIST_SUCCESS: {
      return { ...state, followPlaylist: false, followPlaylistError: null };
    }

    default: {
      return { ...state };
    }
  }
};

export default PlaylistReducer;
