import sdk from './1-initialize-sdk.js';
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
 "0x9c0C0E7d3553cfbD75ef92D3777B574aE0D67Ba9"
);

( async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Plateau Hill",
        description: "White staple for all joiners",
        image: readFileSync("./assets/pap1.jpg")
      }
    ]);
    console.log("Created new NFT drop succesfully...")
  } catch (e) {
    console.error("Failed to mint a new one", e)
  }
})()