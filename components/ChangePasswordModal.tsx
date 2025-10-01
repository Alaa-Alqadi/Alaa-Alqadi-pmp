import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { TranslationKey } from '../translations';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangePassword: (current: string, newPass: string) => { success: boolean, messageKey: TranslationKey };
  onResetPassword: () => void;
}

const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>;
const EyeSlashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243L6.228 6.228" /></svg>;

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose, onChangePassword, onResetPassword }) => {
  const { t } = useLanguage();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [feedback, setFeedback] = useState<{ messageKey: TranslationKey | '', type: 'success' | 'error' }>({ messageKey: '', type: 'error' });
  const [visibility, setVisibility] = useState({ current: false, new: false, confirm: false });

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setFeedback({ messageKey: '', type: 'error' });
      setVisibility({ current: false, new: false, confirm: false });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
        setFeedback({ messageKey: 'password_cannot_be_empty', type: 'error' });
        return;
    }
    if (newPassword !== confirmPassword) {
      setFeedback({ messageKey: 'passwords_do_not_match', type: 'error' });
      return;
    }
    const result = onChangePassword(currentPassword, newPassword);
    setFeedback({ messageKey: result.messageKey, type: result.success ? 'success' : 'error' });
    if (result.success) {
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };
  
  const handleResetClick = () => {
    if (window.confirm(t('reset_password_confirm'))) {
        onResetPassword();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 p-6 rounded-lg text-white w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{t('change_password')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-slate-300">{t('current_password')}</label>
            <div className="relative">
                <input id="currentPassword" type={visibility.current ? 'text' : 'password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="button" onClick={() => setVisibility(v => ({...v, current: !v.current}))} className="absolute inset-y-0 end-0 flex items-center pe-3 text-slate-400 hover:text-white" aria-label={t(visibility.current ? 'hide_password' : 'show_password')}>{visibility.current ? <EyeSlashIcon /> : <EyeIcon />}</button>
            </div>
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-slate-300">{t('new_password')}</label>
            <div className="relative">
                <input id="newPassword" type={visibility.new ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="button" onClick={() => setVisibility(v => ({...v, new: !v.new}))} className="absolute inset-y-0 end-0 flex items-center pe-3 text-slate-400 hover:text-white" aria-label={t(visibility.new ? 'hide_password' : 'show_password')}>{visibility.new ? <EyeSlashIcon /> : <EyeIcon />}</button>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">{t('confirm_new_password')}</label>
            <div className="relative">
                <input id="confirmPassword" type={visibility.confirm ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="button" onClick={() => setVisibility(v => ({...v, confirm: !v.confirm}))} className="absolute inset-y-0 end-0 flex items-center pe-3 text-slate-400 hover:text-white" aria-label={t(visibility.confirm ? 'hide_password' : 'show_password')}>{visibility.confirm ? <EyeSlashIcon /> : <EyeIcon />}</button>
            </div>
          </div>
          
          {feedback.messageKey && (
            <p className={`text-sm ${feedback.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {t(feedback.messageKey)}
            </p>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <button type="button" onClick={handleResetClick} className="w-full sm:w-auto py-2 px-4 text-sm text-amber-400 hover:text-amber-300">{t('reset_password')}</button>
            <div className="flex gap-4">
                <button type="button" onClick={onClose} className="py-2 px-4 bg-slate-600 hover:bg-slate-500 rounded-md">{t('cancel')}</button>
                <button type="submit" className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md">{t('save')}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;