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
        tracksToPlay: [action.payload],
      };
    case player.ADD_SONG_TO_QUEUE:
      return {
        ...state,
        isPlaying: true,
        tracksToPlay: [...state.tracksToPlay, action.payload],
      };
    case player.PLAY_COLLECTION:
      return {
        ...state,
        isPlaying: true,
        tracksToPlay: action.payload,
      };
    default:
      return state;
  }
};

export default playerReducer;
