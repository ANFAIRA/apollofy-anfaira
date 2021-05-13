import * as song from "./song-types";

const initialState = {
  isFetchRequest: false,
  isFetchFail: null,

  isFetchAllSuccess: false,
  isFetchOwnSuccess: false,
  isFetchPopularSuccess: false,
  isFetchFavoriteSuccess: false,

  isUpdatingSong: false,
  songUpdateSuccess: false,
  songUpdateError: null,
  songEditing: null,

  isDeletingSong: false,
  songDeleteSuccess: false,
  songDeletingError: null,
  songDeleting: null,

  currentUser: {},
  songsByID: {},
  songIds: {
    ALL_SONGS: [],
    MY_SONGS: [],
    FAVORITE: [],
    POPULAR: [],
    RECOMMENDED: [],
    LISTENED_RECENTLY: [],
    BASED_ON_LISTENED: [],
  },
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case song.FETCH_SONG_REQUEST:
      return {
        ...state,
        isFetchRequest: true,
        isFetchFail: false,
        isLikeRequest: true,
        isLikeSuccess: false,
        isLikeFail: false,
      };
    case song.FETCH_ALL_SONGS_SUCCESS: {
      const actionType = action.payload.type;
      const newIds = { ...state.songIds };
      newIds[actionType] = [...action.payload.songIds];

      return {
        ...state,
        isFetchRequest: false,
        isFetchFail: null,
        isFetchAllSuccess: true,
        songsByID: {
          ...state.songsByID,
          ...action.payload.songsByID,
        },
        songIds: newIds,
      };
    }
    case song.FETCH_POPULAR_SONGS_SUCCESS: {
      const actionType = action.payload.type;
      const newIds = { ...state.songIds };
      newIds[actionType] = [...action.payload.songIds];

      return {
        ...state,
        isFetchRequest: false,
        isFetchFail: null,
        isFetchPopularSuccess: true,
        songsByID: {
          ...state.songsByID,
          ...action.payload.songsByID,
        },
        songIds: newIds,
      };
    }
    case song.FETCH_MY_SONGS_SUCCESS: {
      const actionType = action.payload.type;
      const newIds = { ...state.songIds };
      newIds[actionType] = [...action.payload.songIds];

      return {
        ...state,
        isFetchRequest: false,
        isFetchFail: null,
        isFetchOwnSuccess: true,
        songsByID: {
          ...state.songsByID,
          ...action.payload.songsByID,
        },
        songIds: newIds,
      };
    }
    case song.FETCH_FAVORITE_SONGS_SUCCESS: {
      const actionType = action.payload.type;
      const newIds = { ...state.songIds };
      newIds[actionType] = [...action.payload.songIds];

      return {
        ...state,
        isFetchRequest: false,
        isFetchFail: null,
        isFetchFavoriteSuccess: true,
        songsByID: {
          ...state.songsByID,
          ...action.payload.songsByID,
        },
        songIds: newIds,
      };
    }
    case song.FETCH_SONG_ERROR:
      return {
        ...state,
        isFetchRequest: false,
        isFetchFail: action.payload,
      };
    case song.RESET_STATE:
      return {
        ...initialState,
      };
    case song.DELETE_SONG_REQUEST:
      return {
        ...state,
        isDeletingSong: true,
        songDeletingError: null,
      };
    case song.DELETE_SONG_SUCCESS:
      // eslint-disable-next-line no-param-reassign
      delete state.songsByID[action.payload.data._id];
      for (const keys in state.songIds) {
        if (keys) {
          // eslint-disable-next-line no-param-reassign
          state.songIds[keys] = state.songIds[keys].filter(
            (itemId) => itemId !== action.payload.data._id,
          );
        }
      }
      return {
        ...state,
        isDeletingSong: false,
        songDeletingError: null,
        songsByID: { ...state.songsByID },
        songIds: { ...state.songIds },
        songDeleting: null,
        songDeleteSuccess: true,
      };
    case song.DELETE_SONG_ERROR:
      return {
        ...state,
        isDeletingSong: false,
        songDeletingError: action.payload,
      };
    case song.DELETE_SONG_RESET: {
      return {
        ...state,
        isDeletingSong: false,
        songDeleteSuccess: false,
        songDeletingError: null,
        songEditing: null,
      };
    }
    case song.UPDATE_SONG_REQUEST:
      return {
        ...state,
        isUpdatingSong: true,
        songUpdateError: null,
      };
    case song.UPDATE_SONG_SUCCESS:
      return {
        ...state,
        isUpdatingSong: false,
        songUpdateSuccess: true,
        songUpdateError: null,
      };
    case song.UPDATE_SONG_ERROR:
      return {
        ...state,
        isUpdatingSong: false,
        songUpdateError: action.payload,
      };
    case song.UPDATE_UPDATED_SONG:
      return {
        ...state,
        songsByID: {
          ...state.songsByID,
          [action.payload._id]: {
            ...state.songsByID[action.payload._id],
            title: action.payload.title,
            thumbnail: action.payload.thumbnail,
            genre: action.payload.genre,
            artist: action.payload.artist,
          },
        },
      };
    case song.UPDATE_SONG_RESET:
      return {
        ...state,
        isUpdatingSong: false,
        songUpdateSuccess: false,
        songUpdateError: null,
        songEditing: null,
      };
    case song.ADD_UPLOADED_SONG: {
      const songId = action.payload.data._id;
      const newIds = { ...state.songIds };

      newIds.ALL_SONGS = [...state.songIds.ALL_SONGS, songId];

      return {
        ...state,
        songsByID: { ...state.songsByID, [songId]: { ...action.payload.data } },
        songIds: newIds,
      };
    }
    case song.SONG_TO_UPDATE:
      return {
        ...state,
        songEditing: action.payload,
      };
    case song.SONG_TO_DELETE:
      return {
        ...state,
        songDeleting: action.payload,
      };
    case song.DELETE_PLAYBACK_REQUEST:
      return {
        ...state,
        isDeletingPlayback: true,
        playbackDeleteError: null,
      };
    case song.DELETE_PLAYBACK_SUCCESS:
      return {
        ...state,
        isDeletingPlayback: false,
        playbackDeleteSuccess: true,
        playbackDeleteError: null,
      };
    case song.DELETE_PLAYBACK_ERROR:
      return {
        ...state,
        isDeletingPlayback: false,
        playbackDeleteError: action.payload,
      };
    default:
      return { ...state };
  }
};

export default songReducer;
