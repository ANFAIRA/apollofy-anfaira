import * as player from "./player-types";

export const playSong = (song) => {
  return { type: player.PLAY_SONG, payload: song };
};

export const playCollection = (song) => {
  return { type: player.PLAY_COLLECTION, payload: song };
};

export const addSongToQueue = (song) => {
  return { type: player.ADD_SONG_TO_QUEUE, payload: song };
};
