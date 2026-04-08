export default function MyTracksPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">My Tracks</h1>
        <p className="mt-2 text-zinc-400">
          This page will show tracks owned by the connected Aptos wallet after auth + DB wiring.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-white/15 p-6 text-sm text-zinc-400">
        TODO: query Prisma by connected wallet address and show uploaded tracks.
      </div>
    </section>
  );
}
