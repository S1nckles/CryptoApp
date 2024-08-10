import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { fakeFetchCrypto, fetchAssets } from '../api';
import { PrecentDefference } from '../utils';

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false
})

export const CryptoContextProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        async function preload() {
            setLoading(true);
            const {result} = await fakeFetchCrypto();
            const fetchedAssets = await fetchAssets();
            
            setAssets(
                fetchedAssets.map((asset) => {
                    const coin = result.find((c) => c.id === asset.id);
                    return {
                        grow: asset.price < coin.price,
                        growPrecent: PrecentDefference(asset.price, coin.price),
                        totalAmount: asset.amount * coin.price,
                        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                        ...asset
                    };
                })
            );
            setCrypto(result);
            setLoading(false);
        }
        preload()
    }, [])

    return <CryptoContext.Provider value={{assets, crypto, loading}}> {children} </CryptoContext.Provider>
};

export default CryptoContext;