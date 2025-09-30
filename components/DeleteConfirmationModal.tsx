import React from 'react';
import Modal from './Modal';
import { useLanguage } from '../hooks/useLanguage';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm, projectName }) => {
  const { t } = useLanguage();
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.deleteConfirmationTitle}>
      <div className="text-slate-300">
        <p>
          {t.deleteConfirmationMessage(projectName)}
        </p>
        <p className="mt-2 text-sm text-red-400">
          {t.deleteConfirmationWarning}
        </p>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors">
          {t.cancel}
        </button>
        <button type="button" onClick={onConfirm} className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors">
          {t.deleteProjectButton}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;