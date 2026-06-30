import { useState } from 'react';
import { Unlock, Loader, Eye, EyeOff, Heart } from 'lucide-react';
import { useDecryption } from '../hooks/useDecryption';
import { useTranslation } from 'react-i18next';

export default function DecryptPage() {
    const { t } = useTranslation();
    const [secret, setSecret] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { decryptedData, isDecrypting, error, decrypt, resetDecryption } = useDecryption();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!secret.trim()) return;
        decrypt(secret, password);
    };

    const handleReset = () => {
        setSecret('');
        setPassword('');
        resetDecryption();
    };

    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body gap-6">
                <h2 className="card-title text-2xl mx-auto text-primary">
                    <Unlock className="w-6 h-6" />
                    {t('decrypt_your_hidden_text')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="form-control flex flex-col">
                        <span className="label-text text-lg mb-2">{t('secret_required')}</span>
                        <textarea
                            placeholder={t('paste_encrypted_text')}
                            className="textarea textarea-bordered w-full text-sm"
                            value={secret}
                            onChange={(e) => setSecret(e.target.value)}
                            required
                            disabled={isDecrypting}
                        />
                        <span className="text-info w-full">{t('encrypted_message_hint')}</span>
                    </label>

                    <label className="form-control flex flex-col">
                        <span className="label-text text-lg mb-2">{t('password_if_used')}</span>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder={t('enter_password')}
                                className="input input-bordered w-full pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isDecrypting}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </label>

                    {error && (
                        <div className="alert alert-error">
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="btn btn-primary flex-1"
                            disabled={isDecrypting || !secret.trim()}
                        >
                            {isDecrypting ? (
                                <Loader className="w-5 h-5 animate-spin" />
                            ) : (
                                <Unlock className="w-5 h-5" />
                            )}
                            {isDecrypting ? t('decrypting') : t('decrypt')}
                        </button>

                        {(decryptedData || secret) && (
                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={handleReset}
                                disabled={isDecrypting}
                            >
                                {t('clear')}
                            </button>
                        )}
                    </div>
                </form>

                {decryptedData && (
                    <div className="space-y-3 pt-2">
                        <div className="bg-base-300 rounded-box p-4">
                            <span className="text-xs font-semibold text-error uppercase">{t('message')}</span>
                            <p className="text-lg mt-1 whitespace-pre-line">{decryptedData}</p>
                        </div>

                        <div className="text-center pt-2">
                            <Heart className="w-6 h-6 text-error fill-error mx-auto" />
                        </div>
                    </div>
                )}

                {!decryptedData && !error && !isDecrypting && (
                    <div className="text-center text-base-content/40 py-8">
                        <Heart className="w-12 h-12 mx-auto mb-3 opacity-40" />
                        <p>{t('paste_encrypted_to_reveal')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}