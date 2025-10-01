import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Client } from '../types';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (name: string, description: string, startDate: string, endDate: string, clientId: string, contractId: string, quoteId: string) => void;
  clients: Client[];
  onAddClient: (name: string) => Client | null;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onAddProject, clients, onAddClient }) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [contractId, setContractId] = useState('');
  const [quoteId, setQuoteId] = useState('');
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [newClientName, setNewClientName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProject(name, description, startDate, endDate, clientId, contractId, quoteId);
  };

  const handleAddNewClient = () => {
    const newClient = onAddClient(newClientName);
    if (newClient) {
      setClientId(newClient.id);
      setNewClientName('');
      setIsAddingClient(false);
    }
  };
  
  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'add-new') {
      setIsAddingClient(true);
      setClientId('');
    } else {
      setIsAddingClient(false);
      setClientId(e.target.value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 p-6 rounded-lg text-white w-full max-w-lg max-h-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{t('new_project_title')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-slate-300">{t('project_name')}</label>
            <input id="projectName" type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="projectDescription" className="block text-sm font-medium text-slate-300">{t('project_description')}</label>
            <textarea id="projectDescription" value={description} onChange={e => setDescription(e.target.value)} required rows={3} className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-slate-300">{t('start_date')}</label>
              <input id="startDate" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-slate-300">{t('end_date')}</label>
              <input id="endDate" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-slate-300">{t('client_name')}</label>
            <select id="clientName" value={clientId} onChange={handleClientChange} className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="" disabled>{t('select_a_client')}</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              <option value="add-new">{t('add_new_client')}</option>
            </select>
            {isAddingClient && (
              <div className="mt-2 flex gap-2">
                <input type="text" value={newClientName} onChange={e => setNewClientName(e.target.value)} placeholder={t('enter_client_name')} className="flex-grow px-3 py-2 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="button" onClick={handleAddNewClient} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md">{t('add')}</button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contractId" className="block text-sm font-medium text-slate-300">{t('contract_id')}</label>
              <input id="contractId" type="text" value={contractId} onChange={e => setContractId(e.target.value)} className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="quoteId" className="block text-sm font-medium text-slate-300">{t('quote_id')}</label>
              <input id="quoteId" type="text" value={quoteId} onChange={e => setQuoteId(e.target.value)} className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="mt-6 flex gap-4 justify-end">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-slate-600 hover:bg-slate-500 rounded-md">{t('cancel')}</button>
            <button type="submit" className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md">{t('save')}</button>
          </div>
        </form>
      </div>
    </div>
  ); 
};

export default AddProjectModal;