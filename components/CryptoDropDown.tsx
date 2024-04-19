import { Crypto } from '@/types';

interface CryptoDropDownProps {
    cryptos: Crypto[];
    selectedCrypto: Crypto | null;
    setSelectedCrypto: (crypto: Crypto) => void;
}

export default function CryptoDropDown({
    cryptos,
    selectedCrypto,
    setSelectedCrypto,
}: CryptoDropDownProps) {
    return (
        <select
            value={selectedCrypto ? selectedCrypto.id : ''}
            onChange={(e) => {
                const selectedCrypto = cryptos.find(
                    (crypto) => crypto.id === e.target.value
                );
                if (selectedCrypto) {
                    setSelectedCrypto(selectedCrypto);
                }
            }}
        >
            <option value="">Select a Crypto</option>
            {cryptos.map((crypto) => (
                <option key={crypto.id} value={crypto.id}>
                    {crypto.name}
                </option>
            ))}
        </select>
    );
}

