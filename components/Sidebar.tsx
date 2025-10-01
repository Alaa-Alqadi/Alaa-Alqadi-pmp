import React, { useMemo } from 'react';
import { Project, Client } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import LanguageSwitcher from './LanguageSwitcher';

interface SidebarProps {
  projects: Project[];
  clients: Client[];
  selectedProjectId: string | null;
  onSelectProject: (id: string | null) => void;
  onAddProject: () => void;
  onManageTeam: () => void;
  onManageClients: () => void;
  onChangePassword: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  currentUser: string | null;
  onLogout: () => void;
}

const Cog6ToothIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.424.35.534.954.26 1.431l-1.296 2.247a1.125 1.125 0 0 1-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.075.124a6.57 6.57 0 0 1-.22.127c-.332.183-.582.495-.645.87l-.213 1.281c-.09.543-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 0 1-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 0 1-1.37-.49l-1.296-2.247a1.125 1.125 0 0 1 .26-1.431l1.003-.827c.293-.24.438.613-.438.995s-.145-.755-.438-.995l-1.003-.827a1.125 1.125 0 0 1-.26-1.431l1.296-2.247a1.125 1.125 0 0 1 1.37-.49l1.217.456c.355.133.75.072 1.075-.124.073-.044.146-.087.22-.127.332-.183.582-.495-.645-.87l.213-1.281Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;


const Sidebar: React.FC<SidebarProps> = ({
  projects,
  clients,
  selectedProjectId,
  onSelectProject,
  onAddProject,
  onManageTeam,
  onManageClients,
  onChangePassword,
  searchTerm,
  onSearchChange,
  currentUser,
  onLogout
}) => {
  const { t, language } = useLanguage();

  const projectsByClient = useMemo(() => {
    const grouped: { [key: string]: Project[] } = {};
    projects.forEach(project => {
      if (!grouped[project.clientId]) {
        grouped[project.clientId] = [];
      }
      grouped[project.clientId].push(project);
    });
    return grouped;
  }, [projects]);

  const clientNameMap = useMemo(() => new Map(clients.map(c => [c.id, c.name])), [clients]);

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="w-80 h-full bg-slate-900 p-4 flex-shrink-0 border-e border-slate-800 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">FIS-PMP</h1>
        <LanguageSwitcher />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder={t('search_projects')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 text-white bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-slate-200">{t('projects')}</h2>
        <button onClick={onAddProject} className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md" aria-label={t('add_project')}>
            <PlusIcon />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto pr-2 -mr-2">
        <ul>
          {Object.keys(projectsByClient).map(clientId => (
            <li key={clientId} className="mb-2">
              <h3 className="text-sm font-bold text-slate-400 px-3 py-1 uppercase">{clientNameMap.get(clientId) || t('unknown_client')}</h3>
              <ul>
                {projectsByClient[clientId].map(project => (
                  <li key={project.id}>
                    <button
                      onClick={() => onSelectProject(project.id)}
                      className={`w-full text-left px-3 py-2 rounded-md truncate ${
                        selectedProjectId === project.id
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {project.name}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-slate-800">
        <button onClick={onAddProject} className="w-full mb-2 py-2 text-white bg-slate-700 rounded-md hover:bg-slate-600">
          {t('add_project')}
        </button>
        <button onClick={onManageClients} className="w-full mb-2 py-2 text-white bg-slate-700 rounded-md hover:bg-slate-600">
          {t('manage_clients')}
        </button>
        <button onClick={onManageTeam} className="w-full mb-4 py-2 text-white bg-slate-700 rounded-md hover:bg-slate-600">
          {t('manage_team')}
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <button onClick={onChangePassword} className="text-slate-400 hover:text-white flex-shrink-0">
                <Cog6ToothIcon />
            </button>
            <span className="text-sm text-slate-400 truncate" title={currentUser || ''}>{currentUser}</span>
          </div>
          <button onClick={onLogout} className="text-sm text-slate-400 hover:text-white flex-shrink-0">
            {t('logout')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;