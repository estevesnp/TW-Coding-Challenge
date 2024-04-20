import { Coin, DropdownCoin } from "@/types/Coin";

const API_URL = "https://api.coingecko.com/api/v3";

export async function getTopCoins(): Promise<DropdownCoin[]> {
  const response = await fetch(
    `${API_URL}/coins/markets?vs_currency=usd&per_page=10`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top coins");
  }

  const data = await response.json();

  const l = data.map((crypto: any) => {
    name: crypto.name;
    id: crypto.id;
  });

  return data.map((crypto: any) => ({
    name: crypto.name,
    id: crypto.id,
  }));
}

export async function getCoinByID(id: string): Promise<Coin> {
  const response = await fetch(`${API_URL}/coins/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch coin");
  }

  const data = await response.json();

  return {
    id: data.id,
    symbol: data.symbol,
    name: data.name,
    priceUsd: data.market_data.current_price.usd,
    marketCapUsd: data.market_data.market_cap.usd,
  };
}

export async function searchCoin(name: string): Promise<string> {
  const response = await fetch(`${API_URL}/search?query=${name}`);

  if (!response.ok) {
    throw new Error("Failed to search for coin");
  }

  const data = await response.json();

  if (data.coins.length === 0) {
    throw new Error("Coin not found");
  }

  return data.coins[0].id;
}

export async function getUpdatedCoins(coins: Coin[]): Promise<Coin[]> {
  const coinIds: string[] = coins.map((coin) => coin.id);

  const response = await fetch(
    `${API_URL}/coins/markets?vs_currency=usd&ids=${coinIds.join(",")}`
  );

  if (!response.ok) {
    throw new Error("Failed to update coins");
  }

  const data = await response.json();

  const returnedCoins: Coin[] = data.map((crypto: any) => ({
    id: crypto.id,
    symbol: crypto.symbol,
    name: crypto.name,
    priceUsd: crypto.current_price,
    marketCapUsd: crypto.market_cap,
  }));

  const updatedCoins = coins.map((coin) => {
    const updatedCoin = returnedCoins.find((c) => c.id === coin.id);

    if (!updatedCoin) {
      return coin;
    }

    return updatedCoin;
  });

  return updatedCoins;
}
