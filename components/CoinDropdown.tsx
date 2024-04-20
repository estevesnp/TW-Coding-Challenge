import { useState } from "react";

import { Coin, DropdownCoin } from "@/types/Coin";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import "@/styles/CoinDropdown.css";

interface CoinDropdownProps {
  dropdownCoins: DropdownCoin[];
  selectedCoins: Coin[];
  addCoin: (coinId: string) => void;
}

export default function CoinDropdown({
  dropdownCoins,
  selectedCoins,
  addCoin,
}: CoinDropdownProps) {
  const [key, setKey] = useState("");

  const handleChange = (e: SelectChangeEvent<string>) => {
    // closes the dropdown after selecting a coin
    setKey((prevKey) => (prevKey ? "" : "key"));

    if (
      !e.target.value ||
      selectedCoins.some((coin) => coin.id === e.target.value)
    ) {
      return;
    }

    addCoin(e.target.value);
    console.log("[" + e.target.value + "]");
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }} key={key}>
      <InputLabel className="input-label">Select a coin to add</InputLabel>
      <Select value="" label="Select a coin to add" onChange={handleChange}>
        {dropdownCoins.map((coinName) => (
          <MenuItem key={coinName.id} value={coinName.id}>
            {coinName.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
