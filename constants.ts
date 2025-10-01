import { AppData, Project, TaskStatus, TaskPriority, Task } from './types';

// IMPORTANT: These values must be replaced with your own credentials from the Google Cloud Console.
// 1. Create a new project at https://console.cloud.google.com/
// 2. Enable the "Google Drive API".
// 3. Go to "Credentials", create an "OAuth 2.0 Client ID" for a "Web application",
//    and add your development and production URLs to the authorized origins.
// 4. Create an "API key".
export const GOOGLE_CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
export const GOOGLE_API_KEY = 'YOUR_API_KEY';
export const DRIVE_FILE_NAME = 'fis-pmp-data.json';
export const SHARED_DRIVE_FOLDER_ID = '1xQFQNRwTmMrIQwdOgv2Ue_em86PTQSGW';
export const SHARED_DRIVE_FOLDER_NAME = 'FIS-PMP Shared Folder';


export const INITIAL_CLIENTS = ['شركة ألفا', 'مؤسسة بيتا', 'منظمة جاما'];

export const ALLOWED_EMAILS = [
  'alaa@flexi-is.com',
  'slaes@flexi-is.com',
  'audit@flexi-is.com',
  'pm@flexi-is.com',
  'mep@flexi-is.com',
  'omer@flexi-is.com',
  'info@flexi-is.com',
  'mtayeb@flexi-is.com',
  'accounts@flexi-is.com',
];

export const CORRECT_PASSWORD = 'Flexi@2030$';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'إعادة تصميم الموقع',
    description: 'إعادة تصميم كاملة لموقع الشركة لتحسين تجربة المستخدم وتحديث العلامة التجارية.',
    startDate: '2024-08-01',
    endDate: '2024-10-31',
    clientName: 'شركة ألفا',
    contractId: 'PO-2024-001',
    quoteId: 'QT-2024-001',
    tasks: [
      {
        id: 'task-1',
        title: 'صياغة نماذج واجهة المستخدم/تجربة المستخدم',
        description: 'إنشاء إطارات سلكية ونماذج عالية الدقة لتصميم الموقع الجديد.',
        assignee: 'فاطمة علي',
        startDate: '2024-08-05',
        endDate: '2024-08-20',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        completionPercentage: 50,
        createdDate: '2024-08-01',
      },
      {
        id: 'task-2',
        title: 'تطوير الواجهة الأمامية',
        description: 'بناء مكونات React وتكاملها مع واجهة برمجة التطبيقات.',
        assignee: 'أحمد محمود',
        startDate: '2024-08-21',
        endDate: '2024-09-30',
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        completionPercentage: 0,
        createdDate: '2024-08-01',
      },
      {
        id: 'task-3',
        title: 'تطوير الواجهة الخلفية',
        description: 'إعداد قاعدة البيانات وإنشاء نقاط نهاية API اللازمة.',
        assignee: 'عمر خالد',
        startDate: '2024-08-15',
        endDate: '2024-09-20',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.MEDIUM,
        completionPercentage: 75,
        createdDate: '2024-08-02',
      }
    ]
  },
  {
    id: 'proj-2',
    name: 'تطبيق الجوال',
    description: 'تطوير تطبيق جوال أصلي لنظامي iOS و Android.',
    startDate: '2024-09-01',
    endDate: '2025-01-31',
    clientName: 'مؤسسة بيتا',
    contractId: 'PO-2024-002',
    quoteId: 'QT-2024-002',
    tasks: [
      {
        id: 'task-4',
        title: 'تصميم التطبيق',
        description: 'تصميم واجهات المستخدم وتجربة المستخدم للتطبيق.',
        assignee: 'فاطمة علي',
        startDate: '2024-09-01',
        endDate: '2024-09-30',
        status: TaskStatus.DONE,
        priority: TaskPriority.HIGH,
        completionPercentage: 100,
        createdDate: '2024-08-25',
      },
      {
        id: 'task-5',
        title: 'تطوير نسخة iOS',
        description: 'تطوير التطبيق باستخدام Swift و SwiftUI.',
        assignee: 'سارة إبراهيم',
        startDate: '2024-10-01',
        endDate: '2024-12-15',
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        completionPercentage: 0,
        createdDate: '2024-08-25',
      },
    ]
  }
];

export const INITIAL_TEAM_MEMBERS = [
  'عمر خالد',
  'فاطمة علي',
  'أحمد محمود',
  'سارة إبراهيم',
  'Unassigned'
];

export const INITIAL_APP_DATA: AppData = {
  projects: INITIAL_PROJECTS,
  teamMembers: INITIAL_TEAM_MEMBERS,
  clients: INITIAL_CLIENTS,
  columnOrder: [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE],
};
