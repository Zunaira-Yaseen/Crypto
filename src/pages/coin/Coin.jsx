import React, { useContext, useEffect, useState } from "react";
import '../coin/coin.css'
import {useParams} from 'react-router-dom'
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/lineChart";

const Coin = () => {
  const {coinId} = useParams();
  const {currency} = useContext(CoinContext);
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCoinData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error("Error fetching coin data:", err);
      setCoinData(null);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=30&interval=daily`
      );
      const data = await response.json();
      setHistoricalData(data);
    } catch (err) {
      console.error("Error fetching historical data:", err);
      setHistoricalData(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchCoinData(), fetchHistoricalData()]);
      setLoading(false);
      fetchHistoricalData();
    };
    
    fetchData();
  }, [coinId, currency]);

  if (loading) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  if (!coinData) {
    return (
      <div className="coin-error">
        <p>Error loading coin data</p>
      </div>
    );
  }

  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image.large} alt={coinData.name} />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData}/>
      </div>

      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>{currency.symbol}{coinData.market_data.current_price
            [currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>{currency.symbol}{coinData.market_data.market_cap
            [currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour high</li>
          <li>{currency.symbol}{coinData.market_data.high_24h
            [currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour low</li>
          <li>{currency.symbol}{coinData.market_data.low_24h
            [currency.name].toLocaleString()}</li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;