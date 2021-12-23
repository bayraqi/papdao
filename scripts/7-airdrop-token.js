import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const bundleDropModule = sdk.getBundleDropModule(
  "0xBc41137D4Ce480edd67A1D871f6FB99bE706C9E4"
);

const tokenModule = sdk.getTokenModule(
  "0x4b093889B5fF8f3C391Db81e54b87590B83D07f4"
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