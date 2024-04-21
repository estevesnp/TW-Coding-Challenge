import { useEffect, useState } from "react";
import { convertTimestamp, formatPrice } from "@/utils/helpers";
import { getCoinHistory } from "@/utils/cryptoAPI";
import { Coin, CoinHistory } from "@/types";
import "chartjs-plugin-annotation";
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
import Annotation from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Annotation
);

interface CoinChartProps {
  coin: Coin;
  handleFetchError: () => void;
}

export default function CoinChart({ coin, handleFetchError }: CoinChartProps) {
  const [coinHistory, setCoinHistory] = useState<CoinHistory | null>(null);

  useEffect(() => {
    console.log(`Fetching coin history for ${coin.id}`);
    getCoinHistory(coin.id)
      .then((history) => {
        setCoinHistory(history);
      })
      .catch((error) => {
        console.error(error);
        handleFetchError();
      });
  }, [coin]); // eslint-disable-line react-hooks/exhaustive-deps

  const prices = coinHistory?.prices || [];
  const timestampsUTC = coinHistory?.timestamps.map(convertTimestamp) || [];

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const minPriceIndex = prices.indexOf(minPrice);
  const minPriceTimestamp = timestampsUTC[minPriceIndex];

  const maxPriceIndex = prices.indexOf(maxPrice);
  const maxPriceTimestamp = timestampsUTC[maxPriceIndex];

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
        text: `${coin.name} Price Chart`,
        color: "black",
        font: {
          size: 20,
        },
      },
      annotation: {
        annotations: [
          {
            type: "line" as const,
            scaleID: "x",
            value: minPriceTimestamp,
            borderColor: "orange",
            borderWidth: 2,
            label: {
              content: `Min: ${formatPrice(
                minPrice,
                3
              )} at ${minPriceTimestamp}`,
              enabled: true,
              position: "end" as const,
              display: true,
            },
          },
          {
            type: "line" as const,
            scaleID: "x",
            value: maxPriceTimestamp,
            borderColor: "green",
            borderWidth: 2,
            label: {
              content: `Max: ${formatPrice(
                maxPrice,
                3
              )} at ${maxPriceTimestamp}`,
              enabled: true,
              position: "start" as const,
              display: true,
            },
          },
        ],
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
