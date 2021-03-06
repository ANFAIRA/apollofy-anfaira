import * as AuthTypes from "./auth-types";

export const AuthInitialState = {
  isSigningUp: false,
  signUpError: null,
  isSigningOut: false,
  signOutError: null,
  isAuthenticated: false,
  isSendingPasswordReset: false,
  passwordResetError: null,
  passwordResetSent: false,
  userIsUpdating: false,
  userIsUpdated: false,
  userUpdateError: null,
  passwordIsChanging: false,
  passwordIsChanged: null,
  passwordChangeError: null,
  currentUser: {
    email: null,
  },
};

const AuthReducer = (state = AuthInitialState, action) => {
  switch (action.type) {
    case AuthTypes.SIGN_UP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        signUpError: null,
        currentUser: action.payload,
      };
    }
    case AuthTypes.SIGN_UP_ERROR: {
      return {
        ...state,
        isSigningUp: false,
        signUpError: action.payload,
      };
    }
    case AuthTypes.SIGN_UP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        isSigningUp: false,
        signUpError: null,
        currentUser: action.payload,
      };
    }
    case AuthTypes.SIGN_OUT_REQUEST: {
      return {
        ...state,
        isSigningOut: true,
        signOutError: null,
      };
    }
    case AuthTypes.SIGN_OUT_ERROR: {
      return {
        ...state,
        isSigningOut: false,
        signOutError: action.payload,
      };
    }
    case AuthTypes.SIGN_OUT_SUCCESS: {
      return {
        ...AuthInitialState,
      };
    }
    case AuthTypes.SEND_PASSWORD_RESET_EMAIL_REQUEST: {
      return {
        ...state,
        isSendingPasswordReset: true,
        passwordResetError: null,
        passwordResetSent: false,
      };
    }
    case AuthTypes.SEND_PASSWORD_RESET_EMAIL_ERROR: {
      return {
        ...state,
        isSendingPasswordReset: false,
        passwordResetError: action.payload,
        passwordResetSent: false,
      };
    }
    case AuthTypes.SEND_PASSWORD_RESET_EMAIL_SUCCESS: {
      return {
        ...state,
        isSendingPasswordReset: false,
        passwordResetError: null,
        passwordResetSent: true,
      };
    }
    case AuthTypes.RESET_AUTH_STATE: {
      return {
        ...state,
        isSigningUp: false,
        signUpError: null,
        isSigningOut: false,
        signOutError: null,
        isSendingPasswordReset: false,
        passwordResetError: null,
        passwordResetSent: false,
      };
    }
    case AuthTypes.UPDATE_USER_ACCOUNT_REQUEST: {
      return {
        ...state,
        userIsUpdating: true,
        userUpdateError: null,
      };
    }
    case AuthTypes.UPDATE_USER_ACCOUNT_SUCCESS: {
      return {
        ...state,
        userIsUpdated: true,
        userIsUpdating: false,
        userUpdateError: null,
        currentUser: action.payload,
      };
    }
    case AuthTypes.UPDATE_USER_ACCOUNT_ERROR: {
      return {
        ...state,
        userIsUpdating: false,
        userUpdateError: action.payload,
      };
    }
    case AuthTypes.UPDATE_USER_ACCOUNT_RESET:
      return {
        ...state,
        userIsUpdated: false,
        userIsUpdating: false,
        userUpdateError: null,
      };
    case AuthTypes.CHANGE_PASSWORD_REQUEST: {
      return {
        ...state,
        passwordIsChanged: false,
        passwordIsChanging: true,
        passwordChangeError: null,
      };
    }
    case AuthTypes.CHANGE_PASSWORD_ERROR: {
      return {
        ...state,
        passwordIsChanged: false,
        passwordIsChanging: false,
        passwordChangeError: action.payload,
      };
    }
    case AuthTypes.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordIsChanged: true,
        passwordIsChanging: false,
        passwordChangeError: null,
      };
    }
    case AuthTypes.RESET_PASSWORD_STATE: {
      return {
        ...state,
        passwordIsChanged: false,
        passwordIsChanging: false,
        passwordChangeError: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
