import { combineReducers } from "redux";
import authReducer from "./auth/auth-reducer";
import playerReducer from "./player/player-reducer";
import songReducer from "./song/song-reducer";
import uploaderReducer from "./uploader/uploader-reducer";
import trackEditorReducer from "./trackEditor/trackEditor-reducer";
import trackDeleteReducer from "./trackDelete/trackDelete-reducer";
import likedSongReducer from "./liked-songs/liked-songs-reducer";
import mySongReducer from "./mySong/mySong-reducer";
import playlistReducer from "./playlist/playlist-reducer";
import playlistDeleteReducer from "./playlistDelete/playlistDelete-reducer";
import playlistEditorReducer from "./playlistEditor/playlistEditor-reducer";
import modalReducer from "./modals/modal-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  uploader: uploaderReducer,
  song: songReducer,
  player: playerReducer,
  trackEditor: trackEditorReducer,
  trackDelete: trackDeleteReducer,
  likedSong: likedSongReducer,
  mySong: mySongReducer,
  playlists: playlistReducer,
  playlistDelete: playlistDeleteReducer,
  playlistEditor: playlistEditorReducer,
  modal: modalReducer,
});

export default rootReducer;
