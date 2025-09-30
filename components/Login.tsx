import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string, password: string) => boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin(email, password);
    if (!success) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    }
  };

  const commonInputClasses = "w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary";

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="w-full max-w-sm p-8 space-y-6 bg-slate-900 rounded-xl shadow-2xl border border-slate-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">FIS-PMP</h1>
          <p className="mt-2 text-slate-400">أهلاً بك، يرجى تسجيل الدخول للمتابعة</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
              البريد الإلكتروني
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
              placeholder="user@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              كلمة المرور
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
              placeholder="••••••••"
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
              تسجيل الدخول
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
