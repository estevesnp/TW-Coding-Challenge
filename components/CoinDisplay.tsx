import { Coin } from "@/types/Coin";
import styles from "@/styles/CoinDisplay.module.css";

interface CoinDisplayProps {
  coin: Coin;
  removeCoin: (coinId: string) => void;
}

export default function CoinDisplay({ coin, removeCoin }: CoinDisplayProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{coin.name}</h2>
      <p className={styles.symbol}>{coin.symbol}</p>
      <p className={styles.price}>Price: ${coin.priceUsd}</p>
      <p className={styles.marketcap}>Market Cap: ${coin.marketCapUsd}</p>
      <button className={styles.remove} onClick={() => removeCoin(coin.id)}>
        Remove
      </button>
    </div>
  );
}
