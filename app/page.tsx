import Link from "next/link";
import { featuredTracks } from "@/lib/mock-data";
import { VinylPlayerCard } from "@/components/player/vinyl-player-card";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="grid gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-transparent p-8 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <span className="inline-flex rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-300">
            Shelby + Aptos + Petra
          </span>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-white">
            Upload music to Shelby and play it back like a spinning vinyl record.
          </h1>
          <p className="max-w-2xl text-base text-zinc-400">
            Users connect with Petra, verify their Aptos wallet, publish tracks to Shelby storage,
            and browse a shared community catalog.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/upload" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black">
              Start upload
            </Link>
            <Link href="/faucet" className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white">
              Get Shelbynet faucet
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-sm text-zinc-300">
          <p className="font-medium text-white">Version 0 scaffold</p>
          <ul className="mt-4 space-y-3">
            <li>• Petra wallet verification</li>
            <li>• Public Explore page</li>
            <li>• My Tracks dashboard</li>
            <li>• Upload form skeleton</li>
            <li>• Faucet landing page</li>
          </ul>
          <p className="mt-6 text-zinc-500">Network: {siteConfig.aptosNetwork}</p>
        </div>
      </section>

      <VinylPlayerCard track={featuredTracks[0]} />
    </div>
  );
}
