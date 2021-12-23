import { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useWeb3 } from "@3rdweb/hooks";

const sdk = new ThirdwebSDK("rinkeby");

const bundleDropModule = sdk.getBundleDropModule(
  "0x5745513C19ce2e951f375B1c627466484e971A85"
);

const tokenModule = sdk.getTokenModule(
  "0x4b093889B5fF8f3C391Db81e54b87590B83D07f4"
);

const App = () => {

  const { connectWallet, address, error, provider } = useWeb3();

  console.log("Address:: ", address);

  const signer = provider ? provider.getSigner() : undefined;

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  const [isClaiming, setIsClaiming] = useState(false);

  const [memberTokenAmounts, setMemberTokenAmounts] = useState({});

  const [memberAddresses, setMemberAddresses] = useState([]);

  const shortenAddress = (str) => {
    return str.substring(0, 6)+"..."+str.substring(str.length - 4);
  }

  useEffect(() => {
    if (!hasClaimedNFT) {
      return
    }

    bundleDropModule
    .getAllClaimerAddresses("0")
    .then((addresses) => {
      console.log("Member addresses", addresses);
      setMemberAddresses(addresses);
    })
    .catch((e) => {
      console.error("Failed to access member's list", e)
    })
  }, [hasClaimedNFT]);

  useEffect(() => {
    if (!hasClaimedNFT){
      return;
    };

    tokenModule
    .getAllHolderBalances()
    .then((amounts) => {
      console.log("Amounts:: ", amounts);
      setMemberTokenAmounts(amounts);
    })
    .catch((e) => {
      console.error("Failed to get token amounts: ", e);
    })
  }, [hasClaimedNFT]);

  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      return {
        address, 
        tokenAmount: ethers.utils.formatUnits(memberTokenAmounts[address] || 0, 18, )
      }
    })
  }, [memberAddresses, memberTokenAmounts]);

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    if(!address) {
      return
    }

    return bundleDropModule
    .balanceOf(address, "0")
    .then((balance) => {
      if(balance.gt(0)){
        setHasClaimedNFT(true);
        console.log("User has membership NFT")
      } else {
        setHasClaimedNFT(false);
        console.log("User does NOT have membership NFT")
      }
    }).catch((e) => {
      setHasClaimedNFT(false);
      console.error("Failed to check NFT balance", e);
    })
  }, [address]);

  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to PapDAO</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          Connect Wallet
        </button>
      </div>
    )
  }

  const mintNft = () => {
    setIsClaiming(true);

    bundleDropModule
    .claim("0", 1)
    .catch((e) => {
      console.error("Failed to claim, ", e);
      setIsClaiming(false)
    })
    .finally(() => {
      setIsClaiming(false);
      setHasClaimedNFT(true);
      console.log(`Successfully minted! Check it out here:  https://testnets.opensea.io/assets/${bundleDropModule.address}/0`);
    })
  }

  return (
    <div className="mint-nft">
      <h1>Mint Your Free DAO Membership NFT</h1>
      <button
        disabled={isClaiming}
        onClick={() => mintNft()}
      >
      {isClaiming ? "Minting...": "Mint your FREE NFT"}
      </button>
    </div>
  );

  if (!address) {
    return(
      <div className="landing">
        <h1>PapDAO</h1>
        <button
          onClick={() => connectWallet("injected")} className="btn-hero"
        >
          Connect Your Wallet
        </button>
      </div>
    );
  };

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>PapDAO Member</h1>
        <p>Welcome dear member</p>
      </div>
    )
  };


};



export default App;
