import React, { createContext, useEffect, useState } from "react";
import { getWeb3 } from "./web3";
import axios from "axios";
export const DataContext = createContext();

const ContextFile = ({ children }) => {
  const [account, setAccount] = useState("");
  const [coinsData, setCoinsData] = useState([]);
  const [currencyTicker, setCurrencyTicker] = useState(undefined);
  const [checkList, setCheckList] = useState(undefined);
  const [isDataAvail, setIsDataAvail] = useState(false);
  const walletConnection=async()=>{
    let web3= await getWeb3();
    let accounts= await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }
  const searchCoins = async (query) => {
    setIsDataAvail(true);
    try {
      if(!query){
        setCoinsData(coinsData);
        setIsDataAvail(false);
        return;
      }
      let data = coinsData.filter((item) => item.name.toLowerCase() === query.toLowerCase());
      setCoinsData(data);
      setIsDataAvail(false);
    } catch (error) {
      console.log(error);
      setIsDataAvail(false);
    }
  };
  const getCurrencyTickers = async () => {
    try {
      let res = await axios(
        "https://raw.githubusercontent.com/mhs/world-currencies/master/currencies.json"
      );
      setCurrencyTicker(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCoinData = async () => {
    setIsDataAvail(true);
    try {
      let response = await axios(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      setCoinsData(response.data);
      setIsDataAvail(false);
    } catch (error) {
      console.log("error", error);
      setIsDataAvail(false);
    }
  };
  const getCoinsDataByCountry = async (curr = "usd") => {
    setIsDataAvail(true);
    try {
      let response = await axios(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curr.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      setCoinsData(response.data);
      setIsDataAvail(false);
    } catch (error) {
      console.log("error", error);
      setIsDataAvail(false);
    }
  };
  useEffect(() => {
    (async () => {
      await getCoinData();
      await getCurrencyTickers();
    })();
  }, []);

  return (
    <DataContext.Provider
      value={{
        coinsData,
        currencyTicker,
        getCoinsDataByCountry,
        isDataAvail,
        searchCoins,
        walletConnection,
        account
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default ContextFile;
