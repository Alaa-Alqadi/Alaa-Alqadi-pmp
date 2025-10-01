import React, { useState, useEffect } from 'react';
import { Task, TaskPriority } from '../types';
import { useLanguage } from '../hooks/useLanguage';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: Omit<Task, 'id' | 'createdDate' | 'status'> & { completionPercentage: number }) => void;
  task: Task | null;
  teamMembers: string[];
}

const getTaskProgressTextColorClass = (percentage: number): string => {
  if (percentage === 100) return 'text-green-500';
  if (percentage >= 91 && percentage <= 99) return 'text-green-600';
  if (percentage >= 81 && percentage <= 90) return 'text-green-400';
  if (percentage >= 51 && percentage <= 80) return 'text-orange-500';
  if (percentage >= 31 && percentage <= 50) return 'text-yellow-500';
  if (percentage >= 0 && percentage <= 30) return 'text-red-500';
  return 'text-slate-400';
};

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onSave, task, teamMembers }) => {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState(teamMembers[0] || '');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setAssignee(task.assignee);
      setStartDate(task.startDate);
      setEndDate(task.endDate);
      setPriority(task.priority);
      setCompletionPercentage(task.completionPercentage);
    } else {
      // Reset form for new task
      setTitle('');
      setDescription('');
      setAssignee(teamMembers[0] || '');
      setStartDate('');
      setEndDate('');
      setPriority(TaskPriority.MEDIUM);
      setCompletionPercentage(0);
    }
  }, [task, isOpen, teamMembers]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      assignee,
      startDate,
      endDate,
      priority,
      completionPercentage,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 p-6 rounded-lg text-white w-full max-w-lg max-h-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{task ? t('edit_task_title') : t('new_task_title')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="taskTitle" className="block text-sm font-medium text-slate-300">{t('task_title')}</label>
            <input id="taskTitle" type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="taskDescription" className="block text-sm font-medium text-slate-300">{t('task_description')}</label>
            <textarea id="taskDescription" value={description} onChange={e => setDescription(e.target.value)} required rows={3} className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="assignee" className="block text-sm font-medium text-slate-300">{t('assignee')}</label>
              <select id="assignee" value={assignee} onChange={e => setAssignee(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                {teamMembers.map(member => <option key={member} value={member}>{member}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-slate-300">{t('priority')}</label>
              <select id="priority" value={priority} onChange={e => setPriority(e.target.value as TaskPriority)} required className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value={TaskPriority.LOW}>{t('low')}</option>
                <option value={TaskPriority.MEDIUM}>{t('medium')}</option>
                <option value={TaskPriority.HIGH}>{t('high')}</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="taskStartDate" className="block text-sm font-medium text-slate-300">{t('start_date')}</label>
              <input id="taskStartDate" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="taskEndDate" className="block text-sm font-medium text-slate-300">{t('end_date')}</label>
              <input id="taskEndDate" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label htmlFor="completionPercentage" className="block text-sm font-medium text-slate-300">{t('completion_percentage')}</label>
            <input id="completionPercentage" type="range" min="0" max="100" step="1" value={completionPercentage} onChange={e => setCompletionPercentage(parseInt(e.target.value, 10))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
            <div className={`text-center text-sm font-bold mt-1 ${getTaskProgressTextColorClass(completionPercentage)}`}>{completionPercentage}%</div>
          </div>
          <div className="mt-6 flex gap-4 justify-end">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-slate-600 hover:bg-slate-500 rounded-md">{t('cancel')}</button>
            <button type="submit" className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md">{t('save')}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;