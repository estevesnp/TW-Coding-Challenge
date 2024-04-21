import { useState } from "react";
import { Coin } from "@/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CoinChart from "@/components/CoinChart";
import Box from "@mui/material/Box";
import "@/styles/CoinDisplay.css";

interface CoinDisplayProps {
  coin: Coin;
  removeCoin: (coinId: string) => void;
}

export default function CoinDisplay({ coin, removeCoin }: CoinDisplayProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <CoinChart coin={coin} />
        </Box>
      </Dialog>
    </Card>
  );
}
