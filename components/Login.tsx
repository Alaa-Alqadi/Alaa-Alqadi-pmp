import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { ALLOWED_EMAILS } from '../constants';
import { TranslationKey } from '../translations';

interface LoginProps {
  onLogin: (email: string) => void;
  onBack: () => void;
  checkPassword: (password: string) => boolean;
}

const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>;
const EyeSlashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243L6.228 6.228" /></svg>;


const Login: React.FC<LoginProps> = ({ onLogin, onBack, checkPassword }) => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<TranslationKey | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ALLOWED_EMAILS.includes(email.toLowerCase()) && checkPassword(password)) {
      setError('');
      onLogin(email);
    } else {
      setError('login_error');
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
       <div className="w-full max-w-sm">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">FIS-PMP</h1>
            <h2 className="text-xl text-slate-300 mt-2">{t('login_title')}</h2>
        </div>
        <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-lg shadow-lg space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">{t('email')}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password">{t('password')}</label>
            <div className="relative">
                <input
                id="password"
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute inset-y-0 end-0 flex items-center pe-3 text-slate-400 hover:text-white"
                    aria-label={t(isPasswordVisible ? 'hide_password' : 'show_password')}
                >
                    {isPasswordVisible ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
            </div>
          </div>
          {error && <p className="text-red-400 text-sm">{t(error)}</p>}
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold">
            {t('login')}
          </button>
        </form>
        <button onClick={onBack} className="mt-4 text-sm text-slate-400 hover:text-white">
          {language === 'en' ? '←' : '→'} {t('back_to_role_selection')}
        </button>
      </div>
    </div>
  );
};

export default Login;