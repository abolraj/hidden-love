import { Languages } from 'lucide-react';
import { type Language, languages } from '../i18n';

interface LanguageSwitchProps {
    lang: Language;
    onChange: (lang: Language) => void;
}

export default function LanguageSwitch({ lang, onChange }: LanguageSwitchProps) {
    const currentLang = languages.find(l => l.code === lang);

    return (
        <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost h-auto gap-2 flex max-sm:flex-col">
                <Languages className="size-6" />
                <p>
                    {currentLang?.label}
                </p>
            </button>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-40 mt-1">
                {languages.map((language) => (
                    <li key={language.code}>
                        <button
                            onClick={() => onChange(language.code)}
                            className={lang === language.code ? 'active' : ''}
                        >
                            {language.flag} {language.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}