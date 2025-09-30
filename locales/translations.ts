export interface Translations {
  // General
  language: string;
  languageName: string;
  search: string;
  cancel: string;
  saveChanges: string;
  delete: string;
  edit: string;

  // Login
  loginTitle: string;
  loginWelcome: string;
  loginEmailLabel: string;
  loginEmailPlaceholder: string;
  loginPasswordLabel: string;
  loginPasswordPlaceholder: string;
  loginButton: string;
  loginError: string;

  // Sidebar
  dashboard: string;
  projects: string;
  addProject: string;
  manageTeam: string;
  currentUser: string;
  logout: string;

  // Dashboard
  dashboardTitle: string;
  dashboardSubtitle: string;
  noProjectsTitle: string;
  noProjectsSubtitle: string;
  
  // Project Summary Card
  progress: string;

  // Project View
  editProject: string;
  exportProject: string;
  deleteProject: string;
  addTask: string;
  startDate: string;
  endDate: string;
  client: string;
  contractNumber: string;
  quoteNumber: string;
  averageProgress: string;
  
  // Project Modals (Add/Edit)
  createNewProjectTitle: string;
  editProjectTitle: string;
  projectNameLabel: string;
  descriptionOptionalLabel: string;
  contractNumberOptionalLabel: string;
  quoteNumberOptionalLabel: string;
  startDateLabel: string;
  endDateLabel: string;
  clientLabel: string;
  selectClientPlaceholder: string;
  addNewClientPlaceholder: string;
  createProjectButton: string;

  // Delete Project Modal
  deleteConfirmationTitle: string;
  deleteConfirmationMessage: (projectName: string) => string;
  deleteConfirmationWarning: string;
  deleteProjectButton: string;

  // Kanban Board
  status_TODO: string;
  status_IN_PROGRESS: string;
  status_DONE:string;

  // Task Card
  editTask: string;
  deleteTask: string;
  overdueTaskTooltip: string;
  createdOn: (date: string) => string;
  priority_LOW: string;
  priority_MEDIUM: string;
  priority_HIGH: string;

  // Task Modal (Add/Edit)
  createNewTaskTitle: string;
  editTaskTitle: string;
  taskNameLabel: string;
  descriptionLabel: string;
  assigneeLabel: string;
  priorityLabel: string;
  completionPercentageLabel: (percentage: number, status: string) => string;
  statusLabel: string;
  addTaskButton: string;

  // Team Management Modal
  manageTeamTitle: string;
  addNewMemberPlaceholder: string;
  save: string;

  // CSV Export
  csvProjectName: string;
  csvClient: string;
  csvStartDate: string;
  csvEndDate: string;
  csvContractNumber: string;
  csvQuoteNumber: string;
  csvOverallCompletion: string;
  csvDescription: string;
  csvTaskId: string;
  csvTaskTitle: string;
  csvTaskDescription: string;
  csvAssignee: string;
  csvTaskStartDate: string;
  csvTaskEndDate: string;
  csvCreationDate: string;
  csvStatus: string;
  csvPriority: string;
  csvCompletionPercentage: string;
}
