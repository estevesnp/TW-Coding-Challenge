import { Crypto } from '@/types';

export async function getCryptos() {

    console.log('Fetching cryptos')

    const response = await fetch('https://api.coincap.io/v2/assets');

    if (!response.ok) {
        console.log('Failed to fetch cryptos');
        throw new Error('Failed to fetch cryptos');
    }

    const data = await response.json();

    const cryptoList: Crypto[] = [];

    for (const crypto of data.data) {
        cryptoList.push({
            id: crypto.id,
            rank: crypto.rank,
            symbol: crypto.symbol,
            name: crypto.name,
            priceUsd: crypto.priceUsd,
        });
    }

    return cryptoList;
}
