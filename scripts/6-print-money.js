import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
  "0x4b093889B5fF8f3C391Db81e54b87590B83D07f4"
);

(async () => {
  try{
    const amount = 1_000_000;
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();
    console.log(ethers.utils.parseUnits(amount.toString(), 18)+" $SADZA now in circulation")
  } catch (e) {
    console.error("Failed toprint the money:: ", e);
  }
})();