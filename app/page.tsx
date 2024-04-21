import App from "./App";
import { Coin } from "@/types";
import { getTopCoins } from "@/utils/cryptoAPI";

export default async function Page() {
  const coinNames: Coin[] = [];
  let initError: string | null = null;

  try {
    coinNames.push(...(await getTopCoins()));
  } catch (error) {
    console.error(error);
    initError = "Failed to connect to the API, please try again later.";
  }

  return <App dropdownCoins={coinNames} initError={initError} />;
}
