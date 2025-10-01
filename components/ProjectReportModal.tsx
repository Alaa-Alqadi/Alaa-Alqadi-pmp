import React from 'react';
import { Project, Task, TaskStatus, Risk, RiskLevel } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { TranslationKey } from '../translations';

interface ProjectReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  clientName: string;
}

const statusLabels: Record<TaskStatus, TranslationKey> = {
  [TaskStatus.TODO]: 'todo',
  [TaskStatus.IN_PROGRESS]: 'in_progress',
  [TaskStatus.HANDOVER]: 'handover',
  [TaskStatus.DONE]: 'done',
  [TaskStatus.CANCELLED]: 'cancelled',
};

// Helper functions for dynamic progress bar color
const getProgressColorClass = (percentage: number): string => {
  const p = Math.round(percentage);
  if (p === 100) return 'bg-green-500';
  if (p >= 91 && p <= 99) return 'bg-green-600';
  if (p >= 81 && p <= 90) return 'bg-green-400';
  if (p >= 51 && p <= 80) return 'bg-orange-500';
  if (p >= 31 && p <= 50) return 'bg-yellow-500';
  if (p >= 0 && p <= 30) return 'bg-red-500';
  return 'bg-slate-600';
};

const getProgressHexColor = (percentage: number): string => {
  const p = Math.round(percentage);
  if (p === 100) return '#22c55e';
  if (p >= 91 && p <= 99) return '#16a34a';
  if (p >= 81 && p <= 90) return '#4ade80';
  if (p >= 51 && p <= 80) return '#f97316';
  if (p >= 31 && p <= 50) return '#eab308';
  if (p >= 0 && p <= 30) return '#ef4444';
  return '#475569';
};

// Risk Calculation Logic
const getRiskLevelColor = (level: RiskLevel): string => {
    switch(level) {
        case RiskLevel.LOW: return 'bg-green-500';
        case RiskLevel.MEDIUM: return 'bg-yellow-500';
        case RiskLevel.HIGH: return 'bg-red-500';
        case RiskLevel.VERY_HIGH: return 'bg-red-700';
        default: return 'bg-slate-500';
    }
};

const getRiskLevelHexColor = (level: RiskLevel): string => {
    switch(level) {
        case RiskLevel.LOW: return '#22c55e';
        case RiskLevel.MEDIUM: return '#eab308';
        case RiskLevel.HIGH: return '#ef4444';
        case RiskLevel.VERY_HIGH: return '#b91c1c';
        default: return '#64748b';
    }
}

const calculateOverallRisk = (likelihood: RiskLevel, impact: RiskLevel): RiskLevel => {
    const levelMap = { [RiskLevel.LOW]: 1, [RiskLevel.MEDIUM]: 2, [RiskLevel.HIGH]: 3, [RiskLevel.VERY_HIGH]: 4 };
    const score = levelMap[likelihood] * levelMap[impact];
    
    if (score > 8) return RiskLevel.VERY_HIGH;
    if (score > 4) return RiskLevel.HIGH;
    if (score > 2) return RiskLevel.MEDIUM;
    return RiskLevel.LOW;
};

const ProjectReportModal: React.FC<ProjectReportModalProps> = ({ isOpen, onClose, project, clientName }) => {
  const { t } = useLanguage();

  if (!isOpen) {
    return null;
  }
  
  const activeTasks = project.tasks.filter(t => t.status !== TaskStatus.CANCELLED);
  const projectProgress = activeTasks.length > 0
    ? activeTasks.reduce((sum, task) => sum + task.completionPercentage, 0) / activeTasks.length
    : 0;
    
  const taskCounts = project.tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<TaskStatus, number>);

  const totalTasks = project.tasks.length;
  const sortedTasks = [...project.tasks].sort((a, b) => b.completionPercentage - a.completionPercentage);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert("Please allow pop-ups for this website to print the report.");
        return;
    }
    
    const progressColor = getProgressHexColor(projectProgress);

    const tasksHTML = sortedTasks.map((task: Task) => `
      <div class="task-item">
        <h4>${task.title} <span class="status-badge">${t(statusLabels[task.status])}</span></h4>
        <p class="task-meta">
            <span><strong>${t('assignee')}:</strong> ${task.assignee}</span> | 
            <span>${task.startDate} &rarr; ${task.endDate}</span>
        </p>
        <p class="task-description">${task.description}</p>
        <div class="task-progress-container">
            <div class="task-progress-bar" style="width: ${task.completionPercentage}%; background-color: ${getProgressHexColor(task.completionPercentage)};">
                ${task.completionPercentage}%
            </div>
        </div>
      </div>
    `).join('');

    const risksHTML = project.risks.length > 0 ? project.risks.map((risk: Risk) => {
        const overallRisk = calculateOverallRisk(risk.likelihood, risk.impact);
        return `
            <div class="risk-item">
            <h4>${risk.description} <span class="risk-badge" style="background-color: ${getRiskLevelHexColor(overallRisk)};">${t(overallRisk.toLowerCase() as any)}</span></h4>
            <div class="risk-meta">
                <p><strong>${t('likelihood')}:</strong> ${t(risk.likelihood.toLowerCase() as any)}</p>
                <p><strong>${t('impact')}:</strong> ${t(risk.impact.toLowerCase() as any)}</p>
            </div>
            <p class="risk-mitigation"><strong>${t('mitigation_plan')}:</strong> ${risk.mitigation || t('not_applicable')}</p>
            </div>
        `;
    }).join('') : `<p>${t('no_risks_saved_yet')}</p>`;

    const reportHTML = `
      <html>
        <head>
          <title>${project.name} - ${t('project_report')}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; padding: 20px; direction: ${document.dir}; }
            
            .print-header, .print-footer { display: none; }

            @media print {
              @page {
                margin: 60px 20px;
              }
              body {
                margin: 0;
                padding: 0;
              }
              .print-header, .print-footer {
                display: block;
                position: fixed;
                left: 0;
                right: 0;
                width: 100%;
                text-align: center;
                background-color: white;
              }
              .print-header {
                top: 0;
                font-size: 1.1em;
                font-weight: bold;
                border-bottom: 1px solid #ccc;
                padding: 10px 0;
              }
              .print-footer {
                bottom: 0;
                font-size: 0.8em;
                color: #555;
                border-top: 1px solid #ccc;
                padding: 10px 0;
              }
            }
            
            h1, h2, h3 { margin-top: 1.5em; margin-bottom: 0.5em; }
            h1 { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .progress-bar { width: 100%; background-color: #f3f3f3; border: 1px solid #ccc; border-radius: 4px; }
            .progress-fill { height: 24px; width: ${Math.round(projectProgress)}%; background-color: ${progressColor}; color: white; text-align: center; line-height: 24px; border-radius: 4px; }
            .task-item { border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; border-radius: 5px; page-break-inside: avoid; }
            .task-item h4 { margin-top: 0; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: center; }
            .status-badge { font-size: 0.8em; font-weight: normal; background-color: #eee; padding: 3px 8px; border-radius: 10px; }
            .task-meta { font-size: 0.9em; color: #555; margin-bottom: 10px; }
            .task-description { margin-bottom: 10px; }
            .task-progress-container { width: 100%; background-color: #f3f3f3; border-radius: 4px; }
            .task-progress-bar { height: 20px; color: white; text-align: center; line-height: 20px; border-radius: 4px; font-size: 0.9em; }
            .risk-item { border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; border-radius: 5px; page-break-inside: avoid; }
            .risk-item h4 { margin-top: 0; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: center; }
            .risk-badge { font-size: 0.8em; font-weight: normal; color: white; padding: 3px 8px; border-radius: 10px; }
            .risk-meta { display: flex; gap: 20px; font-size: 0.9em; color: #555; margin-bottom: 10px; }
            .risk-mitigation { margin-bottom: 5px; }
          </style>
        </head>
        <body>
          <div class="print-header">
            FIS-Flexi Integrated Solutions
          </div>

          <h1>${project.name}</h1>
          <p><strong>${t('client_name')}:</strong> ${clientName}</p>
          <p><strong>${t('project_description')}:</strong> ${project.description}</p>
          
          <h3>${t('overall_progress')}</h3>
          <div class="progress-bar">
            <div class="progress-fill">${Math.round(projectProgress)}%</div>
          </div>
          
          <h3>${t('task_summary')}</h3>
          <table>
            <tr>
              <th>${t('status')}</th>
              <th>${t('tasks')}</th>
            </tr>
            <tr>
              <td>${t('total_tasks')}</td>
              <td>${totalTasks}</td>
            </tr>
            ${Object.values(TaskStatus).map(status => `
              <tr>
                <td>${t(statusLabels[status])}</td>
                <td>${taskCounts[status] || 0}</td>
              </tr>
            `).join('')}
          </table>

          <h3>${t('tasks')}</h3>
          ${tasksHTML}
          
          <h3>${t('risk_assessment')}</h3>
          ${risksHTML}
          
          <div class="print-footer">
            The Business Gate, Qurtubah District, ,Riyadh 13244, Saudi Arabia | www.flexi-is.com
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(reportHTML);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { // Timeout to allow content to render
        printWindow.print();
        printWindow.close();
    }, 250);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 p-6 rounded-lg text-white w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t('project_report')}</h2>
          <div className="flex gap-2">
            <button onClick={handlePrint} className="py-2 px-4 bg-slate-600 hover:bg-slate-500 rounded-md text-sm">{t('print')}</button>
            <button onClick={onClose} className="py-2 px-4 bg-slate-600 hover:bg-slate-500 rounded-md text-sm">{t('close')}</button>
          </div>
        </div>
        
        <div id="report-content" className="overflow-y-auto bg-slate-900/50 p-4 rounded-md">
          <div className="text-center border-b border-slate-700 pb-4 mb-4">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <p className="text-slate-400">{clientName}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{t('project_description')}</h3>
            <p className="text-slate-300">{project.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
            <div><strong>{t('start_date')}:</strong> {project.startDate}</div>
            <div><strong>{t('end_date')}:</strong> {project.endDate}</div>
            <div><strong>{t('contract_id')}:</strong> {project.contractId || t('not_applicable')}</div>
            <div><strong>{t('quote_id')}:</strong> {project.quoteId || t('not_applicable')}</div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{t('overall_progress')}</h3>
            <div className="w-full bg-slate-700 rounded-full h-4">
              <div className={`${getProgressColorClass(projectProgress)} h-4 rounded-full text-xs text-white text-center flex items-center justify-center`} style={{ width: `${projectProgress}%` }}>
                {Math.round(projectProgress)}%
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{t('task_summary')}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
              <div className="bg-slate-700 p-3 rounded">
                <h4 className="font-bold text-slate-300">{t('total_tasks')}</h4>
                <p className="text-2xl font-bold">{totalTasks}</p>
              </div>
              {Object.values(TaskStatus).map(status => (
                 <div key={status} className="bg-slate-700 p-3 rounded">
                    <h4 className="font-bold text-slate-300">{t(statusLabels[status])}</h4>
                    <p className="text-2xl font-bold">{taskCounts[status] || 0}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">{t('tasks')}</h3>
            <div className="space-y-4">
              {sortedTasks.map(task => (
                <div key={task.id} className="bg-slate-700/50 p-4 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg">{task.title}</h4>
                    <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-slate-600">{t(statusLabels[task.status])}</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-3">{task.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs text-slate-400 mb-3">
                    {/* FIX: Corrected a typo to access the task's assignee property instead of trying to access it on the translation function. */}
                    <div><strong>{t('assignee')}:</strong> {task.assignee}</div>
                    <div><strong>{t('start_date')}:</strong> {task.startDate}</div>
                    <div><strong>{t('end_date')}:</strong> {task.endDate}</div>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2.5">
                    <div 
                      className={`${getProgressColorClass(task.completionPercentage)} h-2.5 rounded-full text-xs text-white text-center flex items-center justify-center`} 
                      style={{ width: `${task.completionPercentage}%` }}
                    >
                      {task.completionPercentage > 10 ? `${task.completionPercentage}%` : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">{t('risk_assessment')}</h3>
            {project.risks.length > 0 ? (
                <div className="space-y-4">
                    {project.risks.map(risk => {
                        const overallRisk = calculateOverallRisk(risk.likelihood, risk.impact);
                        return (
                            <div key={risk.id} className="bg-slate-700/50 p-4 rounded-md">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-lg flex-1">{risk.description}</h4>
                                    <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${getRiskLevelColor(overallRisk)}`}>
                                        {t(overallRisk.toLowerCase() as any)}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-400 mb-3">
                                    <div><strong>{t('likelihood')}:</strong> {t(risk.likelihood.toLowerCase() as any)}</div>
                                    <div><strong>{t('impact')}:</strong> {t(risk.impact.toLowerCase() as any)}</div>
                                </div>
                                <p className="text-sm text-slate-300"><strong>{t('mitigation_plan')}:</strong> {risk.mitigation || t('not_applicable')}</p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-sm text-slate-400">{t('no_risks_saved_yet')}</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectReportModal;
