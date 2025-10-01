import React from 'react';
import { Project, Client } from '../types';
import { useLanguage } from '../hooks/useLanguage';

interface DashboardViewProps {
  projects: Project[];
  clients: Client[];
  onSelectProject: (id: string) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ projects, clients, onSelectProject }) => {
  const { t } = useLanguage();
  const clientNameMap = new Map(clients.map(c => [c.id, c.name]));

  return (
    <div className="p-4 text-white flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-4xl font-bold mb-2">{t('dashboard')}</h1>
      {projects.length > 0 ? (
         <p className="text-slate-400 mt-2">{t('select_project_prompt')}</p>
      ) : (
        <p className="text-slate-400 mt-2">{t('no_projects_found')}</p>
      )}
       <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
         {projects.map(project => (
           <div key={project.id} onClick={() => onSelectProject(project.id)} className="bg-slate-800 p-6 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors flex flex-col text-right">
             <h2 className="text-xl font-bold text-white mb-2">{project.name}</h2>
             <p className="text-slate-300 text-sm font-semibold mb-2">{clientNameMap.get(project.clientId) || t('unknown_client')}</p>
             <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">{project.description}</p>
             <div className="text-xs text-slate-500 mt-auto">
               <span>{project.startDate}</span> &rarr; <span>{project.endDate}</span>
             </div>
           </div>
         ))}
       </div>
    </div>
  ); 
}

export default DashboardView;