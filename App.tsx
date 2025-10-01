// FIX: Replaced placeholder content with the main application component, including state management, component routing, and event handlers.
import React, { useState, useEffect, useCallback } from 'react';
import { Project, Task, Client, TaskStatus, Risk } from './types';
import { INITIAL_PROJECTS, INITIAL_CLIENTS, INITIAL_TEAM_MEMBERS, DEFAULT_PASSWORD } from './constants';
import Sidebar from './components/Sidebar';
import ProjectView from './components/ProjectView';
import DashboardView from './components/DashboardView';
import AddProjectModal from './components/AddProjectModal';
import EditProjectModal from './components/EditProjectModal';
import AddTaskModal from './components/AddTaskModal';
import TeamManagementModal from './components/TeamManagementModal';
import ClientManagementModal from './components/ClientManagementModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import ChangePasswordModal from './components/ChangePasswordModal';
import RoleSelection from './components/RoleSelection';
import Login from './components/Login';
import ClientLogin from './components/ClientLogin';
import ClientProjectView from './components/ClientProjectView';
import RiskAssessmentModal from './components/RiskAssessmentModal';
import { useLanguage } from './hooks/useLanguage';
import { TranslationKey } from './translations';

type View = 'role_selection' | 'team_login' | 'client_login' | 'team_dashboard' | 'client_view';

const App: React.FC = () => {
  const { t } = useLanguage();

  // App state
  const [view, setView] = useState<View>('role_selection');
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [clientSession, setClientSession] = useState<{ clientId: string, projectId: string } | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);
  
  // Data persistence
  useEffect(() => {
    try {
      const storedProjects = localStorage.getItem('projects');
      const storedClients = localStorage.getItem('clients');
      const storedTeamMembers = localStorage.getItem('teamMembers');
      const storedPassword = localStorage.getItem('password');

      setProjects(storedProjects ? JSON.parse(storedProjects) : INITIAL_PROJECTS);
      setClients(storedClients ? JSON.parse(storedClients) : INITIAL_CLIENTS);
      setTeamMembers(storedTeamMembers ? JSON.parse(storedTeamMembers) : INITIAL_TEAM_MEMBERS);
      setPassword(storedPassword || DEFAULT_PASSWORD);
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      setProjects(INITIAL_PROJECTS);
      setClients(INITIAL_CLIENTS);
      setTeamMembers(INITIAL_TEAM_MEMBERS);
      setPassword(DEFAULT_PASSWORD);
    }
  }, []);

  const saveData = useCallback(<T,>(key: string, data: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Failed to save ${key} to localStorage`, error);
    }
  }, []);

  useEffect(() => { saveData('projects', projects) }, [projects, saveData]);
  useEffect(() => { saveData('clients', clients) }, [clients, saveData]);
  useEffect(() => { saveData('teamMembers', teamMembers) }, [teamMembers, saveData]);
  useEffect(() => { saveData('password', password) }, [password, saveData]);

  // Auth handlers
  const handleTeamLogin = (email: string) => {
    setCurrentUser(email);
    setView('team_dashboard');
  };
  
  const handleClientLogin = (clientId: string, quoteId: string): boolean => {
    const project = projects.find(p => p.clientId === clientId && p.quoteId?.toLowerCase() === quoteId.toLowerCase().trim());
    if (project) {
      setClientSession({ clientId, projectId: project.id });
      setView('client_view');
      return true;
    }
    return false;
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    setClientSession(null);
    setSelectedProjectId(null);
    setView('role_selection');
  };

  // Project handlers
  const handleAddProject = (name: string, description: string, startDate: string, endDate: string, clientId: string, contractId: string, quoteId: string) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name,
      description,
      startDate,
      endDate,
      clientId,
      contractId,
      quoteId,
      tasks: [],
      risks: [],
    };
    setProjects(prev => [...prev, newProject]);
    setIsAddProjectModalOpen(false);
  };

  const handleEditProject = (project: Project) => {
    setProjectToEdit(project);
    setIsEditProjectModalOpen(true);
  };

  const handleUpdateProject = (id: string, name: string, description: string, startDate: string, endDate: string, clientId: string, contractId: string, quoteId: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, name, description, startDate, endDate, clientId, contractId, quoteId } : p));
    setIsEditProjectModalOpen(false);
    setProjectToEdit(null);
  };
  
  const handleDeleteProjectClick = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };
  
  const handleConfirmDeleteProject = () => {
    if (projectToDelete) {
      setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
      if (selectedProjectId === projectToDelete.id) {
        setSelectedProjectId(null);
      }
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
    }
  };
  
  // Task handlers
  const handleAddTask = () => {
    setTaskToEdit(null);
    setIsAddTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsAddTaskModalOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdDate' | 'status'>) => {
    if (taskToEdit) { // Editing existing task
      setProjects(prev => prev.map(p => p.id === selectedProjectId ? {
        ...p,
        tasks: p.tasks.map(t => t.id === taskToEdit.id ? { ...taskToEdit, ...taskData } : t)
      } : p));
    } else { // Adding new task
      const newTask: Task = {
        ...taskData,
        id: `task-${Date.now()}`,
        createdDate: new Date().toISOString().split('T')[0],
        status: TaskStatus.TODO,
      };
      setProjects(prev => prev.map(p => p.id === selectedProjectId ? { ...p, tasks: [...p.tasks, newTask] } : p));
    }
    setIsAddTaskModalOpen(false);
    setTaskToEdit(null);
  };
  
  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setProjects(prev => prev.map(p => p.id === selectedProjectId ? {
        ...p,
        tasks: p.tasks.filter(t => t.id !== taskId)
      } : p));
    }
  };

  const handleUpdateTask = (taskId: string, updatedProperties: Partial<Task>) => {
    setProjects(prev => prev.map(p => p.id === selectedProjectId ? {
      ...p,
      tasks: p.tasks.map(t => t.id === taskId ? { ...t, ...updatedProperties } : t)
    } : p));
  };
  
  // Risk handlers
  const handleSaveRisks = (risks: Risk[]) => {
      setProjects(prev => prev.map(p => p.id === selectedProjectId ? { ...p, risks } : p));
      setIsRiskModalOpen(false);
  };

  // Team handlers
  const handleAddTeamMember = (name: string) => setTeamMembers(prev => [...prev, name]);
  const handleUpdateTeamMember = (oldName: string, newName: string) => setTeamMembers(prev => prev.map(m => m === oldName ? newName : m));
  const handleDeleteTeamMember = (name: string) => setTeamMembers(prev => prev.filter(m => m !== name));
  
  // Client handlers
  const handleAddClient = (name: string): Client | null => {
    if (clients.some(c => c.name.toLowerCase() === name.toLowerCase())) {
        alert('A client with this name already exists.');
        return null;
    }
    const newClient: Client = { id: `client-${Date.now()}`, name };
    setClients(prev => [...prev, newClient]);
    return newClient;
  };
  const handleUpdateClient = (id: string, newName: string) => setClients(prev => prev.map(c => c.id === id ? { ...c, name: newName } : c));
  const handleDeleteClient = (id: string) => {
    if (projects.some(p => p.clientId === id)) {
        alert("Cannot delete a client that is assigned to a project.");
        return;
    }
    setClients(prev => prev.filter(c => c.id !== id));
  };

  // Password handler
  const handleChangePassword = (current: string, newPass: string): { success: boolean, messageKey: TranslationKey } => {
    if (current !== password) {
      return { success: false, messageKey: 'invalid_current_password' };
    }
    setPassword(newPass);
    return { success: true, messageKey: 'password_changed_successfully' };
  };

  const handleResetPassword = () => {
    setPassword(DEFAULT_PASSWORD);
    alert('Password has been reset to the default password.');
    setIsChangePasswordModalOpen(false);
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const filteredProjects = projects.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Render logic
  if (view === 'role_selection') {
    return <RoleSelection onSelectRole={(role) => setView(role === 'team' ? 'team_login' : 'client_login')} />;
  }
  
  if (view === 'team_login') {
    return <Login onLogin={handleTeamLogin} onBack={() => setView('role_selection')} checkPassword={(p) => p === password} />;
  }

  if (view === 'client_login') {
    return <ClientLogin onLogin={handleClientLogin} onBack={() => setView('role_selection')} clients={clients} />;
  }
  
  if (view === 'client_view' && clientSession) {
    const project = projects.find(p => p.id === clientSession.projectId);
    const client = clients.find(c => c.id === clientSession.clientId);
    if (project && client) {
      return <ClientProjectView project={project} client={client} onLogout={handleLogout} />;
    }
  }

  return (
    <div className="flex h-screen bg-slate-800 text-white">
      <Sidebar
        projects={filteredProjects}
        clients={clients}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        onAddProject={() => setIsAddProjectModalOpen(true)}
        onManageTeam={() => setIsTeamModalOpen(true)}
        onManageClients={() => setIsClientModalOpen(true)}
        onChangePassword={() => setIsChangePasswordModalOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main className="flex-1 p-6 overflow-auto">
        {selectedProject ? (
          <ProjectView
            project={selectedProject}
            clients={clients}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProjectClick}
            onOpenRiskAssessment={() => setIsRiskModalOpen(true)}
            columnOrder={[TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.HANDOVER, TaskStatus.DONE, TaskStatus.CANCELLED]}
            onColumnReorder={() => {}} // Placeholder for drag-and-drop reordering
          />
        ) : (
          <DashboardView projects={filteredProjects} clients={clients} onSelectProject={setSelectedProjectId} />
        )}
      </main>

      {isAddProjectModalOpen && <AddProjectModal isOpen={isAddProjectModalOpen} onClose={() => setIsAddProjectModalOpen(false)} onAddProject={handleAddProject} clients={clients} onAddClient={handleAddClient} />}
      {isEditProjectModalOpen && projectToEdit && <EditProjectModal isOpen={isEditProjectModalOpen} onClose={() => setIsEditProjectModalOpen(false)} onUpdateProject={handleUpdateProject} project={projectToEdit} clients={clients} onAddClient={handleAddClient} />}
      {isAddTaskModalOpen && selectedProject && <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} onSave={handleSaveTask} task={taskToEdit} teamMembers={teamMembers} />}
      {isTeamModalOpen && <TeamManagementModal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)} teamMembers={teamMembers} onAddMember={handleAddTeamMember} onUpdateMember={handleUpdateTeamMember} onDeleteMember={handleDeleteTeamMember} />}
      {isClientModalOpen && <ClientManagementModal isOpen={isClientModalOpen} onClose={() => setIsClientModalOpen(false)} clients={clients} onAddClient={handleAddClient} onUpdateClient={handleUpdateClient} onDeleteClient={handleDeleteClient} />}
      {isDeleteModalOpen && projectToDelete && <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDeleteProject} projectName={projectToDelete.name} />}
      {isChangePasswordModalOpen && <ChangePasswordModal isOpen={isChangePasswordModalOpen} onClose={() => setIsChangePasswordModalOpen(false)} onChangePassword={handleChangePassword} onResetPassword={handleResetPassword} />}
      {isRiskModalOpen && selectedProject && <RiskAssessmentModal isOpen={isRiskModalOpen} onClose={() => setIsRiskModalOpen(false)} risks={selectedProject.risks} onSave={handleSaveRisks} />}
    </div>
  );
};

export default App;