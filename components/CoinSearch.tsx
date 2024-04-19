import { useState } from "react";
import { searchCoin } from "@/utils/cryptoAPI";

interface CoinSearchProps {
  addCoin: (coinId: string) => void;
  setError: (error: string | null) => void;
}

export default function CoinSearch({ addCoin, setError }: CoinSearchProps) {
  const [coinId, setCoinId] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoinId(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!coinId) {
      setError("Please enter a coin ID");
      return;
    }

    searchCoin(coinId)
      .then((coinId) => {
        if (!coinId) {
          console.error("Coin not found");
          return;
        }
        addCoin(coinId);
        setCoinId("");
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={coinId}
        onChange={handleChange}
        placeholder="Enter a coin ID"
      />
      <button type="submit">Add Coin</button>
    </form>
  );
}
