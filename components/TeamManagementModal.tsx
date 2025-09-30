import React, { useState } from 'react';
import Modal from './Modal';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { PlusIcon } from './icons/PlusIcon';
import { useLanguage } from '../hooks/useLanguage';

interface TeamManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamMembers: string[];
  onAddMember: (name: string) => void;
  onUpdateMember: (oldName: string, newName: string) => void;
  onDeleteMember: (name: string) => void;
}

const TeamManagementModal: React.FC<TeamManagementModalProps> = ({
  isOpen,
  onClose,
  teamMembers,
  onAddMember,
  onUpdateMember,
  onDeleteMember,
}) => {
  const { t } = useLanguage();
  const [newMemberName, setNewMemberName] = useState('');
  const [editingMember, setEditingMember] = useState<{ oldName: string; newName: string } | null>(null);

  const handleAdd = () => {
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
  
  const commonInputClasses = "w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.manageTeamTitle}>
      <div className="space-y-4">
        <div className="max-h-60 overflow-y-auto pe-2 -me-2">
            <ul className="space-y-2">
            {teamMembers.map((member) => (
                <li key={member} className="flex items-center justify-between p-2 bg-slate-750 rounded-md">
                {editingMember?.oldName === member ? (
                    <input
                    type="text"
                    value={editingMember.newName}
                    onChange={(e) => setEditingMember({ ...editingMember, newName: e.target.value })}
                    className={`${commonInputClasses} text-sm`}
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                    />
                ) : (
                    <span className="text-slate-200">{member}</span>
                )}
                <div className="flex items-center space-x-2 space-x-reverse">
                    {editingMember?.oldName === member ? (
                    <>
                        <button onClick={handleSaveEdit} className="px-2 py-1 text-sm rounded bg-green-600 hover:bg-green-500 text-white">{t.save}</button>
                        <button onClick={handleCancelEdit} className="px-2 py-1 text-sm rounded bg-slate-600 hover:bg-slate-500 text-white">{t.cancel}</button>
                    </>
                    ) : (
                    <>
                        <button onClick={() => handleStartEdit(member)} className="p-1 text-slate-400 hover:text-white"><EditIcon className="w-4 h-4" /></button>
                        <button onClick={() => onDeleteMember(member)} className="p-1 text-slate-400 hover:text-red-400"><TrashIcon className="w-4 h-4" /></button>
                    </>
                    )}
                </div>
                </li>
            ))}
            </ul>
        </div>
        <div className="flex gap-2 pt-4 border-t border-slate-700">
          <input
            type="text"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            placeholder={t.addNewMemberPlaceholder}
            className={commonInputClasses}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button onClick={handleAdd} className="p-2 bg-brand-secondary hover:bg-brand-secondary-hover rounded-md text-white">
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TeamManagementModal;