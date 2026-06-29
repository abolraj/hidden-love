import { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import EncryptPage from './pages/EncryptPage';
import DecryptPage from './pages/DecryptPage';
import MainLayout from './layouts/MainLayout';
import LanguageSwitch from './components/LanguageSwitch';
import { useTranslation } from 'react-i18next';
import { useLang } from './hooks/useLang';

function App() {
  const [activeTab, setActiveTab] = useState<'encrypt' | 'decrypt'>('encrypt');
  const { i18n, t } = useTranslation();
  const { lang, changeLang } = useLang();

  const handleChangeLanguage = (lang: string) => {
    console.log('lang:', lang);
    i18n.changeLanguage(lang);
    changeLang(lang);
  };

  return (
    <MainLayout>
      <div className="max-w-lg mx-auto">
        <div className='max-sm:h-20 flex flex-nowrap' dir='ltr'>
          <div className="tabs tabs-boxed mb-8 flex-nowrap justify-center grow w-20">
            <button
              className={`tab gap-2 h-auto ${activeTab === 'encrypt' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('encrypt')}
            >
              <Lock className="size-6" />
              <p>
                {t('encrypt')}
              </p>
            </button>
            <button
              className={`tab gap-2 h-auto ${activeTab === 'decrypt' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('decrypt')}
            >
              <Unlock className="size-6" />
              <p>
                {t('encrypt')}
              </p>
            </button>
          </div>

          <div className='grow text-right '>
            <LanguageSwitch lang={lang} onChange={handleChangeLanguage} />
          </div>
        </div>

        {activeTab === 'encrypt' ? <EncryptPage /> : <DecryptPage />}
      </div>
    </MainLayout>
  );
}

export default App;