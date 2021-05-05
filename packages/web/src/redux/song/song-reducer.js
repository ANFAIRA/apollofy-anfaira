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
  selectedSong: {},
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
        isFetchSuccess: true,
        isFetchFail: false,
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
    default:
      return state;
  }
};

export default songReducer;
