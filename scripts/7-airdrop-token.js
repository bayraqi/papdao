import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const bundleDropModule = sdk.getBundleDropModule(
  "0x9c0C0E7d3553cfbD75ef92D3777B574aE0D67Ba9"
);

const tokenModule = sdk.getTokenModule(
  "0x7aB1C46759853497655C47d615937c918dE974C1"
);

( async () => {
  try {
    const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");

    if (walletAddresses.length === 0) {
      console.log("No NFTs have been claimed yet");
      process.exit(0);
    }

    const airdropTargets = walletAddresses.map((address) => {
      const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      console.log("Airdropping ", randomAmount, " tokens to ", address);

      const airdropTarget = {
        address,
        amount: ethers.utils.parseUnits(randomAmount.toString(),18)
      }

      return airdropTarget;
    });

    console.log("Starting airdrop...");
    await tokenModule.transferBatch(airdropTargets);
    console.log("Success: Airdropped tokens to all NFT holders");
  } catch (e) {
    console.error("Failed to airdrop tokens", e);
  }
})();