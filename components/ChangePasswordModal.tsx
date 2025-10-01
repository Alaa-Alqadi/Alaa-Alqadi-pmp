import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { useLanguage } from '../hooks/useLanguage';
import { EyeIcon } from './icons/EyeIcon';
import { EyeSlashIcon } from './icons/EyeSlashIcon';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangePassword: (current: string, newPass: string) => { success: boolean, messageKey: string };
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose, onChangePassword }) => {
  const { t } = useLanguage();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isCurrentVisible, setIsCurrentVisible] = useState(false);
  const [isNewVisible, setIsNewVisible] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError(null);
      setSuccess(null);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError(t.passwordsDoNotMatch);
      return;
    }

    const result = onChangePassword(currentPassword, newPassword);

    if (result.success) {
      setSuccess(t[result.messageKey as keyof typeof t] as string || result.messageKey);
      // Close modal after a short delay to show success message
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      setError(t[result.messageKey as keyof typeof t] as string || result.messageKey);
    }
  };

  const commonInputClasses = "w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary";

  const renderPasswordInput = (
    id: string,
    label: string,
    value: string,
    onChange: (val: string) => void,
    isVisible: boolean,
    toggleVisibility: () => void
  ) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
        <div className="relative">
            <input
                id={id}
                type={isVisible ? 'text' : 'password'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`${commonInputClasses} pe-10`}
                required
            />
            <button
                type="button"
                onClick={toggleVisibility}
                className="absolute inset-y-0 end-0 flex items-center pe-3 text-slate-400 hover:text-white"
                aria-label={t.togglePasswordVisibility}
            >
                {isVisible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
        </div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.changePassword}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {renderPasswordInput(
            "current-password", 
            t.currentPasswordLabel,
            currentPassword, 
            setCurrentPassword,
            isCurrentVisible,
            () => setIsCurrentVisible(!isCurrentVisible)
        )}
        
        {renderPasswordInput(
            "new-password",
            t.newPasswordLabel,
            newPassword,
            setNewPassword,
            isNewVisible,
            () => setIsNewVisible(!isNewVisible)
        )}
        
        {renderPasswordInput(
            "confirm-password",
            t.confirmNewPasswordLabel,
            confirmPassword,
            setConfirmPassword,
            isNewVisible, // Share visibility with new password field
            () => setIsNewVisible(!isNewVisible)
        )}
        
        {error && (
            <p className="text-sm text-red-400 text-center bg-red-900/50 p-2 rounded-md">{error}</p>
        )}
        {success && (
            <p className="text-sm text-green-400 text-center bg-green-900/50 p-2 rounded-md">{success}</p>
        )}

        <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors">
                {t.cancel}
            </button>
            <button type="submit" disabled={!!success} className="px-4 py-2 rounded-md text-sm font-medium text-white bg-brand-secondary hover:bg-brand-secondary-hover disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors">
                {t.saveChanges}
            </button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;