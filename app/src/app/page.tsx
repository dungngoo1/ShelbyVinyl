import ConnectWalletButton from "@/components/wallet/connect-wallet-button";

export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <h1 className="text-4xl font-bold">Shelby Vinyl</h1>
        <p className="text-neutral-600">
          Upload và chia sẻ nhạc theo phong cách đĩa than.
        </p>

        <ConnectWalletButton />
      </div>
    </main>
  );
}