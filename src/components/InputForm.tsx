import React, { ChangeEvent, FormEvent, useState } from "react";
import { ethers } from 'ethers'
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const API_KEY = process.env.REACT_APP_INFRA_API_KEY

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: API_KEY // required
    }
  }
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
});

type SubmitEvent = FormEvent<HTMLFormElement>;
type InputEvent = ChangeEvent<HTMLInputElement>;

type Props = {
  setMessage: (val: string) => void;
  setValid: (val: boolean) => void;
  setUserAddress: (val: string) => void;
  contractAddress: string;
  setContractAddress: (val: string) => void;
  handleOnSubmit: (e: SubmitEvent) => void;
  placeholder: string;
};

const InputForm: React.FC<Props> = ({
  setMessage,
  setValid,
  setUserAddress,
  contractAddress,
  setContractAddress,
  handleOnSubmit,
  placeholder,
}) => {
  
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()
  if (!window.ethereum){return <>No Web3 Provider</>}

  
  const getProvider = async () => {
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    setProvider(provider)
    setUserAddress(await signer.getAddress())
  }

  const handleClick = async (_someVar: any, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    getProvider()
    if (!provider) {return <>Connect Wallet</>} else { 
      
    }
  };

  return (
    <>
        <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              value={contractAddress}
              onChange={(e: InputEvent) => {
                if (!ethers.utils.isAddress(contractAddress)) {
                  setMessage('Need Valid Address')
                  setValid(false)
                } else { setMessage(''); setValid(true)}
                setContractAddress(e.target.value)
              }}
              placeholder={placeholder} 
            />
            <br></br>
            <button className="get" onClick={(e) => handleClick('event info:', e)}>
                Get List
            </button>
        </form>
    </>
  );
};

export default InputForm;