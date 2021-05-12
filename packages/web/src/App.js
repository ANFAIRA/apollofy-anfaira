import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Account from "./pages/Account";
import ChangePassword from "./pages/ChangePassword";
import FollowingPlaylists from "./pages/FollowingPlaylists";
import Home from "./pages/Home";
import LikedSongs from "./pages/LikedSongs";
import Login from "./pages/Login";
import MyPlaylists from "./pages/MyPlaylists";
import MySongs from "./pages/MySongs";
import UserSongs from "./pages/UserSongs";
import UserLikedSongs from "./pages/UserLikedSongs";
import UserPlaylists from "./pages/UserPlaylists";
import UserFollowingPlaylists from "./pages/UserFollowingPlaylists";
import PlaylistView from "./pages/PlaylistView";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/SignUp";
import UserView from "./pages/UserView";
import { signOut, syncSignIn } from "./redux/auth/auth-actions";
import * as ROUTES from "./routes";
import { onAuthStateChanged } from "./services/auth";
import "./styles/App.scss";
import GenreView from "./pages/GenreView/GenreView";

import { fetchUsers } from "./redux/user/user-actions";
import { fetchGenres } from "./redux/genre/genre-actions";
import { userTypes } from "./redux/user/user-types";
import { fetchAllSongs, fetchPopularSongs } from "./redux/song/song-actions";
import { fetchPlaylists } from "./redux/playlist/playlist-actions";
import { playlistTypes } from "./redux/playlist/playlist-types";
import { songsTypes } from "./redux/song/song-types";

function App() {
  const { ALL_SONGS, POPULAR } = useSelector((state) => state.song.songIds);
  const { ALL_USERS } = useSelector((state) => state.user.userIds);
  const { ALL } = useSelector((state) => state.playlists.playlistIds);
  const { genreIds } = useSelector((state) => state.genre);
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = onAuthStateChanged((user) => {
      if (user) {
        dispatch(syncSignIn());
      } else {
        dispatch(signOut());
      }
    });

    return () => {
      if (unsubscribeFromAuth) {
        unsubscribeFromAuth();
      }
    };
  }, [dispatch]);

  useEffect(() => {
    if (ALL_USERS.length === 0) {
      dispatch(fetchUsers(userTypes.ALL_USERS));
    }

    if (ALL_SONGS.length === 0) {
      dispatch(fetchAllSongs(songsTypes.ALL_SONGS));
    }
    if (ALL.length === 0) {
      dispatch(fetchPlaylists(playlistTypes.ALL));
    }
    if (POPULAR.length === 0) {
      dispatch(fetchPopularSongs(songsTypes.POPULAR));
    }
    if (genreIds.length === 0) {
      dispatch(fetchGenres());
    }
  }, [
    dispatch,
    ALL_USERS.length,
    ALL_SONGS.length,
    ALL.length,
    POPULAR.length,
    genreIds.length,
  ]);

  return (
    <div className="App__container">
      <Switch>
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
        <ProtectedRoute>
          <Route path={ROUTES.HOME} component={Home} exact />
          <Route path={ROUTES.PROFILE} component={Profile} />
          <Route path={ROUTES.ACCOUNT} component={Account} />
          <Route path={ROUTES.USER_BY_ID} component={UserView} />
          <Route path={ROUTES.MY_SONGS} component={MySongs} />
          <Route path={ROUTES.MY_FAVOURITE_SONGS} component={LikedSongs} />
          <Route path={ROUTES.CHANGE_PASSWORD} component={ChangePassword} />
          <Route path={ROUTES.PLAYLIST_BY_ID} component={PlaylistView} />
          <Route path={ROUTES.GENRE_BY_ID} component={GenreView} />
          <Route path={ROUTES.MY_PLAYLISTS} component={MyPlaylists} />
          <Route path={ROUTES.USER_SONGS} component={UserSongs} />
          <Route
            path={ROUTES.USER_FAVOURITE_SONGS}
            component={UserLikedSongs}
          />
          <Route path={ROUTES.USER_PLAYLISTS} component={UserPlaylists} />
          <Route
            path={ROUTES.USER_FOLLOWING_PLAYLISTS}
            component={UserFollowingPlaylists}
          />
          <Route
            path={ROUTES.FOLLOWING_PLAYLISTS}
            component={FollowingPlaylists}
          />
        </ProtectedRoute>
      </Switch>
    </div>
  );
}

export default App;
