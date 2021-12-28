import sdk from "./1-initialize-sdk.js";

const appModule = sdk.getAppModule(
    "0x5745513C19ce2e951f375B1c627466484e971A85"
);

(async () => {
    try {
        const voteModule = await appModule.deployVoteModule({
            name: "zwap Transfer Proposal",
            votingTokenAddress: "0x7aB1C46759853497655C47d615937c918dE974C1",
            proposalStartWaitTimeInSeconds: 0,
            proposalVotingTimeInSeconds: 24 * 60 *60,
            votingQuorumFraction: 0,
            minimumNumberOfTokensNeededToPropose: "0"
        });

        console.log("Deployed vote module", voteModule.address)
    } catch (e) {
        console.error("Failed to deploy vote module", e);
    }
})();