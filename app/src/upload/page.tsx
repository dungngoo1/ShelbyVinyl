export default function UploadPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">Upload Track</h1>
        <p className="mt-2 text-zinc-400">
          First implementation target: validate Petra connection, collect metadata, then hand off to Shelby upload service.
        </p>
      </div>

      <form className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-zinc-300">
          Title
          <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3" placeholder="Midnight on Shelbynet" />
        </label>
        <label className="grid gap-2 text-sm text-zinc-300">
          Artist
          <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3" placeholder="Dung Ngo" />
        </label>
        <label className="grid gap-2 text-sm text-zinc-300 md:col-span-2">
          Audio file
          <input type="file" accept="audio/*" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3" />
        </label>
        <label className="grid gap-2 text-sm text-zinc-300 md:col-span-2">
          Description
          <textarea className="min-h-32 rounded-xl border border-white/10 bg-black/30 px-4 py-3" placeholder="Tell listeners about the track..." />
        </label>
        <div className="md:col-span-2">
          <button className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black">
            Save draft
          </button>
        </div>
      </form>
    </section>
  );
}
