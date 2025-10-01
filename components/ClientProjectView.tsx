import React from 'react';
import { Project, Task, TaskStatus, Client, Risk, RiskLevel } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { TranslationKey } from '../translations';
import LanguageSwitcher from './LanguageSwitcher';

const getTaskProgressStyle = (percentage: number): { border: string; bg: string } => {
  if (percentage === 100) return { border: 'border-l-4 border-green-500', bg: 'bg-green-500' };
  if (percentage >= 91 && percentage <= 99) return { border: 'border-l-4 border-green-600', bg: 'bg-green-600' };
  if (percentage >= 81 && percentage <= 90) return { border: 'border-l-4 border-green-400', bg: 'bg-green-400' };
  if (percentage >= 51 && percentage <= 80) return { border: 'border-l-4 border-orange-500', bg: 'bg-orange-500' };
  if (percentage >= 31 && percentage <= 50) return { border: 'border-l-4 border-yellow-500', bg: 'bg-yellow-500' };
  if (percentage >= 0 && percentage <= 30) return { border: 'border-l-4 border-red-500', bg: 'bg-red-500' };
  return { border: 'border-l-4 border-slate-600', bg: 'bg-slate-600' };
};

const getTaskProgressTextColorClass = (percentage: number): string => {
  if (percentage === 100) return 'text-green-500';
  if (percentage >= 91 && percentage <= 99) return 'text-green-600';
  if (percentage >= 81 && percentage <= 90) return 'text-green-400';
  if (percentage >= 51 && percentage <= 80) return 'text-orange-500';
  if (percentage >= 31 && percentage <= 50) return 'text-yellow-500';
  if (percentage >= 0 && percentage <= 30) return 'text-red-500';
  return 'text-slate-400';
};

const getProjectPhaseTextKey = (percentage: number): TranslationKey => {
    const p = Math.floor(percentage);
    if (p === 0) return 'not_started_yet';
    if (p >= 1 && p <= 80) return 'execution_phase';
    if (p >= 81 && p <= 90) return 'finishing_phase';
    if (p >= 91) return 'handover_phase';
    return 'not_started_yet';
};

const statusLabels: Record<TaskStatus, 'todo' | 'in_progress' | 'handover' | 'done' | 'cancelled'> = {
  [TaskStatus.TODO]: 'todo',
  [TaskStatus.IN_PROGRESS]: 'in_progress',
  [TaskStatus.HANDOVER]: 'handover',
  [TaskStatus.DONE]: 'done',
  [TaskStatus.CANCELLED]: 'cancelled',
};

// Risk Helper Functions
const getRiskLevelColor = (level: RiskLevel): string => {
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
    
    if (score > 8) return RiskLevel.VERY_HIGH;
    if (score > 4) return RiskLevel.HIGH;
    if (score > 2) return RiskLevel.MEDIUM;
    return RiskLevel.LOW;
};

interface ClientProjectViewProps {
  project: Project;
  client: Client;
  onLogout: () => void;
}

const ClientProjectView: React.FC<ClientProjectViewProps> = ({ project, client, onLogout }) => {
  const { t, language } = useLanguage();
  const riskLevels = Object.values(RiskLevel);

  const activeTasks = project.tasks.filter(t => t.status !== TaskStatus.CANCELLED);
  const projectProgress = activeTasks.length > 0
    ? activeTasks.reduce((sum, task) => sum + task.completionPercentage, 0) / activeTasks.length
    : 0;

  const tasksByStatus = project.tasks.reduce((acc, task) => {
    (acc[task.status] = acc[task.status] || []).push(task);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  const columnOrder: TaskStatus[] = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.CANCELLED];

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="bg-slate-900 min-h-screen text-white flex">
      {/* Sidebar */}
      <div className="w-80 h-screen bg-slate-800 p-4 flex-shrink-0 border-e border-slate-700 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">FIS-PMP</h1>
          <LanguageSwitcher />
        </div>
        <div className="p-3 bg-slate-700/50 rounded-lg">
          <h2 className="text-lg font-semibold mb-1 text-slate-200">{client.name}</h2>
          <p className="text-sm text-slate-400">{t('client')}</p>
        </div>
        <nav className="mt-4">
            <h3 className="text-sm font-bold text-slate-400 px-3 py-1 uppercase">{t('projects')}</h3>
            <div className="w-full text-left px-3 py-2 rounded-md truncate bg-blue-600 text-white">
                {project.name}
            </div>
        </nav>
        <div className="mt-auto pt-4 border-t border-slate-700">
           <button onClick={onLogout} className="w-full py-2 text-white bg-slate-600 rounded-md hover:bg-slate-500">
             {t('logout')}
           </button>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="text-white h-full flex flex-col">
            <header className="mb-6">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <p className="text-slate-400 mt-2">{project.description}</p>
            <div className="mt-4 text-sm text-slate-300 grid grid-cols-2 md:grid-cols-3 gap-4">
                <p><strong>{t('start_date')}:</strong> {project.startDate}</p>
                <p><strong>{t('end_date')}:</strong> {project.endDate}</p>
                <p><strong>{t('contract_id')}:</strong> {project.contractId || t('not_applicable')}</p>
            </div>
            <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium">{t('overall_progress')}</label>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-300">{t(getProjectPhaseTextKey(projectProgress))}</span>
                        <span className="text-sm font-bold text-slate-100">{Math.round(projectProgress)}%</span>
                    </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${projectProgress}%` }}></div>
                </div>
            </div>
            </header>
            
            <div className="flex-1 overflow-x-auto pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-[1200px]">
                {columnOrder.map((status) => (
                <div key={status} className="bg-slate-800 rounded-lg p-4 flex flex-col h-full">
                    <h2 className="font-bold mb-4 flex justify-between">
                    <span>{t(statusLabels[status])}</span>
                    <span className="text-sm font-normal text-slate-400">{(tasksByStatus[status] || []).length}</span>
                    </h2>
                    <div className="space-y-4 overflow-y-auto">
                    {(tasksByStatus[status] || []).sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()).map(task => (
                        <div key={task.id} className={`bg-slate-700 p-4 rounded-md shadow-md ${getTaskProgressStyle(task.completionPercentage).border} ${task.status === TaskStatus.CANCELLED ? 'opacity-60' : ''}`}>
                        <h3 className={`font-bold text-md mb-2 ${task.status === TaskStatus.CANCELLED ? 'line-through' : ''}`}>{task.title}</h3>
                        <p className="text-sm text-slate-300 mb-3">{task.description}</p>
                        <div className="text-xs text-slate-400">
                            <p className="mb-1">{t('assignee')}: {task.assignee}</p>
                            <p>{task.startDate} &rarr; {task.endDate}</p>
                        </div>
                        <div className="mt-3">
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-xs text-slate-400">{t('completion_percentage')}</label>
                                    <span className={`text-sm font-bold ${getTaskProgressTextColorClass(task.completionPercentage)}`}>{task.completionPercentage}%</span>
                                </div>
                                <div className="w-full bg-slate-600 rounded-full h-1.5">
                                <div className={`${getTaskProgressStyle(task.completionPercentage).bg} h-1.5 rounded-full`} style={{ width: `${task.completionPercentage}%` }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                ))}
            </div>
            </div>

            {/* Risk Assessment Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 border-t border-slate-700 pt-6">{t('risk_assessment')}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Risk Matrix */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-slate-300">{t('risk_matrix_title')}</h3>
                        <div className="grid grid-cols-[auto,1fr,1fr,1fr,1fr] gap-1 text-center text-xs p-2 bg-slate-800 rounded-md items-center">
                            {/* Headers */}
                            <div className="font-bold text-slate-400 p-1 text-right">{t('likelihood')} \ {t('impact')}</div>
                            {riskLevels.map(level => (
                                <div key={`header-${level}`} className="font-bold p-1">{t(level.toLowerCase() as any)}</div>
                            ))}
                            {/* Matrix Rows */}
                            {riskLevels.map(likelihood => (
                                <React.Fragment key={`row-${likelihood}`}>
                                    <div className="font-bold p-1 text-right">{t(likelihood.toLowerCase() as any)}</div>
                                    {riskLevels.map(impact => {
                                        const overallRisk = calculateOverallRisk(likelihood, impact);
                                        return (
                                            <div key={`cell-${likelihood}-${impact}`} className={`p-2 rounded ${getRiskLevelColor(overallRisk)} text-white font-semibold flex items-center justify-center h-full`}>
                                                {t(overallRisk.toLowerCase() as any)}
                                            </div>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    {/* Saved Risks List */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-slate-300">{t('saved_risks')}</h3>
                        {project.risks.length > 0 ? (
                            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                                {project.risks.map(risk => {
                                    const overallRisk = calculateOverallRisk(risk.likelihood, risk.impact);
                                    return (
                                        <div key={risk.id} className="bg-slate-800 p-3 rounded-md">
                                            <div className="flex justify-between items-start gap-3">
                                                <p className="text-sm text-slate-200 flex-1 break-words font-medium">{risk.description || <span className="text-slate-400 italic">No description</span>}</p>
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold text-white flex-shrink-0 ${getRiskLevelColor(overallRisk)}`}>
                                                    {t(overallRisk.toLowerCase() as any)}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-start gap-4 mt-2 text-xs text-slate-400 border-t border-slate-700/50 pt-2">
                                                <div><span>{t('likelihood')}: </span><span className="font-medium text-slate-300">{t(risk.likelihood.toLowerCase() as any)}</span></div>
                                                <div><span>{t('impact')}: </span><span className="font-medium text-slate-300">{t(risk.impact.toLowerCase() as any)}</span></div>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-700/50"><strong>{t('mitigation_plan')}:</strong> {risk.mitigation || t('not_applicable')}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full bg-slate-800 rounded-md">
                                <p className="text-sm text-slate-400">{t('no_risks_saved_yet')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default ClientProjectView;