import { useState, useCallback } from 'react';
import { sanitizeText, compressText, generateEncryptedUrl } from '../utils/compression';
import { simpleCipher } from '../utils/cipher';

interface UseEncryptionReturn {
    encryptedMessage: string | null;
    isEncrypting: boolean;
    error: string | null;
    encrypt: (header: string, message: string, password: string) => void;
    resetEncryption: () => void;
}

export function useEncryption(): UseEncryptionReturn {
    const [encryptedMessage, setEncryptedMessage] = useState<string | null>(null);
    const [isEncrypting, setIsEncrypting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const encrypt = useCallback((header: string, message: string, password: string) => {
        setIsEncrypting(true);
        setError(null);
        setEncryptedMessage(null);

        try {
            let text = sanitizeText(message);

            text = compressText(text);

            if (password) {
                text = simpleCipher(text, password, true);
            }

            const encoded = btoa(unescape(encodeURIComponent(text)));

            const url = generateEncryptedUrl(encoded);

            const result = header + '\n\n' + url;
            setEncryptedMessage(result);
        } catch (err) {
            setError('Encryption failed. Please try again.');
            console.error('Encryption error:', err);
        } finally {
            setIsEncrypting(false);
        }
    }, []);

    const resetEncryption = useCallback(() => {
        setEncryptedMessage(null);
        setError(null);
        setIsEncrypting(false);
    }, []);

    return {
        encryptedMessage,
        isEncrypting,
        error,
        encrypt,
        resetEncryption
    };
}