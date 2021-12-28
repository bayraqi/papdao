import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule(
    "0x0398a7D3E601681a125684a83298B029BA26a079"
);

const tokenModule = sdk.getTokenModule(
    "0x7aB1C46759853497655C47d615937c918dE974C1"
);

(async () => {
    try {
        await tokenModule.grantRole("minter", voteModule.address);
        console.log("Successfully granted vote module to act on token module");
    } catch (error) {
        console.error("Failed to grant vote module permissions", error);
        process.exit(1);
    }

    try {
        const ownedTokenBalance = await tokenModule.balanceOf(
            "0x7aB1C46759853497655C47d615937c918dE974C1"
        );

        const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
        const percent90 = ownedAmount.div(100).mul(90);

        await tokenModule.transfer(
            voteModule.address,
            percent90
        );
        console.log("Success: Transferred tokens to vote module")
    } catch (error) {
        console.error("Failed to transfer tokens to vote module", error)
    }
})();