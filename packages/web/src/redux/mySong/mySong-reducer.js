import * as mySong from "./mySong-types";

const initialState = {
  isFetchingMySong: false,
  mySongFetchSuccess: false,
  mySongFetchError: null,
  mySongs: [],
};

const mySongReducer = (state = initialState, action) => {
  switch (action.type) {
    case mySong.FETCH_MY_SONG_REQUEST:
      return {
        ...state,
        isFetchingMySong: true,
        mySongFetchSuccess: false,
        mySongFetchError: false,
      };
    case mySong.FETCH_MY_SONG_SUCCESS:
      return {
        ...state,
        isFetchingMySong: false,
        mySongFetchSuccess: true,
        mySongFetchError: false,
        mySongs: action.payload,
      };
    case mySong.FETCH_MY_SONG_ERROR:
      return {
        ...state,
        isFetchingMySong: false,
        mySongFetchSuccess: false,
        mySongFetchError: action.payload,
      };
    case mySong.FETCH_MY_SONG_RESET:
      return {
        ...state,
        isFetchingMySong: false,
        mySongFetchSuccess: false,
        mySongFetchError: null,
      };
    default:
      return state;
  }
};

export default mySongReducer;
