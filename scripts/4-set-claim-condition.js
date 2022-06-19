// here we gonna set the claiming conditions like total no of nfts etc etc
import sdk from "./1-initialize-sdk.js";
import {MaxUint256} from "@ethersproject/constants";

const editionDrop=sdk.getEditionDrop("0x0257319F25978cAB32AeeFF89dD9C39e22C5C57b"); // add the deployed ERC-1155 contract add

(async()=>{
    try{
        // here we define our claim conditions, it will be an array
        // the reason for array is for diff phases our claim conditions will be different if we want to
        const claimConditions=[{
            // here we define time when people can start minting the NFTs (ie now)
            startTime: new Date(),
            // set the max quantity
            maxQuantity: 50_000,
            // the price of the nft (ie free)
            price: 0,
            // the amount of nfts people can claim in one transaction
            quantityLimitPerTransaction: 1,
            // now we set the wait time b/w transactions to maxuint256, which means people are only allowed to claim once
            waitInSeconds: MaxUint256,
        }]
        // this will intreact with our deployed contract on chain and adjust the conditions that we configured 
        // we pass 0 as the tokenId for first NFT to be minted
        await editionDrop.claimConditions.set("0", claimConditions);
        console.log("✅ Successfully set claim condition!");
    }
    catch(error){
        console.error("Failed to set claim condition", error);
    }
})();