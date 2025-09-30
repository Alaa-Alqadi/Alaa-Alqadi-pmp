
import React from 'react';
import Modal from './Modal';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm, projectName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="تأكيد الحذف">
      <div className="text-slate-300">
        <p>
          هل أنت متأكد من رغبتك في حذف المشروع <strong className="text-white">{projectName}</strong>؟
        </p>
        <p className="mt-2 text-sm text-red-400">
          لا يمكن التراجع عن هذا الإجراء. سيتم حذف جميع المهام المرتبطة بهذا المشروع بشكل دائم.
        </p>
      </div>
      <div className="mt-6 flex justify-end space-x-3 space-x-reverse">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors">
          إلغاء
        </button>
        <button type="button" onClick={onConfirm} className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors">
          حذف المشروع
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
