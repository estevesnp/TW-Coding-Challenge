"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import CoinDropdown from "@/components/CoinDropdown";
import CoinDisplay from "@/components/CoinDisplay";
import { Coin, DropdownCoin } from "@/types/Coin";
import { getCoinByID, getUpdatedCoins } from "@/utils/cryptoAPI";
import CoinSearch from "@/components/CoinSearch";
import "@/styles/App.css";

interface AppProps {
  dropdownCoins: DropdownCoin[];
  initError: string | null;
}

export default function App({ dropdownCoins, initError }: AppProps) {
  const [selectedCoins, setSelectedCoins] = useState<Coin[]>([]);
  const [error, setError] = useState<string | null>(initError);
  const selectedCoinsRef = useRef(selectedCoins);

  const showError = (err: string | null) => {
    if (!err) {
      return;
    }
    console.error(err);
    setError(err);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (error) {
      timeoutId = setTimeout(() => {
        setError(null);
      }, 5000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [error]);

  const addCoin = (coinId: string) => {
    if (!coinId || selectedCoins.some((coin) => coin.id === coinId)) {
      return;
    }

    getCoinByID(coinId)
      .then((coin) => {
        setSelectedCoins([...selectedCoins, coin]);
      })
      .catch((error) => {
        console.error(error);
        showError(error.message);
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
        showError(error.message);
      });
  };

  useEffect(() => {
    showError(initError);
    updateCoins();
    const intervalId = setInterval(updateCoins, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const storedValue = localStorage.getItem("selectedCoins");
    setSelectedCoins(storedValue ? JSON.parse(storedValue) : []);
  }, []);

  useEffect(() => {
    selectedCoinsRef.current = selectedCoins;
    localStorage.setItem("selectedCoins", JSON.stringify(selectedCoins));
  }, [selectedCoins]);

  return (
    <>
      <h1 className="title">Cypto Currency Price Tracker</h1>
      {error && <p className="error-message">{error}</p>}

      <CoinSearch addCoin={addCoin} showError={showError} />

      <CoinDropdown
        dropdownCoins={dropdownCoins}
        selectedCoins={selectedCoins}
        addCoin={addCoin}
      />

      <div className="coin-container">
        {selectedCoins.map((coin) => (
          <CoinDisplay key={coin.id} coin={coin} removeCoin={removeCoin} />
        ))}
      </div>
    </>
  );
}
