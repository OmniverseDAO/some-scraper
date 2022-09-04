import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";
import InputForm from './components/InputForm';
import GetNFTs from './components/IdFinder'


const App: React.FC = () => {
  const inputText = '0x...<SomeNftAddress>'
//  const deadAddress = '0x000000000000000000000000000000000000dEaD'
  const [userAddress, setUserAddress] = useState<string>('')
  const [tokenIds, setTokenIds] = useState<Map<number, []>>()
  const [someMsg, setSomeMsg] = useState<string>('')
  const [inputContract, setInputState] = useState("")
  const [loaded, setLoaded] = React.useState<boolean>(false)

  const handleOnSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setTokenIds(undefined)
    setSomeMsg('')
    if (!ethers.utils.isAddress(inputContract)) { setSomeMsg('need valid address'); return }
    console.log(inputContract);
    setLoaded(false)
  };

  useEffect(() => {
    try{ 
      window.ethereum.on('accountsChanged', function () { clearStored(); })
    } catch (e) {console.error(e)}
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const clearStored = () => {
    tokenIds?.clear()
    setUserAddress('')
    setSomeMsg('')
  }

  return (
    <div className="App">
      <header className="App-header">
        <>
        <h1>Zem's NFT Scraper</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <InputForm
            setUserAddress = {setUserAddress}
            contractAddress={inputContract}
            setContractAddress={setInputState}
            handleOnSubmit={handleOnSubmit}
            placeholder={inputText}
          />
          <h5 hidden={!someMsg}>{someMsg}</h5>
          <h5>
            <label hidden={!tokenIds}>Found Token IDs:</label>
            <p></p>
            <GetNFTs 
              tokenIds={tokenIds}
              setTokenIds={setTokenIds}
              userAddress={userAddress}
              contractAddress={inputContract}
              loaded={loaded}
              setLoaded={setLoaded}
            />
          </h5>
        </>
      </header>

    </div>
  );
}

export default App;
