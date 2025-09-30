import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Project, Task, TaskStatus } from './types';
import { INITIAL_PROJECTS, INITIAL_TEAM_MEMBERS, INITIAL_CLIENTS, ALLOWED_EMAILS, CORRECT_PASSWORD } from './constants';
import Sidebar from './components/Sidebar';
import ProjectView from './components/ProjectView';
import DashboardView from './components/DashboardView';
import AddProjectModal from './components/AddProjectModal';
import EditProjectModal from './components/EditProjectModal';
import AddTaskModal from './components/AddTaskModal';
import TeamManagementModal from './components/TeamManagementModal';
import Login from './components/Login';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import { useLanguage } from './hooks/useLanguage';

const getStatusFromPercentage = (percentage: number): TaskStatus => {
  if (percentage >= 100) return TaskStatus.DONE;
  if (percentage > 0) return TaskStatus.IN_PROGRESS;
  return TaskStatus.TODO;
};

const App: React.FC = () => {
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const savedAuth = localStorage.getItem('isAuthenticated');
      return savedAuth ? JSON.parse(savedAuth) : false;
    } catch (error) {
      console.error("Failed to load auth state from localStorage", error);
      return false;
    }
  });

  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    try {
      const savedUser = localStorage.getItem('currentUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to load current user from localStorage", error);
      return null;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const savedProjects = localStorage.getItem('projects');
      return savedProjects ? JSON.parse(savedProjects) : INITIAL_PROJECTS;
    } catch (error) {
      console.error("Failed to load projects from localStorage", error);
      return INITIAL_PROJECTS;
    }
  });
  
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(() => {
    try {
      const savedProjectId = localStorage.getItem('selectedProjectId');
      return savedProjectId ? JSON.parse(savedProjectId) : null;
    } catch (error) {
      console.error("Failed to load selected project ID from localStorage", error);
      return null;
    }
  });

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const [teamMembers, setTeamMembers] = useState<string[]>(() => {
    try {
      const savedTeamMembers = localStorage.getItem('teamMembers');
      return savedTeamMembers ? JSON.parse(savedTeamMembers) : INITIAL_TEAM_MEMBERS;
    } catch (error) {
      console.error("Failed to load team members from localStorage", error);
      return INITIAL_TEAM_MEMBERS;
    }
  });

  const [clients, setClients] = useState<string[]>(() => {
    try {
      const savedClients = localStorage.getItem('clients');
      return savedClients ? JSON.parse(savedClients) : INITIAL_CLIENTS;
    } catch (error) {
      console.error("Failed to load clients from localStorage", error);
      return INITIAL_CLIENTS;
    }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [columnOrder, setColumnOrder] = useState<TaskStatus[]>(() => {
    try {
      const savedOrder = localStorage.getItem('kanbanColumnOrder');
      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);
        // Validate saved order
        const validStatuses = Object.values(TaskStatus);
        if (Array.isArray(parsedOrder) && parsedOrder.length === validStatuses.length && parsedOrder.every(item => validStatuses.includes(item))) {
          return parsedOrder;
        }
      }
    } catch (error) {
      console.error("Failed to parse column order from localStorage", error);
    }
    return [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE];
  });

  useEffect(() => {
    try {
      localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } catch (error) {
      console.error("Failed to save auth state to localStorage", error);
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('projects', JSON.stringify(projects));
    } catch (error) {
      console.error("Failed to save projects to localStorage", error);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('selectedProjectId', JSON.stringify(selectedProjectId));
    } catch (error) {
      console.error("Failed to save selected project ID to localStorage", error);
    }
  }, [selectedProjectId]);

  useEffect(() => {
    try {
      localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
    } catch (error) {
      console.error("Failed to save team members to localStorage", error);
    }
  }, [teamMembers]);

  useEffect(() => {
    try {
      localStorage.setItem('clients', JSON.stringify(clients));
    } catch (error) {
      console.error("Failed to save clients to localStorage", error);
    }
  }, [clients]);

  const handleLogin = useCallback((email: string, password: string): boolean => {
    const isEmailValid = ALLOWED_EMAILS.includes(email.toLowerCase());
    const isPasswordValid = password === CORRECT_PASSWORD;

    if (isEmailValid && isPasswordValid) {
      setIsAuthenticated(true);
      setCurrentUser(email);
      return true;
    }
    return false;
  }, []);

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
      tasks: [],
    };
    setProjects(prev => [...prev, newProject]);
    setSelectedProjectId(newProject.id);
    setIsProjectModalOpen(false);
  }, []);
  
  const handleOpenEditProjectModal = useCallback((project: Project) => {
    setEditingProject(project);
    setIsEditProjectModalOpen(true);
  }, []);

  const handleUpdateProject = useCallback((id: string, name: string, description: string, startDate: string, endDate: string, clientName: string, contractId: string, quoteId: string) => {
    setProjects(prevProjects =>
      prevProjects.map(p => {
        if (p.id === id) {
          return {
            ...p,
            name,
            description,
            startDate,
            endDate,
            clientName,
            contractId: contractId || undefined,
            quoteId: quoteId || undefined,
          };
        }
        return p;
      })
    );
    setIsEditProjectModalOpen(false);
    setEditingProject(null);
  }, []);

  const handleOpenDeleteProjectModal = useCallback((project: Project) => {
    setDeletingProject(project);
    setIsDeleteProjectModalOpen(true);
  }, []);

  const handleDeleteProject = useCallback(() => {
    if (!deletingProject) return;

    setProjects(prevProjects => {
        const remainingProjects = prevProjects.filter(p => p.id !== deletingProject.id);
        
        if (selectedProjectId === deletingProject.id) {
            setSelectedProjectId(null);
        }
        
        return remainingProjects;
    });
    
    setIsDeleteProjectModalOpen(false);
    setDeletingProject(null);
  }, [deletingProject, selectedProjectId]);

  const handleAddClient = useCallback((name: string) => {
    if (name && !clients.includes(name)) {
      setClients(prev => [...prev, name]);
      return true;
    }
    return false;
  }, [clients]);

  const handleSaveTask = useCallback((taskData: Omit<Task, 'id' | 'createdDate'>) => {
    if (!selectedProjectId) return;

    const taskWithStatus = {
      ...taskData,
      status: getStatusFromPercentage(taskData.completionPercentage),
    }

    setProjects(prevProjects => 
      prevProjects.map(p => {
        if (p.id === selectedProjectId) {
          if (editingTask) {
            // Update existing task
            const updatedTasks = p.tasks.map(t => t.id === editingTask.id ? { ...editingTask, ...taskWithStatus } : t);
            return { ...p, tasks: updatedTasks };
          } else {
            // Add new task
            const newTask: Task = { ...taskWithStatus, id: `task-${Date.now()}`, createdDate: new Date().toISOString().split('T')[0] };
            return { ...p, tasks: [...p.tasks, newTask] };
          }
        }
        return p;
      })
    );

    setIsTaskModalOpen(false);
    setEditingTask(null);
  }, [selectedProjectId, editingTask]);

  const handleDeleteTask = useCallback((taskId: string) => {
    if (!selectedProjectId) return;
    setProjects(prevProjects =>
      prevProjects.map(p => {
        if (p.id === selectedProjectId) {
          return { ...p, tasks: p.tasks.filter(t => t.id !== taskId) };
        }
        return p;
      })
    );
  }, [selectedProjectId]);

  const handleUpdateTask = useCallback((taskId: string, updatedProperties: Partial<Task>) => {
    if (!selectedProjectId) return;
    
    setProjects(prevProjects =>
        prevProjects.map(p => {
            if (p.id === selectedProjectId) {
                const updatedTasks = p.tasks.map(t => {
                    if (t.id === taskId) {
                        const updatedTask = { ...t, ...updatedProperties };
                        // If percentage is updated, also update status
                        if (updatedProperties.completionPercentage !== undefined) {
                            updatedTask.status = getStatusFromPercentage(updatedProperties.completionPercentage);
                        }
                        return updatedTask;
                    }
                    return t;
                });
                return { ...p, tasks: updatedTasks };
            }
            return p;
        })
    );
  }, [selectedProjectId]);


  const handleAddTeamMember = useCallback((name: string) => {
    if (name && !teamMembers.includes(name)) {
      setTeamMembers(prev => [...prev, name]);
    }
  }, [teamMembers]);

  const handleUpdateTeamMember = useCallback((oldName: string, newName: string) => {
    if (newName && !teamMembers.includes(newName)) {
      setTeamMembers(prev => prev.map(m => m === oldName ? newName : m));
      // Update assignee in all tasks across all projects
      setProjects(prevProjects => prevProjects.map(p => ({
        ...p,
        tasks: p.tasks.map(t => t.assignee === oldName ? { ...t, assignee: newName } : t)
      })));
    }
  }, [teamMembers]);

  const handleDeleteTeamMember = useCallback((nameToDelete: string) => {
    setTeamMembers(prev => prev.filter(name => name !== nameToDelete));
    // Optional: Re-assign tasks from the deleted member or set to unassigned
  }, []);
  
  const handleColumnReorder = useCallback((newOrder: TaskStatus[]) => {
      setColumnOrder(newOrder);
      try {
        localStorage.setItem('kanbanColumnOrder', JSON.stringify(newOrder));
      } catch (error) {
        console.error("Failed to save column order to localStorage", error);
      }
  }, []);


  const openNewTaskModal = useCallback(() => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  }, []);

  const openEditTaskModal = useCallback((task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  }, []);

  const filteredProjects = useMemo(() => {
    if (!searchTerm.trim()) {
        return projects;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return projects.filter(project => {
        const hasMatchingAssignee = project.tasks.some(task =>
            task.assignee.toLowerCase().includes(lowercasedFilter)
        );
        return (
            project.name.toLowerCase().includes(lowercasedFilter) ||
            project.clientName.toLowerCase().includes(lowercasedFilter) ||
            (project.contractId && project.contractId.toLowerCase().includes(lowercasedFilter)) ||
            (project.quoteId && project.quoteId.toLowerCase().includes(lowercasedFilter)) ||
            hasMatchingAssignee
        );
    });
  }, [projects, searchTerm]);
  
  const selectedProject = projects.find(p => p.id === selectedProjectId);

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-950 font-sans">
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
      />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {selectedProject ? (
          <ProjectView
            project={selectedProject}
            onAddTask={openNewTaskModal}
            onEditTask={openEditTaskModal}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
            onEditProject={handleOpenEditProjectModal}
            onDeleteProject={handleOpenDeleteProjectModal}
            columnOrder={columnOrder}
            onColumnReorder={handleColumnReorder}
          />
        ) : (
          <DashboardView projects={projects} onSelectProject={setSelectedProjectId} />
        )}
      </main>
      
      {isProjectModalOpen && (
        <AddProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          onAddProject={handleAddProject}
          clients={clients}
          onAddClient={handleAddClient}
        />
      )}

      {isEditProjectModalOpen && editingProject && (
        <EditProjectModal
          isOpen={isEditProjectModalOpen}
          onClose={() => {
            setIsEditProjectModalOpen(false);
            setEditingProject(null);
          }}
          onUpdateProject={handleUpdateProject}
          project={editingProject}
          clients={clients}
          onAddClient={handleAddClient}
        />
      )}

      {isTaskModalOpen && (
        <AddTaskModal
          isOpen={isTaskModalOpen}
          onClose={() => {
            setIsTaskModalOpen(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
          task={editingTask}
          teamMembers={teamMembers}
        />
      )}
      
      {isTeamModalOpen && (
        <TeamManagementModal
          isOpen={isTeamModalOpen}
          onClose={() => setIsTeamModalOpen(false)}
          teamMembers={teamMembers}
          onAddMember={handleAddTeamMember}
          onUpdateMember={handleUpdateTeamMember}
          onDeleteMember={handleDeleteTeamMember}
        />
      )}

      {isDeleteProjectModalOpen && deletingProject && (
        <DeleteConfirmationModal
            isOpen={isDeleteProjectModalOpen}
            onClose={() => {
                setIsDeleteProjectModalOpen(false);
                setDeletingProject(null);
            }}
            onConfirm={handleDeleteProject}
            projectName={deletingProject.name}
        />
      )}
    </div>
  );
};

export default App;