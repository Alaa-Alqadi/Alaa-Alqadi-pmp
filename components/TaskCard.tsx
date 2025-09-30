import React from 'react';
import { Task, TaskPriority } from '../types';
import { UserIcon } from './icons/UserIcon';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { WarningIcon } from './icons/WarningIcon';
import { PlusCircleIcon } from './icons/PlusCircleIcon';
import { useLanguage } from '../hooks/useLanguage';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onUpdateTask: (taskId: string, updatedProperties: Partial<Task>) => void;
}

const priorityClasses: Record<TaskPriority, { bg: string; text: string; border: string }> = {
  [TaskPriority.HIGH]: { bg: 'bg-red-900/50', text: 'text-red-300', border: 'border-red-500' },
  [TaskPriority.MEDIUM]: { bg: 'bg-yellow-900/50', text: 'text-yellow-300', border: 'border-yellow-500' },
  [TaskPriority.LOW]: { bg: 'bg-green-900/50', text: 'text-green-300', border: 'border-green-500' },
};

const getTaskProgressAccentColor = (percentage: number): string => {
  if (percentage <= 40) return 'accent-green-600';
  if (percentage <= 50) return 'accent-green-400';
  if (percentage <= 70) return 'accent-orange-500';
  if (percentage <= 90) return 'accent-yellow-500';
  return 'accent-red-500';
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onUpdateTask }) => {
  const { t } = useLanguage();
  const { border } = priorityClasses[task.priority];

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateTask(task.id, { completionPercentage: parseInt(e.target.value, 10) });
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to the beginning of the day for accurate comparison
  const isOverdue = new Date(task.endDate) < today && task.completionPercentage < 100;

  const cardClasses = `p-4 rounded-lg shadow-lg border-e-4 group transition-all duration-300 ${
    isOverdue
      ? 'bg-red-950/40 border-red-500 animate-pulse-border'
      : `bg-slate-800 ${border}`
  }`;


  return (
    <div className={cardClasses}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-white mb-1 ps-2">{task.title}</h4>
        <div className="flex items-center space-x-2 space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(task)} className="p-1 text-slate-400 hover:text-white" aria-label={t.editTask}>
            <EditIcon className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(task.id)} className="p-1 text-slate-400 hover:text-red-400" aria-label={t.deleteTask}>
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-400 mb-3">{task.description}</p>
      
      <div className="flex items-center text-xs text-slate-500 mb-4">
        {isOverdue && (
            <div className="relative flex items-center group/tooltip">
                <WarningIcon className="w-4 h-4 text-red-400" />
                <span className="absolute bottom-full mb-2 -end-1/2 translate-x-1/2 rtl:-translate-x-1/2 w-max px-2 py-1 bg-slate-950 text-white text-xs rounded-md shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10">
                    {t.overdueTaskTooltip}
                </span>
            </div>
        )}
        <CalendarIcon className="w-4 h-4 mx-1" />
        <span>{task.startDate}</span>
        <span className="mx-1.5">→</span>
        <span className={isOverdue ? 'text-red-400 font-bold' : ''}>{task.endDate}</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-400">{t.progress}</span>
            <span className="font-bold text-white">{task.completionPercentage}%</span>
        </div>
        <input 
            type="range" 
            min="0" 
            max="100" 
            step="5"
            value={task.completionPercentage}
            onChange={handlePercentageChange}
            className={`w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer range-sm ${getTaskProgressAccentColor(task.completionPercentage)}`}
        />
      </div>

      <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-700/50">
        <div className="flex items-center text-slate-400 gap-3 text-sm">
            <div className="flex items-center">
                <UserIcon className="w-4 h-4 me-1 text-slate-500" />
                {task.assignee}
            </div>
            <div className="flex items-center text-xs" title={t.createdOn(task.createdDate)}>
                <PlusCircleIcon className="w-4 h-4 me-1 text-slate-500" />
                <span>{task.createdDate}</span>
            </div>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityClasses[task.priority].bg} ${priorityClasses[task.priority].text}`}>
            {t[`priority_${task.priority}`]}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;