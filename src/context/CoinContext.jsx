import {createContext, useEffect, useState} from 'react'

export const CoinContext = createContext();

const CoinContextProvider = (props)=>{
    
    const [allCoin,setAllCoin] = useState([])
    const [currency , setCurrency] = useState({
        name:'usd',
        symbol:'$'
    })

    const fetchAllCoin = async() => {
        try {
            // REMOVE the custom headers for free API - it causes CORS issues
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name || 'usd'}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
            );
            
            const data = await response.json();
            setAllCoin(data);
        } catch (err) {
            console.error("Error fetching coins:", err);
            setAllCoin([]);
        }
    }

    useEffect(()=>{
        fetchAllCoin()
    },[currency])

    // Fix: Return an object, not a function
    const contextValue = {
        allCoin,
        currency,
        setCurrency
    }
    
    return(
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;