import type { PublicTrack } from "@/types/track";

function formatDuration(seconds?: number | null) {
  if (!seconds) return "--:--";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function VinylPlayerCard({ track }: { track: PublicTrack }) {
  return (
    <article className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:grid-cols-[320px_1fr]">
      <div className="flex items-center justify-center">
        <div className="vinyl-disc h-72 w-72 animate-spin-slow" />
      </div>

      <div className="flex flex-col justify-center gap-4">
        <span className="inline-flex w-fit rounded-full bg-violet-500/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-violet-300">
          Featured spin
        </span>
        <div>
          <h2 className="text-3xl font-semibold text-white">{track.title}</h2>
          <p className="mt-2 text-zinc-400">{track.artistName}</p>
        </div>
        <div className="text-sm text-zinc-400">
          Duration: {formatDuration(track.durationSeconds)}
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black">
            Play preview
          </button>
          <button className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white">
            View on Shelby Explorer
          </button>
        </div>
      </div>
    </article>
  );
}
