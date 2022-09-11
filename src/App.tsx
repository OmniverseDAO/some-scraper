import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import InputForm from './components/InputForm';
import GetNFTs from './components/IdFinder'
import { ethers } from 'ethers'
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Container } from 'reactstrap';

const App: React.FC = () => {

  const [someMsg, setSomeMsg] = useState<string>('')
  const [contractAddress, setContractAddress] = useState("0x63d85ec7b1561818ec03e158ec125a4113038a00")
  const [loaded, setLoaded] = useState<boolean>(false)
  const [valid, setValid] = useState<boolean>(false)
  const [tokenIds, setTokenIds] = useState<Map<number, []>>()
  const [holderAddress, setHolderAddress] = useState<string>('')


  useEffect(() => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  


  const handleOnSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setTokenIds(undefined)
    if (!ethers.utils.isAddress(contractAddress) ) { setValid(false); setSomeMsg('Need Valid Address') } 
    else { setValid(true); setSomeMsg('') }
    setSomeMsg('') //hides message block
    setLoaded(false) //resets loaded before new fetch
    console.log(contractAddress);
  };

  return (
  <div className="App">
    <header className="App-header">
      <>
        <h1>Zem's NFT Scraper</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <h6 className="text-muted"><small>This versoin is only working with ETH network currenting</small></h6>

        <div hidden={!someMsg}>{someMsg}</div>
        <br />
        <InputForm
          setValid={setValid}
          setSomeMsg={setSomeMsg}
          holderAddress={holderAddress}
          setHolderAddress={setHolderAddress}
          contractAddress={contractAddress}
          setContractAddress={setContractAddress}
          handleOnSubmit={handleOnSubmit}
        />
        <br />
      </>
    </header>
    <Container fluid>
        <h5 hidden={!valid}>
          <GetNFTs 
            holderAddress={holderAddress}
            contractAddress={contractAddress}
            loaded={loaded}
            setLoaded={setLoaded}
            valid={valid}
            tokenIds={tokenIds}
            setTokenIds={setTokenIds}
          />
        </h5>
    </Container>
  </div>
  );
}

export default App;
