import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function FaucetPage() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold text-white">Shelbynet Faucet</h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          This landing page will guide users to get test tokens before they upload music to Shelbynet.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-medium text-white">1. Connect Petra</h2>
          <p className="mt-2 text-sm text-zinc-400">Users verify their Aptos wallet in the app before claiming faucet assets.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-medium text-white">2. Claim dev tokens</h2>
          <p className="mt-2 text-sm text-zinc-400">Open the faucet docs and request the tokens needed for testing uploads.</p>
          <Link href={siteConfig.faucetUrl} className="mt-4 inline-block text-sm text-violet-300 underline">
            Open faucet docs
          </Link>
        </div>
      </div>
    </section>
  );
}
