export type Track = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
};

export const featuredTracks: Track[] = [
  {
    id: "1",
    title: "Midnight Groove",
    artist: "DJ Shelby",
    coverUrl: "https://picsum.photos/300?1",
    audioUrl: "/demo.mp3",
  },
  {
    id: "2",
    title: "Vinyl Dreams",
    artist: "Analog Soul",
    coverUrl: "https://picsum.photos/300?2",
    audioUrl: "/demo.mp3",
  },
];