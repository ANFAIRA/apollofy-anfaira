import * as GenreTypes from "./genre-types";

export const GenreInitState = {
  genresLoading: false,
  genresLoadingError: null,
  genresFetched: false,
  genresByID: {},
  genreIds: [],
};

const GenreReducer = (state = GenreInitState, action) => {
  switch (action.type) {
    case GenreTypes.FETCH_GENRE_REQUEST: {
      return {
        ...state,
        genresLoading: true,
        genresLoadingError: null,
      };
    }
    case GenreTypes.FETCH_GENRE_ERROR: {
      return {
        ...state,
        genresLoading: false,
        genresLoadingError: action.payload,
      };
    }
    case GenreTypes.FETCH_GENRE_SUCCESS: {
      return {
        ...state,
        genresLoading: false,
        genresLoadingError: null,
        genresFetched: true,
        genresByID: action.payload.genresByID,
        genreIds: action.payload.genreIds,
      };
    }
    case GenreTypes.DELETE_SONG_FROM_GENRE_REQUEST: {
      return {
        ...state,
        deletingSong: true,
        deleteSongError: null,
      };
    }
    case GenreTypes.DELETE_SONG_FROM_GENRE_ERROR: {
      return {
        ...state,
        deletingSong: false,
        deleteSongError: action.payload,
      };
    }
    case GenreTypes.DELETE_SONG_FROM_GENRE_SUCCESS: {
      return {
        ...state,
        deletingSong: false,
        deleteSongError: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default GenreReducer;
