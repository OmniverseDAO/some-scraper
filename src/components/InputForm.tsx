import React, { ChangeEvent, FormEvent } from "react";
import { ethers } from 'ethers'

type SubmitEvent = FormEvent<HTMLFormElement>;
type InputEvent = ChangeEvent<HTMLInputElement>;

type Props = {
  setValid: (val: boolean) => void;
  setSomeMsg: (val: string) => void;
  setUserAddress: (val: string) => void;
  contractAddress: string;
  setContractAddress: (val: string) => void;
  handleOnSubmit: (e: SubmitEvent) => void;
  placeholder: string;
};

const InputForm: React.FC<Props> = ({
  setValid,
  setSomeMsg,
  contractAddress,
  setContractAddress,
  handleOnSubmit,
  placeholder,
}) => {
     
  const handleClick = async (_someVar: any, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(_someVar, e)
  };

  const handleInputChange = async (e: InputEvent) => {
    e.preventDefault();
    if (!ethers.utils.isAddress(contractAddress) ) { setValid(false); setSomeMsg('Need Valid Address') } 
    setContractAddress(e.target.value)
  }
  
  return (
    <>
        <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              value={contractAddress}
              onChange={handleInputChange}
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