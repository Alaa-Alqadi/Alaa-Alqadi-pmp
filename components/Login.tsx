import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { LanguageIcon } from './icons/LanguageIcon';

interface LoginProps {
  onLogin: (email: string, password: string) => boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { language, setLanguage, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin(email, password);
    if (!success) {
      setError(t.loginError);
    }
  };
  
  const handleLanguageChange = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const commonInputClasses = "w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary";

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="relative w-full max-w-sm p-8 space-y-6 bg-slate-900 rounded-xl shadow-2xl border border-slate-800">
        <div className="absolute top-4 end-4">
            <button 
                onClick={handleLanguageChange}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                aria-label={`Switch to ${t.languageName}`}
                title={`Switch to ${t.languageName}`}
            >
                <LanguageIcon className="w-5 h-5" />
            </button>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">{t.loginTitle}</h1>
          <p className="mt-2 text-slate-400">{t.loginWelcome}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1 text-start">
              {t.loginEmailLabel}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={commonInputClasses}
              placeholder={t.loginEmailPlaceholder}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300 mb-1 text-start"
            >
              {t.loginPasswordLabel}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={commonInputClasses}
              placeholder={t.loginPasswordPlaceholder}
            />
          </div>
          
          {error && (
            <p className="text-sm text-red-400 text-center bg-red-900/50 p-2 rounded-md">{error}</p>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-secondary hover:bg-brand-secondary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-brand-primary transition-colors"
            >
              {t.loginButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;