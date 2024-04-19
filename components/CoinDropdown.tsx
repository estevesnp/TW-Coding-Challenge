import { useState } from "react";
import { Coin, DropdownCoin } from "@/types/Coin";

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
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (
      !e.target.value ||
      selectedCoins.some((coin) => coin.id === e.target.value)
    ) {
      return;
    }

    addCoin(e.target.value);
    setSelectedValue("");
    console.log("[" + e.target.value + "]");
  };

  return (
    <select value={selectedValue} onChange={handleChange}>
      <option value="">Select a coin to add</option>
      {dropdownCoins.map((coinName) => (
        <option key={coinName.id} value={coinName.id}>
          {coinName.name}
        </option>
      ))}
    </select>
  );
}
