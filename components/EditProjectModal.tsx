import React, { useState, useEffect } from 'react';
import { Project, Client } from '../types';
import { useLanguage } from '../hooks/useLanguage';

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateProject: (id: string, name: string, description: string, startDate: string, endDate: string, clientId: string, contractId: string, quoteId: string) => void;
  project: Project;
  clients: Client[];
  onAddClient: (name: string) => Client | null;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({ isOpen, onClose, onUpdateProject, project, clients, onAddClient }) => {
  const { t } = useLanguage();
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [startDate, setStartDate] = useState(project.startDate);
  const [endDate, setEndDate] = useState(project.endDate);
  const [clientId, setClientId] = useState(project.clientId);
  const [contractId, setContractId] = useState(project.contractId || '');
  const [quoteId, setQuoteId] = useState(project.quoteId || '');
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [newClientName, setNewClientName] = useState('');

  useEffect(() => {
    setName(project.name);
    setDescription(project.description);
    setStartDate(project.startDate);
    setEndDate(project.endDate);
    setClientId(project.clientId);
    setContractId(project.contractId || '');
    setQuoteId(project.quoteId || '');
  }, [project]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProject(project.id, name, description, startDate, endDate, clientId, contractId, quoteId);
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
        <h2 className="text-xl font-bold mb-4">{t('edit_project_title')}</h2>
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

export default EditProjectModal;