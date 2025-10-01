import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { useLanguage } from '../hooks/useLanguage';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset internal state when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
        onSubmit(email);
        setIsSubmitted(true);
    }
  };

  const commonInputClasses = "w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.resetPasswordTitle}>
      {isSubmitted ? (
        <div>
            <p className="text-slate-300 text-center">
                {
                    email.toLowerCase().endsWith('@flexi-is.com')
                    ? t.resetPasswordHintFlexi
                    : t.resetPasswordSuccessMessage
                }
            </p>
            <div className="mt-6 flex justify-end">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium text-white bg-brand-secondary hover:bg-brand-secondary-hover transition-colors">
                    {t.close}
                </button>
            </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
            <p className="text-slate-400 mb-4">{t.resetPasswordInstruction}</p>
            <div className="space-y-4">
              <div>
                  <label htmlFor="reset-email" className="sr-only">{t.loginEmailLabel}</label>
                  <input
                  type="email"
                  id="reset-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={commonInputClasses}
                  placeholder={t.loginEmailPlaceholder}
                  required
                  autoFocus
                  />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors">
                  {t.cancel}
              </button>
              <button type="submit" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-brand-secondary hover:bg-brand-secondary-hover transition-colors">
                  {t.sendResetLinkButton}
              </button>
            </div>
        </form>
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;