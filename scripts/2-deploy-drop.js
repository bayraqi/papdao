import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0x5745513C19ce2e951f375B1c627466484e971A85");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: "zwapDAO Membership",
      description: "For the love of ZW pap",
      image: readFileSync("./assets/pap.jpg"),
      primarySaleRecipientAddress: ethers.constants.AddressZero
    });

    console.log("Sucessfully deployed bundleDrop module at:: ", bundleDropModule.address);

    console.log("Drop metadata:: ", await bundleDropModule.getMetadata())
  } catch (e) {
    console.error("Failed to deploy bundle....", e)
  }
})();