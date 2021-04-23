import * as player from "./player-types";

export const playSong = (song) => {
  return { type: player.PLAY_SONG, payload: song };
};
