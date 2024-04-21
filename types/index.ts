export interface Coin {
  id: string;
  symbol: string;
  name: string;
  priceUsd: number;
  marketCapUsd: number;
  updatedAt: number;
}

// Coin information for the chart
export interface CoinHistory {
  timestamps: number[];
  prices: number[];
}
