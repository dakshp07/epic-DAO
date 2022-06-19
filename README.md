# EpicNFT DAO
In our last [repo](https://github.com/dakshp07/epic-nft/tree/frontend-code) we learnt how to mint an random NFT that too on chain and we also learnt how to deplot it using IPFS as stroing things on chain are very very expensive. Now we will be stepping into the world of DAO.

# What's DAO?
## How does it work?
What's a DAO? Hmmm.

There are so many different definitions and explanations of what a DAO is. I just googled it and it says, "A decentralized autonomous organization (DAO) is an entity with no central leadership. Decisions get made from the bottom-up, governed by a community organized around a specific set of rules enforced on a blockchain".

I feel like even after reading this, I still don’t understand what the heck a DAO is. Simply put, a DAO is a community of people with a shared bank account. Decisions around how that bank account is used are made by voting on different proposals that members create. When a proposal gets enough votes, it is executed on-chain!

## An Example
[Y-Combinator (YC)](https://www.ycombinator.com/?utm_source=buildspace.so&utm_medium=buildspace_project) is a famous startup accelerator. They have a massive bank account funded by various people + profits from startups that have exited. The "YC Partners" are a group of people that decide what companies to accept into the program and invest in. The partners have invested in various companies that have exploded in value:
<img src="https://i.imgur.com/ocP0bNm.png">
YC has an extremely centralized approach where a small no of key people decide who to invest in — which isn't a bad thing! I want to stress that just because something is centralized doesn't mean it's bad lol.

## Y-Combinator as a DAO
Let's imagine YC as a DAO, We'll call it YCDAO.

Investors could put money into YCDAO and get back $YCDAO token. The money would live in a "treasury" on-chain that anyone would be able to see. The treasury is just the shared bank account.

For example, if I put in $5 into YC DAO I may get back 5 $YCDAO token. If I put in $100,000 I may get back 100,000 $YCDAO token. It depends on how the creators set up the rules.

Cool, so now I have some $YCDAO. YCDAO members with the token can now vote on proposals for different companies applying to YCDAO and decide whether or not to invest in them.

"Voting Power" would depend on how it is initially set up.

For example, 1 $YCDAO token could equal one vote. But maybe you think this isn't fair because it means ultra-rich people would rule the organization with their votes. That's fine, you can change the rule to say: "Everyone gets one vote, regardless of how many tokens they own". It's really up to the DAOs creators to think through what's best for members. But, I just want you to know voting power formulas can be custom! Thats the absolute beauty of a DAO 🌸.

Let's say 90% of people in YCDAO voted "Yes" to invest in DogDAO — a DAO for dog owners. Great. That proposal would automatically be executed on-chain. YCDAO would automatically send the funds to DogDAO's treasury. In exchange, DogDAO would automatically send $DOG to YCDAO's treasury. Bam. Investment complete.

Let's say DogDAO takes off and becomes wildly profitable by selling dog training lessons or something. That means that the $DOG token that YCDAO owns would have increased in value and YCDAO would make a profit by selling the token if they wanted. $YCDAO token itself would also go up in value because YCDAO's treasury has increased in value thanks to a fantastic investment.

What's magical here is you don't need to trust a central entity to make sure the investment goes through. It's all automatic and revolves around rules that the DAO sets when it is created

You definitely should read through that example a few times! I wanted to lay out something concrete for you to wrap your head around. YCDAO isn't real of course, but there are quite a few people pursuing the model. [Here](https://www.hyperscalefund.com/?utm_source=buildspace.so&utm_medium=buildspace_project) is an example.

**Remember, at the end of the day a DAO is just a group of strangers with a shared bank account that vote on how to use that bank account.**

If you still don't get it, don't worry. **Let's hop into the code and just build one ourselves :).**

# What we're going to do
We're going to build a web app for people to: connect their wallet → mint a membership NFT → receive a token airdrop → and actually vote on proposals. The web app is what I'll be calling our "DAO Dashboard". It's where our new members can join and it allows existing members to see what the DAO is up to.

# Let's Get Started
You can create a starter React Project

# Add 'Connect to Wallet' to your DAO Dashboard.
## Specify your chain and wallet type
So, in order for our website to talk to the blockchain, we need to somehow connect our wallet to it. Once we connect our wallet to our website, our website will have permission to call smart contracts on our behalf. Remember, it's just like authenticating into a website.

You may have built "Connect to Wallet" buttons in the past! This time, we'll be using thirdweb’s front-end SDK which makes it crazy easy.

**Check comments in `src/index.js`**

## Add Connect to Wallet
If you head over to your web app, you'll see a blank purple page. Let's add some basic copy + a button to let users connect their wallet.

**Check comments in `src/App.js`**

# Deploy your NFT bundle.
## Getting started w/ thirdweb
Awesome! We can now connect to a user's wallet, which means we can now check if they're in our DAO! In order to join our DAO, the user will need a membership NFT. If they don't have a membership NFT, we'll prompt them actually mint a membership NFT and join our DAO!

But, there's a problem. In order for us to mint NFTs, we need to write + deploy our own NFT smart contract. **This is actually where thirdWeb comes in clutch.**

What thirdWeb gives us, is a set of tools to create all our smart contracts without writing any Solidity.

We write no Solidity. All we need to do is write a script using just JavaScript to create + deploy our contracts. thirdweb will use a set of secure, standard contracts they've created [here](https://github.com/thirdweb-dev/contracts?utm_source=buildspace.so&utm_medium=buildspace_project). **The cool part is after you create the contracts, you own them and they're associated with your wallet.**

Once you deploy the contract, you can interact with those contracts from your frontend easily using their client-side SDK.

I can't stress how easy it is to create a smart contract with thirdweb compared to writing your own Solidity code, it will feel like interacting with a normal backend library. Lets get into it:

[thirdweb dashboard](https://thirdweb.com/dashboard?utm_source=buildspace?utm_source=buildspace.so&utm_medium=buildspace_project) allow us to create contracts without writing any code, but for this tutorial, we will be creating them with JavaScript.

Important! **thirdweb doesn't have a database, all your data is stored on-chain.**

# Create a place to run thirdweb scripts
Now we need to actually write some scripts that let us create/deploy our contract to Rinkeby using thirdweb. The first thing we're going to do is create a `.env` file that looks like this in the root of our project.
```
PRIVATE_KEY=YOUR_PRIVATE_KEY_HERE
WALLET_ADDRESS=YOUR_WALLET_ADDRESS
ALCHEMY_API_URL=YOUR_ALCHEMY_API_URL
```
thirdweb needs all this stuff to deploy contracts on your behalf. Nothing is stored on their end, everything stays locally on your `.env` file. Don't commit your `.env` file to Github. You will get robbed. Be careful.

# Initialize SDK
**Head over to `scripts/1-initialize-sdk.js`.**

**Check comments in `scripts/1-initialize-sdk.js`**

Let's execute it! Go to your terminal and paste the following command:
```
node scripts/1-initialize-sdk.js
```
Here's what i get as output:
<img src="https://i.imgur.com/AOWwf04.png">

# Create an ERC-1155 collection
What we're going to do now is create + deploy an ERC-1155 contract to Rinkeby. This is basically the base module we'll need to create our NFTs. **We're not creating our NFT here, yet. We're just setting up metadata around the collection itself.** This is stuff like the name of the collection (ex. CryptoPunks) and an image associated with the collection that shows up on OpenSea as the header.

*Note: You may know ERC-721 where every NFT is unique, even if they have the same image, name, and properties. With an ERC-1155, multiple people can be the holder of the same NFT. In this case, our "membership NFT" is the same for everyone, so instead of making a new NFT every time we can simply assign the same NFT to all our members. This is also more gas efficient! This is a pretty common approach for cases where the NFT is the same for all holders.*

Head to `scripts/2-deploy-drop.js`

**Check comments in `scripts/2-deploy-drop.js`**

When I run this using node scripts/2-deploy-drop.js, I get.
<img src="https://i.imgur.com/lPaBatJ.png">

Okay, what just happened is pretty freaking epic. Two things happened:

**One, we just deployed an [ERC-1155](https://docs.openzeppelin.com/contracts/3.x/erc1155?utm_source=buildspace.so&utm_medium=buildspace_project) contract to Rinkeby.** That's right! If you head over to `https://rinkeby.etherscan.io/` and paste in the address of the `editionDrop` contract, you'll see you just deployed a smart contract! The coolest part is you own this contract and it's deployed from your wallet. The “From” address will be your public address.

*Note: Keep the address of your editionDrop around, we'll need it later!, if you ever lose it, you can always retrieve from the thirdweb dashboard*

Pretty epic. A deployed, custom contract with just javascript. You can see the actual smart contract code thirdweb uses [here](https://github.com/thirdweb-dev/contracts/blob/main/contracts/drop/DropERC1155.sol?utm_source=buildspace.so&utm_medium=buildspace_project).

**The other thing we did here is thirdweb automatically uploaded and pinned our collection's image to IPFS.** You'll see a link that starts with `https://gateway.ipfscdn.io` printed out. If you paste that into your browser, you'll see your NFT's image being retrieved from IPFS via CloudFlare!

You can even hit IPFS directly using the `ipfs://` URI (note — wont work on Chrome since you need to be running an IPFS node, but works on Brave which does that for you!)

*Note: IPFS is basically a decentralized storage system, read more on it here!*

If you've developed a custom smart contract in Solidity before, this is kinda mind-blowing. We already have a contract deployed to Rinkeby + data hosted on IPFS. Wild. Next, we need to actually create our NFTs!

Here's my ERC1155 Contract on Rinkeby: https://rinkeby.etherscan.io/address/0x0257319f25978cab32aeeff89dd9c39e22c5c57b

# Deploy NFT metadata.
## Setup NFT Data
Okay, now we're going to actually deploy metadata associated with our membership NFT. We haven't done that yet. All we did so far was create the ERC-1155 contract and add some basic metadata. We haven't actually set up our membership NFTs, let's do that!

Head over to `scripts/3-config-nft.js`

**Check comments in `scripts/3-config-nft.js`**

You can also find this on your [thirdweb dashboard](https://thirdweb.com/dashboard?utm_source=buildspace?utm_source=buildspace.so&utm_medium=buildspace_project). Your thirdweb dashboard will display the contracts you are currently working on and it will show the addresses there as well for you to easily copy and paste.

When you're ready, run:
```
node scripts/3-config-nft.js
```
Here's what I get:
<img src="https://i.imgur.com/JTWSs8z.png">

## Setup claim condition
Now we need to actually set up our "claim conditions". What's the max # of NFTs that can be minted? When can users start minting NFTs? Again, this is usually custom logic you'd need to write into your contract but in this case thirdweb makes it easy.

Head over to `scripts/4-set-claim-condition.js`

**Check comments in `scripts/4-set-claim-condition.js`**

After running `node scripts/4-set-claim-condition.js` here's what I get:
<img src="https://i.imgur.com/0Osl5WW.png">

# Let users mint your NFTs.
Let's head over to `App.js`. What we'll be doing now is

- if we detect that our user has a membership NFT, show them our "DAO Dashboard" screen where they can vote on proposals and see DAO related info.

- if we detect that the user doesn't have our NFT, we'll give them a button to mint one.

Let's do it! We'll attack case #1 first, we need to detect if the user has our NFT.

## Check if user owns a membership NFT & Build a "Mint NFT" button
Head over to `App.js`

**Check comments in `App.js`**

When you actually go to mint the NFT, Metamask will pop so you can pay gas. Once it's done minting, you should see `Successfully Minted!` in your console along w/ the Testnet OpenSea link. On `testnets.opensea.io` we can actually see NFTs minted on the testnet which is pretty cool! When you head to your link, you'll see something like this:
<img src="https://i.imgur.com/h1shzNR.png">

Here's the link to my collection on OpenSea: https://testnets.opensea.io/collection/epicdao-membership-v2

## Show DAO Dashboard only if user owns the NFT
Okay, so if you remember we need to handle two cases:

if we detect that our user has a membership NFT, show them our "DAO Dashboard" screen where they can vote on proposals and see DAO related info.

if we detect that the user doesn't have our NFT, we'll give them a button to mint one.

This is pretty easy. All we need to add  to `App.js` before rendering mint nft screen.
**Check comments in `App.js`**

That’s it! Now, when you refresh the page you’ll see that you’re in the DAO Member Page. Yes!!! If you disconnect your wallet from your web app, you’ll be taken to the “Connect Wallet” page.

Finally, if you connect your wallet and don’t have the membership NFT, it’ll prompt you to mint one. I recommend you test this case:

- disconnect your wallet from your web app

- actually [create a new account](https://metamask.zendesk.com/hc/en-us/articles/360015289452-How-to-create-an-additional-account-in-your-MetaMask-wallet?utm_source=buildspace.so&utm_medium=buildspace_project)

Which will get you a fresh public address so you can have a new address to receive the NFT on. Metamask lets you have as many accounts as you want.

Be sure to test all three cases!

# Deploy an ERC-20 contract.
Our members have an NFT now to cement themselves as members of our DAO. Awesome. Let’s take it a step further. Let’s actually create a supply of “governance token” to airdrop to our members.

You might remember the ENS DAO governance token airdrop [here](https://decrypt.co/85894/ethereum-name-service-market-cap-hits-1-billion-just-days-after-ens-airdrop?utm_source=buildspace.so&utm_medium=buildspace_project). What does it all mean? Why does a “governance token” have a market cap of nearly a billion dollars [right now](https://coinmarketcap.com/currencies/ethereum-name-service/?utm_source=buildspace.so&utm_medium=buildspace_project)?

Basically, a governance token allows users to vote on proposals. For example, a proposal may say something like “I want Naruto DAO to send 100,000 $HOKAGE to wallet address `0xf79a3bb8d5b93686c4068e2a97eaec5fe4843e7d `for being an extraordinary member”. Then, members would vote on it.

Users with more governance token are more powerful. Usually, token is awarded to members of the community who have brought the most value.

For example, for the ENS airdrop, the people who were awarded the most token was the core dev team and active users in their Discord. But, you would have also received ENS DAO token based on how long you had held your ENS domain (ex. `farza.eth`). BTW, if you didn’t know, an ENS Name is an NFT.

So, the longer you had this NFT, the more token you got.

Why? Because the ENS team wanted early supporters of the networks to be rewarded. This was their formula:
<img src="https://i.imgur.com/syh3F01.png">
I want to make it clear, this is a custom formula! Your DAO can also have a custom formula. Maybe you also want to reward people in your DAO more based on how long they’ve had their membership NFT. It’s all up to you.

## Deploy your token
Let’s create and deploy our token smart contract! Head to `scripts/5-deploy-token.js`

**Check comments in `scripts/5-deploy-token.js`**

Here’s what I get when I run it:
<img src="https://i.imgur.com/wOtDsfI.png">

Boom! It deployed a fresh token contract. If you head to `https://rinkeby.etherscan.io/ `and search the token module’s address, you’ll see the contract you just deployed. Again, you’ll see it deployed from `your wallet` so `you own it`.

Here's my ERC20 Token $EPIC: https://rinkeby.etherscan.io/address/0xCcF32715D936D0c76561D6c8E4457cdC85E4dc1f

**You can import your token to metamask, check [here](https://metamask.zendesk.com/hc/en-us/articles/360015489031-How-to-add-unlisted-tokens-custom-tokens-in-MetaMask)**

You officially have your own token :).

## Create your token’s supply
Right now, **there are zero tokens available for people claim**. Our ERC-20 contract doesn’t magically know how many tokens are available. We have to tell it!

Head to `6-print-money.js`

**Check comments in `scripts/6-print-money.js`**

Here’s what I get when I run the script:
<img src="https://i.imgur.com/qlAuuAK.png">

Now for the epic part. Go back to your ERC-20 contract in Etherscan. You’ll now see you have your own token tracker!
Go ahead and click the tracker and you’ll see all the supply info along with stuff like: who holds your token, who’s transferring around tokens, and how much token is being moved around. You’ll also see here we have a “Max Total Supply”.

Pretty cool. We did this all with a couple of lines of Javascript. That’s wild. You can literally go make the next meme coin at this point if you wanted to lol.

## Airdrop it
It’s airdrop time. Right now you’re probably the only member of your DAO and that’s okay!

Open up `7-airdrop-token.js`.

**Check comments in `scripts/7-airdrop-token.js`**

When I run the script, here’s what I get:

<img src="https://i.imgur.com/LnKTHyI.png">

YOOOO. You just did an airdrop, hell yes!! In my case, you can see I have 6 unique members in my DAO and they all received the airdrop. In your case, it’ll likely be just you right now! Feel free to run this script again as more members join.

**In the real world**, an airdrop usually happens just one time. But, we’re just hacking around right now so it’s okay. Plus, there are no real rules to this world lol. If you wanna do 4 airdrops a day go for it!

You could create your own little airdrop formula just like ENS did for example:
<img src="https://i.imgur.com/IqboZsX.png">

Okay, so now if I head back to my ERC-20 contract on Etherscan, I can see all my new token holders and how much of `$EPIC` they own.
<img src="https://i.imgur.com/9Wj0KHw.png">

# Show off token holders on DAO Dashboard.
## Retrieve token holders on web app
It would be nice for all the members of our DAO to easily see all the people in the DAO who hold tokens along with how many tokens they hold. To do that, we’ll need to actually call our smart contracts from our client and retrieve that data.

Let’s do it! Head over to `App.js`

**Check comments in `App.js`**

## Render member data on DAO Dashboard
Now that we have all the data held nicely in our React app’s state, let’s render it.

**Replace** if `(hasClaimedNFT) { }`

**Check comments in `App.js`**

Epic. We now have a place for all our members to see other members on an internal, token-gated DAO dashboard. Awesome :).

# Building a treasury + governance.
A governance token is cool and all, but it’s kinda useless if people can’t use it to govern anything! What we’re going to do next here is set up a governance contract that lets people vote on proposals using their tokens

## Deploy a governance contract
I don’t want to complicate this too much.

At the end of the day, the voting contract is literally a way to let people vote on stuff, automatically count up those votes, and then any member would be able to execute the proposal on-chain. All without any central party.

For example, maybe you want to create a proposal like, “Transfer 1000 token to EpicDesign5222 for redesigning our landing page”. Who’s allowed to vote? How long do people have to vote? What’s the minimum # of token someone needs to create a proposal?

All these questions are answered in the initial voting contract we create

It’s almost like your setting up a little country and you need to set up your initial government + voting system!

Head over to `8-deploy-vote.js`

**Check comments in `scripts/8-deploy-vote.js`**

Go ahead and run this using `node scripts/8-deploy-vote.js`. Here’s what I end up getting:
<img src="https://i.imgur.com/3RsjNiS.png">

This is pretty cool. Basically, we created and deployed a new smart contract that will let us actually vote on proposals on-chain. This is a standard [governance](https://docs.openzeppelin.com/contracts/4.x/api/governance?utm_source=buildspace.so&utm_medium=buildspace_project) contract. You can see the exact contract you deployed [here](https://github.com/thirdweb-dev/contracts/blob/main/contracts/vote/VoteERC20.sol?utm_source=buildspace.so&utm_medium=buildspace_project).

If you head to `https://rinkeby.etherscan.io/` you’ll see it there!

So, now we have three contracts: our NFT contract, our token contract, and our voting contract! Be sure to save your voting contract address, we’ll be using it again in just a moment.

Here's my governace token: https://rinkeby.etherscan.io/address/0x90998F4E2473A944BC4Ca45554C89a63618dc5eF

## Setup your treasury
So now we have our governance contract and we can vote on stuff. Awesome. But there’s an issue.

**The voting contract itself doesn’t have the ability to move our tokens around**. For example, let’s say we wanted to create a proposal right now like “Send 1000 $EPIC to NarutoLover67 for being an awesome member”. This actually wouldn’t work. The voting contract has access to zero tokens right now.

Why? **Because you created the token supply. Your wallet owns access to the entire supply. So only you have the power to access the supply, move tokens around, airdrop them, etc**. Basically, this is a dictatorship haha. Here’s what we’re going to do — we’re going to transfer 90% of all our token to the voting contract. Once our token is moved to our voting contract, the voting contract itself will have access to the supply.

**This will essentially become our “community treasury”.**

Here I just chose 90% as a random #. In practice, it depends. For example, here’s how ENS distributed it:
<img src="https://i.imgur.com/9rhwrzV.png">

They decided to allocate 50% of the supply to their community treasury! The tokenomics of every DAO are so different and there isn’t a “standard” way to do things right now. I like how ENS did it a lot. 50% in the community, 25% airdropped, and the other 25% given to the core team + contributors.

Head to `9-setup-vote.js`

**Check comments in `scripts/9-setup-vote.js`**

Once you finish up, we can run this using node scripts/9-setup-vote.js. Here’s what I get as my output:
<img src="https://i.imgur.com/bdQE4NU.png">

kay, ready to see something epic? Head to your voting contract on `https://rinkeby.etherscan.io/`. Click the dropdown next to the word “Token”. Here, you’ll see my contract has “844,527 $EPIC on it.

This kinda blew my mind when I first saw it. We literally have our own treasury.

*Note: you may have a different amount in your treasury based on how much was in your supply and how much you airdropped.*

# Let users vote on proposals.
## Create your DAO’s first two proposals
Cool. Everything is set up, now, we just need to create our first proposal! 

Head to `10-create-vote-proposals.js`

**Check comments in `scripts/10-create-vote-proposals.js`**

It looks like a lot. Go ahead and read through it step by step! We’re actually creating two new proposals for members to vote on:

**1) We’re creating a proposal that allows the treasury to mint 420,000 new token**. You can see we do a `"mint"` in the code.

Maybe the treasury is running low and we want more tokens to award members. Remember, earlier we gave our voting contract the ability to mint new token — so this works! It’s a democratic treasury. If you members think this is proposal is stupid and vote “NO”, this simply won’t pass!

**2) We’re creating a proposal that transfer 6,900 token to our wallet from the treasury.** You can see we do a `"transfer"` in the code.

Maybe we did something good and want to be rewarded for it! In the real world, you’d usually create proposals to send other people token. For example, maybe someone helped code up a new website for the DAO and wants to be rewarded for it. We can transfer them token!

BTW, I want to make a note on `nativeTokenValue`. Lets say we wanted to have our proposal say, “We’d like to reward NarutoFangirl27 for helping us with marketing with 2500 governance token and 0.1 ETH”. This is really cool! It means you can reward people with both ETH and governance token — best of both worlds. 

*Note: That 0.1 ETH would need to be in our treasury if we wanted to send it!*

When I run `node scripts/10-create-vote-proposals.js` I get:
<img src="https://i.imgur.com/qGj6tbl.png">

BOOM. There are our proposals. The last thing we’re going to do is actually let users vote on proposals from our DAO dashboard now!

## Let users vote on proposals from the dashboard
Finally, let’s bring it all home. Right now, our proposals live on our smart contract. But, we want our users to easily be able to see them and vote! Let’s do that. Head to `App.js`.

**Check comments in `App.js`**

The next chunk of code is kinda massive lol. It deals with actually rendering the proposals that we just retrieved here so that users can have three options to vote:

- For

- Against

- Abstain

Pretty awesome. You can now actually use those buttons to vote.

We setup our governance contract to stop voting after 24-hours. That means after 24-hours, if:
```
votes "for" proposal > votes "against" proposal
```
Then any member would be able to execute the proposal via our governance contract. Proposals can’t be executed automatically. But, once a proposal passes, `any member` of the DAO can trigger the accepted proposal.

For example. Let’s say we’re dealing with the proposal where we’re minting an additional 420,000 token. If `votes "for" proposal > votes "against" proposal` — then anyone can trigger the proposal and bam our contract will mint the token. Kinda wild, right? We have to trust no one except the blockchain.

Imagine being in a corrupt country, voting for something, and then your government lies to you and says “Hey actually we didn’t get enough votes jk” when you really did lol. Or, imagine they say, “Okay, we got enough votes we’ll do this we promise” and never do!

In this case, everything is codified and code does not lie.

Anyways, now’s not the time to discuss how DAOs could potentially improve our governments ;). We gotta finish our meme DAO right here and right now! So close.

# Remove your admin powers and handle basic errors.
## Revoke roles
If you remember, you actually still hold “minting” rights on the ERC-20 contract. That means you can go and create more tokens if you wanted which may freak out members of your DAO lol. You could go and mint like a billion tokens to yourself lol.

It’s best if you revoke your “minting” role completely.

That way, only the voting contract is able to mint new tokens. We can do by making changes to `scripts/11-revoke-roles.js`

**Check comments in `scripts/11-revoke-roles.js`**

When I run this using node scripts/11-revoke-roles.js I get:
<img src="https://i.imgur.com/cRrzrTb.png">

So, after we run `token.roles.setAll({ admin: [], minter: [] })` you’ll see the only person who has the minter role is my voting contract!

We are now safe from an admin takeover :).

You'll see I still have the `transfer` role in conjunction with `AddressZero`, `AddressZero` in the roles array means that everybody can transfer tokens (which is what we want). It doesn't matter that our address is also there.

## Handle basic unsupported network error
First, let's import one last hook `useNetwork` at the top of `App.js` to recognize a connection outside of the Rinkeby network. Also, we're importing `ChainId` from the thirdweb SDK to get Rinkeby's chain ID.

**Check comments in `App.js`**

## See your token on Uniswap
ou may ask yourself how tokens like [ENS DAO](https://coinmarketcap.com/currencies/ethereum-name-service/?utm_source=buildspace.so&utm_medium=buildspace_project) or the more recent [Constitution DAO](https://coinmarketcap.com/currencies/constitutiondao/?utm_source=buildspace.so&utm_medium=buildspace_project) have governance token worth real money. Well basically, it’s because other people can actually just buy their governance tokens directly on decentralized exchanges like Uniswap.

For example — maybe a random person walks up to us and says, “Hey, I’ll give you $100 for 100 $EPIC because I want to join NarutoDAO and have some governance power”. Well, that means $EPIC has real value now. It means 1 $EPIC = 1 US Dollar. And, since there are 1,000,000 $EPIC, that means that my token’s fully diluted market cap would be $1,000,000.

Pretty wild, right :)?

People usually do swaps like these on Uniswap.

Believe it or not, your token will now show up on Uniswap under Rinkeby.

Here’s a quick video for you to actually do it yourself:
https://www.loom.com/share/8c235f0c5d974c978e5dbd564bbca59d

You can read more about liquidity pools [here](https://docs.uniswap.org/protocol/V2/concepts/core-concepts/pools?utm_source=buildspace.so&utm_medium=buildspace_project). You’ll notice in the video there wasn’t one for $EPIC. But, technically anyone could come in and create a pool that lets people swap $ETH for $EPIC. That pool could have $100. Or, it could have a $1,000,000,000. Depends on how popular my token is!

# Final Output:
<img src="https://i.imgur.com/v1mhfAd.png">

<img src="https://i.imgur.com/Q4SVjlk.png">

<img src="https://i.imgur.com/xxbeqDH.png">

<img src="https://i.imgur.com/7FWTcpj.png">

# Finalize and celebrate.
## Hello, DAO Master
You’ve done it. You made it to the end. I’m proud af. This is you rn:

<img src="https://media0.giphy.com/media/3oKIPf3C7HqqYBVcCk/giphy.gif?cid=ecf05e4799o6581fbwkeycd5jexb17jhhhvkk0pnca3ddcwu&rid=giphy.gif&ct=g">

DAOs are this really new, mystical thing that a lot of people are talking about. But, you did more than just talk about them — you actually made one!! In classic buildspace style, you dove into this really deep and complex topic by just hopping right into the code. Congrats my friend!

A quick review here you just:

✅ deployed your own custom ERC-20 token. Here's the [link](https://rinkeby.etherscan.io/address/0xCcF32715D936D0c76561D6c8E4457cdC85E4dc1f) for mine on Rinkeby. 

✅ deployed your own ERC-1155 NFT people can mint to join your DAO. Here's the [link](https://rinkeby.etherscan.io/address/0x0257319f25978cab32aeeff89dd9c39e22c5c57b) for mine on Rinkeby and the link for [OpenSea](https://testnets.opensea.io/collection/epicdao-membership-v2).

✅ deployed your own governance contract + treasury. Here's the [link](https://rinkeby.etherscan.io/address/0x90998F4E2473A944BC4Ca45554C89a63618dc5eF) for mine on Rinkeby.

✅ built a dapp that lets people connect their wallet, get an NFT, see a DAO Dashboard where they can see other members + actually vote on proposals that are executed directly by your governance contract.

I know it’s hard to believe, but you created a full-fledged DAO. I hope at the very least this project gave you a grasp on what a DAO is and how one works. There is of course more to a DAO than what we covered in this project here, stuff like tokenomics, running an actual community, planning your DAOs roadmap, etc — these are all things we haven't covered by hey I’m sure you’ll figure it out ;).