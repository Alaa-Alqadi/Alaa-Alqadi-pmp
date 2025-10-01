// FIX: Replaced placeholder content with a complete translations object for English and Arabic, and exported the necessary types.
const translations = {
  en: {
    // Role & Login
    role_selection_title: 'Project Management Portal',
    select_role_prompt: 'Please select your role to continue.',
    team_member: 'Team Member',
    client: 'Client',
    login_title: 'Team Member Login',
    email: 'Email',
    password: 'Password',
    login: 'Login',
    show_password: 'Show password',
    hide_password: 'Hide password',
    login_error: 'Invalid email or password. Please try again.',
    back_to_role_selection: 'Back to role selection',
    client_login_title: 'Client Project Access',
    enter_offer_number: 'Enter Quote/Offer Number',
    invalid_offer_number: 'Invalid client or offer number. Please check your details.',
    view_project: 'View Project',

    // General
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    not_applicable: 'N/A',
    projects: 'Projects',
    tasks: 'Tasks',
    search_projects: 'Search projects...',
    logout: 'Logout',
    dashboard: 'Dashboard',
    select_project_prompt: 'Select a project from the sidebar to view its details, or choose one below.',
    no_projects_found: 'No projects found. Add one to get started.',
    
    // Sidebar
    add_project: 'Add Project',
    manage_clients: 'Manage Clients',
    manage_team: 'Manage Team',
    unknown_client: 'Unknown Client',
    
    // Project View
    risk_assessment: 'Risk Assessment',
    project_report: 'Project Report',
    add_task: 'Add Task',
    client_name: 'Client Name',
    start_date: 'Start Date',
    end_date: 'End Date',
    contract_id: 'Contract ID',
    quote_id: 'Quote ID',
    overall_progress: 'Overall Progress',
    not_started_yet: 'Not Started',
    execution_phase: 'Execution Phase',
    finishing_phase: 'Finishing Phase',
    handover_phase: 'Handover Phase',
    
    // Task Statuses
    todo: 'To Do',
    in_progress: 'In Progress',
    handover: 'Handover',
    done: 'Done',
    cancelled: 'Cancelled',
    
    // Task Details
    assignee: 'Assignee',
    completion_percentage: 'Completion Percentage',
    priority: 'Priority',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    very_high: 'Very High',
    
    // Modals
    new_project_title: 'New Project Details',
    edit_project_title: 'Edit Project Details',
    project_name: 'Project Name',
    project_description: 'Project Description',
    select_a_client: 'Select a client',
    add_new_client: '+ Add new client',
    enter_client_name: 'Enter new client name',

    new_task_title: 'New Task',
    edit_task_title: 'Edit Task',
    task_title: 'Task Title',
    task_description: 'Task Description',
    
    team_management_title: 'Team Management',
    new_member_name: 'New member name',
    add_member: 'Add Member',
    
    client_management_title: 'Client Management',
    new_client_name: 'New client name',
    add_client: 'Add Client',

    delete_project_title: 'Delete Project',
    delete_project_confirmation: 'Are you sure you want to delete this project? All associated tasks and data will be removed.',
    delete_project_warning: 'This action is irreversible.',
    
    change_password: 'Change Password',
    current_password: 'Current Password',
    new_password: 'New Password',
    confirm_new_password: 'Confirm New Password',
    password_cannot_be_empty: 'New password cannot be empty.',
    passwords_do_not_match: 'New passwords do not match.',
    password_changed_successfully: 'Password changed successfully!',
    invalid_current_password: 'The current password you entered is incorrect.',
    reset_password: 'Forgot? Reset to default',
    reset_password_confirm: 'Are you sure you want to reset your password to the default? You will be prompted to change it upon next login.',

    // Project Report
    print: 'Print',
    task_summary: 'Task Summary',
    status: 'Status',
    total_tasks: 'Total',
    export_csv: 'Export CSV',
    
    // Risk Assessment
    risk_assessment_title: 'Risk Assessment',
    add_risk: 'Add Risk',
    risk_description: 'Risk Description',
    likelihood: 'Likelihood',
    impact: 'Impact',
    impact_level: 'Impact Level',
    overall_risk: 'Overall Risk',
    mitigation_plan: 'Mitigation Plan',
    saved_risks: 'Saved Risks',
    no_risks_saved_yet: 'No risks saved yet.',
    risk_matrix_title: 'Risk Matrix',

    // Language
    switch_to_arabic: 'Switch to Arabic',
    switch_to_english: 'Switch to English',
  },
  ar: {
    // Role & Login
    role_selection_title: 'بوابة إدارة المشاريع',
    select_role_prompt: 'الرجاء تحديد دورك للمتابعة.',
    team_member: 'عضو فريق',
    client: 'عميل',
    login_title: 'تسجيل دخول أعضاء الفريق',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    login: 'تسجيل الدخول',
    show_password: 'إظهار كلمة المرور',
    hide_password: 'إخفاء كلمة المرور',
    login_error: 'البريد الإلكتروني أو كلمة المرور غير صالحة. الرجاء المحاولة مرة أخرى.',
    back_to_role_selection: 'العودة لاختيار الدور',
    client_login_title: 'وصول العميل للمشروع',
    enter_offer_number: 'أدخل رقم عرض السعر',
    invalid_offer_number: 'اسم العميل أو رقم العرض غير صالح. يرجى التحقق من التفاصيل.',
    view_project: 'عرض المشروع',

    // General
    add: 'إضافة',
    edit: 'تعديل',
    delete: 'حذف',
    save: 'حفظ',
    cancel: 'إلغاء',
    close: 'إغلاق',
    not_applicable: 'لا ينطبق',
    projects: 'المشاريع',
    tasks: 'المهام',
    search_projects: 'ابحث عن مشاريع...',
    logout: 'تسجيل الخروج',
    dashboard: 'لوحة التحكم',
    select_project_prompt: 'اختر مشروعًا من الشريط الجانبي لعرض تفاصيله، أو اختر واحدًا أدناه.',
    no_projects_found: 'لم يتم العثور على مشاريع. أضف واحداً للبدء.',

    // Sidebar
    add_project: 'إضافة مشروع',
    manage_clients: 'إدارة العملاء',
    manage_team: 'إدارة الفريق',
    unknown_client: 'عميل غير معروف',
    
    // Project View
    risk_assessment: 'تقييم المخاطر',
    project_report: 'تقرير المشروع',
    add_task: 'إضافة مهمة',
    client_name: 'اسم العميل',
    start_date: 'تاريخ البدء',
    end_date: 'تاريخ الانتهاء',
    contract_id: 'رقم العقد',
    quote_id: 'رقم عرض السعر',
    overall_progress: 'التقدم العام',
    not_started_yet: 'لم يبدأ بعد',
    execution_phase: 'مرحلة التنفيذ',
    finishing_phase: 'مرحلة التشطيبات',
    handover_phase: 'مرحلة التسليم',
    
    // Task Statuses
    todo: 'قيد التنفيذ',
    in_progress: 'جاري العمل',
    handover: 'للتسليم',
    done: 'مكتمل',
    cancelled: 'ملغى',
    
    // Task Details
    assignee: 'مُعين إلى',
    completion_percentage: 'نسبة الإنجاز',
    priority: 'الأولوية',
    low: 'منخفضة',
    medium: 'متوسطة',
    high: 'عالية',
    very_high: 'عالية جداً',
    
    // Modals
    new_project_title: 'تفاصيل مشروع جديد',
    edit_project_title: 'تعديل تفاصيل المشروع',
    project_name: 'اسم المشروع',
    project_description: 'وصف المشروع',
    select_a_client: 'اختر عميلاً',
    add_new_client: '+ إضافة عميل جديد',
    enter_client_name: 'أدخل اسم العميل الجديد',

    new_task_title: 'مهمة جديدة',
    edit_task_title: 'تعديل مهمة',
    task_title: 'عنوان المهمة',
    task_description: 'وصف المهمة',
    
    team_management_title: 'إدارة الفريق',
    new_member_name: 'اسم العضو الجديد',
    add_member: 'إضافة عضو',
    
    client_management_title: 'إدارة العملاء',
    new_client_name: 'اسم العميل الجديد',
    add_client: 'إضافة عميل',

    delete_project_title: 'حذف المشروع',
    delete_project_confirmation: 'هل أنت متأكد أنك تريد حذف هذا المشروع؟ سيتم حذف جميع المهام والبيانات المرتبطة به.',
    delete_project_warning: 'هذا الإجراء لا يمكن التراجع عنه.',
    
    change_password: 'تغيير كلمة المرور',
    current_password: 'كلمة المرور الحالية',
    new_password: 'كلمة المرور الجديدة',
    confirm_new_password: 'تأكيد كلمة المرور الجديدة',
    password_cannot_be_empty: 'كلمة المرور الجديدة لا يمكن أن تكون فارغة.',
    passwords_do_not_match: 'كلمتا المرور الجديدتان غير متطابقتين.',
    password_changed_successfully: 'تم تغيير كلمة المرور بنجاح!',
    invalid_current_password: 'كلمة المرور الحالية التي أدخلتها غير صحيحة.',
    reset_password: 'نسيت؟ إعادة تعيين إلى الافتراضي',
    reset_password_confirm: 'هل أنت متأكد أنك تريد إعادة تعيين كلمة المرور إلى الوضع الافتراضي؟ سيُطلب منك تغييرها عند تسجيل الدخول التالي.',

    // Project Report
    print: 'طباعة',
    task_summary: 'ملخص المهام',
    status: 'الحالة',
    total_tasks: 'الإجمالي',
    export_csv: 'تصدير CSV',

    // Risk Assessment
    risk_assessment_title: 'تقييم المخاطر',
    add_risk: 'إضافة خطر',
    risk_description: 'وصف الخطر',
    likelihood: 'الاحتمالية',
    impact: 'التأثير',
    impact_level: 'مستوى التأثير',
    overall_risk: 'الخطر العام',
    mitigation_plan: 'خطة التخفيف',
    saved_risks: 'المخاطر المحفوظة',
    no_risks_saved_yet: 'لم يتم حفظ أي مخاطر بعد.',
    risk_matrix_title: 'مصفوفة المخاطر',

    // Language
    switch_to_arabic: 'التبديل إلى العربية',
    switch_to_english: 'Switch to English',
  },
};

export type TranslationKey = keyof typeof translations.en;

export { translations };