import { combineReducers } from "redux";
import authReducer from "./auth/auth-reducer";
import playerReducer from "./player/player-reducer";
import playlistReducer from "./playlist/playlist-reducer";
import songReducer from "./song/song-reducer";
import uploaderReducer from "./uploader/uploader-reducer";
import modalReducer from "./modals/modal-reducer";
import userReducer from "./user/user-reducer";
import genreReducer from "./genre/genre-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  uploader: uploaderReducer,
  song: songReducer,
  player: playerReducer,
  playlists: playlistReducer,
  modal: modalReducer,
  user: userReducer,
  genre: genreReducer,
});

export default rootReducer;
