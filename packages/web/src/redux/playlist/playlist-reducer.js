import * as PlaylistTypes from "./playlist-types";

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
  playlistsByID: {},
  addingSong: false,
  addSongError: null,
  isUpdatingPlaylist: false,
  playlistUpdateSuccess: false,
  playlistUpadateError: null,
  playlistEditing: {},
  createdPlaylist: null,
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
    case PlaylistTypes.CREATE_PLAYLIST_REQUEST: {
      return {
        ...state,
        playlistCreation: true,
        playlistCreationError: null,
      };
    }
    case PlaylistTypes.CREATE_PLAYLIST_ERROR: {
      return {
        ...state,
        playlistCreation: false,
        playlistCreationError: action.payload,
      };
    }
    case PlaylistTypes.CREATE_PLAYLIST_SUCCESS: {
      return {
        ...state,
        playlistCreation: false,
        playlistCreationError: null,
        createdPlaylist: action.payload,
      };
    }
    case PlaylistTypes.FETCH_PLAYLISTS_REQUEST: {
      return {
        ...state,
        playlistsLoading: true,
        playlistsLoadingError: null,
      };
    }
    case PlaylistTypes.FETCH_PLAYLISTS_ERROR: {
      return {
        ...state,
        playlistsLoading: false,
        playlistsLoadingError: action.payload,
      };
    }
    case PlaylistTypes.FETCH_PLAYLISTS_SUCCESS: {
      const actionType = action.payload.type;
      const newIds = { ...state.playlistIds };
      newIds[actionType] = [...action.payload.playlistIds];

      return {
        ...state,
        playlistsLoading: false,
        playlistsLoadingError: null,
        playlistsFetched: true,
        playlistsByID: {
          ...state.playlistsByID,
          ...action.payload.playlistsByID,
        },
        playlistsByID: {
          ...state.playlistsByID,
          ...action.payload.playlistsByID,
        },
        playlistIds: newIds,
      };
    }
    case PlaylistTypes.FETCH_PLAYLIST_BY_ID_SUCCESS: {
      const playlistID = action.payload._id;
      return {
        ...state,
        playlistLoading: false,
        playlistLoadingError: null,
        playlistFetched: true,
        playlistsByID: {
          ...state.playlistsByID,
          [playlistID]: {
            ...action.payload,
            author: Object.values(action.payload.author),
          },
        },
      };
    }
    case PlaylistTypes.ADD_SONG_TO_PLAYLIST_REQUEST: {
      return {
        ...state,
        addingSong: true,
        addSongError: null,
      };
    }
    case PlaylistTypes.ADD_SONG_TO_PLAYLIST_ERROR: {
      return {
        ...state,
        addingSong: false,
        addSongError: action.payload,
      };
    }
    case PlaylistTypes.ADD_SONG_TO_PLAYLIST_SUCCESS: {
      return {
        ...state,
        addingSong: false,
        addSongError: null,
      };
    }
    case PlaylistTypes.DELETE_SONG_FROM_PLAYLIST_REQUEST: {
      return {
        ...state,
        deletingSong: true,
        deleteSongError: null,
      };
    }
    case PlaylistTypes.DELETE_SONG_FROM_PLAYLIST_ERROR: {
      return {
        ...state,
        deletingSong: false,
        deleteSongError: action.payload,
      };
    }
    case PlaylistTypes.DELETE_SONG_FROM_PLAYLIST_SUCCESS: {
      return {
        ...state,
        deletingSong: false,
        deleteSongError: null,
      };
    }
    case PlaylistTypes.UPDATE_PLAYLIST_REQUEST:
      return {
        ...state,
        isUpdatingPlaylist: true,
        playlistUpadateError: false,
      };
    case PlaylistTypes.UPDATE_PLAYLIST_SUCCESS:
      return {
        ...state,
        isUpdatingPlaylist: false,
        playlistUpdateSuccess: true,
        playlistUpadateError: false,
        playlistEditing: action.payload,
      };
    case PlaylistTypes.UPDATE_PLAYLIST_ERROR:
      return {
        ...state,
        isUpdatingPlaylist: false,
        playlistUpdateSuccess: false,
        playlistUpadateError: action.payload,
      };
    case PlaylistTypes.UPDATE_PLAYLIST_RESET: {
      return {
        ...state,
        isUpdatingPlaylist: false,
        playlistUpdateSuccess: false,
        playlistUpadateError: null,
      };
    }
    case PlaylistTypes.UPDATE_UPDATED_PLAYLIST:
      console.log(action.payload);
      return {
        ...state,
        playlistsByID: {
          ...state.playlistsByID,
          [action.payload._id]: {
            ...state.playlistsByID[action.payload._id],
            title: action.payload.title,
            thumbnail: action.payload.thumbnail,
            description: action.payload.description,
            type: action.payload.type,
            publicAccessible: action.payload.publicAccessible,
          },
        },
      };
    case PlaylistTypes.ADD_CREATED_PLAYLIST: {
      const playlistId = action.payload.data._id;
      const newIds = { ...state.playlistIds };

      newIds.ALL = [...state.playlistIds.ALL, playlistId];

      return {
        ...state,
        playlistsByID: {
          ...state.playlistsByID,
          [playlistId]: { ...action.payload.data },
        },
        playlistIds: newIds,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default PlaylistReducer;
