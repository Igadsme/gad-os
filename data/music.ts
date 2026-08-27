export type Track = {
  title: string;
  artist: string;
  album?: string;
  durationMs: number;
};

export const codingPlaylist: Track[] = [
  { title: "Lofi Study", artist: "Focus Ensemble", durationMs: 184000 },
  { title: "Deep Focus", artist: "Night Desk", durationMs: 201000 },
  { title: "Quiet Hours", artist: "Signal Room", durationMs: 176000 },
  { title: "Compile", artist: "Late Window", durationMs: 164000 },
];

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
