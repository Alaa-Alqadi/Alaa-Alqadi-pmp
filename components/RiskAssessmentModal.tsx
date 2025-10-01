// FIX: Replaced placeholder content with a functional Risk Assessment modal component.
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Risk, RiskLevel } from '../types';

interface RiskAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  risks: Risk[];
  onSave: (risks: Risk[]) => void;
}

const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>;

const getRiskLevelColor = (level: RiskLevel) => {
    switch(level) {
        case RiskLevel.LOW: return 'bg-green-500';
        case RiskLevel.MEDIUM: return 'bg-yellow-500';
        case RiskLevel.HIGH: return 'bg-red-500';
        case RiskLevel.VERY_HIGH: return 'bg-red-700';
        default: return 'bg-slate-500';
    }
};

const calculateOverallRisk = (likelihood: RiskLevel, impact: RiskLevel): RiskLevel => {
    const levelMap = { [RiskLevel.LOW]: 1, [RiskLevel.MEDIUM]: 2, [RiskLevel.HIGH]: 3, [RiskLevel.VERY_HIGH]: 4 };
    const score = levelMap[likelihood] * levelMap[impact];
    
    // More granular risk matrix mapping
    if (score > 8) return RiskLevel.VERY_HIGH; // Scores: 9, 12, 16
    if (score > 4) return RiskLevel.HIGH;      // Scores: 6, 8
    if (score > 2) return RiskLevel.MEDIUM;    // Scores: 3, 4
    return RiskLevel.LOW;                      // Scores: 1, 2
};

const RiskAssessmentModal: React.FC<RiskAssessmentModalProps> = ({ isOpen, onClose, risks: initialRisks, onSave }) => {
  const { t } = useLanguage();
  const [risks, setRisks] = useState<Risk[]>([]);

  useEffect(() => {
    // Deep copy to avoid mutating parent state directly
    setRisks(JSON.parse(JSON.stringify(initialRisks)));
  }, [initialRisks, isOpen]);

  if (!isOpen) return null;

  const handleAddRisk = () => {
    const newRisk: Risk = {
      id: `risk-${Date.now()}`,
      description: '',
      likelihood: RiskLevel.MEDIUM,
      impact: RiskLevel.MEDIUM,
      mitigation: '',
      residualImpact: RiskLevel.LOW,
    };
    setRisks(prev => [...prev, newRisk]);
  };

  const handleUpdateRisk = (id: string, field: keyof Risk, value: string) => {
    setRisks(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };
  
  const handleDeleteRisk = (id: string) => {
    setRisks(prev => prev.filter(r => r.id !== id));
  };

  const handleSave = () => {
    onSave(risks);
  };
  
  const riskLevels = Object.values(RiskLevel);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 p-6 rounded-lg text-white w-full max-w-6xl max-h-[90vh] flex flex-col">
        <h2 className="text-xl font-bold mb-4">{t('risk_assessment_title')}</h2>
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden py-4">
            {/* Left Panel: Editing */}
            <div className="md:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2 -mr-2">
                {risks.map((risk) => (
                    <div key={risk.id} className="bg-slate-700 p-4 rounded-lg space-y-3">
                        <div className="flex justify-between items-start">
                            <textarea
                                value={risk.description}
                                onChange={(e) => handleUpdateRisk(risk.id, 'description', e.target.value)}
                                placeholder={t('risk_description')}
                                rows={2}
                                className="w-full text-white bg-slate-600 border border-slate-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button onClick={() => handleDeleteRisk(risk.id)} className="ml-4 p-2 text-slate-400 hover:text-red-400 flex-shrink-0"><TrashIcon/></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">{t('likelihood')}</label>
                                <select value={risk.likelihood} onChange={e => handleUpdateRisk(risk.id, 'likelihood', e.target.value)} className="w-full px-3 py-2 text-white bg-slate-600 border border-slate-500 rounded-md focus:outline-none">
                                    {riskLevels.map(level => <option key={level} value={level}>{t(level.toLowerCase() as any)}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">{t('impact_level')}</label>
                                <select value={risk.impact} onChange={e => handleUpdateRisk(risk.id, 'impact', e.target.value)} className="w-full px-3 py-2 text-white bg-slate-600 border border-slate-500 rounded-md focus:outline-none">
                                    {riskLevels.map(level => <option key={level} value={level}>{t(level.toLowerCase() as any)}</option>)}
                                </select>
                            </div>
                            <div className="flex items-end">
                                <div className="w-full text-center">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${getRiskLevelColor(calculateOverallRisk(risk.likelihood, risk.impact))}`}>
                                        {t('overall_risk')}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('mitigation_plan')}</label>
                            <textarea
                                value={risk.mitigation}
                                onChange={(e) => handleUpdateRisk(risk.id, 'mitigation', e.target.value)}
                                placeholder={t('mitigation_plan')}
                                rows={2}
                                className="w-full text-white bg-slate-600 border border-slate-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('impact')}</label>
                            <select 
                                value={risk.residualImpact || RiskLevel.LOW} 
                                onChange={e => handleUpdateRisk(risk.id, 'residualImpact', e.target.value)} 
                                className="w-full px-3 py-2 text-white bg-slate-600 border border-slate-500 rounded-md focus:outline-none">
                                    {riskLevels.map(level => <option key={level} value={level}>{t(level.toLowerCase() as any)}</option>)}
                            </select>
                        </div>
                    </div>
                ))}
                <button onClick={handleAddRisk} className="mt-4 flex items-center gap-2 py-2 px-4 text-white bg-slate-600 hover:bg-slate-500 rounded-md text-sm font-medium self-start">
                    <PlusIcon /> {t('add_risk')}
                </button>
            </div>
            {/* Right Panel: Summary */}
            <div className="md:col-span-1 bg-slate-900/50 rounded-lg p-4 flex flex-col overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4 text-slate-300 border-b border-slate-700 pb-2">{t('saved_risks')}</h3>
                {initialRisks.length > 0 ? (
                    <div className="space-y-3">
                        {initialRisks.map(risk => {
                            const overallRisk = calculateOverallRisk(risk.likelihood, risk.impact);
                            return (
                                <div key={risk.id} className="bg-slate-700/70 p-3 rounded-md">
                                    <div className="flex justify-between items-start gap-3">
                                        <p className="text-sm text-slate-200 flex-1 break-words font-medium">{risk.description || <span className="text-slate-400 italic">No description</span>}</p>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold text-white flex-shrink-0 ${getRiskLevelColor(overallRisk)}`}>
                                            {t(overallRisk.toLowerCase() as any)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-start gap-4 mt-2 text-xs text-slate-400 border-t border-slate-600/50 pt-2">
                                        <div>
                                            <span>{t('likelihood')}: </span>
                                            <span className="font-medium text-slate-300">{t(risk.likelihood.toLowerCase() as any)}</span>
                                        </div>
                                        <div>
                                            <span>{t('impact')}: </span>
                                            <span className="font-medium text-slate-300">{t(risk.impact.toLowerCase() as any)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-sm text-slate-400 text-center mt-4">{t('no_risks_saved_yet')}</p>
                )}
            </div>
        </div>
        
        <div className="mt-6 flex gap-4 justify-end border-t border-slate-700 pt-4">
          <button type="button" onClick={onClose} className="py-2 px-4 bg-slate-600 hover:bg-slate-500 rounded-md">{t('cancel')}</button>
          <button type="button" onClick={handleSave} className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md">{t('save')}</button>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentModal;