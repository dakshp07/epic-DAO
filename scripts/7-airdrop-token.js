// It’s airdrop time. Right now you’re probably the only member of your DAO and that’s okay!
import sdk from "./1-initialize-sdk.js";

// This is the address to our ERC-1155 membership NFT contract.
const editionDrop=sdk.getEditionDrop("0x0257319F25978cAB32AeeFF89dD9C39e22C5C57b");

// now add the address of our ERC-20 Token
const token=sdk.getToken("0xCcF32715D936D0c76561D6c8E4457cdC85E4dc1f");

(async()=>{
    try{
        // grab the addresses of all the people who won our membership NFT which has a tokenId of 0
        const walletAddress=await editionDrop.history.getAllClaimerAddresses(0);
        if(walletAddress.length===0)
        {
            console.log("No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!");
            process.exit(0);
        }
        // loop through the array
        const airdropTargets=walletAddress.map((address)=>{
            // pick a random number b/w 1000 and 10000
            const randomAmt=Math.floor(Math.random()*(10000-1000+1)+1000);
            console.log("✅ Going to airdrop", randomAmt, "tokens to", address);
            
            // set up a target
            const airdropTarget={
                toAddress: address,
                amount: randomAmt,
            };
            return airdropTarget;
        });
        // Call transferBatch on all our airdrop targets.
        // transferBatch will automatically loop through all the targets, and send the token!
        console.log("🌈 Starting airdrop...");
        await token.transferBatch(airdropTargets);
        console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
    } 
    catch (err) {
        console.error("Failed to airdrop tokens", err);
    }
})();