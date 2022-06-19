// here write the contract that will make our ERC20 token to work as the governance token so that people can vote
import sdk from "./1-initialize-sdk.js";

(async()=>{
    try{
        const voteContractAddress=await sdk.deployer.deployVote({
            // name of governance token
            name: "Epic DAO",
            // here we put the address to our ERC20 token which will be used as governance token
            voting_token_address:"0xCcF32715D936D0c76561D6c8E4457cdC85E4dc1f",
            // These below upcoming parameters are specified in number of blocks. 
            // Assuming block time of around 13.14 seconds (for Ethereum)

            // After a proposal is created, when can members start voting?
            // For now, we set this to immediately.
            voting_delay_in_blocks: 0,
            // How long do members have to vote on a proposal when it's created?
            // we will set it to 1 day = 6570 blocks
            voting_period_in_blocks: 6570,
            // The minimum % of the total supply that need to vote for
            // the proposal to be valid after the time for the proposal has ended.
            voting_quorum_fraction: 0,
            // What's the minimum # of tokens a user needs to be allowed to create a proposal?
            // I set it to 0. Meaning no tokens are required for a user to be allowed to
            // create a proposal.
            proposal_token_threshold: 0,
        });
        console.log("✅ Successfully deployed vote contract, address:",voteContractAddress);
    }
    catch (err) {
        console.error("Failed to deploy vote contract", err);
    }
})();

/*
voting_quorum_fraction is really interesting. 
Let’s say a member creates a proposal and the other 199 DAO members are on vacation at Disney World and aren’t online. 
Well, in this case, if that one DAO member creates the proposal and votes “YES” on their own proposal — that means 100% of the votes said “YES” (since there was only one vote) and 
the proposal would pass once voting_period_in_blocks is up! 
To avoid this, we use a quorum which says “In order for a proposal to pass, a minimum x % of token must be used in the vote”.
*/