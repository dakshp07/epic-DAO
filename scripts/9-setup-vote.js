// rn we are the ones who have all the tokens, so we give soe to voting contract and make one treasury for our DAO
import sdk from "./1-initialize-sdk.js";

// our governance token address goes here
const vote=sdk.getVote("0x90998F4E2473A944BC4Ca45554C89a63618dc5eF");

// our ERC20 token address goes here
const token=sdk.getToken("0xCcF32715D936D0c76561D6c8E4457cdC85E4dc1f");

(async()=>{
    try{
        // now we give power to our treasury to mint some more tokens when needed
        await token.roles.grant("minter", vote.getAddress());

        console.log("Successfully gave vote contract permissions to act on token contract");
    }
    catch (error) {
        console.error("failed to grant vote contract permissions on token contract",error);
        process.exit(1);
    }
    try{
        // since we hold all tokens, we grab our wallet address now
        const ownedTokenBalance=await token.balanceOf(process.env.WALLET_ADDRESS);

        // we now grab 90% of the supply that we hold
        const ownedAmount=ownedTokenBalance.displayValue;
        const percent90=Number(ownedAmount)/100*90;

        // transfer that 90% to the supply we build
        await token.transfer(
            vote.getAddress(),
            percent90
          ); 
        console.log("✅ Successfully transferred " + percent90 + " tokens to vote contract"); 
    }
    catch(err){
        console.error("failed to transfer tokens to vote contract", err);
    }
})();