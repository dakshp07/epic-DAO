// here we will be adding some metadata to our nfts that were deployed previously
import sdk from "./1-initialize-sdk.js";
import {readFileSync} from "fs";

const editionDrop=sdk.getEditionDrop("0x0257319F25978cAB32AeeFF89dD9C39e22C5C57b"); // add the deployed ERC-1155 contract add

(async()=>{
    try{
        await editionDrop.createBatch([ // creating batch with metadata
            {
                name: "Leaf Village Headband", // name
                description: "This NFT will give you access to EpicDAO!", // small description
                image: readFileSync("scripts/assets/nft.png"), // and the image
            },
        ]);
        console.log("✅ Successfully created a new NFT in the drop!");
    }
    catch(error){
        console.error("failed to create the new NFT", error);
    }
})();