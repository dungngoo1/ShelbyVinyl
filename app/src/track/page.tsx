import { notFound } from "next/navigation";
import { featuredTracks } from "@/lib/mock-data";
import { VinylPlayerCard } from "@/components/player/vinyl-player-card";

export default async function TrackDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const track = featuredTracks.find((item) => item.slug === slug);

  if (!track) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <VinylPlayerCard track={track} />
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-400">
        TODO: replace mock data with Prisma query + Shelby stream endpoint.
      </div>
    </section>
  );
}
