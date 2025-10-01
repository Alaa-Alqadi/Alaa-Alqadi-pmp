import React, { useState, useMemo, useEffect } from 'react';
import { Project } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { UsersIcon } from './icons/UsersIcon';
import { SearchIcon } from './icons/SearchIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { HomeIcon } from './icons/HomeIcon';
import { useLanguage } from '../hooks/useLanguage';
import { LanguageIcon } from './icons/LanguageIcon';
import { KeyIcon } from './icons/KeyIcon';

interface SidebarProps {
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (id: string | null) => void;
  onAddProject: () => void;
  onManageTeam: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  currentUser: string | null;
  onLogout: () => void;
  onChangePassword: () => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { 
      projects, selectedProjectId, onSelectProject, onAddProject, onManageTeam, 
      searchTerm, onSearchChange, currentUser, onLogout, onChangePassword
  } = props;
  const { language, setLanguage, t } = useLanguage();
  const [expandedClient, setExpandedClient] = useState<string | null>(null);

  const groupedProjects = useMemo(() => {
    return projects.reduce((acc, project) => {
      const client = project.clientName;
      if (!acc[client]) acc[client] = [];
      acc[client].push(project);
      return acc;
    }, {} as Record<string, Project[]>);
  }, [projects]);

  const sortedClients = useMemo(() => Object.keys(groupedProjects).sort(), [groupedProjects]);

  useEffect(() => {
    const selectedProject = projects.find(p => p.id === selectedProjectId);
    if (selectedProject && expandedClient !== selectedProject.clientName) {
      setExpandedClient(selectedProject.clientName);
    }
  }, [selectedProjectId, projects, expandedClient]);

  const handleToggleClient = (clientName: string) => {
    setExpandedClient(prev => (prev === clientName ? null : clientName));
  };
  
  const handleLanguageChange = () => setLanguage(language === 'ar' ? 'en' : 'ar');

  return (
    <aside className="w-72 bg-slate-900 p-4 flex flex-col border-s border-slate-800 rtl:border-s-0 rtl:border-e">
      <div>
        <div className="flex items-center mb-6 h-8">
          <h1 className="text-2xl font-bold">FIS-PMP</h1>
        </div>
        <button 
          onClick={() => onSelectProject(null)}
          className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors mb-4 ${
            selectedProjectId === null ? 'bg-brand-primary text-white' : 'text-slate-300 hover:bg-slate-750'
          }`}
        >
          <HomeIcon className="w-5 h-5 me-2" />
          {t.dashboard}
        </button>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{t.projects}</h2>
          <button onClick={onAddProject} className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md" aria-label={t.addProject}>
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="relative mb-4">
        <span className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-slate-400" />
        </span>
        <input type="text" placeholder={t.search} value={searchTerm} onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-750 border border-slate-700 rounded-md py-2 ps-4 pe-10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
        />
      </div>

      <nav className="flex-1 overflow-y-auto -ms-2 ps-2">
        <ul>
          {sortedClients.map((clientName) => (
            <li key={clientName} className="mt-1 first:mt-0">
              <button onClick={() => handleToggleClient(clientName)} className="w-full flex justify-between items-center px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-750 rounded-md text-start">
                <span>{clientName}</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${expandedClient === clientName ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all ${expandedClient === clientName ? 'max-h-[500px]' : 'max-h-0'}`}>
                <ul className="ps-4 pt-1 border-s-2 border-slate-700/50 me-3">
                  {groupedProjects[clientName].map((project) => (
                    <li key={project.id}>
                      <button onClick={() => onSelectProject(project.id)} className={`w-full text-start px-3 py-2 rounded-md text-sm font-medium ${
                          selectedProjectId === project.id ? 'bg-brand-primary text-white' : 'text-slate-300 hover:bg-slate-750'
                        }`}>
                        {project.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto space-y-2 pt-2 border-t border-slate-800">
        <button onClick={onManageTeam} className="w-full flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-750">
          <UsersIcon className="w-5 h-5 me-2" />
          {t.manageTeam}
        </button>

        <div className="p-2.5 bg-slate-850 rounded-lg">
          <div className="flex items-center">
              <UserCircleIcon className="w-8 h-8 text-slate-500 flex-shrink-0" />
              <div className="ms-2 overflow-hidden">
                  <p className="text-sm font-medium text-white truncate" title={currentUser || ''}>{currentUser}</p>
                  <p className="text-xs text-slate-400">{t.currentUser}</p>
              </div>
              <button onClick={onChangePassword} className="ms-auto p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md" title={t.changePassword}>
                  <KeyIcon className="w-5 h-5" />
              </button>
              <button onClick={handleLanguageChange} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md" title={`Switch to ${t.languageName}`}>
                  <LanguageIcon className="w-5 h-5" />
              </button>
              <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-md" aria-label={t.logout}>
                  <LogoutIcon className="w-5 h-5" />
              </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;