import * as player from "./player-types";

const initialState = {
  isPlaying: false,
  tracksToPlay: [],
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case player.PLAY_SONG:
      return {
        ...state,
        isPlaying: true,
        tracksToPlay: action.payload,
      };
    case player.PAUSE_SONG:
      return {
        ...state,
        isPlaying: false,
      };
    default:
      return state;
  }
};

export default playerReducer;
