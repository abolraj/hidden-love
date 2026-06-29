import { type ReactNode } from 'react';
import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-base-100">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold flex items-center justify-center gap-3 mb-2">
                        <Heart className="w-10 h-10 text-error fill-error" />
                        <span className="bg-gradient-to-r from-error to-primary bg-clip-text text-transparent">
                            {t('hidden_love')}
                        </span>
                        <Heart className="w-10 h-10 text-error fill-error" />
                    </h1>
                    <p className="text-base-content/60 text-lg">
                        {t('hide_secret_messages')}
                    </p>
                </header>

                <main>{children}</main>

                <footer className="text-center mt-12 text-base-content/40 text-sm">
                    <p className='whitespace-pre-line'>
                        {t('made_with')}
                        <Heart className="w-4 h-4 text-error fill-error inline mx-1" />
                        {t('by')}
                        <a href="https://abolfazlrajaee.ir" className='link link-info px-2'>
                            &nbsp;{t('abolfazl')}&nbsp;
                        </a>
                        { t('for_secret_lovers')}
                    </p>
                </footer>
            </div>
        </div>
    );
}