import { Project, TaskStatus, TaskPriority } from './types';

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
        description: 'إنشاء إطارات سلكية ونماذج عالية الدقة في Figma.',
        assignee: 'أليس',
        startDate: '2024-08-05',
        endDate: '2024-08-20',
        createdDate: '2024-08-02',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        completionPercentage: 50,
      },
      {
        id: 'task-2',
        title: 'تطوير مكونات الواجهة الأمامية',
        description: 'بناء مكونات React قابلة لإعادة الاستخدام بناءً على نظام التصميم الجديد.',
        assignee: 'بوب',
        startDate: '2024-08-21',
        endDate: '2024-09-10',
        createdDate: '2024-08-02',
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        completionPercentage: 0,
      },
      {
        id: 'task-3',
        title: 'إعداد واجهة برمجة تطبيقات الخلفية لنموذج الاتصال',
        description: 'إنشاء نقاط نهاية لإرسال النموذج والتحقق من صحته.',
        assignee: 'تشارلي',
        startDate: '2024-09-11',
        endDate: '2024-09-25',
        createdDate: '2024-08-15',
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        completionPercentage: 0,
      },
      {
        id: 'task-4',
        title: 'جلسة اختبار المستخدم وجمع الملاحظات',
        description: 'تنظيم جلسة مع أصحاب المصلحة لجمع الملاحظات على الإصدار التجريبي.',
        assignee: 'أليس',
        startDate: '2024-08-15',
        endDate: '2024-08-18',
        createdDate: '2024-08-10',
        status: TaskStatus.DONE,
        priority: TaskPriority.MEDIUM,
        completionPercentage: 100,
      },
    ],
  },
  {
    id: 'proj-2',
    name: 'حملة تسويق الربع الثالث',
    description: 'إطلاق حملة تسويقية متعددة القنوات لخط الإنتاج الجديد.',
    startDate: '2024-07-15',
    endDate: '2024-09-30',
    clientName: 'مؤسسة بيتا',
    contractId: 'CTR-2024-BETA-45',
    quoteId: 'QT-2024-BETA-12',
    tasks: [
      {
        id: 'task-5',
        title: 'وضع اللمسات الأخيرة على ميزانية الحملة',
        description: 'تخصيص الأموال لوسائل التواصل الاجتماعي والمحتوى والإعلانات المدفوعة.',
        assignee: 'ديفيد',
        startDate: '2024-07-16',
        endDate: '2024-07-20',
        createdDate: '2024-07-15',
        status: TaskStatus.DONE,
        priority: TaskPriority.HIGH,
        completionPercentage: 100,
      },
      {
        id: 'task-6',
        title: 'إنشاء تقويم محتوى وسائل التواصل الاجتماعي',
        description: 'تخطيط المنشورات لـ Instagram و Twitter و LinkedIn للأشهر الثلاثة القادمة.',
        assignee: 'إيف',
        startDate: '2024-07-21',
        endDate: '2024-08-05',
        createdDate: '2024-07-18',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.MEDIUM,
        completionPercentage: 75,
      },
    ],
  },
  {
    id: 'proj-3',
    name: 'إطلاق تطبيق الجوال',
    description: 'تنسيق إطلاق تطبيقات الجوال الجديدة لنظامي iOS و Android.',
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    clientName: 'منظمة جاما',
    contractId: 'MOB-APP-GAMA-01',
    quoteId: 'QT-GAMA-2024-03',
    tasks: [],
  }
];

export const INITIAL_TEAM_MEMBERS = ['أليس', 'بوب', 'تشارلي', 'ديفيد', 'إيف', 'فرانك', 'جريس'];