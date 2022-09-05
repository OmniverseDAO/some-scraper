import React, { useEffect } from 'react';
import { ethers } from 'ethers'

type Props = {
    tokenIds: Map<number, []> | undefined,
    setTokenIds: (val: Map<number, []>) => void;
    contractAddress: string;
    userAddress: string;
    loaded: boolean;
    setLoaded: (val: boolean) => void;
}

export const GetNFTs: React.FC<Props> = ({
    tokenIds,
    setTokenIds,
    contractAddress,
    userAddress,
    loaded,
    setLoaded,
}) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    useEffect(() => {
        if (!isLoading && !tokenIds) {
            const API_KEY = process.env.REACT_APP_MORALIS_API_KEY
            if (!API_KEY) { alert('moralis api key not set in env') } else {
                const options = {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'X-API-Key': API_KEY
                    }
                }
                if (!userAddress || !contractAddress || loaded) {} else {
                    setIsLoading(true)
                    setTokenIds(new Map<number, []>())
                    const fetchUrl = 'https://deep-index.moralis.io/api/v2/' + 
                    userAddress + '/nft/' + contractAddress + '?chain=eth&format=decimal'
                    fetch(fetchUrl, options)
                    .then(response => response.json())
                    .then(response => { 
                        let idMap = new Map<number, []>()
                        const r = response.result
                        if (!r || r.length === 0) {} 
                        else {
                            r.forEach((someValue: any) => {
                                if (someValue.token_id !== undefined){
                                    idMap.set(someValue.token_id, JSON.parse(someValue.metadata).attributes)
                                    //console.log(JSON.parse(someValue.metadata).image)
                                }
                            })
                        }
                        setTokenIds(idMap)
                        setLoaded(true)
                    })
                    .catch(err => console.error(err))
                    .finally(() => setIsLoading(false) );
                }      
            }
        }
    },[contractAddress, isLoading, loaded, setLoaded, setTokenIds, tokenIds, userAddress])

    if (tokenIds === undefined){return <></>}
    const rendered: React.ReactElement[]= [];
    let itemKey = 0
    
    for(let [key, value] of tokenIds) {
        let traits: any[] = []
        let jsonItemList = []
        for(let item of value) {
            const jsonItem = JSON.parse(JSON.stringify(item))
            if (jsonItem.trait_type !== undefined) { 
                traits.push(React.createElement("div", {key: itemKey++}, jsonItem.trait_type, ' : ', jsonItem.value))
                jsonItemList.push(jsonItem) 
            }
        }
        console.log(key, jsonItemList)
        const component = React.createElement("div", {key: key}, '#', key, <br></br>, traits, <p></p>)
        rendered.push(component);
    }
    return <><span>{rendered}</span></>
}

export default GetNFTs
