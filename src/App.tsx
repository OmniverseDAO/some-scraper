import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import InputForm from './components/InputForm';
import GetNFTs from './components/IdFinder'

const App: React.FC = () => {
  const inputText = '0x...<SomeNftAddress>'
//  const deadAddress = '0x000000000000000000000000000000000000dEaD'
  const [userAddress, setUserAddress] = useState<string>('')

  const [someMsg, setSomeMsg] = useState<string>('')
  const [inputContract, setInputState] = useState("")
  const [loaded, setLoaded] = React.useState<boolean>(false)
  const [valid, setValid] = useState<boolean>(false)

  const handleOnSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setSomeMsg('') //hides message block
    setLoaded(false) //resets loaded before new fetch
    console.log(inputContract);
    
  };

  useEffect(() => {
    try{ 
      //window.ethereum.on('accountsChanged', function () { clearStored(); })
    } catch (e) {console.error(e)}

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valid])

  const clearStored = () => {
    setUserAddress('')
    setSomeMsg('')
  }

    return (
    <div className="App">
      <header className="App-header">
        <>
        <h1>Zem's NFT Scraper</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <h5 hidden={!someMsg}>{someMsg}</h5>
          <InputForm
            setMessage = {setSomeMsg} 
            valid={valid}
            setValid = {setValid}
            setUserAddress = {setUserAddress}
            contractAddress={inputContract}
            setContractAddress={setInputState}
            handleOnSubmit={handleOnSubmit}
            placeholder={inputText}
          />
          <h5 hidden={!valid}>
            <GetNFTs 
              userAddress={userAddress}
              contractAddress={inputContract}
              loaded={loaded}
              setLoaded={setLoaded}
              valid={valid}
            />
          </h5>
        </>
      </header>

    </div>
  );
}

export default App;
