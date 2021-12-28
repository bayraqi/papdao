import sdk from "./1-initialize-sdk.js";

const bundleDrop = sdk.getBundleDropModule(
  "0x9c0C0E7d3553cfbD75ef92D3777B574aE0D67Ba9"
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