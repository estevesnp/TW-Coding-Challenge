import { useEffect, useState } from 'react';
import { Crypto } from '@/types';
import { getTopCryptoNames } from '@/utils/cryptoAPI';

interface CryptoDropDownProps {
    dropdownCryptos: string[];
    selectedCryptos: string[];
    setSelectedCryptos: (cryptos: string[]) => void;
}

export default async function CryptoDropDown({
    dropdownCryptos,
    selectedCryptos: selectedCrypto,
    setSelectedCryptos: setSelectedCrypto,
}: CryptoDropDownProps) {

    return (

        <div>

            <select
                multiple
                value={selectedCrypto}
                onChange={(event) => setSelectedCrypto([])}
            >
                <option value="">Select a crypto</option>
                {dropdownCryptos.map((cryptoName) => (
                    <option key={cryptoName} value={cryptoName}>
                        {cryptoName}
                    </option>
                ))}
            </select>

        </div>
    );
}

