import { useState } from 'react';
import { Lock, Copy, Check, Loader, Eye, EyeOff, WandSparkles } from 'lucide-react';
import { useEncryption } from '../hooks/useEncryption';
import { useTranslation } from 'react-i18next';

export default function EncryptPage() {
    const { t } = useTranslation();
    const [header, setHeader] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [copied, setCopied] = useState(false);

    const { encryptedMessage, isEncrypting, error, encrypt, resetEncryption } = useEncryption();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;
        encrypt(header, message, password);
    };

    const handleCopy = async () => {
        if (encryptedMessage) {
            await navigator.clipboard.writeText(encryptedMessage);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleGenerateFakeHeader = () => {
        const idx = Math.floor(Math.random() * 20) + 1;
        setHeader(t('fake_ads.' + idx));
    };

    const handleReset = () => {
        setHeader('');
        setMessage('');
        setPassword('');
        resetEncryption();
    };

    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body gap-6">
                <h2 className="card-title text-2xl mx-auto text-error">
                    <Lock className="w-6 h-6" />
                    {t('encrypt_your_text')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className=" flex flex-col" htmlFor='header'>
                        <div className='mb-2 flex'>
                            <span className="label-text text-lg grow">{t('header_optional')}</span>
                            <button onClick={handleGenerateFakeHeader} type='button' className='btn btn-ghost btn-square h-auto'>
                                <WandSparkles className='size-4' />
                            </button>
                        </div>
                        <textarea
                            id='header'
                            placeholder={t('fake_advertising_placeholder')}
                            className="textarea texarea-bordered w-full"
                            value={header}
                            onChange={(e) => setHeader(e.target.value)}
                            disabled={isEncrypting}
                        />
                        <span className="text-info w-full">{t('fake_ads_hint')}</span>
                    </label>

                    <label className="form-control flex flex-col" htmlFor='message'>
                        <span className="label-text text-lg mb-2">{t('message_required')}</span>
                        <textarea
                            id='message'
                            placeholder={t('write_secret_message')}
                            className="textarea textarea-bordered w-full"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            disabled={isEncrypting}
                        />
                        <span className="text-info w-full">{t('encrypt_as_fake_link_hint')}</span>
                    </label>

                    <label className="form-control flex flex-col" htmlFor='password'>
                        <span className="label-text text-lg mb-2">{t('password_optional')}</span>
                        <div className="relative">
                            <input
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                placeholder={t('add_extra_security')}
                                className="input input-bordered w-full pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isEncrypting}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
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
                            className="btn btn-error flex-1"
                            disabled={isEncrypting || !message.trim()}
                        >
                            {isEncrypting ? (
                                <Loader className="w-5 h-5 animate-spin" />
                            ) : (
                                <Lock className="w-5 h-5" />
                            )}
                            {isEncrypting ? t('encrypting') : t('encrypt')}
                        </button>

                        {(encryptedMessage || message) && (
                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={handleReset}
                                disabled={isEncrypting}
                            >
                                {t('clear')}
                            </button>
                        )}
                    </div>
                </form>

                {encryptedMessage && (
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold">{t('your_secret_message')}</span>
                            <button onClick={handleCopy} className="btn btn-ghost btn-sm gap-1">
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 text-success" />
                                        {t('copied')}
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        {t('copy')}
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="bg-base-300 rounded-box p-3">
                            <p className="text-xs break-all whitespace-pre-line font-mono">{encryptedMessage}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}