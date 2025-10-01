export const translations = {
  en: {
    // General
    search_projects: 'Search projects...',
    projects: 'Projects',
    dashboard: 'Dashboard',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    close: 'Close',
    logout: 'Logout',
    not_applicable: 'N/A',

    // Sidebar
    add_project: 'Add Project',
    manage_team: 'Manage Team',
    manage_clients: 'Manage Clients',
    unknown_client: 'Unknown Client',

    // Dashboard
    select_project_prompt: 'Select a project from the sidebar to view its details, or create a new one.',
    no_projects_found: 'No projects found. Get started by adding a new project.',

    // Project View
    add_task: 'Add Task',
    client_name: 'Client Name',
    start_date: 'Start Date',
    end_date: 'End Date',
    contract_id: 'Contract ID',
    quote_id: 'Quote ID',
    overall_progress: 'Overall Progress',
    assignee: 'Assignee',
    not_started_yet: 'Not Started Yet',
    execution_phase: 'Execution Phase',
    finishing_phase: 'Finishing Phase',
    handover_phase: 'Handover Phase',

    // Task Status
    todo: 'To Do',
    in_progress: 'In Progress',
    handover: 'Handover',
    done: 'Done',
    cancelled: 'Cancelled',

    // Add/Edit Project Modal
    new_project_title: 'New Project Details',
    edit_project_title: 'Edit Project Details',
    project_name: 'Project Name',
    project_description: 'Project Description',
    add_new_client: '＋ Add New Client',
    enter_client_name: 'Enter new client name...',
    select_a_client: 'Select a client',
    client_name_error: 'Client name cannot be empty or already exist.',

    // Add/Edit Task Modal
    new_task_title: 'New Task Details',
    edit_task_title: 'Edit Task Details',
    task_title: 'Task Title',
    task_description: 'Task Description',
    priority: 'Priority',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    completion_percentage: 'Completion Percentage',

    // Team Management Modal
    team_management_title: 'Team Management',
    new_member_name: 'New member name',
    add_member: 'Add Member',
    
    // Client Management Modal
    client_management_title: 'Client Management',
    new_client_name: 'New client name',
    add_client: 'Add Client',
    delete_client_error: 'Cannot delete a client that is assigned to one or more projects.',
    client_update_error: 'Client name cannot be empty.',

    // Delete Confirmation Modal
    delete_project_title: 'Delete Project',
    delete_project_confirmation: 'Are you sure you want to delete this project? All associated tasks will also be removed.',
    delete_project_warning: 'This action cannot be undone.',

    // Login
    login_title: 'Team Member Login',
    email: 'Email',
    password: 'Password',
    login: 'Login',
    login_error: 'Invalid email or password.',
    role_selection_title: 'Welcome to FIS-PMP',
    select_role_prompt: 'Please select your role to continue.',
    team_member: 'Team Member',
    client: 'Client',
    back_to_role_selection: 'Back to Role Selection',
    show_password: 'Show password',
    hide_password: 'Hide password',

    // Client Login
    client_login_title: 'Client Portal Login',
    enter_offer_number: 'Enter Offer Number',
    view_project: 'View Project',
    invalid_offer_number: 'Invalid client name or offer number. Please check and try again.',
    
    // Change Password Modal
    change_password: 'Change Password',
    current_password: 'Current Password',
    new_password: 'New Password',
    confirm_new_password: 'Confirm New Password',
    password_changed_success: 'Password changed successfully!',
    invalid_current_password: 'The current password you entered is incorrect.',
    passwords_do_not_match: 'The new passwords do not match.',
    password_cannot_be_empty: 'Password cannot be empty.',
    reset_password: 'Forgot? Reset to Default',
    reset_password_success: 'Password has been reset to the default.',
    reset_password_confirm: 'Are you sure you want to reset your password to the default? You will be logged out.',
    password_reset_logout_alert: 'Password has been reset to default. You will now be logged out.',

    // Language Switcher
    switch_to_arabic: 'Switch to Arabic',
    switch_to_english: 'Switch to English',
  },
  ar: {
    // General
    search_projects: 'ابحث عن مشاريع...',
    projects: 'المشاريع',
    dashboard: 'لوحة التحكم',
    cancel: 'إلغاء',
    save: 'حفظ',
    edit: 'تعديل',
    delete: 'حذف',
    add: 'إضافة',
    close: 'إغلاق',
    logout: 'تسجيل الخروج',
    not_applicable: 'غير متاح',

    // Sidebar
    add_project: 'إضافة مشروع',
    manage_team: 'إدارة الفريق',
    manage_clients: 'إدارة العملاء',
    unknown_client: 'عميل غير معروف',
    
    // Dashboard
    select_project_prompt: 'اختر مشروعًا من الشريط الجانبي لعرض تفاصيله، أو قم بإنشاء مشروع جديد.',
    no_projects_found: 'لم يتم العثور على مشاريع. ابدأ بإضافة مشروع جديد.',
    
    // Project View
    add_task: 'إضافة مهمة',
    client_name: 'اسم العميل',
    start_date: 'تاريخ البدء',
    end_date: 'تاريخ الانتهاء',
    contract_id: 'رقم العقد',
    quote_id: 'رقم عرض السعر',
    overall_progress: 'التقدم العام',
    assignee: 'مُعين إلى',
    not_started_yet: 'لم يبدأ بعد',
    execution_phase: 'مرحلة التنفيذ',
    finishing_phase: 'مرحلة التشطيبات',
    handover_phase: 'مرحلة التسليم',
    
    // Task Status
    todo: 'قيد التنفيذ',
    in_progress: 'في تقدم',
    handover: 'تسليم',
    done: 'تم',
    cancelled: 'ملغى',

    // Add/Edit Project Modal
    new_project_title: 'تفاصيل المشروع الجديد',
    edit_project_title: 'تعديل تفاصيل المشروع',
    project_name: 'اسم المشروع',
    project_description: 'وصف المشروع',
    add_new_client: '＋ إضافة عميل جديد',
    enter_client_name: 'أدخل اسم العميل الجديد...',
    select_a_client: 'اختر عميلاً',
    client_name_error: 'اسم العميل لا يمكن أن يكون فارغًا أو موجودًا بالفعل.',

    // Add/Edit Task Modal
    new_task_title: 'تفاصيل المهمة الجديدة',
    edit_task_title: 'تعديل تفاصيل المهمة',
    task_title: 'عنوان المهمة',
    task_description: 'وصف المهمة',
    priority: 'الأولوية',
    low: 'منخفضة',
    medium: 'متوسطة',
    high: 'عالية',
    completion_percentage: 'نسبة الإنجاز',

    // Team Management Modal
    team_management_title: 'إدارة الفريق',
    new_member_name: 'اسم العضو الجديد',
    add_member: 'إضافة عضو',
    
    // Client Management Modal
    client_management_title: 'إدارة العملاء',
    new_client_name: 'اسم العميل الجديد',
    add_client: 'إضافة عميل',
    delete_client_error: 'لا يمكن حذف عميل مرتبط بمشروع واحد أو أكثر.',
    client_update_error: 'اسم العميل لا يمكن أن يكون فارغًا.',

    // Delete Confirmation Modal
    delete_project_title: 'حذف المشروع',
    delete_project_confirmation: 'هل أنت متأكد أنك تريد حذف هذا المشروع؟ ستتم إزالة جميع المهام المرتبطة به أيضًا.',
    delete_project_warning: 'لا يمكن التراجع عن هذا الإجراء.',

    // Login
    login_title: 'تسجيل دخول أعضاء الفريق',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    login: 'تسجيل الدخول',
    login_error: 'البريد الإلكتروني أو كلمة المرور غير صالحة.',
    role_selection_title: 'مرحبًا بك في FIS-PMP',
    select_role_prompt: 'الرجاء تحديد دورك للمتابعة.',
    team_member: 'عضو فريق',
    client: 'عميل',
    back_to_role_selection: 'العودة لاختيار الدور',
    show_password: 'إظهار كلمة المرور',
    hide_password: 'إخفاء كلمة المرور',
    
    // Client Login
    client_login_title: 'تسجيل دخول بوابة العميل',
    enter_offer_number: 'أدخل رقم عرض السعر',
    view_project: 'عرض المشروع',
    invalid_offer_number: 'اسم العميل أو رقم عرض السعر غير صالح. يرجى التحقق والمحاولة مرة أخرى.',

    // Change Password Modal
    change_password: 'تغيير كلمة المرور',
    current_password: 'كلمة المرور الحالية',
    new_password: 'كلمة المرور الجديدة',
    confirm_new_password: 'تأكيد كلمة المرور الجديدة',
    password_changed_success: 'تم تغيير كلمة المرور بنجاح!',
    invalid_current_password: 'كلمة المرور الحالية التي أدخلتها غير صحيحة.',
    passwords_do_not_match: 'كلمات المرور الجديدة غير متطابقة.',
    password_cannot_be_empty: 'لا يمكن أن تكون كلمة المرور فارغة.',
    reset_password: 'هل نسيت؟ إعادة تعيين إلى الافتراضي',
    reset_password_success: 'تمت إعادة تعيين كلمة المرور إلى الافتراضي.',
    reset_password_confirm: 'هل أنت متأكد أنك تريد إعادة تعيين كلمة المرور إلى الافتراضي؟ سيتم تسجيل خروجك.',
    password_reset_logout_alert: 'تمت إعادة تعيين كلمة المرور إلى الافتراضي. سيتم الآن تسجيل خروجك.',
    
    // Language Switcher
    switch_to_arabic: 'التحويل إلى العربية',
    switch_to_english: 'التحويل إلى الإنجليزية',
  },
};

export type TranslationKey = keyof typeof translations.en;