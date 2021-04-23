import * as song from "./song-type";

const initialState = {
  isFetchRequest: false,
  isFetchSuccess: false,
  isFetchFail: null,
  isUpdatingTrack: false,
  trackUpdateSuccess: false,
  trackUpadateError: null,
  songs: [],
  selectedSong: {},
  MySongs: [],
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
        MySongs: [],
      };
    case song.FETCH_SONG_SUCCESS:
      return {
        ...state,
        isFetchRequest: false,
        isFetchSuccess: true,
        isFetchFail: false,
        songs: action.payload,
        MySongs: [],
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
    case song.UPDATE_TRACK_REQUEST:
      return {
        ...state,
        isUpdatingTrack: true,
        trackUpadateError: false,
        selectedSong: action.payload,
      };
    case song.UPDATE_TRACK_SUCCESS:
      return {
        ...state,
        isUpdatingTrack: false,
        trackUpdateSuccess: true,
        trackUpadateError: false,
        selectedSong: action.payload,
      };
    case song.UPDATE_TRACK_ERROR:
      return {
        ...state,
        isUpdatingTrack: false,
        trackUpdateSuccess: false,
        trackUpadateError: action.payload,
      };
    case song.FETCH_ME_SONG_SUCCESS:
      return {
        ...state,
        isFetchRequest: false,
        isFetchSuccess: true,
        isFetchFail: false,
        MySongs: action.payload,
        songs: [],
      };
    default:
      return state;
  }
};

export default songReducer;
