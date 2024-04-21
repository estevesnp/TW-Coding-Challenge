import { useState } from "react";
import { stringToColor, formatPrice } from "@/utils/helpers";
import { Coin } from "@/types";
import CoinChart from "@/components/CoinChart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import "@/styles/CoinDisplay.css";

interface CoinDisplayProps {
  coin: Coin;
  removeCoin: (coinId: string) => void;
  showError: (err: string | null) => void;
}

export default function CoinDisplay({
  coin,
  removeCoin,
  showError,
}: CoinDisplayProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      variant="outlined"
      className="coin-card"
      style={{ backgroundColor: stringToColor(coin.name) }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" className="coin-name">
          {coin.name}
        </Typography>
        <Typography className="coin-symbol">{coin.symbol}</Typography>
        <Typography className="coin-price">
          Price: {formatPrice(coin.priceUsd)}
        </Typography>
        <Typography className="coin-market-cap">
          Market Cap: {formatPrice(coin.marketCapUsd)}
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={() => removeCoin(coin.id)}
          className="remove-button"
        >
          Remove
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleOpen}
          className="chart-button"
        >
          Chart
        </Button>
      </CardContent>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <Box p={3}>
          <CoinChart coin={coin} showError={showError} />
        </Box>
      </Dialog>
    </Card>
  );
}
