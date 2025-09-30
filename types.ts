export enum TaskStatus {
  TODO = 'قيد التنفيذ',
  IN_PROGRESS = 'جاري العمل',
  DONE = 'مكتمل',
}

export enum TaskPriority {
  LOW = 'منخفضة',
  MEDIUM = 'متوسطة',
  HIGH = 'عالية',
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