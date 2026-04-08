"use client";

import { useState } from "react";

type Track = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
};

type Props = {
  track: Track;
};

export function VinylPlayerCard({ track }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-2xl">
      <div
        className={`relative w-40 h-40 rounded-full bg-black ${
          isPlaying ? "animate-spin-slow" : ""
        }`}
      >
        <img
          src={track.coverUrl}
          alt={track.title}
          className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
      </div>

      <div className="text-center">
        <h3 className="font-semibold">{track.title}</h3>
        <p className="text-sm text-gray-500">{track.artist}</p>
      </div>

      <audio src={track.audioUrl} controls />

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="px-4 py-2 border rounded-xl"
      >
        {isPlaying ? "Stop" : "Spin"}
      </button>
    </div>
  );
}