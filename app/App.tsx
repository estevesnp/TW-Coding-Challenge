'use client';

import { useState } from 'react';
import { Crypto } from '@/types';
import FetchButton from '@/components/FetchButton';
import CryptoDropDown from '@/components/CryptoDropDown';
import DisplayCrypto from '@/components/DisplayCrypto';

export default function App() {
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
    const [error, setError] = useState<string | null>(null);

    return (
        <>
            <FetchButton setCryptos={setCryptos} setError={setError} />

            <h1>Crypto Currency Price Tracker</h1>
            {error && <p>{error}</p>}

            <CryptoDropDown cryptos={cryptos} selectedCrypto={selectedCrypto} setSelectedCrypto={setSelectedCrypto} />

            <DisplayCrypto selectedCrypto={selectedCrypto} />
        </>
    )
}

