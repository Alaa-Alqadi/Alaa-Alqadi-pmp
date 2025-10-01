import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Client } from '../types';

interface ClientLoginProps {
  onLogin: (clientId: string, offerNumber: string) => boolean;
  onBack: () => void;
  clients: Client[];
}

const ClientLogin: React.FC<ClientLoginProps> = ({ onLogin, onBack, clients }) => {
  const { t, language } = useLanguage();
  const [offerNumber, setOfferNumber] = useState('');
  const [clientId, setClientId] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientId && offerNumber.trim()) {
        const success = onLogin(clientId, offerNumber);
        setError(!success);
    } else {
        setError(true);
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">FIS-PMP</h1>
            <h2 className="text-xl text-slate-300 mt-2">{t('client_login_title')}</h2>
        </div>
        <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-lg shadow-lg space-y-6">
          <div>
            <label htmlFor="client-name" className="block text-sm font-medium text-slate-300">{t('client_name')}</label>
            <select
              id="client-name"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>{t('select_a_client')}</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="offer-number" className="block text-sm font-medium text-slate-300">{t('enter_offer_number')}</label>
            <input
              id="offer-number"
              type="text"
              value={offerNumber}
              onChange={(e) => setOfferNumber(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{t('invalid_offer_number')}</p>}
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold">
            {t('view_project')}
          </button>
        </form>
        <button onClick={onBack} className="mt-4 text-sm text-slate-400 hover:text-white">
          {language === 'en' ? '←' : '→'} {t('back_to_role_selection')}
        </button>
      </div>
    </div>
  );
};

export default ClientLogin;