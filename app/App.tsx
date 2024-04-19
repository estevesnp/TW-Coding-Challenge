"use client";

import { useState } from 'react';
import { Crypto } from '@/types';
import { getCryptos } from '@/utils/cryptoAPI';

const initCryptos: Crypto[] = [];


(async () => {
    try {
        const data = await getCryptos();
        initCryptos.push(...data);
    } catch (error: any) {
        console.error(error);
    }
})()


export default function App() {
    const [cryptos, setCryptos] = useState<Crypto[]>(initCryptos);
    const [error, setError] = useState<string | null>(null);

    return (
        <>
            <h1>Crypto Currency Price Tracker</h1>
            {error && <p>{error}</p>}
            <ul>
                {cryptos.map(crypto => (
                    <li key={crypto.id}>
                        {crypto.name} - {crypto.symbol} - ${crypto.priceUsd}
                    </li>
                ))}
            </ul>



        </>
    )
}

