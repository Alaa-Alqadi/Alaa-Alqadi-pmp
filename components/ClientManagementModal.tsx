import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Client } from '../types';

interface ClientManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: Client[];
  onAddClient: (name: string) => Client | null;
  onUpdateClient: (clientId: string, newName: string) => void;
  onDeleteClient: (clientId: string) => void;
}

const ClientManagementModal: React.FC<ClientManagementModalProps> = ({ isOpen, onClose, clients, onAddClient, onUpdateClient, onDeleteClient }) => {
  const { t } = useLanguage();
  const [newClientName, setNewClientName] = useState('');
  const [editingClient, setEditingClient] = useState<{ id: string; newName: string } | null>(null);
  
  if (!isOpen) return null;
  
  const handleAddClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newClientName.trim()) {
      const newClient = onAddClient(newClientName.trim());
      if (newClient) {
        setNewClientName('');
      }
    }
  };

  const handleStartEdit = (client: Client) => {
    setEditingClient({ id: client.id, newName: client.name });
  };

  const handleCancelEdit = () => {
    setEditingClient(null);
  };

  const handleSaveEdit = () => {
    if (editingClient && editingClient.newName.trim()) {
      onUpdateClient(editingClient.id, editingClient.newName.trim());
      setEditingClient(null);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 p-6 rounded-lg text-white w-full max-w-md max-h-[80vh] flex flex-col">
        <h2 className="text-xl font-bold mb-4">{t('client_management_title')}</h2>
        
        <form onSubmit={handleAddClientSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
            placeholder={t('new_client_name')}
            className="flex-grow px-3 py-2 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md">{t('add_client')}</button>
        </form>

        <ul className="space-y-2 overflow-y-auto">
          {clients.map((client) => (
            <li key={client.id} className="flex items-center justify-between p-2 bg-slate-700 rounded-md">
              {editingClient && editingClient.id === client.id ? (
                <input 
                  type="text" 
                  value={editingClient.newName}
                  onChange={(e) => setEditingClient({ ...editingClient, newName: e.target.value })}
                  className="flex-grow px-2 py-1 text-white bg-slate-600 border border-slate-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
              ) : (
                <span>{client.name}</span>
              )}
              
              <div className="flex gap-2">
                {editingClient && editingClient.id === client.id ? (
                  <>
                    <button onClick={handleSaveEdit} className="text-green-400 hover:text-green-300">{t('save')}</button>
                    <button onClick={handleCancelEdit} className="text-slate-400 hover:text-slate-300">{t('cancel')}</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleStartEdit(client)} className="text-blue-400 hover:text-blue-300">{t('edit')}</button>
                    <button onClick={() => onDeleteClient(client.id)} className="text-red-400 hover:text-red-300">{t('delete')}</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
        
        <button onClick={onClose} className="mt-6 p-2 bg-slate-600 hover:bg-slate-500 rounded w-full">{t('close')}</button>
      </div>
    </div>
  );
};

export default ClientManagementModal;