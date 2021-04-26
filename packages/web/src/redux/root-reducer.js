import { combineReducers } from "redux";
import authReducer from "./auth/auth-reducer";
import playerReducer from "./player/player-reducer";
import songReducer from "./song/song-reducer";
import uploaderReducer from "./uploader/uploader-reducer";
import trackEditorReducer from "./trackEditor/trackEditor-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  uploader: uploaderReducer,
  song: songReducer,
  player: playerReducer,
  trackEditor: trackEditorReducer,
});

export default rootReducer;
