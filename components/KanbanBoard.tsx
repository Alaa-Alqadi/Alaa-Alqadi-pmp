import React, { useState } from 'react';
import { Task, TaskStatus } from '../types';
import TaskCard from './TaskCard';

interface KanbanBoardProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, updatedProperties: Partial<Task>) => void;
  columnOrder: TaskStatus[];
  onColumnReorder: (newOrder: TaskStatus[]) => void;
}

interface KanbanColumnProps {
  title: string;
  count: number;
  children: React.ReactNode;
  hasOverdueTasks?: boolean;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, count, children, hasOverdueTasks }) => (
  <div className={`bg-slate-850 rounded-lg p-4 w-full flex flex-col h-full transition-colors duration-300 ${hasOverdueTasks ? 'bg-red-950/20' : ''}`}>
    <div className="flex items-center justify-between mb-4">
      <h3 className={`font-semibold transition-colors duration-300 ${hasOverdueTasks ? 'text-red-300' : 'text-slate-300'}`}>{title}</h3>
      <span className={`text-xs font-bold px-2 py-1 rounded-full transition-colors duration-300 ${hasOverdueTasks ? 'bg-red-500/50 text-white' : 'bg-slate-700 text-slate-300'}`}>{count}</span>
    </div>
    <div className="flex-1 overflow-y-auto space-y-4 -ml-2 pl-2">
      {children}
    </div>
  </div>
);

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onEditTask, onDeleteTask, onUpdateTask, columnOrder, onColumnReorder }) => {
  const [draggedColumn, setDraggedColumn] = useState<TaskStatus | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);

  const statusToTitle: Record<TaskStatus, string> = {
    [TaskStatus.TODO]: 'قيد التنفيذ',
    [TaskStatus.IN_PROGRESS]: 'جاري العمل',
    [TaskStatus.DONE]: 'مكتمل',
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, status: TaskStatus) => {
    e.dataTransfer.setData('text/plain', status);
    setDraggedColumn(status);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, status: TaskStatus) => {
    e.preventDefault();
    if (status !== dragOverColumn) {
      setDragOverColumn(status);
    }
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetStatus: TaskStatus) => {
    e.preventDefault();
    const sourceStatus = e.dataTransfer.getData('text/plain') as TaskStatus;

    if (sourceStatus && sourceStatus !== targetStatus) {
      const sourceIndex = columnOrder.indexOf(sourceStatus);
      const targetIndex = columnOrder.indexOf(targetStatus);
      
      const newOrder = Array.from(columnOrder);
      const [removed] = newOrder.splice(sourceIndex, 1);
      newOrder.splice(targetIndex, 0, removed);
      
      onColumnReorder(newOrder);
    }
    setDragOverColumn(null);
    setDraggedColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full" onDragLeave={handleDragLeave}>
      {columnOrder.map((status) => {
        const filteredTasks = tasks.filter((task) => task.status === status);
        const hasOverdueTasks = filteredTasks.some(task => new Date(task.endDate) < today && task.completionPercentage < 100);
        
        return (
          <div
            key={status}
            draggable
            onDragStart={(e) => handleDragStart(e, status)}
            onDragOver={(e) => handleDragOver(e, status)}
            onDrop={(e) => handleDrop(e, status)}
            onDragEnd={handleDragEnd}
            className={`w-full md:w-1/3 flex flex-col transition-all duration-200 ${draggedColumn === status ? 'opacity-30' : 'opacity-100'} ${dragOverColumn === status && draggedColumn !== status ? 'outline outline-2 outline-brand-secondary outline-dashed rounded-lg' : ''}`}
          >
            <KanbanColumn title={statusToTitle[status]} count={filteredTasks.length} hasOverdueTasks={hasOverdueTasks}>
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                  onUpdateTask={onUpdateTask}
                />
              ))}
            </KanbanColumn>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;