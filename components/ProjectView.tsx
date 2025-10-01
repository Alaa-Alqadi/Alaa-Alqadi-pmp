import React from 'react';
import { Project, Task, TaskStatus, Client } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { TranslationKey } from '../translations';

// Simple SVG Icons
const PencilSquareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const NoSymbolIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" /></svg>;

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

interface ProjectViewProps {
  project: Project;
  clients: Client[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, updatedProperties: Partial<Task>) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
  columnOrder: TaskStatus[];
  onColumnReorder: (newOrder: TaskStatus[]) => void;
}

const ProjectView: React.FC<ProjectViewProps> = ({ 
  project, 
  clients,
  onAddTask, 
  onEditTask,
  onDeleteTask,
  onUpdateTask,
  onEditProject,
  onDeleteProject,
  columnOrder,
}) => {
  const { t } = useLanguage();
  
  const clientName = clients.find(c => c.id === project.clientId)?.name || t('unknown_client');

  const activeTasks = project.tasks.filter(t => t.status !== TaskStatus.CANCELLED);
  const projectProgress = activeTasks.length > 0
    ? activeTasks.reduce((sum, task) => sum + task.completionPercentage, 0) / activeTasks.length
    : 0;

  const tasksByStatus = project.tasks.reduce((acc, task) => {
    (acc[task.status] = acc[task.status] || []).push(task);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  return (
    <div className="text-white h-full flex flex-col">
      {/* Header */}
      <header className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <div className="flex gap-2">
            <button onClick={onAddTask} className="flex items-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium">
              <PlusIcon /> {t('add_task')}
            </button>
            <button onClick={() => onEditProject(project)} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-md"><PencilSquareIcon/></button>
            <button onClick={() => onDeleteProject(project)} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-md"><TrashIcon/></button>
          </div>
        </div>
        <p className="text-slate-400">{project.description}</p>
        <div className="mt-4 text-sm text-slate-300 grid grid-cols-2 md:grid-cols-4 gap-4">
          <p><strong>{t('client_name')}:</strong> {clientName}</p>
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
      
      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 min-w-[1500px]">
          {columnOrder.map((status) => (
            <div key={status} className="bg-slate-900 rounded-lg p-4 flex flex-col h-full">
              <h2 className="font-bold mb-4 flex justify-between">
                <span>{t(statusLabels[status])}</span>
                <span className="text-sm font-normal text-slate-400">{(tasksByStatus[status] || []).length}</span>
              </h2>
              <div className="space-y-4 overflow-y-auto">
                {(tasksByStatus[status] || []).sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()).map(task => (
                  <div key={task.id} className={`bg-slate-800 p-4 rounded-md shadow-md ${getTaskProgressStyle(task.completionPercentage).border} ${task.status === TaskStatus.CANCELLED ? 'opacity-60' : ''}`}>
                    <div className="flex justify-between items-start">
                      <h3 className={`font-bold text-md mb-2 ${task.status === TaskStatus.CANCELLED ? 'line-through' : ''}`}>{task.title}</h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => onEditTask(task)} className="text-slate-400 hover:text-white"><PencilSquareIcon/></button>
                        <button onClick={() => onUpdateTask(task.id, { status: TaskStatus.CANCELLED })} className="text-slate-400 hover:text-yellow-400"><NoSymbolIcon/></button>
                        <button onClick={() => onDeleteTask(task.id)} className="text-slate-400 hover:text-red-400"><TrashIcon/></button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 mb-3">{task.description}</p>
                    <div className="text-xs text-slate-400">
                      <p className="mb-1">{t('assignee')}: {task.assignee}</p>
                      <p>{task.startDate} &rarr; {task.endDate}</p>
                    </div>
                     <div className="mt-3">
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor={`task-progress-${task.id}`} className="text-xs text-slate-400">{t('completion_percentage')}</label>
                            <span className={`text-sm font-bold ${getTaskProgressTextColorClass(task.completionPercentage)}`}>{task.completionPercentage}%</span>
                        </div>
                        <input
                            id={`task-progress-${task.id}`}
                            type="range"
                            min="0"
                            max="100"
                            value={task.completionPercentage}
                            onChange={(e) => onUpdateTask(task.id, { completionPercentage: parseInt(e.target.value, 10) })}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                            disabled={task.status === TaskStatus.CANCELLED}
                        />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectView;