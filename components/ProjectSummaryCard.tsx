import React from 'react';
import { Project } from '../types';
import { CalendarIcon } from './icons/CalendarIcon';
import { useLanguage } from '../hooks/useLanguage';

interface ProjectSummaryCardProps {
  project: Project;
  onClick: () => void;
}

const getProjectProgressColor = (percentage: number): string => {
  if (percentage >= 100) return 'bg-green-500';
  if (percentage >= 75) return 'bg-sky-500';
  if (percentage >= 50) return 'bg-yellow-500';
  return 'bg-orange-500';
};

const getProjectProgressTextColor = (percentage: number): string => {
  if (percentage >= 100) return 'text-green-400';
  if (percentage >= 75) return 'text-sky-400';
  if (percentage >= 50) return 'text-yellow-400';
  return 'text-orange-400';
};

const ProjectSummaryCard: React.FC<ProjectSummaryCardProps> = ({ project, onClick }) => {
  const { t } = useLanguage();
  const totalTasks = project.tasks.length;
  const totalCompletion = project.tasks.reduce((sum, task) => sum + task.completionPercentage, 0);
  const completionPercentage = totalTasks > 0 ? Math.round(totalCompletion / totalTasks) : 0;

  return (
    <button
      onClick={onClick}
      className="bg-slate-850 p-5 rounded-lg text-start w-full transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:ring-2 hover:ring-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-white truncate pr-2">{project.name}</h3>
            {completionPercentage >= 100 && (
                <span className="bg-green-500/20 text-green-300 text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0">{t.completed}</span>
            )}
        </div>
        <p className="text-xs text-slate-400 flex items-center mb-4">
          <CalendarIcon className="w-4 h-4 me-1.5" />
          {project.startDate} &ndash; {project.endDate}
        </p>
        
        <div className="mt-auto">
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium text-slate-300">{t.progress}</span>
            <span className={`text-xs font-bold ${getProjectProgressTextColor(completionPercentage)}`}>
              {completionPercentage}%
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className={`${getProjectProgressColor(completionPercentage)} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ProjectSummaryCard;