import { useState } from "react";
import { searchCoin } from "@/utils/cryptoAPI";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "@/styles/CoinSearch.css";

interface CoinSearchProps {
  addCoin: (coinId: string) => void;
  showError: (error: string | null) => void;
}

export default function CoinSearch({ addCoin, showError }: CoinSearchProps) {
  const [coinId, setCoinId] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoinId(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!coinId) {
      showError("Please enter a coin ID");
      return;
    }

    searchCoin(coinId)
      .then((coinId) => {
        addCoin(coinId);
        setCoinId("");
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="search"
        value={coinId}
        onChange={handleChange}
        label="Search for a coin"
        variant="outlined"
        size="small"
        className="text-field"
      />
      <Button variant="outlined" size="small" type="submit" className="button">
        Add Coin
      </Button>
    </form>
  );
}
