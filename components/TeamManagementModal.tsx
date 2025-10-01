import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface TeamManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamMembers: string[];
  onAddMember: (name: string) => void;
  onUpdateMember: (oldName: string, newName: string) => void;
  onDeleteMember: (name: string) => void;
}

const TeamManagementModal: React.FC<TeamManagementModalProps> = ({ isOpen, onClose, teamMembers, onAddMember, onUpdateMember, onDeleteMember }) => {
  const { t } = useLanguage();
  const [newMemberName, setNewMemberName] = useState('');
  const [editingMember, setEditingMember] = useState<{ oldName: string; newName: string } | null>(null);
  
  if (!isOpen) return null;
  
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMemberName.trim()) {
      onAddMember(newMemberName.trim());
      setNewMemberName('');
    }
  };

  const handleStartEdit = (name: string) => {
    setEditingMember({ oldName: name, newName: name });
  };

  const handleCancelEdit = () => {
    setEditingMember(null);
  };

  const handleSaveEdit = () => {
    if (editingMember && editingMember.newName.trim()) {
      onUpdateMember(editingMember.oldName, editingMember.newName.trim());
      setEditingMember(null);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 p-6 rounded-lg text-white w-full max-w-md max-h-[80vh] flex flex-col">
        <h2 className="text-xl font-bold mb-4">{t('team_management_title')}</h2>
        
        <form onSubmit={handleAddMember} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            placeholder={t('new_member_name')}
            className="flex-grow px-3 py-2 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md">{t('add_member')}</button>
        </form>

        <ul className="space-y-2 overflow-y-auto">
          {teamMembers.map((member) => (
            <li key={member} className="flex items-center justify-between p-2 bg-slate-700 rounded-md">
              {editingMember && editingMember.oldName === member ? (
                <input 
                  type="text" 
                  value={editingMember.newName}
                  onChange={(e) => setEditingMember({ ...editingMember, newName: e.target.value })}
                  className="flex-grow px-2 py-1 text-white bg-slate-600 border border-slate-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
              ) : (
                <span>{member}</span>
              )}
              
              <div className="flex gap-2">
                {editingMember && editingMember.oldName === member ? (
                  <>
                    <button onClick={handleSaveEdit} className="text-green-400 hover:text-green-300">{t('save')}</button>
                    <button onClick={handleCancelEdit} className="text-slate-400 hover:text-slate-300">{t('cancel')}</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleStartEdit(member)} className="text-blue-400 hover:text-blue-300">{t('edit')}</button>
                    <button onClick={() => onDeleteMember(member)} className="text-red-400 hover:text-red-300">{t('delete')}</button>
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

export default TeamManagementModal;