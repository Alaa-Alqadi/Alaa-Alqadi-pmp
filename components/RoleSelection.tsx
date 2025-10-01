import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import LanguageSwitcher from './LanguageSwitcher';

interface RoleSelectionProps {
  onSelectRole: (role: 'team' | 'client') => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="absolute top-4 end-4">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-2">FIS-PMP</h1>
        <h2 className="text-xl text-slate-300 mb-8">{t('role_selection_title')}</h2>
        <p className="text-slate-400 mb-8">{t('select_role_prompt')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onSelectRole('team')}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105"
          >
            {t('team_member')}
          </button>
          <button
            onClick={() => onSelectRole('client')}
            className="w-full sm:w-auto px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105"
          >
            {t('client')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;