import React, { createContext, useEffect, useState } from "react";
// import { ethers} from "ethers";
import axios from "axios";
export const DataContext = createContext();

const ContextFile = ({ children }) => {
  const [account, setAccount] = useState("");
  const [coinsData, setCoinsData] = useState([]);
  const [currencyTicker, setCurrencyTicker] = useState(undefined);
  const [checkList, setCheckList] = useState(undefined);
  const [isDataAvail, setIsDataAvail] = useState(false);
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
  const [provider, setProvider] = useState(null);

  //   useEffect(() => {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);

  //     const loadProvider = async () => {
  //       if (provider) {
  //         window.ethereum.on("chainChanged", () => {
  //           window.location.reload();
  //         });

  //         window.ethereum.on("accountsChanged", () => {
  //           window.location.reload();
  //         });
  //         await provider.send("eth_requestAccounts", []);
  //         const signer = provider.getSigner();
  //         const address = await signer.getAddress();
  //         setAccount(address);
  //         setProvider(provider);
  //       } else {
  //         console.error("Metamask is not installed");
  //       }
  //     };
  //     provider && loadProvider();
  //   }, []);
  return (
    <DataContext.Provider
      value={{
        account,
        provider,
        coinsData,
        currencyTicker,
        getCoinsDataByCountry,
        isDataAvail,
        searchCoins,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default ContextFile;
