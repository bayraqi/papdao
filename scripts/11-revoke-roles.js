import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
    "0x7aB1C46759853497655C47d615937c918dE974C1"
);

(async () => {
    try {
        console.log("Roles:", await tokenModule.getAllRoleMembers());

        await tokenModule.revokeAllRolesFromAddress();
        
        console.log("Roles after revocation", await tokenModule.getAllRoleMembers());
        console.log("Revoked roles from contract");
    } catch (error) {
        console.error("Failed to revoke from DAO")
    }
})();