// i18n - Internationalization for Job Portal Application
// Supports: English (en) and Turkish (tr)

const i18n = {
  currentLanguage: 'en',
  
  translations: {
    en: {
      // Navigation
      nav: {
        home: 'Home',
        jobs: 'Jobs',
        companies: 'Companies',
        myProfile: 'My Profile',
        myApplications: 'My Applications',
        postJob: 'Post Job',
        logout: 'Logout',
        login: 'Login',
        signup: 'Sign Up',
        dashboard: 'Dashboard',
        settings: 'Settings',
        help: 'Help',
        about: 'About Us',
        contact: 'Contact',
      },

      // Homepage
      home: {
        title: 'Find Your Dream Job',
        subtitle: 'Discover thousands of job opportunities worldwide',
        searchPlaceholder: 'Job title, keywords, or company',
        locationPlaceholder: 'City, state, or country',
        searchButton: 'Search Jobs',
        featured: 'Featured Jobs',
        browse: 'Browse All Jobs',
        stats: {
          jobs: 'Active Jobs',
          companies: 'Top Companies',
          users: 'Job Seekers',
          placements: 'Successful Placements',
        },
      },

      // Jobs List
      jobs: {
        title: 'Job Listings',
        noJobs: 'No jobs found matching your criteria',
        filter: 'Filter',
        sort: 'Sort By',
        sortOptions: {
          recent: 'Most Recent',
          relevant: 'Most Relevant',
          salaryHigh: 'Highest Salary',
          salaryLow: 'Lowest Salary',
          popular: 'Most Popular',
        },
        filters: {
          jobType: 'Job Type',
          industry: 'Industry',
          experience: 'Experience Level',
          salary: 'Salary Range',
          location: 'Location',
          remote: 'Remote Work',
        },
        jobTypes: {
          fullTime: 'Full-Time',
          partTime: 'Part-Time',
          contract: 'Contract',
          temporary: 'Temporary',
          internship: 'Internship',
        },
        experience: {
          entry: 'Entry Level',
          junior: 'Junior',
          mid: 'Mid-Level',
          senior: 'Senior',
          executive: 'Executive',
        },
        viewDetails: 'View Details',
        apply: 'Apply Now',
        applied: 'Applied',
        save: 'Save Job',
        saved: 'Job Saved',
      },

      // Job Details
      jobDetails: {
        title: 'Job Details',
        posted: 'Posted',
        deadline: 'Application Deadline',
        views: 'Views',
        applications: 'Applications',
        company: 'Company',
        location: 'Location',
        salary: 'Salary',
        jobType: 'Job Type',
        experience: 'Experience Level',
        description: 'Job Description',
        requirements: 'Requirements',
        benefits: 'Benefits',
        qualifications: 'Qualifications',
        responsibilities: 'Responsibilities',
        skills: 'Required Skills',
        applyNow: 'Apply Now',
        shareJob: 'Share This Job',
        reportJob: 'Report Job',
        similarJobs: 'Similar Jobs',
      },

      // Application Form
      application: {
        title: 'Apply for Job',
        coverLetter: 'Cover Letter',
        coverLetterPlaceholder: 'Tell us why you\'re a great fit for this role...',
        resume: 'Resume/CV',
        uploadResume: 'Upload Resume',
        selectResume: 'Select from saved resumes',
        portfolio: 'Portfolio (Optional)',
        portfolioUrl: 'Portfolio URL',
        phone: 'Phone Number',
        availability: 'Availability',
        availabilityOptions: {
          immediate: 'Immediately',
          twoWeeks: '2 Weeks',
          oneMonth: '1 Month',
          flexible: 'Flexible',
        },
        expectedSalary: 'Expected Salary (Optional)',
        submit: 'Submit Application',
        cancel: 'Cancel',
        submitting: 'Submitting...',
        success: 'Application submitted successfully!',
        error: 'Error submitting application. Please try again.',
      },

      // Profile
      profile: {
        title: 'My Profile',
        editProfile: 'Edit Profile',
        personalInfo: 'Personal Information',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        location: 'Location',
        bio: 'Bio',
        photoUrl: 'Profile Photo',
        uploadPhoto: 'Upload Photo',
        experience: 'Experience',
        education: 'Education',
        skills: 'Skills',
        certifications: 'Certifications',
        languages: 'Languages',
        addExperience: 'Add Experience',
        addEducation: 'Add Education',
        addSkill: 'Add Skill',
        addCertification: 'Add Certification',
        save: 'Save Changes',
        cancel: 'Cancel',
        saved: 'Profile updated successfully!',
        viewProfile: 'View Public Profile',
      },

      // Experience
      experience: {
        title: 'Work Experience',
        companyName: 'Company Name',
        jobTitle: 'Job Title',
        startDate: 'Start Date',
        endDate: 'End Date',
        currentlyWorking: 'I currently work here',
        description: 'Description',
        addMore: 'Add Another Experience',
        delete: 'Delete',
        edit: 'Edit',
      },

      // Education
      education: {
        title: 'Education',
        school: 'School/University',
        degree: 'Degree',
        field: 'Field of Study',
        startDate: 'Start Date',
        endDate: 'End Date',
        grade: 'Grade',
        activities: 'Activities and Societies',
        description: 'Description',
        addMore: 'Add Another Education',
        delete: 'Delete',
        edit: 'Edit',
      },

      // Skills
      skills: {
        title: 'Skills',
        skill: 'Skill',
        endorsements: 'Endorsements',
        addSkill: 'Add Skill',
        endorse: 'Endorse',
        endorsed: 'Endorsed',
      },

      // My Applications
      applications: {
        title: 'My Applications',
        status: 'Status',
        statusOptions: {
          pending: 'Pending',
          reviewed: 'Reviewed',
          shortlisted: 'Shortlisted',
          rejected: 'Rejected',
          accepted: 'Accepted',
        },
        appliedDate: 'Applied Date',
        noApplications: 'You haven\'t applied to any jobs yet',
        viewJob: 'View Job',
        withdrawApplication: 'Withdraw Application',
        applicationDetails: 'Application Details',
      },

      // Companies
      companies: {
        title: 'Companies',
        noCompanies: 'No companies found',
        filter: 'Filter',
        companyName: 'Company Name',
        industry: 'Industry',
        employees: 'Number of Employees',
        founded: 'Founded',
        website: 'Website',
        about: 'About',
        openJobs: 'Open Jobs',
        followCompany: 'Follow Company',
        following: 'Following',
        viewProfile: 'View Company Profile',
      },

      // Authentication
      auth: {
        login: 'Login',
        signup: 'Sign Up',
        logout: 'Logout',
        email: 'Email Address',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        rememberMe: 'Remember Me',
        forgotPassword: 'Forgot Password?',
        dontHaveAccount: 'Don\'t have an account?',
        alreadyHaveAccount: 'Already have an account?',
        signupAs: 'Sign up as',
        jobSeeker: 'Job Seeker',
        employer: 'Employer',
        loginButton: 'Login',
        signupButton: 'Create Account',
        loggingIn: 'Logging in...',
        signingUp: 'Creating account...',
        invalidCredentials: 'Invalid email or password',
        emailExists: 'Email already registered',
        passwordMismatch: 'Passwords do not match',
        loginSuccess: 'Logged in successfully!',
        signupSuccess: 'Account created successfully!',
        logoutSuccess: 'Logged out successfully!',
      },

      // Notifications
      notifications: {
        title: 'Notifications',
        noNotifications: 'No notifications',
        markAsRead: 'Mark as Read',
        markAllAsRead: 'Mark All as Read',
        delete: 'Delete',
        deleteAll: 'Clear All',
      },

      // Messages
      messages: {
        title: 'Messages',
        noMessages: 'No messages',
        newMessage: 'New Message',
        compose: 'Compose Message',
        recipient: 'Recipient',
        subject: 'Subject',
        messageBody: 'Message',
        send: 'Send',
        cancel: 'Cancel',
        sent: 'Message sent successfully',
        sending: 'Sending...',
      },

      // Common
      common: {
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        view: 'View',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        submit: 'Submit',
        close: 'Close',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        warning: 'Warning',
        info: 'Info',
        noData: 'No data available',
        confirm: 'Confirm',
        yes: 'Yes',
        no: 'No',
        optional: 'Optional',
        required: 'Required',
        chooseFile: 'Choose File',
        dropFile: 'Drop file here or click to select',
        uploadProgress: 'Upload Progress',
        uploadComplete: 'Upload Complete',
        uploadFailed: 'Upload Failed',
      },

      // Validation Messages
      validation: {
        required: 'This field is required',
        invalidEmail: 'Please enter a valid email',
        passwordTooShort: 'Password must be at least 8 characters',
        passwordStrength: 'Password strength',
        weak: 'Weak',
        fair: 'Fair',
        good: 'Good',
        strong: 'Strong',
        invalidUrl: 'Please enter a valid URL',
        invalidPhone: 'Please enter a valid phone number',
        fileSize: 'File size exceeds maximum limit',
        fileType: 'Invalid file type',
      },

      // Dates
      dates: {
        today: 'Today',
        yesterday: 'Yesterday',
        thisWeek: 'This Week',
        thisMonth: 'This Month',
        thisYear: 'This Year',
        daysAgo: 'days ago',
        hoursAgo: 'hours ago',
        minutesAgo: 'minutes ago',
        justNow: 'Just now',
      },

      // Pagination
      pagination: {
        previous: 'Previous',
        next: 'Next',
        page: 'Page',
        of: 'of',
        showing: 'Showing',
        to: 'to',
        results: 'results',
      },

      // Dashboard
      dashboard: {
        title: 'Dashboard',
        welcome: 'Welcome',
        statistics: 'Statistics',
        recentApplications: 'Recent Applications',
        recommendedJobs: 'Recommended Jobs',
        savedJobs: 'Saved Jobs',
        topSkills: 'Top Skills',
        profileCompleteness: 'Profile Completeness',
        profileViews: 'Profile Views',
        jobMatches: 'Job Matches',
      },

      // Settings
      settings: {
        title: 'Settings',
        account: 'Account Settings',
        privacy: 'Privacy Settings',
        notifications: 'Notification Preferences',
        emailNotifications: 'Email Notifications',
        pushNotifications: 'Push Notifications',
        smsNotifications: 'SMS Notifications',
        language: 'Language',
        timezone: 'Timezone',
        twoFactor: 'Two-Factor Authentication',
        changePassword: 'Change Password',
        currentPassword: 'Current Password',
        newPassword: 'New Password',
        confirmNewPassword: 'Confirm New Password',
        changeEmail: 'Change Email',
        deleteAccount: 'Delete Account',
        deleteAccountWarning: 'Warning: This action cannot be undone',
      },

      // Footer
      footer: {
        company: 'Company',
        about: 'About Us',
        blog: 'Blog',
        press: 'Press',
        careers: 'Careers',
        contact: 'Contact Us',
        support: 'Support',
        faq: 'FAQ',
        help: 'Help Center',
        community: 'Community Guidelines',
        legal: 'Legal',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        cookies: 'Cookie Policy',
        copyright: '© 2024 Job Portal. All rights reserved.',
      },
    },

    tr: {
      // Navigation
      nav: {
        home: 'Ana Sayfa',
        jobs: 'İşler',
        companies: 'Şirketler',
        myProfile: 'Profilim',
        myApplications: 'Başvurularım',
        postJob: 'İş İlanı Yayınla',
        logout: 'Çıkış Yap',
        login: 'Giriş Yap',
        signup: 'Kayıt Ol',
        dashboard: 'Kontrol Paneli',
        settings: 'Ayarlar',
        help: 'Yardım',
        about: 'Hakkımızda',
        contact: 'İletişim',
      },

      // Homepage
      home: {
        title: 'Rüyanızdaki İşi Bulun',
        subtitle: 'Dünya çapında binlerce iş fırsatını keşfedin',
        searchPlaceholder: 'İş unvanı, anahtar kelimeler veya şirket',
        locationPlaceholder: 'Şehir, eyalet veya ülke',
        searchButton: 'İş Ara',
        featured: 'Öne Çıkan İşler',
        browse: 'Tüm İşleri Gözat',
        stats: {
          jobs: 'Aktif İşler',
          companies: 'En İyi Şirketler',
          users: 'İş Arayanlar',
          placements: 'Başarılı Yerleştirmeler',
        },
      },

      // Jobs List
      jobs: {
        title: 'İş İlanları',
        noJobs: 'Arama kriterlerinize uygun iş bulunamadı',
        filter: 'Filtrele',
        sort: 'Sırala',
        sortOptions: {
          recent: 'En Yeni',
          relevant: 'En Alakalı',
          salaryHigh: 'En Yüksek Maaş',
          salaryLow: 'En Düşük Maaş',
          popular: 'En Popüler',
        },
        filters: {
          jobType: 'İş Türü',
          industry: 'Endüstri',
          experience: 'Deneyim Seviyesi',
          salary: 'Maaş Aralığı',
          location: 'Konum',
          remote: 'Uzaktan Çalışma',
        },
        jobTypes: {
          fullTime: 'Tam Zamanlı',
          partTime: 'Yarı Zamanlı',
          contract: 'Kontrat',
          temporary: 'Geçici',
          internship: 'Stajyer',
        },
        experience: {
          entry: 'Giriş Seviyesi',
          junior: 'Junior',
          mid: 'Orta Seviye',
          senior: 'Senior',
          executive: 'Yönetici',
        },
        viewDetails: 'Ayrıntıları Görüntüle',
        apply: 'Şimdi Başvur',
        applied: 'Başvuruldu',
        save: 'İşi Kaydet',
        saved: 'İş Kaydedildi',
      },

      // Job Details
      jobDetails: {
        title: 'İş Ayrıntıları',
        posted: 'Yayınlandı',
        deadline: 'Başvuru Tarihi',
        views: 'Görüntülemeler',
        applications: 'Başvurular',
        company: 'Şirket',
        location: 'Konum',
        salary: 'Maaş',
        jobType: 'İş Türü',
        experience: 'Deneyim Seviyesi',
        description: 'İş Açıklaması',
        requirements: 'Gereksinimler',
        benefits: 'Faydalar',
        qualifications: 'Nitelikler',
        responsibilities: 'Sorumluluklar',
        skills: 'Gerekli Beceriler',
        applyNow: 'Şimdi Başvur',
        shareJob: 'Bu İşi Paylaş',
        reportJob: 'İşi Bildir',
        similarJobs: 'Benzer İşler',
      },

      // Application Form
      application: {
        title: 'İşe Başvur',
        coverLetter: 'Kapak Mektubu',
        coverLetterPlaceholder: 'Bu rol için neden harika bir aday olduğunuzu bize anlatın...',
        resume: 'Özgeçmiş/CV',
        uploadResume: 'Özgeçmiş Yükle',
        selectResume: 'Kaydedilmiş özgeçmişlerden seç',
        portfolio: 'Portföy (İsteğe Bağlı)',
        portfolioUrl: 'Portföy URL\'si',
        phone: 'Telefon Numarası',
        availability: 'Müsaitlik',
        availabilityOptions: {
          immediate: 'Hemen',
          twoWeeks: '2 Hafta',
          oneMonth: '1 Ay',
          flexible: 'Esnek',
        },
        expectedSalary: 'Beklenen Maaş (İsteğe Bağlı)',
        submit: 'Başvuruyu Gönder',
        cancel: 'İptal',
        submitting: 'Gönderiliyor...',
        success: 'Başvuru başarıyla gönderildi!',
        error: 'Başvuru gönderilirken hata oluştu. Lütfen tekrar deneyin.',
      },

      // Profile
      profile: {
        title: 'Profilim',
        editProfile: 'Profili Düzenle',
        personalInfo: 'Kişisel Bilgiler',
        firstName: 'Ad',
        lastName: 'Soyadı',
        email: 'E-posta',
        phone: 'Telefon',
        location: 'Konum',
        bio: 'Biyografi',
        photoUrl: 'Profil Fotoğrafı',
        uploadPhoto: 'Fotoğraf Yükle',
        experience: 'Deneyim',
        education: 'Eğitim',
        skills: 'Beceriler',
        certifications: 'Sertifikalar',
        languages: 'Diller',
        addExperience: 'Deneyim Ekle',
        addEducation: 'Eğitim Ekle',
        addSkill: 'Beceri Ekle',
        addCertification: 'Sertifika Ekle',
        save: 'Değişiklikleri Kaydet',
        cancel: 'İptal',
        saved: 'Profil başarıyla güncellendi!',
        viewProfile: 'Herkese Açık Profili Görüntüle',
      },

      // Experience
      experience: {
        title: 'Çalışma Deneyimi',
        companyName: 'Şirket Adı',
        jobTitle: 'İş Unvanı',
        startDate: 'Başlangıç Tarihi',
        endDate: 'Bitiş Tarihi',
        currentlyWorking: 'Şu anda burada çalışıyorum',
        description: 'Açıklama',
        addMore: 'Başka Deneyim Ekle',
        delete: 'Sil',
        edit: 'Düzenle',
      },

      // Education
      education: {
        title: 'Eğitim',
        school: 'Okul/Üniversite',
        degree: 'Derece',
        field: 'Çalışma Alanı',
        startDate: 'Başlangıç Tarihi',
        endDate: 'Bitiş Tarihi',
        grade: 'Not',
        activities: 'Aktiviteler ve Topluluklar',
        description: 'Açıklama',
        addMore: 'Başka Eğitim Ekle',
        delete: 'Sil',
        edit: 'Düzenle',
      },

      // Skills
      skills: {
        title: 'Beceriler',
        skill: 'Beceri',
        endorsements: 'Onaylar',
        addSkill: 'Beceri Ekle',
        endorse: 'Onayla',
        endorsed: 'Onaylandı',
      },

      // My Applications
      applications: {
        title: 'Başvurularım',
        status: 'Durum',
        statusOptions: {
          pending: 'Bekleme',
          reviewed: 'İncelendi',
          shortlisted: 'Kısa Listeye Alındı',
          rejected: 'Reddedildi',
          accepted: 'Kabul Edildi',
        },
        appliedDate: 'Başvuru Tarihi',
        noApplications: 'Henüz hiçbir işe başvurmadınız',
        viewJob: 'İşi Görüntüle',
        withdrawApplication: 'Başvuruyu Geri Çek',
        applicationDetails: 'Başvuru Ayrıntıları',
      },

      // Companies
      companies: {
        title: 'Şirketler',
        noCompanies: 'Hiç şirket bulunamadı',
        filter: 'Filtrele',
        companyName: 'Şirket Adı',
        industry: 'Endüstri',
        employees: 'Çalışan Sayısı',
        founded: 'Kuruluş Tarihi',
        website: 'Web Sitesi',
        about: 'Hakkında',
        openJobs: 'Açık İşler',
        followCompany: 'Şirketi Takip Et',
        following: 'Takip Ediliyor',
        viewProfile: 'Şirket Profilini Görüntüle',
      },

      // Authentication
      auth: {
        login: 'Giriş Yap',
        signup: 'Kayıt Ol',
        logout: 'Çıkış Yap',
        email: 'E-posta Adresi',
        password: 'Şifre',
        confirmPassword: 'Şifreyi Onayla',
        rememberMe: 'Beni Hatırla',
        forgotPassword: 'Şifremi Unuttum?',
        dontHaveAccount: 'Hesabınız yok mu?',
        alreadyHaveAccount: 'Zaten bir hesabınız var mı?',
        signupAs: 'Şu şekilde kayıt olun',
        jobSeeker: 'İş Arayan',
        employer: 'İşveren',
        loginButton: 'Giriş Yap',
        signupButton: 'Hesap Oluştur',
        loggingIn: 'Giriş yapılıyor...',
        signingUp: 'Hesap oluşturuluyor...',
        invalidCredentials: 'Geçersiz e-posta veya şifre',
        emailExists: 'E-posta zaten kayıtlı',
        passwordMismatch: 'Şifreler eşleşmiyor',
        loginSuccess: 'Başarıyla giriş yapıldı!',
        signupSuccess: 'Hesap başarıyla oluşturuldu!',
        logoutSuccess: 'Başarıyla çıkış yapıldı!',
      },

      // Notifications
      notifications: {
        title: 'Bildirimler',
        noNotifications: 'Bildirim yok',
        markAsRead: 'Okundu İşaretle',
        markAllAsRead: 'Tümünü Okundu İşaretle',
        delete: 'Sil',
        deleteAll: 'Tümünü Temizle',
      },

      // Messages
      messages: {
        title: 'Mesajlar',
        noMessages: 'Mesaj yok',
        newMessage: 'Yeni Mesaj',
        compose: 'Mesaj Yaz',
        recipient: 'Alıcı',
        subject: 'Konu',
        messageBody: 'Mesaj',
        send: 'Gönder',
        cancel: 'İptal',
        sent: 'Mesaj başarıyla gönderildi',
        sending: 'Gönderiliyor...',
      },

      // Common
      common: {
        save: 'Kaydet',
        cancel: 'İptal',
        delete: 'Sil',
        edit: 'Düzenle',
        view: 'Görüntüle',
        back: 'Geri',
        next: 'İleri',
        previous: 'Önceki',
        submit: 'Gönder',
        close: 'Kapat',
        search: 'Ara',
        filter: 'Filtrele',
        sort: 'Sırala',
        loading: 'Yükleniyor...',
        error: 'Hata',
        success: 'Başarılı',
        warning: 'Uyarı',
        info: 'Bilgi',
        noData: 'Veri yok',
        confirm: 'Onayla',
        yes: 'Evet',
        no: 'Hayır',
        optional: 'İsteğe Bağlı',
        required: 'Gerekli',
        chooseFile: 'Dosya Seç',
        dropFile: 'Dosyayı buraya bırakın veya seçmek için tıklayın',
        uploadProgress: 'Yükleme İlerleme Durumu',
        uploadComplete: 'Yükleme Tamamlandı',
        uploadFailed: 'Yükleme Başarısız',
      },

      // Validation Messages
      validation: {
        required: 'Bu alan gereklidir',
        invalidEmail: 'Lütfen geçerli bir e-posta girin',
        passwordTooShort: 'Şifre en az 8 karakter olmalıdır',
        passwordStrength: 'Şifre gücü',
        weak: 'Zayıf',
        fair: 'Orta',
        good: 'İyi',
        strong: 'Güçlü',
        invalidUrl: 'Lütfen geçerli bir URL girin',
        invalidPhone: 'Lütfen geçerli bir telefon numarası girin',
        fileSize: 'Dosya boyutu maksimum sınırı aşıyor',
        fileType: 'Geçersiz dosya türü',
      },

      // Dates
      dates: {
        today: 'Bugün',
        yesterday: 'Dün',
        thisWeek: 'Bu Hafta',
        thisMonth: 'Bu Ay',
        thisYear: 'Bu Yıl',
        daysAgo: 'gün önce',
        hoursAgo: 'saat önce',
        minutesAgo: 'dakika önce',
        justNow: 'Az önce',
      },

      // Pagination
      pagination: {
        previous: 'Önceki',
        next: 'İleri',
        page: 'Sayfa',
        of: '/',
        showing: 'Gösterilen',
        to: '-',
        results: 'sonuç',
      },

      // Dashboard
      dashboard: {
        title: 'Kontrol Paneli',
        welcome: 'Hoşgeldiniz',
        statistics: 'İstatistikler',
        recentApplications: 'Son Başvurular',
        recommendedJobs: 'Önerilen İşler',
        savedJobs: 'Kaydedilen İşler',
        topSkills: 'En İyi Beceriler',
        profileCompleteness: 'Profil Tamamlanma Durumu',
        profileViews: 'Profil Görüntülemeleri',
        jobMatches: 'İş Eşleşmeleri',
      },

      // Settings
      settings: {
        title: 'Ayarlar',
        account: 'Hesap Ayarları',
        privacy: 'Gizlilik Ayarları',
        notifications: 'Bildirim Tercihleri',
        emailNotifications: 'E-posta Bildirimleri',
        pushNotifications: 'Push Bildirimleri',
        smsNotifications: 'SMS Bildirimleri',
        language: 'Dil',
        timezone: 'Saat Dilimi',
        twoFactor: 'İki Faktörlü Kimlik Doğrulama',
        changePassword: 'Şifre Değiştir',
        currentPassword: 'Mevcut Şifre',
        newPassword: 'Yeni Şifre',
        confirmNewPassword: 'Yeni Şifreyi Onayla',
        changeEmail: 'E-posta Değiştir',
        deleteAccount: 'Hesabı Sil',
        deleteAccountWarning: 'Uyarı: Bu işlem geri alınamaz',
      },

      // Footer
      footer: {
        company: 'Şirket',
        about: 'Hakkımızda',
        blog: 'Blog',
        press: 'Basın',
        careers: 'Kariyer',
        contact: 'İletişim',
        support: 'Destek',
        faq: 'Sık Sorulan Sorular',
        help: 'Yardım Merkezi',
        community: 'Topluluk Yönergeleri',
        legal: 'Yasal',
        privacy: 'Gizlilik Politikası',
        terms: 'Hizmet Şartları',
        cookies: 'Çerez Politikası',
        copyright: '© 2024 İş Portalı. Tüm Hakları Saklıdır.',
      },
    },
  },

  // Get translation by key path
  t(key, language = null) {
    const lang = language || this.currentLanguage;
    const keys = key.split('.');
    let value = this.translations[lang];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return value;
  },

  // Set current language
  setLanguage(lang) {
    if (lang in this.translations) {
      this.currentLanguage = lang;
      localStorage.setItem('preferred-language', lang);
      this.triggerLanguageChange();
    }
  },

  // Get current language
  getLanguage() {
    return this.currentLanguage;
  },

  // Get all available languages
  getAvailableLanguages() {
    return Object.keys(this.translations);
  },

  // Initialize i18n with preferred language
  init(preferredLanguage = null) {
    let lang = preferredLanguage || localStorage.getItem('preferred-language') || 'en';
    
    if (!(lang in this.translations)) {
      lang = 'en';
    }
    
    this.currentLanguage = lang;
  },

  // Trigger language change event
  triggerLanguageChange() {
    const event = new CustomEvent('languageChanged', {
      detail: { language: this.currentLanguage }
    });
    document.dispatchEvent(event);
  },

  // Get translation with interpolation
  tReplace(key, replacements = {}, language = null) {
    let text = this.t(key, language);
    
    Object.keys(replacements).forEach(placeholder => {
      const regex = new RegExp(`{{${placeholder}}}`, 'g');
      text = text.replace(regex, replacements[placeholder]);
    });
    
    return text;
  },

  // Get all translations for a language
  getAllTranslations(language = null) {
    const lang = language || this.currentLanguage;
    return this.translations[lang] || {};
  },
};

// Export for use in different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = i18n;
}
