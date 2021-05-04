import * as player from "./player-types";

const initialState = {
  isPlaying: false,
  collectionIndex: 0,
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
    case player.PLAY_SONG_FROM_COLLECTION:
      return {
        ...state,
        isPlaying: true,
        tracksToPlay: action.payload.collection,
        collectionIndex: action.payload.collection.findIndex(
          (track) => track._id === action.payload.song,
        ),
      };
    default:
      return state;
  }
};

export default playerReducer;
