import React, { useState, useEffect, useCallback } from 'react';
import { Task, TaskPriority, TaskStatus } from '../types';
import Modal from './Modal';
import { useLanguage } from '../hooks/useLanguage';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: Omit<Task, 'id' | 'createdDate'>) => void;
  task: Task | null;
  teamMembers: string[];
}

const getStatusFromPercentage = (percentage: number): TaskStatus => {
  if (percentage >= 100) return TaskStatus.DONE;
  if (percentage > 0) return TaskStatus.IN_PROGRESS;
  return TaskStatus.TODO;
};

const getTaskProgressAccentColor = (percentage: number): string => {
  if (percentage <= 40) return 'accent-green-600';
  if (percentage <= 50) return 'accent-green-400';
  if (percentage <= 70) return 'accent-orange-500';
  if (percentage <= 90) return 'accent-yellow-500';
  return 'accent-red-500';
};

const getTaskProgressTextColor = (percentage: number): string => {
  if (percentage <= 40) return 'text-green-400';
  if (percentage <= 50) return 'text-green-300';
  if (percentage <= 70) return 'text-orange-400';
  if (percentage <= 90) return 'text-yellow-400';
  return 'text-red-400';
};


const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onSave, task, teamMembers }) => {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState(teamMembers[0] || '');
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setAssignee(task.assignee);
      setStatus(task.status);
      setPriority(task.priority);
      setStartDate(task.startDate);
      setEndDate(task.endDate);
      setCompletionPercentage(task.completionPercentage);
    } else {
      setTitle('');
      setDescription('');
      setAssignee(teamMembers[0] || '');
      setStatus(TaskStatus.TODO);
      setPriority(TaskPriority.MEDIUM);
      setStartDate('');
      setEndDate('');
      setCompletionPercentage(0);
    }
  }, [task, isOpen, teamMembers]);

  const handlePercentageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const percentage = parseInt(e.target.value, 10);
    setCompletionPercentage(percentage);
    setStatus(getStatusFromPercentage(percentage));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !startDate || !endDate) return;

    onSave({ title, description, assignee, status, priority, startDate, endDate, completionPercentage });
  };

  const commonInputClasses = "w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task ? t.editTaskTitle : t.createNewTaskTitle}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="taskTitle" className="block text-sm font-medium text-slate-300 mb-1">{t.taskNameLabel}</label>
          <input type="text" id="taskTitle" value={title} onChange={(e) => setTitle(e.target.value)} className={commonInputClasses} required autoFocus />
        </div>
        <div>
          <label htmlFor="taskDescription" className="block text-sm font-medium text-slate-300 mb-1">{t.descriptionLabel}</label>
          <textarea id="taskDescription" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={commonInputClasses} />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="taskStartDate" className="block text-sm font-medium text-slate-300 mb-1">{t.startDateLabel}</label>
                <input 
                    type="date" 
                    id="taskStartDate" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={commonInputClasses}
                    required
                />
            </div>
            <div>
                <label htmlFor="taskEndDate" className="block text-sm font-medium text-slate-300 mb-1">{t.endDateLabel}</label>
                <input 
                    type="date" 
                    id="taskEndDate" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={commonInputClasses}
                    required
                />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="taskAssignee" className="block text-sm font-medium text-slate-300 mb-1">{t.assigneeLabel}</label>
            <select id="taskAssignee" value={assignee} onChange={(e) => setAssignee(e.target.value)} className={commonInputClasses}>
              {teamMembers.map(member => <option key={member} value={member}>{member}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="taskPriority" className="block text-sm font-medium text-slate-300 mb-1">{t.priorityLabel}</label>
            <select id="taskPriority" value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)} className={commonInputClasses}>
              {Object.values(TaskPriority).map(p => <option key={p} value={p}>{t[`priority_${p}`]}</option>)}
            </select>
          </div>
        </div>
         <div>
            <label htmlFor="taskCompletion" className="block text-sm font-medium text-slate-300 mb-1">
                {t.completionPercentageLabel(completionPercentage, t[`status_${status}`])}
            </label>
            <input
                id="taskCompletion"
                type="range"
                min="0"
                max="100"
                step="5"
                value={completionPercentage}
                onChange={handlePercentageChange}
                className={`w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer ${getTaskProgressAccentColor(completionPercentage)}`}
            />
         </div>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors">{t.cancel}</button>
          <button type="submit" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-brand-secondary hover:bg-brand-secondary-hover transition-colors">
            {task ? t.saveChanges : t.addTaskButton}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;