import { useState, useCallback } from 'react';
import { decompressText } from '../utils/compression';
import { simpleCipher } from '../utils/cipher';


interface UseDecryptionReturn {
    decryptedData: string | null;
    isDecrypting: boolean;
    error: string | null;
    decrypt: (secret: string, password: string) => void;
    resetDecryption: () => void;
}

export function useDecryption(): UseDecryptionReturn {
    const [decryptedData, setDecryptedData] = useState<string | null>(null);
    const [isDecrypting, setIsDecrypting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const decrypt = useCallback((secret: string, password: string) => {
        setIsDecrypting(true);
        setError(null);
        setDecryptedData(null);

        try {
            const linksRegEx = /https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\?q=[^&\s]+/g;
            const links = secret.match(linksRegEx);
            const link = links ? links[links.length - 1] : '';
            const url = new URL(link);
            const encodedData = url.searchParams.get('q');

            if (!encodedData) {
                throw new Error('No encrypted data found in URL');
            }

            let decoded = decodeURIComponent(escape(atob(encodedData)));

            if (password) {
                decoded = simpleCipher(decoded, password, false);
            }

            decoded = decompressText(decoded);

            setDecryptedData(decoded);
        } catch (err) {
            setError('Invalid format or wrong password. Please check your secret URL.');
            console.error('Decryption error:', err);
        } finally {
            setIsDecrypting(false);
        }
    }, []);

    const resetDecryption = useCallback(() => {
        setDecryptedData(null);
        setError(null);
        setIsDecrypting(false);
    }, []);

    return {
        decryptedData,
        isDecrypting,
        error,
        decrypt,
        resetDecryption
    };
}