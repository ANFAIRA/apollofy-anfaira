import { makeRequest } from "./api-utils";

function makeApi(request = makeRequest()) {
  function signUp(headers, options) {
    return request({
      url: "/sign-up",
      requestMethod: "POST",
      headers: headers,
      body: options,
    });
  }

  function signOut(headers) {
    return request({
      url: "/sign-out",
      requestMethod: "POST",
      headers: headers,
    });
  }

  function updateUserInfo(headers, options) {
    return request({
      url: "/api/account",
      requestMethod: "PATCH",
      headers: headers,
      body: options,
    });
  }

  return {
    signUp: signUp,
    signOut: signOut,
    updateUserInfo: updateUserInfo,
  };
}

export default makeApi();
