import * as song from "./song-type";

const initialState = {
  isFetchRequest: false,
  isFetchSuccess: false,
  isFetchFail: null,
  songs: [],
  tracksToPlay: [],
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case song.FETCH_SONG_REQUEST:
      return {
        ...state,
        isFetchRequest: true,
        isFetchSuccess: false,
        isFetchFail: false,
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
        tracksToPlay: [],
      };
    case song.PLAY_SONG:
      return { ...state, tracksToPlay: action.payload };
    default:
      return state;
  }
};

export default songReducer;
