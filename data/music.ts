export type Track = {
  title: string;
  artist: string;
  album?: string;
  durationMs: number;
};

export const codingPlaylist: Track[] = [
  { title: "Lofi Study", artist: "Focus Ensemble", album: "Desk Hours", durationMs: 184000 },
  { title: "Deep Focus", artist: "Night Desk", album: "Compile", durationMs: 201000 },
  { title: "Quiet Hours", artist: "Signal Room", album: "After Standup", durationMs: 176000 },
  { title: "Compile", artist: "Late Window", album: "Green Tests", durationMs: 164000 },
];

export const curatedRecentlyPlayed: Track[] = codingPlaylist;

export const curatedTopArtists = [
  { name: "Focus Ensemble", context: "Coding hours" },
  { name: "Night Desk", context: "Deep work" },
  { name: "Signal Room", context: "Evenings" },
] as const;

export function formatDuration(ms: number) {
  const total = Math.round(ms / 1000);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export const codingPlaylistDuration = codingPlaylist.reduce(
  (sum, track) => sum + track.durationMs,
  0,
);
