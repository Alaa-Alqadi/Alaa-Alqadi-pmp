import React from 'react';
import Modal from './Modal';
import { useLanguage } from '../hooks/useLanguage';

interface SyncConflictModalProps {
  isOpen: boolean;
  onResolve: (choice: 'local' | 'remote') => void; // local is app memory, remote is file/drive
  source: 'gdrive' | 'localFile' | null;
}

const SyncConflictModal: React.FC<SyncConflictModalProps> = ({ isOpen, onResolve, source }) => {
  const { t } = useLanguage();

  const isGdrive = source === 'gdrive';

  const title = isGdrive ? t.syncConflictTitle : t.localFileSyncConflictTitle;
  const message = isGdrive ? t.syncConflictMessage : t.localFileSyncConflictMessage;
  const remoteButtonText = isGdrive ? t.syncConflictDownloadButton : t.localFileSyncOpenButton;
  const localButtonText = isGdrive ? t.syncConflictUploadButton : t.localFileSyncSaveButton;

  return (
    <Modal isOpen={isOpen} onClose={() => {}} title={title}>
      <div className="text-slate-300">
        <p>
          {message}
        </p>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
        <button 
            type="button" 
            onClick={() => onResolve('remote')} 
            className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          {remoteButtonText}
        </button>
        <button 
            type="button" 
            onClick={() => onResolve('local')} 
            className="px-4 py-2 rounded-md text-sm font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors w-full sm:w-auto"
        >
          {localButtonText}
        </button>
      </div>
    </Modal>
  );
};

export default SyncConflictModal;