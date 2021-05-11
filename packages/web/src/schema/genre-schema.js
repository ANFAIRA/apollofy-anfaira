import { normalize, schema } from "normalizr";

const genre = new schema.Entity(
  "genres",
  {},
  {
    idAttribute: (value) => {
      return value.metadata.genre;
    },
  },
);

export function normalizeGenres(genres) {
  return normalize(genres, [genre]);
}
