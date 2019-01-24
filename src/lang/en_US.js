export default {
  BasicInformation: 'Basic Information',
  route: {
    dashboard: 'Dashboard',
    introduction: 'Introduction',
    documentation: 'Documentation',
    guide: 'Guide',
    permission: 'Permission',
    pagePermission: 'Page Permission',
    directivePermission: 'Directive Permission',
    icons: 'Icons',
    components: 'Components',
    componentIndex: 'Introduction',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Dnd List',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: 'Mixin',
    backToTop: 'BackToTop',
    dragDialog: 'Drag Dialog',
    dragKanban: 'Drag Kanban',
    charts: 'Charts',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Line Chart',
    mixChart: 'Mix Chart',
    example: 'Example',
    nested: 'Nested Routes',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    Table: 'Table',
    dynamicTable: 'Dynamic Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit',
    complexTable: 'Complex Table',
    treeTable: 'Tree Table',
    customTreeTable: 'Custom TreeTable',
    tab: 'Tab',
    form: 'Form',
    createArticle: 'Create Article',
    editArticle: 'Edit Article',
    articleList: 'Article List',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    exportZip: 'Export Zip',
    theme: 'Theme',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    screenfull: 'screenfull',
    theme: 'theme'
  },
  login: {
    title: 'Login Form',
    logIn: 'Log in',
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    roles: 'Your roles',
    switchRoles: 'Switch roles'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name(default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name(default file)'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  registered: {
    basicInformation: 'Basic Information'
  },
  returnCode: {
    '200': '操作成功！',
    '1001': '验证码发送失败，请重试！',
    '1002': '该账号尚未注册！',
    '1003': '同一手机号每天最多发送5次验证码，请隔天重试！',
    '1004': '同一ip地址每天最多发送40次验证码，请隔天重试！',
    '1005': '验证码错误或已失效！',
    '1006': '该字段值已存在！',
    '1007': '该账号已存在!',
    '1008': '用户名或密码错误'
  },
  RegisterInformation: {
    individual_developer: 'Individual developer application',
    basic_information: 'Basic information',
    name: 'Name',
    enter_developer_name: 'Please enter developer name',
    consistent_with_ID_card_name: 'The name should be the same with it on the ID Card.',
    iD_Card: 'ID Card',
    enter_ID_number: 'Please enter ID number',
    fill_in_ID_card_number: 'Please fill in 18- digits-long ID number.',
    upload_ID_card_photos: 'Please upload full face photo holding the ID Card',
    single_Choice_Size: 'Single Choice, Size:',
    a320_180: '320 * 180, no more than 1M (JPG/PNG/BMP)',
    Click_to_enlarge: 'Photo sample  Click to enlarge',
    contact_information: 'Contact information',
    contact_person_address: 'Contact person address',
    enter_contact_person_address: 'Please enter contact person address',
    choose_the_province: 'Please choose the province',
    choose_the_city: 'Please choose the city',
    choose_the_district: 'Please choose the district',
    enter_contact_address: 'Please enter contact address',
    email: 'Email',
    enter_your_email: 'Please enter your email',
    enter_correct_email: 'Please enter correct email',
    default_email_address: 'Default email is the one you entered during registration. It can be modified.',
    cell_phone_number: 'Cell phone number',
    enter_phone_number: 'Please enter your cell phone number',
    mobile_verification_code: 'Please enter the verification code sent to your cell phone.',
    enter_correct_verification_code: 'Please enter the correct phone verification code.',
    verification_code: 'Verification code',
    choose: 'Please choose',
    qq: 'QQ',
    wechat: 'Wechat',
    weibo: 'Weibo',
    enter: 'Please enter your',
    account: 'account',
    enter_account: 'Please enter your account',
    easy_communication: 'For our customer service staff to contact you.',
    developer_website: 'Developer website',
    enter_website: 'Please enter your website',
    upload_the_photo_of_your_ID_Card: 'Please upload the photo of your ID Card',
    choose_region: 'Please choose your region',
    enter_email: 'Please enter your email',
    enter_11_phone_number: 'Please enter 11-digit-long cell phone number',
    enter_correct_phone_number_Must_be_11: 'Please enter correct cell phone number. It should be 11 digits long.',
    enter_phone_number_begins_with_13_14_15_17_18: 'Please enter cell phone number beginning with 13,14,15,17,18',
    input_validation_code: 'Please enter the verification code you received',
    qq_account: 'Please enter QQ account',
    wechat_account: 'Please enter Wechat account',
    weibo_account: 'Please enter Weibo account',
    enterprise_developer: 'Enterprise developer application',
    enter_company_name: 'Please enter company name',
    company_name: 'Company name',
    iConsistent_with_business_license: 'It should be the same with the name in trading certificate',
    enter_unified_social_credit_code: 'Please enter unified social credit code',
    enter_correct_unified_social_credit_code: 'Please enter correct unified social credit code',
    upload_copies_of_business_license: 'Please upload scanned copy of trading certification with the size no more than 5M (JPG/PNG)',
    single_choice_size_320_180: 'Single choice, size:320*180,no more than 1M (JPG/PNG/BMP)',
    click_to_enlarge: 'Photo sample, click to enlarge',
    name_of_enterprise_representative: 'Pease enter legal representative name of the company',
    consistent_with_business_license_name: 'It should be the same with the name in the trading certificate.',
    registered_address: 'Registered address',
    enter_detailed_contact_address: 'Please enter detailed contact address',
    consistent_with_business_license_name_address: 'It should be the same with the address in the trading certificate.',
    contact: 'Contact',
    name_of_the_contact_person: 'Name of the contact person',
    contact_name: 'Contact name',
    default_cell_phone_number: 'The default cell phone number is the one you entered during registration. It can be modified.',
    upload_head_picture: 'The upload icon can only be JPG format.',
    the_picture_is_1M: 'The size of uploaded picture is no more than 1M',
    saved: 'Saved',
    verification_code_is_sent: 'Verification code is sent.',
    re_send_after: 'Re-send after',
    re_send_the_verification_code: 'Re-send the verification code',
    submit: 'Save and submit',
    submit_1: 'Submit',
    foreign_individual_developer: 'Foreign individual developer application',
    foreign_enterprise_developer: 'Foreign enterprise developer application',
    select_area: 'Please select area',
    send_the_verification_code: 'Send the verification code',
    submit_application: 'Submit application',
    enter_website_address_of_the_company: 'Please enter the official website address of the company',
    upload_a_copy_of_the_business_license: 'Please upload a copy of the business license.',
    facebook: 'Facebook account',
    twitter: 'Twitter account',
    skype: 'Skype account',
    fill_in_the_address: 'Please fill in the address',
    enter_the_company_address: 'Please enter the company address'
  },
  LoginPage: {
    NOLO_developer: 'NOLO developer platform',
    register: 'Click to register',
    login: 'Login',
    enter_user_name: 'Please enter user name',
    enter_correct_user_name: 'Please enter correct user name',
    enter_password: 'Please enter password',
    enter_correct_password: 'Please enter correct password'
  },
  RegisterPage: {
    register_NOLO_account: 'Register NOLO account',
    country: 'Country',
    choose: 'Please choose',
    china: 'China',
    us: 'US',
    japan: 'Japan',
    phone_number: 'Cell phone number',
    enter_phone_number: 'Please enter your cell phone number',
    send_the_verification_code: 'Send the verification code',
    verification_code: 'Verification code',
    input_validation_code: 'Please enter the verification code you received',
    email_account: 'Email account',
    enter_email_account: 'Please enter your email account',
    user_name: 'User name',
    enter_user_name: 'Please enter user name',
    password: 'Password',
    enter_password: 'Please enter password',
    enter_correct_verification_code: 'Please enter correct verification code',
    confirm_password: 'Please confirm password',
    enter_the_password_again: 'Please enter the password again',
    enter_the_8_20_bit_password: 'Please enter 8-20-digit-long password combined with letters or numbers',
    password_inconsistent: 'The two passwords don’t match with each other.',
    register: 'Register',
    enter_11_phone_number: 'Please enter 11-digit-long cell phone number',
    choose_country: 'Please choose country',
    user_name_has_occupied: 'The user name has been occupied',
    enter_correct_phone_number_Must_be_11: 'Please enter correct cell phone number. It should be 11 digits long.',
    enter_phone_number_begins_with_13_14_15_17_18: 'Please enter cell phone number beginning with 13,14,15,17,18',
    enter_correct_cell_phone_number: 'Please enter correct cell phone number',
    input_correct_email_account: 'Please input correct email account',
    login_was_successful: 'login was successful',
    verification_code_is_sent: 'Verification code is sent.',
    re_send_after: 'Re-send after',
    re_send_the_verification_code: 'Re-send the verification code'
  },
  FinancialInformation: {
    financial_information: 'Financial information',
    payee: 'Payee',
    enter_bank_payee: 'Please enter bank account payee',
    bank_account: 'Bank account',
    enter_bank_account: 'Please enter bank account , the account holder should be the developer.',
    bank_name: 'Bank name',
    sub_branch_of_the_bank: 'Sub-branch of the bank',
    enter_the_Sub_branch_name_of_the_bank: 'Please enter the Sub-branch name of the bank',
    vat_Invoice: 'VAT Invoice',
    financial_contact_person: 'Financial contact person',
    contact_person: 'Contact person',
    enter_contact_person_name: 'Please enter contact person name',
    save_the_changes: 'Save the changes'
  },
  GameManagement: {
    game_management: 'Game management',
    create_application: 'Create new application',
    no_data: 'No data',
    create_game: 'Create new game',
    chinese_game: 'Chinese game name',
    enter_Chinese_name: 'Please enter your Chinese game name',
    english_game: 'English game name',
    enter_English_name: 'Please enter your English game name',
    japanese_game: 'Japanese game name',
    enter_Japanese_name: 'Please enter your Japanese game name',
    create_now: 'Create now'
  },
  GameInformation: {
    game_information: 'Game information',
    reminder: 'Reminder',
    not_uploaded_yet: 'You haven’t uploaded the application.',
    confirm: 'Confirm',
    upload_package: 'Upload the installation package',
    fill_in_information: 'Please fill in game information',
    submit: 'Submit',
    chinese_game_information: 'Chinese game information',
    game_name: 'Game name',
    key_words: 'Key words',
    short_description: 'Short description',
    game_description: 'Game description',
    update_instructions: 'Update instructions',
    enter_content: 'Please enter content',
    upload_preview: 'Upload the application preview',
    upload_icon: 'Upload game icon',
    upload_panorama: 'Upload game panorama',
    upload_video: 'Upload game video',
    other_information: 'Other information',
    internet_needed: 'Internet needed',
    submit_application: 'Submit application',
    key_words_10: 'Please use English punctuation mark between two key words, no more than 10 key words',
    up_to_20: 'No more than 20 characters',
    up_to_1000: 'No more than 1000 characters',
    upload_three_pictures: 'Please upload at least 3 pictures displayed in detailed page. Specification: 16:9 , 1920*1080',
    upload_1_game_icons: 'Please upload 1 (512*512) game logo. Please note that the logo should be of PNG format.',
    upload_one_game_panorama: 'Please upload one game panorama',
    upload_at_least_3_pictures: 'Please upload at least 3 pictures',
    fill_in_the_10: 'No more than 10 words',
    fill_in_the_key_words: 'Please fill in the key words'
  },
  SuccessPage: {
    upload_completed: 'Upload completed',
    game_name: 'Game name',
    version_number: 'Version number',
    version_name: 'Version name',
    date_of_submission: 'Date of submission',
    wait_for_audit: 'The game XXX has been uploaded successfully. Please wait for the review.',
    accelerated_audit: 'To accelerate the rerview, please contact QQ:8888888',
    return_management: 'Back to game management',
    modified_version: 'Change the game version',
    upload_cardboard_version: 'Upload cardboard version',
    enter_package_name: 'Please enter package name',
    enter_the_version_name: 'Please enter the version name',
    enter_version_number: 'Please enter version number',
    pure_digits: 'Version number should be in digits',
    no_games_created: 'You haven’t created any games.',
    reminder: 'Reminder',
    confirm: 'Confirm',
    creation_completed: 'Creation completed.',
    upload_apk: 'The document for uploading should only be apk format. You can only upload 1 file currently. You have uploaded several files. If you need to upload new file, please delete the old one.',
    delete: 'Confirm to delete'
  },
  TestAccount: {
    test_account: 'Test account',
    add_test_account: 'Add test account',
    enter_email_or_phone_number: 'Please enter the email or cell phone number to login',
    cancel: 'Cancel',
    add: 'Add'
  }
}