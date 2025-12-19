import React, { useContext, useEffect, useState } from "react";
import '../Home/home.css'
import { CoinContext } from "../../context/CoinContext";
import {Link} from 'react-router-dom'
const Home = () => {
 
  const {allCoin , currency} = useContext(CoinContext);
  const [displayCoin , setDisplayCoin] = useState([]);
  const [input ,setInput] = useState('')

   const inputHandler = (event)=>{
       setInput(event.target.value);
       if(event.target.value === ''){
        setDisplayCoin(allCoin);
       }
   }

const searchHandler = async(e)=>{
 event.preventDefault();
const coins = await allCoin.filter((item)=>{
  return item.name.toLowerCase().includes(input.toLowerCase())
 })
 setDisplayCoin(coins)  
}
  useEffect(()=>{
    if(allCoin) {
      setDisplayCoin(allCoin);
    }
  },[allCoin])
  
  return <div>

    <div className="home">
      <div  className="hero">
        <h1>Largest <br/> Crypto MarketPlace</h1>
        <p>Welcome to the world's largest cryptocurrency
          markeyplace. Sign up to explore more about cryptos.
        </p>
      
        <form onSubmit={searchHandler}>
          <input type="text" list='coinlist' placeholder="search crypto.." onChange={inputHandler} value={input} required/>
          
          <datalist id="coinlist">
             {allCoin.map((item,index)=>(
              <option key={index} value={item.name}/>
             ))}
          </datalist>
          
          
          <button className="submit">Search</button>
        </form>
      </div>
    
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:'center'}}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
      
        {
          displayCoin && displayCoin.slice(0,10).map((item,index)=>(
              <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                <p>{item.market_cap_rank}</p>
                <div>
                  <img src={item.image} alt={item.name}/>
                  <p>{item.name + '-'+item.symbol}</p>
                </div>
                <p>{currency.symbol} {item.current_price}</p>
                <p className={item.price_change_percentage_24h > 0 ? 'green' : 'red'}>
                    {Math.floor(item.price_change_percentage_24h*100)/100}</p>
                <p className="market-cap">{currency.synbol} {item.market_cap.toLocaleString()}</p>
              </Link>
          ))
        }
      
      </div>
    
    </div>
  </div>;
};

export default Home;