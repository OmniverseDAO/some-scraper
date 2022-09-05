import React, { ChangeEvent, FormEvent, useState } from "react";
import { ethers } from 'ethers'

type SubmitEvent = FormEvent<HTMLFormElement>;
type InputEvent = ChangeEvent<HTMLInputElement>;

type Props = {
    setUserAddress: (val: string) => void;
    contractAddress: string;
    setContractAddress: (val: string) => void;
    handleOnSubmit: (e: SubmitEvent) => void;
    placeholder: string;
};

const InputForm: React.FC<Props> = ({
    setUserAddress,
    contractAddress,
    setContractAddress,
    handleOnSubmit,
    placeholder,
}) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()
  if (!window.ethereum){return <>No Web3 Provider</>}

  
  const getProvider = async () => {
    const prov: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const accounts =  await prov.send("eth_requestAccounts", []);
    setUserAddress(accounts[0])
  }

  const handleClick = async (_someVar: any, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    getProvider()
    if (!provider) {return <>Connect Wallet</>} else { 
      if (!ethers.utils.isAddress(contractAddress)) {return <></>}
    }
  };

  return (
    <>
        <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              value={contractAddress}
              onChange={(e: InputEvent) => setContractAddress(e.target.value)}
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