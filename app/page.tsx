import App from "./App";
import { DropdownCoin } from "@/types/Coin";
import { getTopCoins } from "@/utils/cryptoAPI";

export default async function Page() {
  const coinNames: DropdownCoin[] = [];
  let initError: string | null = null;

  try {
    coinNames.push(...(await getTopCoins()));
  } catch (error) {
    console.error(error);
    initError = "Failed to connect to the API, please try again later.";
  }

  return <App dropdownCoins={coinNames} initError={initError} />;
}
