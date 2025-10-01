import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import ProjectView from './components/ProjectView';
import DashboardView from './components/DashboardView';
import AddTaskModal from './components/AddTaskModal';
import AddProjectModal from './components/AddProjectModal';
import EditProjectModal from './components/EditProjectModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import TeamManagementModal from './components/TeamManagementModal';
import ChangePasswordModal from './components/ChangePasswordModal';
import RoleSelection from './components/RoleSelection';
import Login from './components/Login';
import ClientLogin from './components/ClientLogin';
import ClientProjectView from './components/ClientProjectView';
import { Project, Task, TaskStatus, Client } from './types';
import { INITIAL_PROJECTS, INITIAL_CLIENTS, INITIAL_TEAM_MEMBERS, DEFAULT_PASSWORD } from './constants';
import { TranslationKey } from './translations';
import { useLanguage } from './hooks/useLanguage';


const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

type AppView = 'role-selection' | 'team-login' | 'client-login' | 'app' | 'client-view';

const App: React.FC = () => {
  const { t } = useLanguage();
  // State
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', INITIAL_PROJECTS);
  const [clients, setClients] = useLocalStorage<Client[]>('clients', INITIAL_CLIENTS);
  const [teamMembers, setTeamMembers] = useLocalStorage<string[]>('teamMembers', INITIAL_TEAM_MEMBERS);
  const [userPassword, setUserPassword] = useLocalStorage<string>('userPassword', DEFAULT_PASSWORD);

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Auth State
  const [appView, setAppView] = useLocalStorage<AppView>('appView', 'role-selection');
  const [currentUser, setCurrentUser] = useLocalStorage<string | null>('currentUser', null); // For team: email, for client: quoteId
  
  // Modal State
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  
  const [columnOrder, setColumnOrder] = useState<TaskStatus[]>([
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
    TaskStatus.CANCELLED,
  ]);

  // Derived State
  const filteredProjects = useMemo(() => 
    projects.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [projects, searchTerm]
  );
  
  const selectedProject = useMemo(() =>
    projects.find(p => p.id === selectedProjectId) || null,
    [projects, selectedProjectId]
  );
  
  const clientLoggedInProject = useMemo(() =>
    appView === 'client-view' && currentUser ? projects.find(p => p.quoteId === currentUser) : null,
    [appView, projects, currentUser]
  );
  
  const currentClient = useMemo(() =>
    clientLoggedInProject ? clients.find(c => c.id === clientLoggedInProject.clientId) : null,
    [clientLoggedInProject, clients]
  );
  
  // Handlers
  const handleSelectProject = (id: string | null) => {
    setSelectedProjectId(id);
  };
  
  // Client Handlers
  const handleAddClient = (name: string): Client | null => {
    if (!name.trim() || clients.some(c => c.name.toLowerCase() === name.trim().toLowerCase())) {
        alert(t('client_name_error'));
        return null;
    }
    const newClient: Client = { id: `client-${Date.now()}`, name: name.trim() };
    setClients(prev => [...prev, newClient]);
    return newClient;
  };

  // Project Handlers
  const handleAddProject = (name: string, description: string, startDate: string, endDate: string, clientId: string, contractId: string, quoteId: string) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name, description, startDate, endDate, clientId, contractId, quoteId,
      tasks: [],
    };
    setProjects(prev => [...prev, newProject]);
    setIsAddProjectModalOpen(false);
    setSelectedProjectId(newProject.id);
  };

  const handleEditProjectClick = (project: Project) => {
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

  const confirmDeleteProject = () => {
    if (projectToDelete) {
      setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
      if (selectedProjectId === projectToDelete.id) {
        setSelectedProjectId(null);
      }
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
    }
  };

  // Task Handlers
  const handleAddTaskClick = () => {
    setEditingTask(null);
    setIsAddTaskModalOpen(true);
  };

  const handleEditTaskClick = (task: Task) => {
    setEditingTask(task);
    setIsAddTaskModalOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdDate' | 'status'>) => {
    if (!selectedProjectId) return;
    setProjects(prevProjects => {
      return prevProjects.map(p => {
        if (p.id === selectedProjectId) {
          let newTasks: Task[];
          if (editingTask) { // Editing existing task
            newTasks = p.tasks.map(t => t.id === editingTask.id ? { ...editingTask, ...taskData } : t);
          } else { // Adding new task
            const newTask: Task = {
              ...taskData,
              id: `task-${Date.now()}`,
              createdDate: new Date().toISOString().split('T')[0],
              status: TaskStatus.TODO,
            };
            newTasks = [...p.tasks, newTask];
          }
          return { ...p, tasks: newTasks };
        }
        return p;
      });
    });
    setIsAddTaskModalOpen(false);
    setEditingTask(null);
  };
  
  const handleDeleteTask = (taskId: string) => {
    if (!selectedProjectId) return;
    setProjects(prev => prev.map(p => {
      if (p.id === selectedProjectId) {
        return { ...p, tasks: p.tasks.filter(t => t.id !== taskId) };
      }
      return p;
    }));
  };

  const handleUpdateTask = (taskId: string, updatedProperties: Partial<Task>) => {
    if (!selectedProjectId) return;
    setProjects(prev => prev.map(p => {
      if (p.id === selectedProjectId) {
        return { ...p, tasks: p.tasks.map(t => t.id === taskId ? { ...t, ...updatedProperties } : t) };
      }
      return p;
    }));
  };

  // Team Handlers
  const handleAddMember = (name: string) => {
    if (name && !teamMembers.includes(name)) {
        setTeamMembers(prev => [...prev, name]);
    }
  };

  const handleUpdateMember = (oldName: string, newName: string) => {
    setTeamMembers(prev => prev.map(m => m === oldName ? newName : m));
    // Also update in tasks
    setProjects(projs => projs.map(p => ({
        ...p,
        tasks: p.tasks.map(t => t.assignee === oldName ? { ...t, assignee: newName } : t)
    })));
  };

  const handleDeleteMember = (name: string) => {
    // Optional: Check if member is assigned to tasks before deleting
    setTeamMembers(prev => prev.filter(m => m !== name));
  };

  // Auth Handlers
  const handleRoleSelect = (role: 'team' | 'client') => {
    setAppView(role === 'team' ? 'team-login' : 'client-login');
  };
  
  const handleTeamLogin = (email: string) => {
    setCurrentUser(email);
    setAppView('app');
  };

  const handleClientLogin = (clientId: string, offerNumber: string): boolean => {
    const project = projects.find(p => 
        p.quoteId?.toLowerCase().trim() === offerNumber.toLowerCase().trim() &&
        p.clientId === clientId
    );
    if (project) {
      setCurrentUser(project.quoteId!);
      setAppView('client-view');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAppView('role-selection');
    setSelectedProjectId(null); // Reset selection on logout
  };
  
  const handleCheckPassword = (password: string) => password === userPassword;

  const handleChangePassword = (current: string, newPass: string): { success: boolean, messageKey: TranslationKey } => {
    if (current !== userPassword) {
      return { success: false, messageKey: 'invalid_current_password' };
    }
    setUserPassword(newPass);
    return { success: true, messageKey: 'password_changed_success' };
  };

  const handleResetPassword = () => {
    setUserPassword(DEFAULT_PASSWORD);
    alert(t('password_reset_logout_alert'));
    handleLogout();
  };
  
  // Render logic
  if (appView === 'role-selection') {
    return <RoleSelection onSelectRole={handleRoleSelect} />;
  }
  
  if (appView === 'team-login') {
    return <Login onLogin={handleTeamLogin} onBack={() => setAppView('role-selection')} checkPassword={handleCheckPassword} />;
  }
  
  if (appView === 'client-login') {
    return <ClientLogin onLogin={handleClientLogin} onBack={() => setAppView('role-selection')} clients={clients} />;
  }

  if (appView === 'client-view' && clientLoggedInProject && currentClient) {
    return <ClientProjectView project={clientLoggedInProject} client={currentClient} onLogout={handleLogout} />;
  }

  return (
    <div className="flex h-screen bg-slate-900 font-sans">
      <Sidebar
        projects={filteredProjects}
        clients={clients}
        selectedProjectId={selectedProjectId}
        onSelectProject={handleSelectProject}
        onAddProject={() => setIsAddProjectModalOpen(true)}
        onManageTeam={() => setIsTeamModalOpen(true)}
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
            onAddTask={handleAddTaskClick}
            onEditTask={handleEditTaskClick}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
            onEditProject={handleEditProjectClick}
            onDeleteProject={handleDeleteProjectClick}
            columnOrder={columnOrder}
            onColumnReorder={setColumnOrder}
          />
        ) : (
          <DashboardView projects={filteredProjects} clients={clients} onSelectProject={handleSelectProject}/>
        )}
      </main>

      {/* Modals */}
      {isAddTaskModalOpen && selectedProject && (
        <AddTaskModal
          isOpen={isAddTaskModalOpen}
          onClose={() => setIsAddTaskModalOpen(false)}
          onSave={handleSaveTask}
          task={editingTask}
          teamMembers={teamMembers}
        />
      )}

      {isAddProjectModalOpen && (
        <AddProjectModal
          isOpen={isAddProjectModalOpen}
          onClose={() => setIsAddProjectModalOpen(false)}
          onAddProject={handleAddProject}
          clients={clients}
          onAddClient={handleAddClient}
        />
      )}
      
      {isEditProjectModalOpen && projectToEdit && (
        <EditProjectModal
            isOpen={isEditProjectModalOpen}
            onClose={() => { setIsEditProjectModalOpen(false); setProjectToEdit(null); }}
            onUpdateProject={handleUpdateProject}
            project={projectToEdit}
            clients={clients}
            onAddClient={handleAddClient}
        />
      )}

      {isDeleteModalOpen && projectToDelete && (
        <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => { setIsDeleteModalOpen(false); setProjectToDelete(null); }}
            onConfirm={confirmDeleteProject}
            projectName={projectToDelete.name}
        />
      )}
      
      {isTeamModalOpen && (
        <TeamManagementModal
            isOpen={isTeamModalOpen}
            onClose={() => setIsTeamModalOpen(false)}
            teamMembers={teamMembers}
            onAddMember={handleAddMember}
            onUpdateMember={handleUpdateMember}
            onDeleteMember={handleDeleteMember}
        />
      )}

      {isChangePasswordModalOpen && (
        <ChangePasswordModal
            isOpen={isChangePasswordModalOpen}
            onClose={() => setIsChangePasswordModalOpen(false)}
            onChangePassword={handleChangePassword}
            onResetPassword={handleResetPassword}
        />
      )}
    </div>
  );
};

export default App;
