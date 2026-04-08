"use client";

import { useMemo, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function ConnectWalletButton() {
  const {
    connect,
    disconnect,
    connected,
    account,
    wallets,
    wallet,
  } = useWallet();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const petraWallet = useMemo(() => {
    return wallets.find((item) => item.name.toLowerCase().includes("petra"));
  }, [wallets]);

  const handleConnect = async () => {
    setErrorMessage(null);

    if (!petraWallet) {
      setErrorMessage(
        "Không tìm thấy Petra Wallet. Hãy cài extension Petra rồi tải lại trang."
      );
      return;
    }

    try {
      setIsLoading(true);
      await connect(petraWallet.name);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Kết nối ví thất bại.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setErrorMessage(null);

    try {
      setIsLoading(true);
      await disconnect();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ngắt kết nối ví thất bại.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (connected && account?.address) {
    const address =
      typeof account.address === "string"
        ? account.address
        : account.address.toString();

    return (
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleDisconnect}
          disabled={isLoading}
          className="rounded-xl border px-4 py-2 text-sm font-medium"
        >
          {isLoading ? "Disconnecting..." : `Connected: ${shortenAddress(address)}`}
        </button>

        <p className="text-xs text-neutral-500">
          Wallet: {wallet?.name ?? "Unknown"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleConnect}
        disabled={isLoading}
        className="rounded-xl border px-4 py-2 text-sm font-medium"
      >
        {isLoading ? "Connecting..." : "Connect Petra"}
      </button>

      {errorMessage ? (
        <p className="text-xs text-red-500">{errorMessage}</p>
      ) : null}
    </div>
  );
}