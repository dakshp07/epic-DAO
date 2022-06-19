// here we gonna write some stuff that is going to intialize the sdk
// some necessary imports
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import ethers from "ethers";

// importing the dotenv package to get the stuffs from env file
import dotenv from "dotenv";
dotenv.config();

// some checks to make sure that we get the .env thing working
if(!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY===""){
    console.log("🛑 Private key not found.");
}

if(!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL===""){
    console.log("🛑 Alchemy API URL not found.");
}

if(!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS===""){
    console.log("🛑 Wallet Address not found.");
}

// RPC Url, we'll use our alchemy api url from env file
const provider=new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_URL);

// now next up is wallet key
const wallet=new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const sdk=new ThirdwebSDK(wallet);

(async()=>{
    try{
        const address=await sdk.getSigner().getAddress();
        console.log("👋 SDK Initialized by address:", address);
    }
    catch(err){
        console.error("Failed to get apps from the sdk", err);
        process.exit(1);
    }
})();

// We are exporting the initialized thirdweb SDK so that we can use it in our other scripts
export default sdk;

/*
It looks like a lot, but, all we're doing is initializing thirdweb and then adding an export default sdk since we'll be reusing the initialized sdk in other scripts. 
It's almost like initializing a connection to a database from a server. 
We give it stuff like our private key and our provider (which is Alchemy).
*/