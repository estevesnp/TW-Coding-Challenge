import { use, useEffect, useState } from "react";
import { CoinHistory } from "@/types";
import { getCoinHistory } from "@/utils/cryptoAPI";
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
import { get } from "http";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

function convertTimestamp(timestamp: number): string {
  // Convert the timestamp to milliseconds
  const date = new Date(timestamp);

  // Get the day, hours, and minutes
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes().toString().padStart(2, "0");

  // Format the date as dd,hh,mm
  return `${hh}:${mm}`;
}

interface CoinChartProps {
  coinId: string;
}

export default function CoinChart({ coinId }: CoinChartProps) {
  const [coinHistory, setCoinHistory] = useState<CoinHistory | null>(null);

  useEffect(() => {
    console.log("Fetching coin history for", coinId);
    getCoinHistory(coinId).then((history) => {
      setCoinHistory(history);
    });
  }, [coinId]);

  const data = {
    labels: coinHistory?.timestamps.map(convertTimestamp) || [],
    datasets: [
      {
        label: "Price USD",
        data: coinHistory?.prices || [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
