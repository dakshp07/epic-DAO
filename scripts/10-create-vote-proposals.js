// now we will write the script that will allow users to write proposals
import sdk from "./1-initialize-sdk.js";
import {ethers} from "ethers";

// our governance token address goes here
const vote=sdk.getVote("0x90998F4E2473A944BC4Ca45554C89a63618dc5eF");

// our ERC20 token address goes here
const token=sdk.getToken("0xCcF32715D936D0c76561D6c8E4457cdC85E4dc1f");

(async()=>{
    try{
        // create a proposal to mint new 420000 tokens
        const amount=420_000;
        const description="Should the DAO mint an additional " + amount + " tokens into the treasury?";
        const executions=[
            {
                // our token contract that actually excutes mint
                toAddress: token.getAddress(),
                // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
                // to send in this proposal. In this case, we're sending 0 ETH.
                // We're just minting new tokens to the treasury. So, set to 0.
                nativeTokenValue: 0,
                // We're doing a mint! And, we're minting to the vote, which is
                // acting as our treasury.
                // in this case, we need to use ethers.js to convert the amount
                // to the correct format. This is because the amount it requires is in wei.
                transactionData: token.encoder.encode("mintTo", [vote.getAddress(), ethers.utils.parseUnits(amount.toString(), 18)]),
            }
        ];
        await vote.propose(description, executions);
        console.log("✅ Successfully created proposal to mint tokens");
    }
    catch (error) {
        console.error("failed to create first proposal", error);
        process.exit(1);
    }

    try{
        // Create proposal to transfer ourselves 6,900 tokens for being awesome.
        const amount=6_900;
        const description = "Should the DAO transfer " + amount + " tokens from the treasury to " + process.env.WALLET_ADDRESS + " for being awesome?";
        const executions=[
            {
                // Again, we're sending ourselves 0 ETH. Just sending our own token.
                nativeTokenValue: 0,
                transactionData: token.encoder.encode(
                    // We're doing a transfer from the treasury to our wallet.
                    "transfer", [
                        process.env.WALLET_ADDRESS,
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ),
                toAddress: token.getAddress(),
            },
        ];
        await vote.propose(description, executions);
        console.log("✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!");
    }
    catch (error) {
        console.error("failed to create second proposal", error);
    }
})();