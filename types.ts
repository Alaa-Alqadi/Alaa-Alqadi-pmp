export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  startDate: string;
  endDate: string;
  status: TaskStatus;
  priority: TaskPriority;
  completionPercentage: number;
  createdDate: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  clientName: string;
  contractId?: string;
  quoteId?: string;
  tasks: Task[];
}

export interface AppData {
  projects: Project[];
  teamMembers: string[];
  clients: string[];
  columnOrder: TaskStatus[];
}

export interface GDriveFolder {
  id: string;
  name: string;
}
