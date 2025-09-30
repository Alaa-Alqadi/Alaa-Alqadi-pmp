
import React from 'react';
import { Project, Task, TaskStatus } from '../types';
import KanbanBoard from './KanbanBoard';
import { PlusIcon } from './icons/PlusIcon';
import { EditIcon } from './icons/EditIcon';
import { ClientIcon } from './icons/ClientIcon';
import { ContractIcon } from './icons/ContractIcon';
import { QuoteIcon } from './icons/QuoteIcon';
import { TrashIcon } from './icons/TrashIcon';

interface ProjectViewProps {
  project: Project;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, updatedProperties: Partial<Task>) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
  columnOrder: TaskStatus[];
  onColumnReorder: (newOrder: TaskStatus[]) => void;
}

const getProjectProgressColor = (percentage: number): string => {
  if (percentage <= 40) return 'bg-green-600';
  if (percentage <= 50) return 'bg-green-400';
  if (percentage <= 70) return 'bg-orange-500';
  if (percentage <= 90) return 'bg-yellow-500';
  return 'bg-red-500';
};

const getProjectProgressTextColor = (percentage: number): string => {
  if (percentage <= 40) return 'text-green-400';
  if (percentage <= 50) return 'text-green-300';
  if (percentage <= 70) return 'text-orange-400';
  if (percentage <= 90) return 'text-yellow-400';
  return 'text-red-400';
};

const ProjectView: React.FC<ProjectViewProps> = ({ project, onAddTask, onEditTask, onDeleteTask, onUpdateTask, onEditProject, onDeleteProject, columnOrder, onColumnReorder }) => {
  const totalTasks = project.tasks.length;
  const totalCompletion = project.tasks.reduce((sum, task) => sum + task.completionPercentage, 0);
  const completionPercentage = totalTasks > 0 ? Math.round(totalCompletion / totalTasks) : 0;

  return (
    <div className="flex flex-col h-full">
      <header className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">{project.name}</h1>
            <button
                onClick={() => onEditProject(project)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                aria-label="تعديل المشروع"
            >
                <EditIcon className="w-5 h-5" />
            </button>
            <button
                onClick={() => onDeleteProject(project)}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-900/50 rounded-md transition-colors"
                aria-label="إلغاء المشروع"
            >
                <TrashIcon className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={onAddTask}
            className="flex items-center bg-brand-secondary hover:bg-brand-secondary-hover text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
          >
            <PlusIcon className="w-5 h-5 ml-2" />
            إضافة مهمة
          </button>
        </div>
        
        <div className="bg-slate-850 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
                <div>
                    <p className="text-xs text-slate-400">تاريخ البدء</p>
                    <p className="text-sm font-medium text-white">{project.startDate}</p>
                </div>
                <div className="border-r border-slate-700 h-8 hidden sm:block"></div>
                 <div>
                    <p className="text-xs text-slate-400">تاريخ الانتهاء</p>
                    <p className="text-sm font-medium text-white">{project.endDate}</p>
                </div>
                 <div className="border-r border-slate-700 h-8 hidden sm:block"></div>
                 <div>
                    <p className="text-xs text-slate-400 flex items-center"><ClientIcon className="w-3 h-3 ml-1" /> العميل</p>
                    <p className="text-sm font-medium text-white">{project.clientName}</p>
                </div>
                {project.contractId && (
                  <>
                    <div className="border-r border-slate-700 h-8 hidden sm:block"></div>
                    <div>
                        <p className="text-xs text-slate-400 flex items-center"><ContractIcon className="w-3 h-3 ml-1" /> رقم العقد</p>
                        <p className="text-sm font-medium text-white">{project.contractId}</p>
                    </div>
                  </>
                )}
                {project.quoteId && (
                  <>
                    <div className="border-r border-slate-700 h-8 hidden sm:block"></div>
                    <div>
                        <p className="text-xs text-slate-400 flex items-center"><QuoteIcon className="w-3 h-3 ml-1" /> رقم عرض السعر</p>
                        <p className="text-sm font-medium text-white">{project.quoteId}</p>
                    </div>
                  </>
                )}
            </div>
            <div className="w-full sm:w-1/3">
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate-300">نسبة الإنجاز (متوسط)</span>
                    <span className={`text-sm font-medium ${getProjectProgressTextColor(completionPercentage)}`}>{completionPercentage}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div className={`${getProjectProgressColor(completionPercentage)} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${completionPercentage}%` }}></div>
                </div>
            </div>
        </div>

      </header>
      <div className="flex-1 overflow-hidden">
        <KanbanBoard
          tasks={project.tasks}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onUpdateTask={onUpdateTask}
          columnOrder={columnOrder}
          onColumnReorder={onColumnReorder}
        />
      </div>
    </div>
  );
};

export default ProjectView;
