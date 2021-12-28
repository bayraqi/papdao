import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0x5745513C19ce2e951f375B1c627466484e971A85");

(async () => {
  try{
    const tokenModule = await app.deployTokenModule({
      name: "zwapDAO Governance Token",
      symbol: "ZWAP"
    });
    console.log("Success: Deployed token module at:: ", tokenModule.address);
  } catch (e) {
    console.error("Failed to deploy token module", e);
  }
})();