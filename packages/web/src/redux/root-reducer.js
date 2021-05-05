import { combineReducers } from "redux";
import authReducer from "./auth/auth-reducer";
import playerReducer from "./player/player-reducer";
import songReducer from "./song/song-reducer";
import uploaderReducer from "./uploader/uploader-reducer";
import songEditorReducer from "./songEditor/songEditor-reducer";
import songDeleteReducer from "./songDelete/songDelete-reducer";
import likedSongReducer from "./liked-songs/liked-songs-reducer";
import mySongReducer from "./mySong/mySong-reducer";
import playlistReducer from "./playlist/playlist-reducer";
import playlistDeleteReducer from "./playlistDelete/playlistDelete-reducer";
import playlistEditorReducer from "./playlistEditor/playlistEditor-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  uploader: uploaderReducer,
  song: songReducer,
  player: playerReducer,
  songEditor: songEditorReducer,
  songDelete: songDeleteReducer,
  likedSong: likedSongReducer,
  mySong: mySongReducer,
  playlists: playlistReducer,
  playlistDelete: playlistDeleteReducer,
  playlistEditor: playlistEditorReducer,
});

export default rootReducer;
