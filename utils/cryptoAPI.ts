import { Crypto } from '@/types';

const API_URL = 'https://api.coingecko.com/api/v3';

export async function getTopCryptoNames(): Promise<string[]> {
    const response = await fetch(`${API_URL}/coins/markets?vs_currency=usd&per_page=10`);

    if (!response.ok) {
        throw new Error('Failed to fetch top cryptos');
    }

    const data = await response.json();

    return data.map((crypto: any) => crypto.name);
}

export async function getCryptoByID(id: string): Promise<Crypto> {
    const response = await fetch(`${API_URL}/coins/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch crypto');
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

export async function searchCrypto(name: string): Promise<string> {
    const response = await fetch(`${API_URL}/search?query=${name}`);

    if (!response.ok) {
        throw new Error('Failed to search for crypto');
    }

    const data = await response.json();

    if (data.coins.length === 0) {
        throw new Error('Crypto not found');
    }

    return data.coins[0].id;
}
