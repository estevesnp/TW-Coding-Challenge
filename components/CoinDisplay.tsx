import { Coin } from "@/types/Coin";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "@/styles/CoinDisplay.css";

interface CoinDisplayProps {
  coin: Coin;
  removeCoin: (coinId: string) => void;
}

export default function CoinDisplay({ coin, removeCoin }: CoinDisplayProps) {
  return (
    <Card variant="outlined" className="coin-card">
      <CardContent>
        <Typography variant="h5" component="h2" className="coin-name">
          {coin.name}
        </Typography>
        <Typography className="coin-symbol">{coin.symbol}</Typography>
        <Typography className="coin-price">Price: ${coin.priceUsd}</Typography>
        <Typography className="coin-marketcap">
          Market Cap: ${coin.marketCapUsd}
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={() => removeCoin(coin.id)}
          className="remove-button"
        >
          Remove
        </Button>
        <Button variant="contained" size="small" className="chart-button">
          Chart
        </Button>
      </CardContent>
    </Card>
  );
}
