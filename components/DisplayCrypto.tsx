import { Crypto } from '@/types';

interface CryptoDropDownProps {
    selectedCrypto: Crypto | null;
}

export default function DisplayCrypto({
    selectedCrypto,
}: CryptoDropDownProps) {
    return (
        <div>
            {selectedCrypto && (
                <div>
                    <h2>{selectedCrypto.name}</h2>
                    <p>{selectedCrypto.symbol}</p>
                    <p>Price: ${selectedCrypto.priceUsd}</p>
                </div>

            )}
        </div>
    );
}
