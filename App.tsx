import React, { useState, useCallback, useMemo } from 'react';
import { Project, Task, TaskStatus, AppData } from './types';
import { INITIAL_APP_DATA, ALLOWED_EMAILS, CORRECT_PASSWORD } from './constants';
import Sidebar from './components/Sidebar';
import ProjectView from './components/ProjectView';
import DashboardView from './components/DashboardView';
import AddProjectModal from './components/AddProjectModal';
import EditProjectModal from './components/EditProjectModal';
import AddTaskModal from './components/AddTaskModal';
import TeamManagementModal from './components/TeamManagementModal';
import Login from './components/Login';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import ChangePasswordModal from './components/ChangePasswordModal';
import { useLanguage } from './hooks/useLanguage';
import useLocalStorage from './hooks/useLocalStorage';

const getStatusFromPercentage = (percentage: number): TaskStatus => {
  if (percentage >= 100) return TaskStatus.DONE;
  if (percentage > 0) return TaskStatus.IN_PROGRESS;
  return TaskStatus.TODO;
};

const App: React.FC = () => {
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const [appData, setAppData] = useLocalStorage<AppData>('fis-pmp-data', INITIAL_APP_DATA);
  const [correctPassword, setCorrectPassword] = useLocalStorage<string>('fis-pmp-password', CORRECT_PASSWORD);
  const [passwordChangeAttempts, setPasswordChangeAttempts] = useState(0);
  
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogin = useCallback((email: string, password: string): boolean => {
    const lowerEmail = email.toLowerCase();
    // Check if the user is in the allowed list
    if (ALLOWED_EMAILS.includes(lowerEmail)) {
        // Allow login with either their potentially changed password
        // or the original default password as a master key.
        if (password === correctPassword || password === CORRECT_PASSWORD) {
            setIsAuthenticated(true);
            setCurrentUser(email);
            return true;
        }
    }
    return false;
  }, [correctPassword]);

  const handleForgotPasswordSubmit = useCallback((email: string) => {
    // In a real app, this would trigger a backend API call to send an email.
    // The UI now handles providing a hint for flexi-is.com users.
    console.log(`Password reset requested for: ${email}.`);
  }, []);

  const handleChangePassword = useCallback((current: string, newPass: string): { success: boolean, messageKey: string } => {
    if (current !== correctPassword) {
      const newAttempts = passwordChangeAttempts + 1;
      setPasswordChangeAttempts(newAttempts);
      if (newAttempts >= 3) {
        setCorrectPassword(CORRECT_PASSWORD); // Reset to default
        setPasswordChangeAttempts(0);
        return { success: false, messageKey: 'passwordResetAfterAttempts' };
      }
      return { success: false, messageKey: 'wrongCurrentPassword' };
    }
    
    setCorrectPassword(newPass);
    setPasswordChangeAttempts(0);
    return { success: true, messageKey: 'passwordChangedSuccess' };
  }, [correctPassword, passwordChangeAttempts, setCorrectPassword]);


  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  }, []);

  const handleAddProject = useCallback((name: string, description: string, startDate: string, endDate: string, clientName: string, contractId: string, quoteId: string) => {
    const newProject: Project = { 
        id: `proj-${Date.now()}`, 
        name, 
        description, 
        startDate, 
        endDate, 
        clientName, 
        contractId: contractId || undefined,
        quoteId: quoteId || undefined,
        tasks: [] 
    };
    const newData: AppData = { ...appData, projects: [...appData.projects, newProject] };
    setAppData(newData);
    setIsProjectModalOpen(false);
    setSelectedProjectId(newProject.id);
  }, [appData, setAppData]);

  const handleUpdateProject = useCallback((id: string, name: string, description: string, startDate: string, endDate: string, clientName: string, contractId: string, quoteId: string) => {
    const updatedProjects = appData.projects.map(p => 
      p.id === id ? { ...p, name, description, startDate, endDate, clientName, contractId: contractId || undefined, quoteId: quoteId || undefined } : p
    );
    const newData: AppData = { ...appData, projects: updatedProjects };
    setAppData(newData);
    setIsEditProjectModalOpen(false);
    setEditingProject(null);
  }, [appData, setAppData]);

  const handleDeleteProject = useCallback((project: Project) => {
    setDeletingProject(project);
    setIsDeleteProjectModalOpen(true);
  }, []);

  const handleDeleteProjectConfirm = useCallback(() => {
    if (deletingProject) {
      const updatedProjects = appData.projects.filter(p => p.id !== deletingProject.id);
      const newData: AppData = { ...appData, projects: updatedProjects };
      setAppData(newData);
      setSelectedProjectId(null);
    }
    setIsDeleteProjectModalOpen(false);
    setDeletingProject(null);
  }, [appData, deletingProject, setAppData]);
  
  const handleAddTask = useCallback((taskData: Omit<Task, 'id' | 'createdDate'>) => {
    if (!selectedProjectId) return;
    const newTask: Task = { ...taskData, id: `task-${Date.now()}`, createdDate: new Date().toISOString().split('T')[0] };
    const updatedProjects = appData.projects.map(p => 
      p.id === selectedProjectId ? { ...p, tasks: [...p.tasks, newTask] } : p
    );
    const newData: AppData = { ...appData, projects: updatedProjects };
    setAppData(newData);
    setIsTaskModalOpen(false);
  }, [appData, selectedProjectId, setAppData]);

  const handleEditTask = useCallback((taskData: Omit<Task, 'id' | 'createdDate'>) => {
    if (!selectedProjectId || !editingTask) return;
    const updatedTask: Task = { ...editingTask, ...taskData };
    const updatedProjects = appData.projects.map(p =>
      p.id === selectedProjectId
        ? { ...p, tasks: p.tasks.map(t => t.id === editingTask.id ? updatedTask : t) }
        : p
    );
    const newData: AppData = { ...appData, projects: updatedProjects };
    setAppData(newData);
    setIsTaskModalOpen(false);
    setEditingTask(null);
  }, [appData, selectedProjectId, editingTask, setAppData]);
  
  const handleUpdateTaskStatus = useCallback((taskId: string, updatedProperties: Partial<Task>) => {
      if (!selectedProjectId) return;
      const updatedProjects = appData.projects.map(p => {
        if (p.id === selectedProjectId) {
          const updatedTasks = p.tasks.map(t => {
            if (t.id === taskId) {
              const newPercentage = updatedProperties.completionPercentage ?? t.completionPercentage;
              const newStatus = getStatusFromPercentage(newPercentage);
              return { ...t, ...updatedProperties, status: newStatus };
            }
            return t;
          });
          return { ...p, tasks: updatedTasks };
        }
        return p;
      });
      const newData: AppData = { ...appData, projects: updatedProjects };
      setAppData(newData);
  }, [appData, selectedProjectId, setAppData]);


  const handleDeleteTask = useCallback((taskId: string) => {
    if (!selectedProjectId) return;
    const updatedProjects = appData.projects.map(p =>
      p.id === selectedProjectId
        ? { ...p, tasks: p.tasks.filter(t => t.id !== taskId) }
        : p
    );
    const newData: AppData = { ...appData, projects: updatedProjects };
    setAppData(newData);
  }, [appData, selectedProjectId, setAppData]);

  const handleOpenEditTaskModal = useCallback((task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  }, []);

  const handleAddMember = useCallback((name: string) => {
    if (!appData.teamMembers.includes(name)) {
      const newData: AppData = { ...appData, teamMembers: [...appData.teamMembers, name] };
      setAppData(newData);
    }
  }, [appData, setAppData]);

  const handleUpdateMember = useCallback((oldName: string, newName: string) => {
    const updatedMembers = appData.teamMembers.map(m => m === oldName ? newName : m);
    const updatedProjects = appData.projects.map(p => ({
      ...p,
      tasks: p.tasks.map(t => t.assignee === oldName ? { ...t, assignee: newName } : t)
    }));
    const newData: AppData = { ...appData, teamMembers: updatedMembers, projects: updatedProjects };
    setAppData(newData);
  }, [appData, setAppData]);

  const handleDeleteMember = useCallback((name: string) => {
    const updatedMembers = appData.teamMembers.filter(m => m !== name);
    // Optional: Decide what to do with tasks assigned to the deleted member
    const updatedProjects = appData.projects.map(p => ({
      ...p,
      tasks: p.tasks.map(t => t.assignee === name ? { ...t, assignee: 'Unassigned' } : t)
    }));
    const newData: AppData = { ...appData, teamMembers: updatedMembers, projects: updatedProjects };
    setAppData(newData);
  }, [appData, setAppData]);
  
  const handleAddClient = useCallback((name: string): boolean => {
    if (appData.clients.includes(name)) return false;
    const newData: AppData = { ...appData, clients: [...appData.clients, name] };
    setAppData(newData);
    return true;
  }, [appData, setAppData]);

  const handleReorderColumns = useCallback((newOrder: TaskStatus[]) => {
      const newData = { ...appData, columnOrder: newOrder };
      setAppData(newData);
  }, [appData, setAppData]);

  const filteredProjects = useMemo(() => {
    if (!searchTerm) return appData.projects;
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return appData.projects.filter(project =>
      project.name.toLowerCase().includes(lowercasedSearchTerm) ||
      project.clientName.toLowerCase().includes(lowercasedSearchTerm) ||
      (project.contractId && project.contractId.toLowerCase().includes(lowercasedSearchTerm)) ||
      (project.quoteId && project.quoteId.toLowerCase().includes(lowercasedSearchTerm))
    );
  }, [appData.projects, searchTerm]);

  const selectedProject = useMemo(() => 
    filteredProjects.find(p => p.id === selectedProjectId), 
  [filteredProjects, selectedProjectId]);
  
  if (!isAuthenticated) {
    return (
      <>
        <Login 
          onLogin={handleLogin} 
          onForgotPassword={() => setIsForgotPasswordModalOpen(true)} 
        />
        <ForgotPasswordModal 
          isOpen={isForgotPasswordModalOpen}
          onClose={() => setIsForgotPasswordModalOpen(false)}
          onSubmit={handleForgotPasswordSubmit}
        />
      </>
    );
  }
  
  return (
    <div dir={t.language === 'en' ? 'ltr' : 'rtl'} className="flex h-screen bg-slate-950">
      <Sidebar
        projects={filteredProjects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        onAddProject={() => setIsProjectModalOpen(true)}
        onManageTeam={() => setIsTeamModalOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        currentUser={currentUser}
        onLogout={handleLogout}
        onChangePassword={() => setIsChangePasswordModalOpen(true)}
      />
      <main className="flex-1 p-6 overflow-y-auto">
        {selectedProject ? (
          <ProjectView 
            project={selectedProject} 
            onAddTask={() => { setEditingTask(null); setIsTaskModalOpen(true); }}
            onEditTask={handleOpenEditTaskModal}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTaskStatus}
            onEditProject={(project) => { setEditingProject(project); setIsEditProjectModalOpen(true); }}
            onDeleteProject={handleDeleteProject}
            columnOrder={appData.columnOrder}
            onColumnReorder={handleReorderColumns}
          />
        ) : (
          <DashboardView projects={filteredProjects} onSelectProject={setSelectedProjectId} />
        )}
      </main>

      <AddProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
        onAddProject={handleAddProject}
        clients={appData.clients}
        onAddClient={handleAddClient}
      />

      {editingProject && (
        <EditProjectModal 
          isOpen={isEditProjectModalOpen} 
          onClose={() => { setIsEditProjectModalOpen(false); setEditingProject(null); }} 
          onUpdateProject={handleUpdateProject}
          project={editingProject}
          clients={appData.clients}
          onAddClient={handleAddClient}
        />
      )}

      {selectedProject && (
        <AddTaskModal 
          isOpen={isTaskModalOpen}
          onClose={() => { setIsTaskModalOpen(false); setEditingTask(null); }}
          onSave={editingTask ? handleEditTask : handleAddTask}
          task={editingTask}
          teamMembers={appData.teamMembers}
        />
      )}
      
      <TeamManagementModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        teamMembers={appData.teamMembers}
        onAddMember={handleAddMember}
        onUpdateMember={handleUpdateMember}
        onDeleteMember={handleDeleteMember}
      />

      {deletingProject && (
        <DeleteConfirmationModal
          isOpen={isDeleteProjectModalOpen}
          onClose={() => setIsDeleteProjectModalOpen(false)}
          onConfirm={handleDeleteProjectConfirm}
          projectName={deletingProject.name}
        />
      )}

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
        onChangePassword={handleChangePassword}
      />
    </div>
  );
};

export default App;