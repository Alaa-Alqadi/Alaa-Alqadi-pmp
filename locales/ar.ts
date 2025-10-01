import { Translations } from './translations';

export const ar: Translations = {
  // General
  language: 'en',
  languageName: 'English',
  search: 'بحث...',
  cancel: 'إلغاء',
  saveChanges: 'حفظ التغييرات',
  delete: 'حذف',
  edit: 'تعديل',
  close: 'إغلاق',

  // Login
  loginTitle: 'FIS-PMP',
  loginWelcome: 'أهلاً بك، يرجى تسجيل الدخول للمتابعة',
  loginEmailLabel: 'البريد الإلكتروني',
  loginEmailPlaceholder: 'user@example.com',
  loginPasswordLabel: 'كلمة المرور',
  loginPasswordPlaceholder: '••••••••',
  loginButton: 'تسجيل الدخول',
  loginError: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
  togglePasswordVisibility: 'إظهار/إخفاء كلمة المرور',
  forgotPassword: 'هل نسيت كلمة المرور؟',
  orSeparator: 'أو',

  // Forgot Password Modal
  resetPasswordTitle: 'إعادة تعيين كلمة المرور',
  resetPasswordInstruction: 'أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.',
  sendResetLinkButton: 'إرسال رابط إعادة التعيين',
  resetPasswordSuccessMessage: 'إذا كان هناك حساب لهذا البريد الإلكتروني، فقد تم إرسال رابط إعادة التعيين.',
  resetPasswordHintFlexi: 'مستخدمو flexi-is.com يمكنهم استخدام كلمة المرور الافتراضية `Flexi@2030$` لتسجيل الدخول.',

  // Change Password Modal
  changePassword: 'تغيير كلمة المرور',
  currentPasswordLabel: 'كلمة المرور الحالية',
  newPasswordLabel: 'كلمة المرور الجديدة',
  confirmNewPasswordLabel: 'تأكيد كلمة المرور الجديدة',
  passwordChangedSuccess: 'تم تغيير كلمة المرور بنجاح.',
  wrongCurrentPassword: 'كلمة المرور الحالية غير صحيحة.',
  passwordsDoNotMatch: 'كلمتا المرور الجديدتان غير متطابقتين.',
  passwordResetAfterAttempts: 'تم إدخال كلمة المرور الحالية بشكل خاطئ 3 مرات. تم إعادة تعيين كلمة المرور إلى الوضع الافتراضي.',

  // Sidebar
  dashboard: 'لوحة المعلومات',
  projects: 'المشاريع',
  addProject: 'إضافة مشروع جديد',
  manageTeam: 'إدارة الفريق',
  currentUser: 'مستخدم حالي',
  logout: 'تسجيل الخروج',

  // Dashboard
  dashboardTitle: 'لوحة المعلومات',
  dashboardSubtitle: 'نظرة عامة على جميع المشاريع النشطة.',
  noProjectsTitle: 'لا توجد مشاريع حتى الآن',
  noProjectsSubtitle: 'أنشئ مشروعًا جديدًا من الشريط الجانبي للبدء.',

  // Project Summary Card
  progress: 'نسبة الإنجاز',
  completed: 'مكتمل',

  // Project View
  editProject: 'تعديل المشروع',
  exportProject: 'تصدير المشروع إلى CSV',
  deleteProject: 'إلغاء المشروع',
  addTask: 'إضافة مهمة',
  startDate: 'تاريخ البدء',
  endDate: 'تاريخ الانتهاء',
  client: 'العميل',
  contractNumber: 'رقم العقد',
  quoteNumber: 'رقم عرض السعر',
  averageProgress: 'نسبة الإنجاز (متوسط)',

  // Project Modals (Add/Edit)
  createNewProjectTitle: 'إنشاء مشروع جديد',
  editProjectTitle: 'تعديل المشروع',
  projectNameLabel: 'اسم المشروع',
  descriptionOptionalLabel: 'الوصف (اختياري)',
  contractNumberOptionalLabel: 'رقم العقد (اختياري)',
  quoteNumberOptionalLabel: 'رقم عرض السعر (اختياري)',
  startDateLabel: 'تاريخ البدء',
  endDateLabel: 'تاريخ الانتهاء',
  clientLabel: 'العميل',
  selectClientPlaceholder: 'اختر عميلاً',
  addNewClientPlaceholder: 'إضافة عميل جديد...',
  createProjectButton: 'إنشاء المشروع',

  // Delete Project Modal
  deleteConfirmationTitle: 'تأكيد الحذف',
  deleteConfirmationMessage: (projectName: string) => `هل أنت متأكد من رغبتك في حذف المشروع ${projectName}؟`,
  deleteConfirmationWarning: 'لا يمكن التراجع عن هذا الإجراء. سيتم حذف جميع المهام المرتبطة بهذا المشروع بشكل دائم.',
  deleteProjectButton: 'حذف المشروع',

  // Kanban Board
  status_TODO: 'قيد التنفيذ',
  status_IN_PROGRESS: 'جاري العمل',
  status_DONE: 'مكتمل',

  // Task Card
  editTask: 'تعديل المهمة',
  deleteTask: 'حذف المهمة',
  overdueTaskTooltip: 'هذه المهمة متأخرة',
  createdOn: (date: string) => `أنشئت في ${date}`,
  priority_LOW: 'منخفضة',
  priority_MEDIUM: 'متوسطة',
  priority_HIGH: 'عالية',

  // Task Modal (Add/Edit)
  createNewTaskTitle: 'إنشاء مهمة جديدة',
  editTaskTitle: 'تعديل المهمة',
  taskNameLabel: 'اسم المهمة',
  descriptionLabel: 'الوصف',
  assigneeLabel: 'المسؤول',
  priorityLabel: 'الأولوية',
  completionPercentageLabel: (percentage, status) => `نسبة الإنجاز: ${percentage}% (الحالة: ${status})`,
  statusLabel: 'الحالة',
  addTaskButton: 'إضافة مهمة',

  // Team Management Modal
  manageTeamTitle: 'إدارة فريق العمل',
  addNewMemberPlaceholder: 'إضافة عضو جديد...',
  save: 'حفظ',

  // CSV Export
  csvProjectName: 'اسم المشروع',
  csvClient: 'العميل',
  csvStartDate: 'تاريخ البدء',
  csvEndDate: 'تاريخ الانتهاء',
  csvContractNumber: 'رقم العقد',
  csvQuoteNumber: 'رقم عرض السعر',
  csvOverallCompletion: 'نسبة الإنجاز الإجمالية',
  csvDescription: 'الوصف',
  csvTaskId: 'معرف المهمة',
  csvTaskTitle: 'عنوان المهمة',
  csvTaskDescription: 'الوصف',
  csvAssignee: 'المسؤول',
  csvTaskStartDate: 'تاريخ البدء',
  csvTaskEndDate: 'تاريخ الانتهاء',
  csvCreationDate: 'تاريخ الإنشاء',
  csvStatus: 'الحالة',
  csvPriority: 'الأولوية',
  csvCompletionPercentage: 'نسبة الإنجاز',

  // Sync Conflict Modal
  syncConflictTitle: 'تم اكتشاف تعارض في البيانات',
  localFileSyncConflictTitle: 'تم اكتشاف تعارض في الملف',
  syncConflictMessage: 'بيانات مشروعك في Google Drive تختلف عن جلستك الحالية. أي نسخة تود الاحتفاظ بها؟',
  localFileSyncConflictMessage: 'الملف المحلي يختلف عن بيانات جلستك الحالية. أي نسخة تود الاحتفاظ بها؟',
  syncConflictDownloadButton: 'استخدام نسخة Google Drive',
  localFileSyncOpenButton: 'استخدام النسخة من الملف',
  syncConflictUploadButton: 'استخدام نسخة الجلسة الحالية',
  localFileSyncSaveButton: 'الكتابة فوق الملف ببيانات الجلسة',
};