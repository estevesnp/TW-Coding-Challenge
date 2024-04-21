export interface Coin {
  id: string;
  symbol: string;
  name: string;
  priceUsd: number;
  marketCapUsd: number;
  updatedAt: number;
}

// Information necessary to display a coin in the dropdown
export interface DropdownCoin {
  name: string;
  id: string;
}

// Coin information for the chart
export interface CoinHistory {
  timestamps: number[];
  prices: number[];
}
