import sdk from './1-initialize-sdk.js';
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
 "0xBc41137D4Ce480edd67A1D871f6FB99bE706C9E4"
);

( async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Plateau Hill",
        description: "White staple for all joiners",
        image: readFileSync("scripts/assets/pap1.jpg")
      }
    ]);
    console.log("Created new NFT drop succesfully...")
  } catch (e) {
    console.error("Failed to mint a new one", e)
  }
})()