"use client";

import { useState, useEffect, useRef } from "react";
import CoinDropdown from "@/components/CoinDropdown";
import CoinDisplay from "@/components/CoinDisplay";
import { Coin, DropdownCoin } from "@/types/Coin";
import { getCoinByID, getUpdatedCoins } from "@/utils/cryptoAPI";
import styles from "@/styles/App.module.css";
import CoinSearch from "@/components/CoinSearch";

interface AppProps {
  dropdownCoins: DropdownCoin[];
  initError: string | null;
}

export default function App({ dropdownCoins, initError }: AppProps) {
  const [selectedCoins, setSelectedCoins] = useState<Coin[]>([]);
  const [error, setError] = useState<string | null>(initError);
  const selectedCoinsRef = useRef(selectedCoins);

  useEffect(() => {
    selectedCoinsRef.current = selectedCoins;
  }, [selectedCoins]);

  const addCoin = (coinId: string) => {
    if (!coinId || selectedCoins.some((coin) => coin.id === coinId)) {
      return;
    }

    getCoinByID(coinId)
      .then((coin) => {
        setSelectedCoins([...selectedCoins, coin]);
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  const removeCoin = (coinId: string) => {
    setSelectedCoins(selectedCoins.filter((coin) => coin.id !== coinId));
  };

  const updateCoins = () => {
    console.log("Updating coins at", new Date().toLocaleTimeString());
    getUpdatedCoins(selectedCoinsRef.current)
      .then((updatedCoins) => {
        setSelectedCoins(updatedCoins);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  useEffect(() => {
    setInterval(updateCoins, 60000);
  }, []);

  return (
    <>
      <h1>Cypto Currency Price Tracker</h1>
      {error && <p className={styles.error}>{error}</p>}

      <CoinSearch addCoin={addCoin} setError={setError} />

      <CoinDropdown
        dropdownCoins={dropdownCoins}
        selectedCoins={selectedCoins}
        addCoin={addCoin}
      />

      {selectedCoins.map((coin) => (
        <CoinDisplay key={coin.id} coin={coin} removeCoin={removeCoin} />
      ))}
    </>
  );
}
