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

  function createTrack({ body, headers = {} }) {
    return request({
      url: "/tracks",
      requestMethod: "POST",
      body: body,
      headers: headers,
    });
  }

  function getAllSongs(headers) {
    return request({
      url: "/api/tracks",
      requestMethod: "GET",
      headers: headers,
    });
  }

  function likeSong(headers, options) {
    return request({
      url: `/tracks/${options.songId}/like`,
      requestMethod: "PATCH",
      headers: headers,
      body: options,
    });
  }

  return {
    signUp: signUp,
    signOut: signOut,
    updateUserInfo: updateUserInfo,
    createTrack: createTrack,
    getAllSongs: getAllSongs,
    likeSong: likeSong,
  };
}

export default makeApi();
