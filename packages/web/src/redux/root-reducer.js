import { combineReducers } from "redux";
import authReducer from "./auth/auth-reducer";
import playerReducer from "./player/player-reducer";
import songReducer from "./song/song-reducer";
import uploaderReducer from "./uploader/uploader-reducer";
import playlistReducer from "./playlist/playlist-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  uploader: uploaderReducer,
  song: songReducer,
  player: playerReducer,
  playlists: playlistReducer,
});

export default rootReducer;
