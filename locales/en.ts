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
  close: 'Close',

  // Login
  loginTitle: 'FIS-PMP',
  loginWelcome: 'Welcome back, please log in to continue',
  loginEmailLabel: 'Email',
  loginEmailPlaceholder: 'user@example.com',
  loginPasswordLabel: 'Password',
  loginPasswordPlaceholder: '••••••••',
  loginButton: 'Sign In',
  loginError: 'Incorrect email or password.',
  togglePasswordVisibility: 'Show/Hide password',
  forgotPassword: 'Forgot Password?',
  orSeparator: 'OR',

  // Forgot Password Modal
  resetPasswordTitle: 'Reset Password',
  resetPasswordInstruction: 'Enter your email and we will send you a link to reset your password.',
  sendResetLinkButton: 'Send Reset Link',
  resetPasswordSuccessMessage: 'If an account exists for that email, a reset link has been sent.',
  resetPasswordHintFlexi: '`flexi-is.com` users can use the default password `Flexi@2030$` to sign in.',
  
  // Change Password Modal
  changePassword: 'Change Password',
  currentPasswordLabel: 'Current Password',
  newPasswordLabel: 'New Password',
  confirmNewPasswordLabel: 'Confirm New Password',
  passwordChangedSuccess: 'Password changed successfully.',
  wrongCurrentPassword: 'Incorrect current password.',
  passwordsDoNotMatch: 'New passwords do not match.',
  passwordResetAfterAttempts: 'Incorrect current password entered 3 times. Password has been reset to default.',

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
  completed: 'Completed',

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

  // Sync Conflict Modal
  syncConflictTitle: 'Data Conflict Detected',
  localFileSyncConflictTitle: 'File Conflict Detected',
  syncConflictMessage: 'Your project data in Google Drive is different from your current session. Which version would you like to keep?',
  localFileSyncConflictMessage: 'The local file is different from your current session data. Which version would you like to keep?',
  syncConflictDownloadButton: 'Use Google Drive Version',
  localFileSyncOpenButton: 'Use Version from File',
  syncConflictUploadButton: 'Use Current Session Version',
  localFileSyncSaveButton: 'Overwrite File with Session Data',
};