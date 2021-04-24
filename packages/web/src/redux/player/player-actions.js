import * as player from "./player-types";

export const playSong = (song) => {
  return { type: player.PLAY_SONG, payload: song };
};

export const addSongToPlaylist = (song) => {
  return { type: player.ADD_SONG_TO_QUEUE, payload: song };
};
