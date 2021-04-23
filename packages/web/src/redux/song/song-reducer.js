import * as song from "./song-type";

const initialState = {
  isFetchRequest: false,
  isFetchSuccess: false,
  isFetchFail: null,
  songs: [],
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
        songs: [],
      };
    case song.FETCH_SONG_SUCCESS:
      return {
        ...state,
        isFetchRequest: false,
        isFetchSuccess: true,
        isFetchFail: false,
        songs: action.payload,
      };
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
    case song.LIKE_SONG_REQUEST:
      return {
        ...state,
        isLikeRequest: true,
        isLikeSuccess: false,
        isLikeFail: false,
      };
    case song.LIKE_SONG_SUCCESS:
      return {
        ...state,
        isLikeRequest: false,
        isLikeSuccess: true,
        isLikeFail: false,
      };
    case song.LIKE_SONG_ERROR:
      return {
        ...state,
        isLikeRequest: true,
        isLikeSuccess: false,
        isLikeFail: action.payload,
      };
    default:
      return state;
  }
};

export default songReducer;
