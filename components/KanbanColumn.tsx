import React from 'react';
import { DragHandleIcon } from './icons/DragHandleIcon';

const KanbanColumn: React.FC<{ title: string; count: number; children: React.ReactNode }> = ({ title, count, children }) => (
  <div className="bg-slate-850 rounded-lg p-4 w-full flex flex-col h-full">
    <div className="flex items-center justify-between mb-4 cursor-grab">
        <div className="flex items-center gap-2">
            <DragHandleIcon className="w-5 h-5 text-slate-500" />
            <h3 className="font-semibold text-slate-300">{title}</h3>
        </div>
      <span className="bg-slate-700 text-slate-300 text-xs font-bold px-2 py-1 rounded-full">{count}</span>
    </div>
    <div className="flex-1 overflow-y-auto space-y-4 -ml-2 pl-2">
      {children}
    </div>
  </div>
);

export default KanbanColumn;
