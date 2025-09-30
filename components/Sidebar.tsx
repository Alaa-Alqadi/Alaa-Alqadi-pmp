import React, { useState, useMemo, useEffect } from 'react';
import { Project } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { UsersIcon } from './icons/UsersIcon';
import { SearchIcon } from './icons/SearchIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { HomeIcon } from './icons/HomeIcon';

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
}

const Sidebar: React.FC<SidebarProps> = ({ projects, selectedProjectId, onSelectProject, onAddProject, onManageTeam, searchTerm, onSearchChange, currentUser, onLogout }) => {
  const [expandedClient, setExpandedClient] = useState<string | null>(null);

  const groupedProjects = useMemo(() => {
    return projects.reduce((acc, project) => {
      const client = project.clientName;
      if (!acc[client]) {
        acc[client] = [];
      }
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

  return (
    <aside className="w-64 bg-slate-900 p-4 flex flex-col border-l border-slate-800">
      <div>
        <div className="flex items-center mb-6 h-8">
          <h1 className="text-2xl font-bold">FIS-PMP</h1>
        </div>

        <button 
          onClick={() => onSelectProject(null)}
          className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors mb-4 ${
            selectedProjectId === null
              ? 'bg-brand-primary text-white'
              : 'text-slate-300 hover:bg-slate-750 hover:text-white'
          }`}
        >
          <HomeIcon className="w-5 h-5 ml-2" />
          لوحة المعلومات
        </button>

        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">المشاريع</h2>
          <button
            onClick={onAddProject}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
            aria-label="إضافة مشروع جديد"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="relative mb-4">
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-slate-400" />
        </span>
        <input
            type="text"
            placeholder="بحث..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-750 border border-slate-700 rounded-md py-2 pr-10 pl-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
        />
      </div>

      <nav className="flex-1 overflow-y-auto -ml-2 pl-2">
        <ul>
          {sortedClients.map((clientName) => (
            <li key={clientName} className="mt-1 first:mt-0">
              <button
                onClick={() => handleToggleClient(clientName)}
                className="w-full flex justify-between items-center px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-750 rounded-md transition-colors"
                aria-expanded={expandedClient === clientName}
              >
                <span>{clientName}</span>
                <ChevronDownIcon className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expandedClient === clientName ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedClient === clientName ? 'max-h-[500px]' : 'max-h-0'}`}>
                <ul className="pl-4 pt-1 border-r-2 border-slate-700/50 mr-3">
                  {groupedProjects[clientName].map((project) => (
                    <li key={project.id}>
                      <button
                        onClick={() => onSelectProject(project.id)}
                        className={`w-full text-right px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          selectedProjectId === project.id
                            ? 'bg-brand-primary text-white'
                            : 'text-slate-300 hover:bg-slate-750 hover:text-white'
                        }`}
                      >
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
        <button 
          onClick={onManageTeam}
          className="w-full flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-750 hover:text-white transition-colors"
        >
          <UsersIcon className="w-5 h-5 ml-2" />
          إدارة الفريق
        </button>
        <div className="p-2 bg-slate-850 rounded-lg">
            <div className="flex items-center">
                <UserCircleIcon className="w-8 h-8 text-slate-500" />
                <div className="mr-2 overflow-hidden">
                    <p className="text-sm font-medium text-white truncate" title={currentUser || ''}>{currentUser}</p>
                    <p className="text-xs text-slate-400">مستخدم حالي</p>
                </div>
                <button 
                    onClick={onLogout}
                    className="mr-auto p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-md transition-colors"
                    aria-label="تسجيل الخروج"
                >
                    <LogoutIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;