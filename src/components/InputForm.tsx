import React, { ChangeEvent, FormEvent } from "react";
import { ethers } from 'ethers'
import { Col, FormGroup, Input, Label } from "reactstrap";


type SubmitEvent = FormEvent<HTMLFormElement>;
type InputEvent = ChangeEvent<HTMLInputElement>;

type Props = {
  setValid: (val: boolean) => void;
  setSomeMsg: (val: string) => void;
  holderAddress: string;
  setHolderAddress: (val: string) => void;
  contractAddress: string;
  setContractAddress: (val: string) => void;
  handleOnSubmit: (e: SubmitEvent) => void;
};

const InputForm: React.FC<Props> = ({
  setValid,
  setSomeMsg,
  holderAddress,
  setHolderAddress,
  contractAddress,
  setContractAddress,
  handleOnSubmit,
}) => {
     
  const handleClick = async (_someVar: any, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(_someVar, e)
  };

  const handleHolderInputChange = async (e: InputEvent) => {
    e.preventDefault();
    if (!ethers.utils.isAddress(e.target.value) ) { setValid(false); setSomeMsg('Need Valid Address') } 
    setHolderAddress(e.target.value)
  }

  const handleContractInputChange = async (e: InputEvent) => {
    e.preventDefault();
    if (!ethers.utils.isAddress(e.target.value) ) { setValid(false); setSomeMsg('Need Valid Address') } 
    setContractAddress(e.target.value)
  }
  
  return (
    <>
      <form onSubmit={handleOnSubmit}>
      <label htmlFor="holderAdress">Holder Address</label>
        <input
          id="holderAdress"
          className="address"
          placeholder="Holder Address"
          value={holderAddress}
          onChange={handleHolderInputChange}
          type="text"
        />
        <br />
        <label htmlFor="contractAddress">NFT Contract Address</label>
        <input
          id='contractAddress'
          type="text"
          value={contractAddress}
          onChange={handleContractInputChange}
          placeholder={'0x...<SomeNftAddress>'} 
        />
        <p />
        <button className="get" onClick={(e) => handleClick('event info:', e)}>
          Get List
        </button> 
      </form>
    </>
  );
};

export default InputForm;