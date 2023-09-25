import {
  ConnectWallet,
  useAddress,
  useContract,
  useMetadata,
  useNFTBalance,
  useNFT,
  Web3Button,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import "./styles/Home.css";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import "@near-wallet-selector/modal-ui/styles.css";

const selector = await setupWalletSelector({
  network: "mainnet",
  modules: [
    setupNearWallet(),
    setupMyNearWallet(),
    setupHereWallet(),
    setupMeteorWallet(),
  ],
});

const modal = setupModal(selector, {
  contractId: "mint.sharddog.near",
});

modal.show();

let accounts = [];
(async () => {
  const wallet = await selector.wallet();
  accounts = await wallet.getAccounts();
  console.log("accounts", accounts);
})();

export default function Home() {
  const address = useAddress();
  const contractAddress = "0x8ebEae864d0E210811927308374A2bD11EeACA05";
  const { contract } = useContract(contractAddress);
  const { data: metadata, isFetched } = useMetadata(contract);
  const {
    data: ownerBalance,
    isLoading,
    error,
  } = useNFTBalance(contract, address);
  let balance = ownerBalance;
console.log("balance", balance);

  return (
    <main className="main">
      <div className="container">
        <div className="header">
          <h1 className="title">NEARWEEK Astar Collab Minter</h1>

          <div className="connect">
            <ConnectWallet
              btnTitle="EVM Connect"
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
            />
          </div>

          <div className="connect">
            {accounts.length > 0 ? (
              balance && balance.eq(1) ? (
                <div>Congratulations! You've already minted the NFT.</div>
              ) : (
                <Web3Button
                  contractAddress={contractAddress}
                  action={(contract) => contract.erc721.claim(1)}
                >
                  Mint
                </Web3Button>
              )
            ) : (
              <div>You must have the Astar NFT on Near to mint here</div>
            )}
          </div>

          <div className="image">
            {balance && balance.eq(1) & isFetched ? (
              <ThirdwebNftMedia metadata={metadata} />
            ) : (
              <div>NFT not found</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
