// you are still the one who has the minting rights on the ECR20 Tokens, which is centralization (not accepted in blockchain)
// so lets revoke the role
import sdk from "./1-initialize-sdk.js";

// put your ERC20 Token address
const token=sdk.getToken("0xCcF32715D936D0c76561D6c8E4457cdC85E4dc1f");

(async()=>{
    try{
        // log the current roles
        const allRoles=await token.roles.getAll();
        console.log("👀 Roles that exist right now:", allRoles);

        // now will revoke all the superpowers on my wallet
        await token.roles.setAll({ admin: [], minter: [] });
        console.log("🎉 Roles after revoking ourselves",await token.roles.getAll());
        console.log("✅ Successfully revoked our superpowers from the ERC-20 contract");
    }
    catch (error) {
        console.error("Failed to revoke ourselves from the DAO trasury", error);
    }
})();
