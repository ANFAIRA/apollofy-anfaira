import { normalize, schema } from "normalizr";

const playlist = new schema.Entity("playlists", {}, { idAttribute: "_id" });

const song = new schema.Entity("songs", {}, { idAttribute: "_id" });

const fullPlaylist = new schema.Entity(
  "playlists",
  {
    songs: [song],
  },
  { idAttribute: "_id" },
);

const playlistListSchema = [fullPlaylist];

export function normalizePlaylists(playlists) {
  return normalize(playlists, [playlist]);
}

export function normalizeFullPlaylists(playlists) {
  return normalize(playlists, playlistListSchema);
}
