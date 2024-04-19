import { Crypto } from '@/types';
import styles from '@/styles/DisplayCrypto.module.css';

interface CryptoDropDownProps {
    selectedCrypto: Crypto | null;
}

export default function DisplayCrypto({
    selectedCrypto,
}: CryptoDropDownProps) {
    return (
        <div>
            {selectedCrypto && (
                <div className={styles.card}>
                    <h2 className={styles.title}>{selectedCrypto.name}</h2>
                    <p>{selectedCrypto.symbol}</p>
                    <p className={styles.price}>Price: ${selectedCrypto.priceUsd}</p>
                </div>

            )}
        </div>
    );
}
