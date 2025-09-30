import React, { useMemo } from 'react';
import { Project } from '../types';
import ProjectSummaryCard from './ProjectSummaryCard';
import { useLanguage } from '../hooks/useLanguage';

interface DashboardViewProps {
  projects: Project[];
  onSelectProject: (id: string) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ projects, onSelectProject }) => {
  const { t } = useLanguage();

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

  return (
    <div className="h-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">{t.dashboardTitle}</h1>
        <p className="text-slate-400 mt-1">{t.dashboardSubtitle}</p>
      </header>
      
      {projects.length === 0 ? (
        <div className="flex items-center justify-center h-full -mt-16">
            <div className="text-center text-slate-500">
                <h2 className="text-2xl font-semibold">{t.noProjectsTitle}</h2>
                <p className="mt-2">{t.noProjectsSubtitle}</p>
            </div>
        </div>
      ) : (
        <div className="space-y-8">
            {sortedClients.map(clientName => (
            <section key={clientName}>
                <h2 className="text-xl font-semibold text-white mb-4 border-b border-slate-700 pb-2">
                {clientName}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {groupedProjects[clientName].map(project => (
                    <ProjectSummaryCard 
                        key={project.id}
                        project={project}
                        onClick={() => onSelectProject(project.id)}
                    />
                ))}
                </div>
            </section>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardView;