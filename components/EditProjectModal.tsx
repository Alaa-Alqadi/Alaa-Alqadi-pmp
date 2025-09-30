import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { PlusIcon } from './icons/PlusIcon';
import { Project } from '../types';

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateProject: (id: string, name: string, description: string, startDate: string, endDate: string, clientName: string, contractId: string, quoteId: string) => void;
  project: Project;
  clients: string[];
  onAddClient: (name: string) => boolean;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({ isOpen, onClose, onUpdateProject, project, clients, onAddClient }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clientName, setClientName] = useState('');
  const [contractId, setContractId] = useState('');
  const [quoteId, setQuoteId] = useState('');
  const [newClientName, setNewClientName] = useState('');

  useEffect(() => {
    if (project) {
        setName(project.name);
        setDescription(project.description);
        setStartDate(project.startDate);
        setEndDate(project.endDate);
        setClientName(project.clientName);
        setContractId(project.contractId || '');
        setQuoteId(project.quoteId || '');
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && startDate && endDate && clientName) {
      onUpdateProject(project.id, name, description, startDate, endDate, clientName, contractId, quoteId);
    }
  };
  
  const handleAddNewClient = () => {
    if (newClientName.trim()) {
        const success = onAddClient(newClientName.trim());
        if (success) {
            setClientName(newClientName.trim());
            setNewClientName('');
        }
    }
  };

  const commonInputClasses = "w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="تعديل المشروع">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-slate-300 mb-1">اسم المشروع</label>
            <input
              type="text"
              id="projectName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={commonInputClasses}
              required
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="projectDescription" className="block text-sm font-medium text-slate-300 mb-1">الوصف (اختياري)</label>
            <textarea
              id="projectDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={commonInputClasses}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="contractId" className="block text-sm font-medium text-slate-300 mb-1">رقم العقد (اختياري)</label>
              <input
                type="text"
                id="contractId"
                value={contractId}
                onChange={(e) => setContractId(e.target.value)}
                className={commonInputClasses}
              />
            </div>
            <div>
              <label htmlFor="quoteId" className="block text-sm font-medium text-slate-300 mb-1">رقم عرض السعر (اختياري)</label>
              <input
                type="text"
                id="quoteId"
                value={quoteId}
                onChange={(e) => setQuoteId(e.target.value)}
                className={commonInputClasses}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-slate-300 mb-1">تاريخ البدء</label>
                <input 
                    type="date" 
                    id="startDate" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={commonInputClasses}
                    required
                />
            </div>
            <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-slate-300 mb-1">تاريخ الانتهاء</label>
                <input 
                    type="date" 
                    id="endDate" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={commonInputClasses}
                    required
                />
            </div>
          </div>
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-slate-300 mb-1">العميل</label>
            <select 
                id="clientName" 
                value={clientName} 
                onChange={(e) => setClientName(e.target.value)} 
                className={commonInputClasses}
                required
            >
                <option value="" disabled>اختر عميلاً</option>
                {clients.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex space-x-2 space-x-reverse pt-2 border-t border-slate-700/50">
            <input
                type="text"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                placeholder="إضافة عميل جديد..."
                className={`${commonInputClasses} text-sm`}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddNewClient())}
            />
            <button type="button" onClick={handleAddNewClient} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-md text-white flex-shrink-0">
                <PlusIcon className="w-5 h-5" />
            </button>
        </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3 space-x-reverse">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors">
            إلغاء
          </button>
          <button type="submit" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-brand-secondary hover:bg-brand-secondary-hover transition-colors">
            حفظ التغييرات
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProjectModal;