import * as likedSong from "./liked-songs-type";

const initialState = {
  isFetchRequest: false,
  isFetchSuccess: false,
  isFetchFail: null,
  likedSongs: [],
};

const likedSongReducer = (state = initialState, action) => {
  switch (action.type) {
    case likedSong.FETCH_LIKED_SONG_REQUEST:
      return {
        ...state,
        isFetchRequest: true,
        isFetchSuccess: false,
        isFetchFail: false,
      };
    case likedSong.FETCH_LIKED_SONG_SUCCESS:
      return {
        ...state,
        isFetchRequest: false,
        isFetchSuccess: true,
        isFetchFail: false,
        likedSongs: action.payload,
      };
    case likedSong.FETCH_LIKED_SONG_ERROR:
      return {
        ...state,
        isFetchRequest: false,
        isFetchSuccess: false,
        isFetchFail: action.payload,
      };
    default:
      return state;
  }
};

export default likedSongReducer;
