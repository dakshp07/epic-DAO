// lets print some money by printing our tokens that we just deployed
import sdk from "./1-initialize-sdk.js";

// address of the ERC20 token that we just deployed
const token=sdk.getToken("0xCcF32715D936D0c76561D6c8E4457cdC85E4dc1f");

(async()=>{
    try{
        // write the max supply 
        const amt=1000000;
        // interact with the ERC20 token and mint it
        await token.mintToSelf(amt);
        const totalSupply=await token.totalSupply();

        // Print out how many of our token's are out there now!
        console.log("✅ There now is", totalSupply.displayValue, "$EPIC in circulation");
    }
    catch (error) {
        console.error("Failed to print money", error);
    }
})();