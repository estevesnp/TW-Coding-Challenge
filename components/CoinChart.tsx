import { useEffect, useState } from "react";
import { Coin, CoinHistory } from "@/types";
import { getCoinHistory } from "@/utils/cryptoAPI";
import { convertTimestamp } from "@/utils/helpers";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CoinChartProps {
  coin: Coin;
}

export default function CoinChart({ coin }: CoinChartProps) {
  const [coinHistory, setCoinHistory] = useState<CoinHistory | null>(null);

  useEffect(() => {
    console.log("Fetching coin history for", coin.id);
    getCoinHistory(coin.id).then((history) => {
      setCoinHistory(history);
    });
  }, [coin]);

  const prices = coinHistory?.prices || [];
  const timestampsUTC = coinHistory?.timestamps.map(convertTimestamp) || [];

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time UTC",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price USD",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Price Chart for ${coin.name}`,
        color: "black",
        font: {
          size: 20,
        },
      },
    },
  };

  const data = {
    labels: timestampsUTC,
    datasets: [
      {
        data: prices,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
