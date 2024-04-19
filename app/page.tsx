import App from './App'
import { getTopCryptoNames } from '@/utils/cryptoAPI';

export default async function Home() {

    const dropdownCryptos: string[] = [];

    try {
        const response = await getTopCryptoNames();

        dropdownCryptos.push(...response);
    } catch (error) {
        console.error(error);
    }


    return (
        <App dropdownCryptos={dropdownCryptos} />
    )
}
