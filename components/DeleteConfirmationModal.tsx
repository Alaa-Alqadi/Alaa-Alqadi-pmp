import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  warning?: string;
}

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, title, message, warning }: DeleteConfirmationModalProps) { 
  const { t } = useLanguage();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 p-6 rounded-lg text-white w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-2 text-slate-300">{message}</p>
        {warning && <p className="text-amber-400 text-sm">{warning}</p>}
        <div className="mt-6 flex gap-4 justify-end">
            <button onClick={onClose} className="py-2 px-4 bg-slate-600 hover:bg-slate-500 rounded-md">{t('cancel')}</button>
            <button onClick={onConfirm} className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md">{t('delete')}</button>
        </div>
      </div>
    </div>
  ); 
}