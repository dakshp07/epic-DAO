// here we deploy our DAO's own ERC20 Token
import {AddressZero} from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";

(async()=>{
    try{
        // deploy an standard ERC20 token
        const tokenAddress=await sdk.deployer.deployToken({
            // write the name of token
            name: "EpicDAO Governance Token",
            // write the symbol
            symbol: "EPIC",
            // This will be in case we want to sell our token,
            // because we don't, we set it to AddressZero again.
            primary_sale_recipient: AddressZero,
        });
        console.log("✅ Successfully deployed token module, address:", tokenAddress);
    }
    catch (error) {
        console.error("failed to deploy token module", error);
    }
})();