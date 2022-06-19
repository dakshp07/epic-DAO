import { useAddress, useEditionDrop, useMetamask, useToken, useVote, useNetwork } from '@thirdweb-dev/react';
import {useState, useEffect, useMemo} from 'react';
import { AddressZero } from "@ethersproject/constants";
import { ChainId } from '@thirdweb-dev/sdk';

const App = () => {
  // Use the hooks thirdweb give us.
  const address = useAddress();
  // chain id
  const network = useNetwork();
  // connect with metamask
  const connectWithMetamask = useMetamask();
  console.log("👋 Address:", address);

  // intialize our contract drop address
  const editionDrop=useEditionDrop("0x0257319F25978cAB32AeeFF89dD9C39e22C5C57b");

  // intialize our ERC20 token address
  const token=useToken("0xCcF32715D936D0c76561D6c8E4457cdC85E4dc1f");

  // we will now access vote
  const vote=useVote("0x90998F4E2473A944BC4Ca45554C89a63618dc5eF");

  // state variables for vote
  const [proposals, setProposals] = useState([]);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  // state variable for us to know if user has no NFT
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  // state variable to allow us to keep a loading state wile nft is minting
  const [isClaiming, setIsClaiming] = useState(false);

  // state variable to store the amount of token each member has
  const [memberTokenAmounts, setMemberTokenAmounts]=useState([]);

  // state variable to store the member addresses as array
  const [memberAddresses, setMemberAddresses]=useState([]);

  // there's no need to show the entire address, we can shorten it
  const shortenAddress=(str)=>{
    return str.substring(0, 6)+"...."+str.substring(str.length-4);
  }

  // this use effect will talk with the contract for proposals
  useEffect(()=>{
    if(!hasClaimedNFT)
    {
      return;
    }
    // A simple call to vote.getAll() to grab the proposals.
    const getAllPropsals=async()=>{
      try{
        const proposals=await vote.getAll();
        setProposals(proposals);
        console.log("🌈 Proposals:", proposals);
      }
      catch (error) {
        console.log("failed to get proposals", error);
      }
    };
    getAllPropsals();
  }, [hasClaimedNFT, vote]);

  // We also need to check if the user already voted.
  useEffect(()=>{
    if(!hasClaimedNFT)
    {
      return;
    }
    // If we haven't finished retrieving the proposals from the useEffect above
    // then we can't check if the user voted yet!
    if (!proposals.length) {
      return;
    }
    const checkIfUserHasVoted=async()=>{
      try{
        const hasVoted=await vote.hasVoted(proposals[0].proposalId, address);
        setHasVoted(hasVoted);
        if (hasVoted) {
          console.log("🥵 User has already voted");
        } else {
          console.log("🙂 User has not voted yet");
        }
      }
      catch (error) {
        console.error("Failed to check if wallet has voted", error);
      }
    };
    checkIfUserHasVoted();
  }, [hasClaimedNFT, proposals, address, vote]);

  // this use effect grabs all the addresses
  useEffect(()=>{
    if(!hasClaimedNFT)
    {
      return;
    }
    // just like we need in script 7 we will grab the user wallet addresses
    const getAllAddress=async()=>{
      try{
        const memberAddresses=await editionDrop.history.getAllClaimerAddresses(0); // from history grab all the address
        setMemberAddresses(memberAddresses); // set our state variable
        console.log("🚀 Members addresses", memberAddresses);
      }
      catch (error) {
        console.error("failed to get member list", error);
      }
    };
    getAllAddress();
  }, [hasClaimedNFT, editionDrop.history]);

  // this use effect grabs the no of tokens one has
  useEffect(()=>{
    if(!hasClaimedNFT)
    {
      return;
    }
    const getAllBalances=async()=>{
      try{
        const amounts=await token.history.getAllHolderBalances(); // get balance of all the address
        setMemberTokenAmounts(amounts); // set in state variable
        console.log("👜 Amounts", amounts);
      }
      catch (error) {
        console.error("failed to get member balances", error);
      }
    };
    getAllBalances();
  }, [hasClaimedNFT, token.history]);

  // Now, we combine the memberAddresses and memberTokenAmounts into a single array
  const memberList=useMemo(()=>{
    return memberAddresses.map((address)=>{
      // We're checking if we are finding the address in the memberTokenAmounts array.
      // If we are, we'll return the amount of token the user has.
      // Otherwise, return 0.
      const member = memberTokenAmounts?.find(({ holder }) => holder === address);
      return{
        address,
        tokenAmount: member?.balance.displayValue || "0",
      }
    });
  }, [memberAddresses, memberTokenAmounts]);

  useEffect(()=>{
    // if they dont have connected wallet, lets exit
    if(!address)
    {
      return;
    }
    const checkBalance=async()=>{
      try{
        const balance=await editionDrop.balanceOf(address, 0); // we initialze a variable balance that checks the token id of nfts by (ie 0)
        if(balance.gt(0)){ // if he gets 0 then user has nft
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!");
        }
        else // else they dont have one
        {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.");
        }
      }
      catch(error){
        setHasClaimedNFT(false);
        console.error("Failed to get balance", error);
      }
    };
    checkBalance();
  }, [address, editionDrop]);

  // mint nft method
  const mintNft=async()=>{
    try{
      setIsClaiming(true); // set loading state true
      await editionDrop.claim("0", 1); // claim one nft
      // give user its link
      console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
      setHasClaimedNFT(true); // make claimed nft as true
    }
    catch(error){
      setHasClaimedNFT(false); // if error is there then make the claimed nft as false
      console.error("Failed to mint NFT", error); // display the error
    }
    finally{
      setIsClaiming(false); // set the loading state as false
    }
  }

  // This is the case where the user hasn't connected their wallet
  // to your web app. Let them call connectWallet.
  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to EpicDAO ⚡</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  }

  if (address && (network?.[0].data.chain.id !== ChainId.Rinkeby)) {
    return (
      <div className="unsupported-network">
        <h2>Please connect to Rinkeby!</h2>
        <p>
          This dapp only works on the Rinkeby network, please switch networks
          in your connected wallet.
        </p>
      </div>
    );
  }

  // now we want to show them the dao dashboard only is the user has an nft
  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1> ⚡ DAO Member Page</h1>
        <p>🥳 Congratulations on being a member</p>
        <div>
          <div>
            <h2>Member List</h2>
            <table className="card">
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Token Amount</th>
                </tr>
              </thead>
              <tbody>
                {memberList.map((member) => {
                  return (
                    <tr key={member.address}>
                      <td>{shortenAddress(member.address)}</td>
                      <td>{member.tokenAmount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <h2>Active Proposals</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();

                //before we do async things, we want to disable the button to prevent double clicks
                setIsVoting(true);

                // lets get the votes from the form for the values
                const votes = proposals.map((proposal) => {
                  const voteResult = {
                    proposalId: proposal.proposalId,
                    //abstain by default
                    vote: 2,
                  };
                  proposal.votes.forEach((vote) => {
                    const elem = document.getElementById(
                      proposal.proposalId + "-" + vote.type
                    );

                    if (elem.checked) {
                      voteResult.vote = vote.type;
                      return;
                    }
                  });
                  return voteResult;
                });

                // first we need to make sure the user delegates their token to vote
                try {
                  //we'll check if the wallet still needs to delegate their tokens before they can vote
                  const delegation = await token.getDelegationOf(address);
                  // if the delegation is the 0x0 address that means they have not delegated their governance tokens yet
                  if (delegation === AddressZero) {
                    //if they haven't delegated their tokens yet, we'll have them delegate them before voting
                    await token.delegateTo(address);
                  }
                  // then we need to vote on the proposals
                  try {
                    await Promise.all(
                      votes.map(async ({ proposalId, vote: _vote }) => {
                        // before voting we first need to check whether the proposal is open for voting
                        // we first need to get the latest state of the proposal
                        const proposal = await vote.get(proposalId);
                        // then we check if the proposal is open for voting (state === 1 means it is open)
                        if (proposal.state === 1) {
                          // if it is open for voting, we'll vote on it
                          return vote.vote(proposalId, _vote);
                        }
                        // if the proposal is not open for voting we just return nothing, letting us continue
                        return;
                      })
                    );
                    try {
                      // if any of the propsals are ready to be executed we'll need to execute them
                      // a proposal is ready to be executed if it is in state 4
                      await Promise.all(
                        votes.map(async ({ proposalId }) => {
                          // we'll first get the latest state of the proposal again, since we may have just voted before
                          const proposal = await vote.get(proposalId);

                          //if the state is in state 4 (meaning that it is ready to be executed), we'll execute the proposal
                          if (proposal.state === 4) {
                            return vote.execute(proposalId);
                          }
                        })
                      );
                      // if we get here that means we successfully voted, so let's set the "hasVoted" state to true
                      setHasVoted(true);
                      // and log out a success message
                      console.log("successfully voted");
                    } catch (err) {
                      console.error("failed to execute votes", err);
                    }
                  } catch (err) {
                    console.error("failed to vote", err);
                  }
                } catch (err) {
                  console.error("failed to delegate tokens");
                } finally {
                  // in *either* case we need to set the isVoting state to false to enable the button again
                  setIsVoting(false);
                }
              }}
            >
              {proposals.map((proposal) => (
                <div key={proposal.proposalId} className="card">
                  <h5>{proposal.description}</h5>
                  <div>
                    {proposal.votes.map(({ type, label }) => (
                      <div key={type}>
                        <input
                          type="radio"
                          id={proposal.proposalId + "-" + type}
                          name={proposal.proposalId}
                          value={type}
                          //default the "abstain" vote to checked
                          defaultChecked={type === 2}
                        />
                        <label htmlFor={proposal.proposalId + "-" + type}>
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button disabled={isVoting || hasVoted} type="submit">
                {isVoting
                  ? "Voting..."
                  : hasVoted
                    ? "✅ You Already Voted"
                    : "🥰 Submit Votes"}
              </button>
              {!hasVoted && (
                <small>
                  This will trigger multiple transactions that you will need to
                  sign.
                </small>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  };

  // render the mint screen
  return(
    <div className="mint-nft">
      <h1>Mint your free ⚡ EpicDAO Membership NFT</h1>
      <button disabled={isClaiming} onClick={mintNft}>{isClaiming ? "Minting..." : "Mint your nft (FREE)"}</button>
    </div>
  );

  
}

export default App;