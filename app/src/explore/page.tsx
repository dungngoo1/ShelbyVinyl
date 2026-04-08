import Link from "next/link";
import { featuredTracks } from "@/lib/mock-data";

export default function ExplorePage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">Explore</h1>
        <p className="mt-2 text-zinc-400">Public tracks uploaded by the community.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {featuredTracks.map((track) => (
          <Link
            key={track.id}
            href={`/tracks/${track.slug}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
          >
            <p className="text-lg font-medium text-white">{track.title}</p>
            <p className="mt-1 text-sm text-zinc-400">{track.artistName}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">{track.audioBlobName}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
