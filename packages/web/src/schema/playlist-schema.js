import { normalize, schema } from "normalizr";

const playlist = new schema.Entity("playlists", {}, { idAttribute: "_id" });

const track = new schema.Entity("tracks", {}, { idAttribute: "_id" });

const fullPlaylist = new schema.Entity(
  "playlists",
  {
    tracks: [track],
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
