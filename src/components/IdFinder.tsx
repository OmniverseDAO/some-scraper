import React from 'react';

type Props = {
    contractAddress: string;
    userAddress: string;
    loaded: boolean;
    setLoaded: (val: boolean) => void;
    valid: boolean;
}

export const GetNFTs: React.FC<Props> = ({
    contractAddress,
    userAddress,
    loaded,
    setLoaded,
    valid,
}) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [tokenIds, setTokenIds] = React.useState<Map<number, []>>()
    const [images, setImages] = React.useState<Map<number, string>>()
    React.useEffect(() => {
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
                if (!userAddress || !valid || loaded) {} else {
                    setIsLoading(true)
                    setTokenIds(new Map<number, []>())
                    const fetchUrl = 'https://deep-index.moralis.io/api/v2/' + 
                    userAddress + '/nft/' + contractAddress + '?chain=eth&format=decimal'
                    fetch(fetchUrl, options)
                    .then(response => response.json())
                    .then(response => { 
                        let idMap = new Map<number, []>()
                        let imageMap = new Map<number, string>()
                        const r = response.result
                        console.log(r)
                        if (!r || r.length === 0) {} 
                        else {
                            r.forEach((someValue: any) => {
                                if (someValue.token_id !== undefined){
                                    idMap.set(someValue.token_id, JSON.parse(someValue.metadata).attributes)
                                    imageMap.set(someValue.token_id, JSON.parse(someValue.metadata).image)
                                }
                            })
                        }
                        setTokenIds(idMap)
                        setImages(imageMap)
                        setLoaded(true)
                    })
                    .catch(err => console.error(err))
                    .finally(() => setIsLoading(false) );
                }      
            }
        }
    },[contractAddress, isLoading, loaded, setImages, setLoaded, setTokenIds, tokenIds, userAddress, valid])
    if (tokenIds === undefined){return <>None Found</>}
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
        let keyImage = images?.get(key)
        if (keyImage?.substring(0,7) === 'ipfs://') { 
            keyImage = 'https://ipfs.io/ipfs/' + keyImage?.slice(7, keyImage.length)
        }
        let someImage = <></>
        if (!images) { } else { someImage = React.createElement("img", {src: keyImage}, null) }
        const component = React.createElement("div", {key: key}, <h2>#{key}</h2>, traits, someImage, <p><br></br></p>)
        rendered.push(component);
    }
    return <><span>{rendered}</span></>
}

export default GetNFTs
