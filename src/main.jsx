import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";
import { Astar } from "@thirdweb-dev/chains";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const Shibuya = {
  chainId: 81, // Chain ID of the network
  // Array of RPC URLs to use
  rpc: ["https://evm.shibuya.astar.network"],

  // === Information for adding the network to your wallet (how it will appear for first time users) === \\
  // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
  nativeCurrency: {
    decimals: 18,
    name: "SBY",
    symbol: "SBY",
  },
  icon: {
    url: "ipfs://bafybeicniv63aec2i52c4hwa3hamud76a34skodqyyzsm3iasmu4lpibka/Shibuya_ring_white.png",
    width: 1000,
    height: 1000,
    format: "png",
  },
  shortName: "shibuya", // Display value shown in the wallet UI
  slug: "shibuya", // Display value shown in the wallet UI
  testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
  chain: "Shibuya", // Name of the network
  name: "Shibuya Astar Testnet", // Name of the network
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      clientId={import.meta.env.CLIENT_ID}
      activeChain={Shibuya}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
