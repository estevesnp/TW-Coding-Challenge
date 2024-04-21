"use client";

import { useState, useEffect, useRef } from "react";
import { getCoinByID, getUpdatedCoins } from "@/utils/cryptoAPI";
import { Coin, DropdownCoin } from "@/types";
import CoinDropdown from "@/components/CoinDropdown";
import CoinDisplay from "@/components/CoinDisplay";
import CoinSearch from "@/components/CoinSearch";
import "@/styles/App.css";

interface AppProps {
  dropdownCoins: DropdownCoin[];
  initError: string | null;
}

export default function App({ dropdownCoins, initError }: AppProps) {
  const [selectedCoins, setSelectedCoins] = useState<Coin[]>([]);
  const [error, setError] = useState<string | null>(initError);

  // Creates a ref to store and update the selectedCoins state
  const selectedCoinsRef = useRef(selectedCoins);

  // Shows error message
  const showError = (err: string | null) => {
    if (!err) {
      return;
    }
    setError(err);
  };

  // Removes the error message after 5 seconds after being displayed by showError()
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

  // Adds a coin to the selected coins
  const addCoin = (coinId: string) => {
    if (!coinId) {
      return;
    }

    if (selectedCoins.some((coin) => coin.id === coinId)) {
      showError("Coin already added");
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

  // Removes a coin from the selected coins
  const removeCoin = (coinId: string) => {
    setSelectedCoins(selectedCoins.filter((coin) => coin.id !== coinId));
  };

  // Updates the coins using the selectedCoinsRef
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

  // Shows the initial error message if present and starts the 1min interval to update the coins
  useEffect(() => {
    showError(initError);
    const intervalId = setInterval(updateCoins, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Loads the selected coins from the local storage
  useEffect(() => {
    const storedValue = localStorage.getItem("selectedCoins");
    setSelectedCoins(storedValue ? JSON.parse(storedValue) : []);
  }, []);

  // Updates the selected coins ref and stores them in the local storage
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
          <CoinDisplay
            key={coin.id}
            coin={coin}
            removeCoin={removeCoin}
            showError={showError}
          />
        ))}
      </div>
    </>
  );
}
