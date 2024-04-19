import { Crypto } from '@/types';
import { getCryptos } from '@/utils/cryptoAPI';

interface FetchButtonProps {
    setCryptos: (cryptos: Crypto[]) => void;
    setError: (error: string) => void;
}

export default function FetchButton({ setCryptos, setError }: FetchButtonProps) {

    const fetchCryptos = async () => {
        try {
            const cryptos = await getCryptos();
            setCryptos(cryptos);
        } catch (error: any) {
            setError(error.message);
        }
    }


    return (
        <button onClick={fetchCryptos}>Fetch Cryptos</button>
    )
}
