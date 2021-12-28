import dotenv from "dotenv";
import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";

// dotenv.config();

// if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === "743e1c49f2bd9ea36ee42ca7d3f1f989026b81549ea014c1b4dd6accb0550a11") {
//   console.log("Private key not found")
// }

// if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL === "https://eth-rinkeby.alchemyapi.io/v2/OP0mRb_7QgX-Gatpglkcu36fXr0b_T5d") {
//   console.log("Alchemy API not found")
// }

// if(!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS ==="0xfC2Fcd9F872c69F0Ef035aAed726e89dB391cA05") {
//   console.log("Wallet address not found")
// }

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    "743e1c49f2bd9ea36ee42ca7d3f1f989026b81549ea014c1b4dd6accb0550a11",
    ethers.getDefaultProvider("https://eth-rinkeby.alchemyapi.io/v2/OP0mRb_7QgX-Gatpglkcu36fXr0b_T5d")
  )
);

(async() => {
  try{
    const apps = await sdk.getApps();
    console.log("Your app address is :: ", apps[0].address);
  } catch (e) {
    console.error("Error:: ", e);
    process.exit(1);
  }
})();

export default sdk;