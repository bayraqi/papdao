import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
  "0x7aB1C46759853497655C47d615937c918dE974C1"
);

(async () => {
  try{
    const amount = 1_000_000;
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();
    console.log(ethers.utils.parseUnits(amount.toString(), 18)+" $ZWAP now in circulation")
  } catch (e) {
    console.error("Failed to print the money:: ", e);
  }
})();