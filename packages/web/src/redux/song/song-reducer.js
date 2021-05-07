import * as song from "./song-type";

const initialState = {
  isFetchRequest: false,
  isFetchSuccess: false,
  isFetchFail: null,
  songsByID: {},
  songsIds: {
    ALL_SONGS: [],
    MY_SONGS: [],
    FAVORITE: [],
    POPULAR: [],
    RECOMMENDED: [],
    LISTENED_RECENTLY: [],
    BASED_ON_LISTENED: [],
  },
  currentUser: {},
  songEditing: {},
  isUpdatingSong: false,
  songUpdateSuccess: false,
  songUpadateError: null,
  isDeletingSong: false,
  songDeleteSuccess: false,
  songDeleteError: null,
  songId: null,
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case song.FETCH_SONG_REQUEST:
      return {
        ...state,
        isFetchRequest: true,
        isFetchSuccess: false,
        isFetchFail: false,
        isLikeRequest: true,
        isLikeSuccess: false,
        isLikeFail: false,
      };
    case song.FETCH_SONG_SUCCESS: {
      const actionType = action.payload.type;
      const newIds = { ...state.songsIds };
      newIds[actionType] = [...action.payload.songsIds];

      return {
        ...state,
        isFetchRequest: false,
        isFetchFail: null,
        isFetchSuccess: true,
        songsByID: {
          ...state.songsByID,
          ...action.payload.songsByID,
        },
        songsIds: newIds,
      };
    }
    case song.FETCH_SONG_ERROR:
      return {
        ...state,
        isFetchRequest: false,
        isFetchSuccess: false,
        isFetchFail: action.payload,
      };
    case song.FETCH_SONG_RESET:
      return {
        ...state,
        isFetchRequest: false,
        isFetchSuccess: false,
        isFetchFail: null,
      };
    // case song.LIKE_SONG_REQUEST:
    //   return {
    //     ...state,
    //     isLikeRequest: true,
    //     isLikeSuccess: false,
    //     isLikeFail: false,
    //   };
    // case song.LIKE_SONG_SUCCESS:
    //   return {
    //     ...state,
    //     isLikeRequest: false,
    //     isLikeSuccess: true,
    //     isLikeFail: false,
    //     currentUser: action.payload.data,
    //   };
    // case song.LIKE_SONG_ERROR:
    //   return {
    //     ...state,
    //     isLikeRequest: true,
    //     isLikeSuccess: false,
    //     isLikeFail: action.payload,
    //   };
    case song.RESET_STATE:
      return {
        ...initialState,
      };
    case song.DELETE_SONG_REQUEST:
      return {
        ...state,
        isDeletingSong: true,
        songDeleteError: false,
      };
    case song.DELETE_SONG_SUCCESS:
      // eslint-disable-next-line no-param-reassign
      delete state.songsByID[action.payload.data._id];
      for (const keys in state.songsIds) {
        if (keys) {
          // eslint-disable-next-line no-param-reassign
          state.songsIds[keys] = state.songsIds[keys].filter(
            (itemId) => itemId !== action.payload.data._id,
          );
        }
      }
      return {
        ...state,
        isDeletingSong: false,
        songDeleteSuccess: true,
        songDeleteError: false,
        songId: action.payload,
        songsByID: { ...state.songsByID },
        songsIds: { ...state.songsIds },
      };
    case song.DELETE_SONG_ERROR:
      return {
        ...state,
        isDeletingSong: false,
        songDeleteSuccess: false,
        songDeleteError: action.payload,
      };
    case song.DELETE_SONG_RESET: {
      return {
        ...state,
        isDeletingSong: false,
        songDeleteSuccess: false,
        songDeleteError: null,
      };
    }
    case song.UPDATE_SONG_REQUEST:
      return {
        ...state,
        isUpdatingSong: true,
        songUpadateError: false,
      };
    case song.UPDATE_SONG_SUCCESS:
      return {
        ...state,
        isUpdatingSong: false,
        songUpdateSuccess: true,
        songUpadateError: false,
        songEditing: action.payload,
      };
    case song.UPDATE_SONG_ERROR:
      return {
        ...state,
        isUpdatingSong: false,
        songUpdateSuccess: false,
        songUpadateError: action.payload,
      };
    case song.UPDATE_SONG_RESET:
      return {
        ...state,
        isUpdatingSong: false,
        songUpdateSuccess: false,
        songUpadateError: null,
        // songEditing: {},
      };
    case song.UPDATE_UPDATED_SONG:
      console.log(action.payload);
      return {
        ...state,
        songsByID: {
          ...state.songsByID,
          [action.payload._id.title]: action.payload.title,
          [action.payload._id.thumbnail]: action.payload.thumbnail,
          [action.payload._id.genre]: action.payload.genre,
          [action.payload._id.artist]: action.payload.artist,
        },
      };
    case song.ADD_UPLOADED_SONG: {
      const songId = action.payload.data._id;
      const newIds = { ...state.songsIds };

      newIds.ALL_SONGS = [...state.songsIds.ALL_SONGS, songId];

      return {
        ...state,
        songsByID: { ...state.songsByID, [songId]: { ...action.payload.data } },
        songsIds: newIds,
      };
    }
    case song.SONG_TO_UPDATE:
      return {
        ...state,
        songEditing: action.payload,
      };

    default:
      return state;
  }
};

export default songReducer;
