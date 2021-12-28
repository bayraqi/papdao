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
        const amount = 420_000;
        await voteModule.propose(
            "Should our DAO mint an additional "+amount+" tokens into the treasury?",
            [
                {
                    nativeTokenValue:0,
                    transactionData: tokenModule.contract.interface.encodeFunctionData(
                        "mint",  
                        [
                            voteModule.address,
                            ethers.utils.parseUnits(amount.toString(), 18),
                        ]
                    ), 
                    toAddress: tokenModule.address,
                }
            ]
        );
        console.log("Successfully created proposal")
    } catch (error) {
        console.error("Failed to create proposal", error);
        process.exit(1);   
    }

    try {
        const amount = 7_000;
        await voteModule.propose(
            "Should the DAO transfer "+amount+" tokens frm treasury?",
            [
                {
                    nativeTokenValue: 0,
                    transactionData:tokenModule.contract.interface.encodeFunctionData(
                        "transfer",
                        [
                            "0x7aB1C46759853497655C47d615937c918dE974C1",
                            ethers.utils.parseUnits(amount.toString(), 18),
                        ]
                    ),
                    toAddress: tokenModule.address,
                }
            ]
        );
        
        console.log("Success: Created proposal for reward from treasury")
    } catch (error) {
        console.error("Failed to createe reward proposal", error)
    }
})();