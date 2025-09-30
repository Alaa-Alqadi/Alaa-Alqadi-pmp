import { Translations } from './translations';

export const en: Translations = {
  // General
  language: 'ar',
  languageName: 'العربية',
  search: 'Search...',
  cancel: 'Cancel',
  saveChanges: 'Save Changes',
  delete: 'Delete',
  edit: 'Edit',

  // Login
  loginTitle: 'FIS-PMP',
  loginWelcome: 'Welcome back, please log in to continue',
  loginEmailLabel: 'Email',
  loginEmailPlaceholder: 'user@example.com',
  loginPasswordLabel: 'Password',
  loginPasswordPlaceholder: '••••••••',
  loginButton: 'Sign In',
  loginError: 'Incorrect email or password.',

  // Sidebar
  dashboard: 'Dashboard',
  projects: 'Projects',
  addProject: 'Add new project',
  manageTeam: 'Manage Team',
  currentUser: 'Current User',
  logout: 'Log Out',

  // Dashboard
  dashboardTitle: 'Dashboard',
  dashboardSubtitle: 'An overview of all active projects.',
  noProjectsTitle: 'No Projects Yet',
  noProjectsSubtitle: 'Create a new project from the sidebar to get started.',

  // Project Summary Card
  progress: 'Progress',

  // Project View
  editProject: 'Edit project',
  exportProject: 'Export project to CSV',
  deleteProject: 'Delete project',
  addTask: 'Add Task',
  startDate: 'Start Date',
  endDate: 'End Date',
  client: 'Client',
  contractNumber: 'Contract No.',
  quoteNumber: 'Quote No.',
  averageProgress: 'Avg. Progress',

  // Project Modals (Add/Edit)
  createNewProjectTitle: 'Create New Project',
  editProjectTitle: 'Edit Project',
  projectNameLabel: 'Project Name',
  descriptionOptionalLabel: 'Description (optional)',
  contractNumberOptionalLabel: 'Contract No. (optional)',
  quoteNumberOptionalLabel: 'Quote No. (optional)',
  startDateLabel: 'Start Date',
  endDateLabel: 'End Date',
  clientLabel: 'Client',
  selectClientPlaceholder: 'Select a client',
  addNewClientPlaceholder: 'Add new client...',
  createProjectButton: 'Create Project',

  // Delete Project Modal
  deleteConfirmationTitle: 'Confirm Deletion',
  deleteConfirmationMessage: (projectName: string) => `Are you sure you want to delete the project ${projectName}?`,
  deleteConfirmationWarning: 'This action cannot be undone. All tasks associated with this project will be permanently deleted.',
  deleteProjectButton: 'Delete Project',

  // Kanban Board
  status_TODO: 'To Do',
  status_IN_PROGRESS: 'In Progress',
  status_DONE: 'Done',

  // Task Card
  editTask: 'Edit task',
  deleteTask: 'Delete task',
  overdueTaskTooltip: 'This task is overdue',
  createdOn: (date: string) => `Created on ${date}`,
  priority_LOW: 'Low',
  priority_MEDIUM: 'Medium',
  priority_HIGH: 'High',

  // Task Modal (Add/Edit)
  createNewTaskTitle: 'Create New Task',
  editTaskTitle: 'Edit Task',
  taskNameLabel: 'Task Name',
  descriptionLabel: 'Description',
  assigneeLabel: 'Assignee',
  priorityLabel: 'Priority',
  completionPercentageLabel: (percentage, status) => `Completion: ${percentage}% (Status: ${status})`,
  statusLabel: 'Status',
  addTaskButton: 'Add Task',

  // Team Management Modal
  manageTeamTitle: 'Manage Team',
  addNewMemberPlaceholder: 'Add new member...',
  save: 'Save',

  // CSV Export
  csvProjectName: 'Project Name',
  csvClient: 'Client',
  csvStartDate: 'Start Date',
  csvEndDate: 'End Date',
  csvContractNumber: 'Contract Number',
  csvQuoteNumber: 'Quote Number',
  csvOverallCompletion: 'Overall Completion',
  csvDescription: 'Description',
  csvTaskId: 'Task ID',
  csvTaskTitle: 'Task Title',
  csvTaskDescription: 'Description',
  csvAssignee: 'Assignee',
  csvTaskStartDate: 'Start Date',
  csvTaskEndDate: 'End Date',
  csvCreationDate: 'Creation Date',
  csvStatus: 'Status',
  csvPriority: 'Priority',
  csvCompletionPercentage: 'Completion %',
};
