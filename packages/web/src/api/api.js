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
      url: "/api/tracks",
      requestMethod: "POST",
      headers: headers,
      body: body,
    });
  }

  function getAllSongs(headers) {
    return request({
      url: "/api/tracks",
      requestMethod: "GET",
      headers: headers,
    });
  }

  // function getSong(headers) {
  //   return request({
  //     url: "/api/tracks/:id",
  //     requestMethod: "GET",
  //     headers: headers,
  //   })
  // }

  function updateSongInfo(options) {
    return request({
      url: "/api/tracks",
      requestMethod: "PATCH",
      body: options,
    });
  }

  function getMeSongs(headers, options) {
    return request({
      url: "/api/me/tracks",
      requestMethod: "GET",
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
    // getSong: getSong,
    updateSongInfo: updateSongInfo,
    getMeSongs: getMeSongs,
  };
}

export default makeApi();
