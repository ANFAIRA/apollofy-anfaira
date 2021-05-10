import * as player from "./player-types";
import api from "../../api/api";

export const playSong = (song) => {
  return { type: player.PLAY_SONG, payload: song };
};

export function playSongAndSaveStats(song) {
  return async function playSongAndSaveStatsThunk(dispatch) {
    try {
      api.addSongPlayback({
        songID: song._id,
      });

      return dispatch(playSong(song));
    } catch (err) {
      return {};
    }
  };
}

export const addSongToQueue = (song) => {
  return { type: player.ADD_SONG_TO_QUEUE, payload: song };
};

export const playCollection = (collection) => {
  return { type: player.PLAY_COLLECTION, payload: collection };
};

export const playSongFromCollection = (collection, song) => {
  return {
    type: player.PLAY_SONG_FROM_COLLECTION,
    payload: { collection: collection, song: song },
  };
};
