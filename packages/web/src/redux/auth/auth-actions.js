import api from "../../api";
import * as auth from "../../services/auth";
import * as AuthTypes from "./auth-types";

export const resetStoreAndLogOut = () => ({
  type: AuthTypes.RESET_STORE_AND_LOG_OUT,
});

export const signUpRequest = (userData) => ({
  type: AuthTypes.SIGN_UP_REQUEST,
  payload: userData,
});

export const signUpError = (message) => ({
  type: AuthTypes.SIGN_UP_ERROR,
  payload: message,
});

export function signUpWithGoogleRequest() {
  return async function signUpThunk(dispatch, getState) {
    const currentUser = getState().auth.currentUser;
    dispatch(signUpRequest());
    try {
      await auth.singInWithGoogle();
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
}

export function signUpWithEmailRequest(formData) {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest(formData));
    try {
      const { email, password } = formData;
      await auth.singUpWithEmailAndPassword(email, password);
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
}

export function signInWithEmailRequest(email, password) {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());
    try {
      await auth.singInWithEmailAndPassword(email, password);
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
}

export function syncSignIn() {
  return async function syncSignInThunk(dispatch, getState) {
    const token = await auth.getCurrentUserToken();
    const currentUser = getState().auth.currentUser;

    if (!token) {
      return dispatch(signOutSuccess());
    }

    const response = await api.signUp(
      {
        Authorization: `Bearer ${token}`,
      },
      {
        currentUser: currentUser,
      },
    );

    if (response.errorMessage) {
      return dispatch(signUpError(response.errorMessage));
    }

    return dispatch(signUpSuccess(response.data));
  };
}

export const signUpSuccess = (user) => ({
  type: AuthTypes.SIGN_UP_SUCCESS,
  payload: user,
});

export const signOutRequest = () => ({
  type: AuthTypes.SIGN_OUT_REQUEST,
});

export function signOut() {
  return async function signOutThunk(dispatch) {
    dispatch(signOutRequest());

    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    const response = await api.signOut({
      Authorization: `Bearer ${token}`,
    });

    if (response.errorMessage) {
      return dispatch(signOutError(response.errorMessage));
    }

    auth.signOut();

    return dispatch(signOutSuccess());
  };
}

export const signOutError = (message) => ({
  type: AuthTypes.SIGN_OUT_ERROR,
  payload: message,
});

export const signOutSuccess = () => ({
  type: AuthTypes.SIGN_OUT_SUCCESS,
});

export function sendPasswordResetEmail(email) {
  return async function sendPasswordResetEmailRequestThunk(dispatch) {
    dispatch(sendPasswordResetEmailRequest());
    try {
      await auth.sendPasswordResetEmail(email);
      dispatch(sendPasswordResetEmailSuccess());
    } catch (error) {
      dispatch(sendPasswordResetEmailError(error.message));
    }
    return dispatch(sendPasswordResetEmailSuccess());
  };
}

export const sendPasswordResetEmailRequest = () => ({
  type: AuthTypes.SEND_PASSWORD_RESET_EMAIL_REQUEST,
});

export const sendPasswordResetEmailError = () => ({
  type: AuthTypes.SEND_PASSWORD_RESET_EMAIL_ERROR,
});

export const sendPasswordResetEmailSuccess = () => ({
  type: AuthTypes.SEND_PASSWORD_RESET_EMAIL_SUCCESS,
});

export const resetAuthState = () => ({
  type: AuthTypes.RESET_AUTH_STATE,
});

export function updateUserAccount(userData) {
  return async function updateUserAccountThunk(dispatch) {
    dispatch(updateUserAccountRequest());
    try {
      const token = await auth.getCurrentUserToken();
      const response = await api.updateUserInfo(
        {
          Authorization: `Bearer ${token}`,
        },
        userData,
      );
      console.log(response);
      return updateUserAccountSuccess(response);
    } catch (error) {
      dispatch(updateUserAccountError(error.message));
    }
    return dispatch(updateUserAccountSuccess(userData));
  };
}

export const updateUserAccountRequest = () => ({
  type: AuthTypes.UPDATE_USER_ACCOUNT_REQUEST,
});

export const updateUserAccountSuccess = (userData) => ({
  type: AuthTypes.UPDATE_USER_ACCOUNT_SUCCESS,
  payload: userData,
});

export const updateUserAccountError = (message) => ({
  type: AuthTypes.UPDATE_USER_ACCOUNT_ERROR,
  payload: message,
});

export const changePasswordRequest = () => ({
  type: AuthTypes.CHANGE_PASSWORD_REQUEST,
});

export const changePasswordError = (message) => ({
  type: AuthTypes.CHANGE_PASSWORD_ERROR,
  payload: message,
});

export const changePasswordSuccess = () => ({
  type: AuthTypes.CHANGE_PASSWORD_SUCCESS,
});

export function changePassword(userPassword) {
  return async function changePasswordThunk(dispatch) {
    dispatch(changePasswordRequest());
    try {
      await auth.reauthenticatePassword(userPassword);
      await auth.changePassword(userPassword);

      dispatch(changePasswordSuccess());
    } catch (error) {
      dispatch(changePasswordError(error));
    }
  };
}

export const resetPasswordState = () => ({
  type: AuthTypes.RESET_PASSWORD_STATE,
});
