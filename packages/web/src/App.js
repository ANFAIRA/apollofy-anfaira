import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Account from "./pages/Account";
import ChangePassword from "./pages/ChangePassword";
import Home from "./pages/Home";
import LikedSongs from "./pages/LikedSongs";
import Login from "./pages/Login";
import MySongs from "./pages/MySongs";
import PlaylistView from "./pages/PlaylistView";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/SignUp";
import { signOut, syncSignIn } from "./redux/auth/auth-actions";
import * as ROUTES from "./routes";
import { onAuthStateChanged } from "./services/auth";
import "./styles/App.scss";

function App() {
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
          <Route path={ROUTES.MY_SONGS} component={MySongs} />
          <Route path={ROUTES.MY_FAVOURITE_SONGS} component={LikedSongs} />
          <Route path={ROUTES.CHANGE_PASSWORD} component={ChangePassword} />
          <Route path={ROUTES.PLAYLIST_BY_ID} component={PlaylistView} />
        </ProtectedRoute>
      </Switch>
    </div>
  );
}

export default App;
