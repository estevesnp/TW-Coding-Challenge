'use client';

import { useState, useEffect } from 'react';
import { Crypto } from '@/types';
import CryptoDropDown from '@/components/CryptoDropDown';
import DisplayCrypto from '@/components/DisplayCrypto';
import { getTopCryptoNames } from '@/utils/cryptoAPI';


interface AppProps {
    dropdownCryptos: string[];
}

export default function App({ dropdownCryptos }: AppProps) {
    const [dropDownCryptos, setDropDownCryptos] = useState<string[]>([]);
    const [selectedCryptos, setSelectedCryptos] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);



    return (
        <>
            <h1>Crypto Currency Price Tracker</h1>
            {error && <p className='error-msg'>{error}</p>}

            <CryptoDropDown
                dropdownCryptos={dropdownCryptos}
                selectedCryptos={selectedCryptos}
                setSelectedCryptos={setSelectedCryptos}
            />




        </>
    )
}

