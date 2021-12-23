import sdk from "./1-initialize-sdk.js";

const bundleDrop = sdk.getBundleDropModule(
  "0xBc41137D4Ce480edd67A1D871f6FB99bE706C9E4"
);


(async () => {
  try {
    const claimConditionFactory = bundleDrop.getClaimConditionFactory();

    claimConditionFactory.newClaimPhase({
      startTime: new Date(),
      maxQuantity: 50000,
      maxQuantityPerTransaction: 1
    });

    await bundleDrop.setClaimCondition(0, claimConditionFactory);
    console.log("Successfully set claim condition...")
  } catch (e) {
    console.log("Failed to set claim condition: ", e);
  }
})();