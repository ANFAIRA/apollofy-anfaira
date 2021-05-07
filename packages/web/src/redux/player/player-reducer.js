import * as player from "./player-types";

const initialState = {
  isPlaying: false,
  songsToPlay: [],
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case player.PLAY_SONG:
      return {
        ...state,
        isPlaying: true,
        songsToPlay: [action.payload],
      };
    case player.ADD_SONG_TO_QUEUE:
      return {
        ...state,
        isPlaying: true,
        songsToPlay: [...state.songsToPlay, action.payload],
      };
    case player.PLAY_COLLECTION:
      return {
        ...state,
        isPlaying: true,
        songsToPlay: action.payload,
      };
    default:
      return state;
  }
};

export default playerReducer;
