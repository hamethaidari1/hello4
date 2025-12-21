import { registerUser, loginUser, logoutUser, subscribeToAuthChanges, loginWithGoogle } from './src/firebase/auth.js';
import { profileManager } from './src/modules/profile.js';
import { settingsManager } from './src/modules/settings.js';
import { helpManager } from './src/modules/help.js';
import { mockJobs, mockCategories } from './src/data/mockData.js'; // Keeping as fallback
import { showToast } from './src/utils/toast.js';

const state = {
  currentPage: 'home',
  currentLanguage: localStorage.getItem('jobPortalLanguage') || 'tr',
  isLoggedIn: false,
  currentUser: null,
  jobs: [],
  filteredJobs: [],
  categories: []
};

// ==========================================
// DATA FETCHING (MySQL Integration)
// ==========================================
async function fetchInitialData() {
  try {
    // Attempt to fetch from our new Node.js/MySQL Backend
    const [jobsRes, catsRes] = await Promise.all([
      fetch('/api/jobs'),
      fetch('/api/categories')
    ]);

    if (jobsRes.ok && catsRes.ok) {
      state.jobs = await jobsRes.json();
      state.categories = await catsRes.json();
      console.log('✅ Connected to MySQL Database successfully');
    } else {
      throw new Error('API response not ok');
    }
  } catch (error) {
    console.warn('⚠️ Could not connect to MySQL Backend. Using Mock Data fallback.', error);
    // Fallback to mock data if database is not running (e.g. in WebContainer preview)
    state.jobs = mockJobs;
    state.categories = mockCategories;
  }
}

// ==========================================
// TRANSLATIONS
// ==========================================
const translations = {
  tr: {
    appName: 'İŞBUL.ONLINE',
    navHome: 'Ana Sayfa',
    navJobs: 'İş İlanları',
    navAbout: 'Hakkımızda',
    btnLogin: 'Giriş Yap',
    btnRegister: 'Kayıt Ol',
    btnSearch: 'İş Ara',
    btnViewAll: 'Tümünü Gör',
    btnApply: 'Başvuru Yap',
    btnClearFilters: 'Filtreleri Temizle',
    heroTitle: 'Hayalinizdeki İşi Bulun',
    heroSubtitle: 'Binlerce iş ilanı arasından size en uygun pozisyonu keşfedin ve kariyerinizi ilerletin',
    searchKeywordPlaceholder: 'İş pozisyonu, şirket...',
    filterAllCities: 'Tüm Şehirler',
    filterAllSectors: 'Tüm Sektörler',
    filterAllDates: 'Tüm Tarihler',
    filterToday: 'Bugün',
    filterThisWeek: 'Bu Hafta',
    filterThisMonth: 'Bu Ay',
    statJobs: 'İş İlanı',
    statCompanies: 'Şirket',
    statCandidates: 'Aday',
    statHired: 'İşe Alım',
    featuredJobsTitle: 'Öne Çıkan İlanlar',
    featuredJobsSubtitle: 'Sizin için seçtiğimiz en iyi fırsatlar',
    categoriesTitle: 'Sektörlere Göre İş Bul',
    categoriesSubtitle: 'Popüler sektörlerdeki iş fırsatlarını keşfedin',
    jobsPageTitle: 'İş İlanları',
    jobsPageSubtitle: 'Size uygun iş fırsatlarını keşfedin',
    filtersTitle: 'Filtreler',
    filterSector: 'Sektör',
    filterCity: 'Şehir',
    filterDate: 'Tarih',
    jobsFound: 'ilan bulundu',
    sortNewest: 'En Yeni',
    sortOldest: 'En Eski',
    aboutTitle: 'Hakkımızda',
    aboutText1: 'İş Portal, iş arayanlar ve işverenler arasında köprü kuran yenilikçi bir platformdur. Misyonumuz, yetenekli profesyonelleri hayallerindeki kariyer fırsatlarıyla buluşturmaktır.',
    aboutText2: 'Teknoloji odaklı çözümlerimiz ve kullanıcı dostu arayüzümüzle, iş arama sürecini kolaylaştırıyor ve herkes için daha erişilebilir hale getiriyoruz.',
    loginTitle: 'Giriş Yap',
    registerTitle: 'Kayıt Ol',
    labelEmail: 'E-posta',
    labelPassword: 'Şifre',
    labelFirstName: 'Ad',
    labelLastName: 'Soyad',
    labelConfirmPassword: 'Şifre Tekrar',
    placeholderEmail: 'ornek@email.com',
    placeholderPassword: 'Şifrenizi girin',
    placeholderFirstName: 'Adınız',
    placeholderLastName: 'Soyadınız',
    placeholderConfirmPassword: 'Şifrenizi tekrar girin',
    rememberMe: 'Beni Hatırla',
    forgotPassword: 'Şifremi Unuttum',
    noAccount: 'Hesabınız yok mu?',
    haveAccount: 'Zaten hesabınız var mı?',
    acceptTerms: 'Kullanım koşullarını ve gizlilik politikasını kabul ediyorum',
    profileGoToAccount: 'Hesabıma Git',
    profileSettings: 'Ayarlar',
    profileHelp: 'Yardım',
    profileLogout: 'Çıkış Yap',
    footerDescription: 'Kariyerinizi ilerletmenin en kolay yolu',
    footerQuickLinks: 'Hızlı Bağlantılar',
    footerSupport: 'Destek',
    footerSocial: 'Sosyal Medya',
    footerHelp: 'Yardım Merkezi',
    footerContact: 'İletişim',
    footerPrivacy: 'Gizlilik Politikası',
    footerRights: 'Tüm hakları saklıdır.',
    jobDescription: 'İş Açıklaması',
    jobRequirements: 'Aranan Nitelikler',
    sectorTechnology: 'Teknoloji',
    sectorFinance: 'Finans',
    sectorHealth: 'Sağlık',
    sectorEducation: 'Eğitim',
    sectorMarketing: 'Pazarlama',
    sectorSales: 'Satış',
    daysAgo: 'gün önce',
    today: 'Bugün',
    apply: 'Başvur',
    viewDetails: 'Detayları Gör',
    authError: 'Kimlik doğrulama hatası',
    passwordMismatch: 'Şifreler eşleşmiyor!',
    loginSuccess: 'Giriş başarılı!',
    registerSuccess: 'Kayıt başarılı!',
    logoutSuccess: 'Çıkış yapıldı.',
    profileResume: 'CV / Özgeçmiş',
    profileUploadCV: 'CV Yükle',
    profileSkills: 'Yetenekler',
    tabOverview: 'Genel Bakış',
    tabExperience: 'Deneyim',
    tabEducation: 'Eğitim',
    tabApplications: 'Başvurularım',
    profileAboutMe: 'Hakkımda',
    profileLanguages: 'Diller',
    settingsTitle: 'Ayarlar',
    settingsSecurity: 'Güvenlik',
    settingsNotifications: 'Bildirimler',
    settingsChangePassword: 'Şifre Değiştir',
    settingsCurrentPassword: 'Mevcut Şifre',
    settingsNewPassword: 'Yeni Şifre',
    settingsConfirmNewPassword: 'Yeni Şifre Tekrar',
    settingsSavePassword: 'Şifreyi Güncelle',
    settingsEmailNotif: 'E-posta Bildirimleri',
    settingsEmailNotifDesc: 'Yeni iş ilanları ve başvuru güncellemeleri hakkında e-posta al.',
    settingsJobAlerts: 'İş Alarmları',
    settingsJobAlertsDesc: 'Profilinize uygun yeni ilanlar için bildirim al.',
    settingsDeleteAccount: 'Hesabı Sil',
    settingsDeleteAccountDesc: 'Hesabınızı sildiğinizde tüm verileriniz kalıcı olarak silinecektir.',
    settingsDeleteBtn: 'Hesabımı Sil',
    helpTitle: 'Yardım Merkezi',
    helpSubtitle: 'Size nasıl yardımcı olabiliriz?',
    helpFAQ: 'Sıkça Sorulan Sorular',
    helpContact: 'Bize Ulaşın',
    helpSubject: 'Konu',
    helpMessage: 'Mesajınız',
    helpMessagePlaceholder: 'Sorunuzu buraya yazın...',
    helpSend: 'Gönder',
    faqQ1: 'Nasıl iş başvurusu yapabilirim?',
    faqA1: 'İş ilanları sayfasından ilgilendiğiniz ilana tıklayın ve "Başvuru Yap" butonunu kullanın. Profilinizin ve CV\'nizin güncel olduğundan emin olun.',
    faqQ2: 'CV\'mi nasıl güncellerim?',
    faqA2: 'Profil sayfanıza gidin ve "CV Yükle" alanını kullanarak yeni CV\'nizi (PDF formatında) yükleyebilirsiniz.',
    faqQ3: 'Başvuru durumumu nasıl takip ederim?',
    faqA3: 'Profil sayfanızdaki "Başvurularım" sekmesinden tüm başvurularınızın güncel durumunu görebilirsiniz.',
    subjectGeneral: 'Genel Sorular',
    subjectTechnical: 'Teknik Sorun',
    subjectAccount: 'Hesap İşlemleri',
    subjectOther: 'Diğer',
    or: 'VEYA',
    btnGoogle: 'Google ile Giriş Yap',
    processing: 'İşleniyor...',
    googleLoginCancelled: 'Google girişi iptal edildi.',
    inclusiveWorkplaces: 'Kapsayıcı çalışma yerleri herkes için.',
    cityIstanbul: 'İstanbul',
    cityAnkara: 'Ankara',
    cityIzmir: 'İzmir',
    cityBursa: 'Bursa',
    cityAntalya: 'Antalya',
    cityAdana: 'Adana',
    cityGaziantep: 'Gaziantep',
    filterCity: 'Şehir Seçin',
    Trusted: 'Güvenilen:',
    adminDashboard: 'Yönetici Paneli',
    adminAccess: 'Yönetici Paneline Eriş'
  },
  en: {
    appName: 'Job Portal',
    navHome: 'Home',
    navJobs: 'Job Listings',
    navAbout: 'About Us',
    btnLogin: 'Login',
    btnRegister: 'Sign Up',
    btnSearch: 'Search Jobs',
    btnViewAll: 'View All',
    btnApply: 'Apply Now',
    btnClearFilters: 'Clear Filters',
    heroTitle: 'Find Your Dream Job',
    heroSubtitle: 'Discover the perfect position from thousands of job listings and advance your career',
    searchKeywordPlaceholder: 'Job position, company...',
    filterAllCities: 'All Cities',
    filterAllSectors: 'All Sectors',
    filterAllDates: 'All Dates',
    filterToday: 'Today',
    filterThisWeek: 'This Week',
    filterThisMonth: 'This Month',
    statJobs: 'Job Listings',
    statCompanies: 'Companies',
    statCandidates: 'Candidates',
    statHired: 'Hired',
    featuredJobsTitle: 'Featured Jobs',
    featuredJobsSubtitle: 'The best opportunities selected for you',
    categoriesTitle: 'Find Jobs by Sector',
    categoriesSubtitle: 'Explore job opportunities in popular sectors',
    jobsPageTitle: 'Job Listings',
    jobsPageSubtitle: 'Discover job opportunities that match your skills',
    filtersTitle: 'Filters',
    filterSector: 'Sector',
    filterCity: 'City',
    filterDate: 'Date',
    jobsFound: 'jobs found',
    sortNewest: 'Newest',
    sortOldest: 'Oldest',
    aboutTitle: 'About Us',
    aboutText1: 'Job Portal is an innovative platform that bridges job seekers and employers. Our mission is to connect talented professionals with their dream career opportunities.',
    aboutText2: 'With our technology-focused solutions and user-friendly interface, we make the job search process easier and more accessible for everyone.',
    loginTitle: 'Login',
    registerTitle: 'Sign Up',
    labelEmail: 'Email',
    labelPassword: 'Password',
    labelFirstName: 'First Name',
    labelLastName: 'Last Name',
    labelConfirmPassword: 'Confirm Password',
    placeholderEmail: 'example@email.com',
    placeholderPassword: 'Enter your password',
    placeholderFirstName: 'Your first name',
    placeholderLastName: 'Your last name',
    placeholderConfirmPassword: 'Confirm your password',
    rememberMe: 'Remember Me',
    forgotPassword: 'Forgot Password',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    acceptTerms: 'I accept the terms of service and privacy policy',
    profileGoToAccount: 'Go to My Account',
    profileSettings: 'Settings',
    profileHelp: 'Help',
    profileLogout: 'Logout',
    footerDescription: 'The easiest way to advance your career',
    footerQuickLinks: 'Quick Links',
    footerSupport: 'Support',
    footerSocial: 'Social Media',
    footerHelp: 'Help Center',
    footerContact: 'Contact',
    footerPrivacy: 'Privacy Policy',
    footerRights: 'All rights reserved.',
    jobDescription: 'Job Description',
    jobRequirements: 'Required Qualifications',
    sectorTechnology: 'Technology',
    sectorFinance: 'Finance',
    sectorHealth: 'Healthcare',
    sectorEducation: 'Education',
    sectorMarketing: 'Marketing',
    sectorSales: 'Sales',
    daysAgo: 'days ago',
    today: 'Today',
    apply: 'Apply',
    viewDetails: 'View Details',
    authError: 'Authentication error',
    passwordMismatch: 'Passwords do not match!',
    loginSuccess: 'Login successful!',
    registerSuccess: 'Registration successful!',
    logoutSuccess: 'Logged out successfully.',
    profileResume: 'Resume / CV',
    profileUploadCV: 'Upload CV',
    profileSkills: 'Skills',
    tabOverview: 'Overview',
    tabExperience: 'Experience',
    tabEducation: 'Education',
    tabApplications: 'My Applications',
    profileAboutMe: 'About Me',
    profileLanguages: 'Languages',
    settingsTitle: 'Settings',
    settingsSecurity: 'Security',
    settingsNotifications: 'Notifications',
    settingsChangePassword: 'Change Password',
    settingsCurrentPassword: 'Current Password',
    settingsNewPassword: 'New Password',
    settingsConfirmNewPassword: 'Confirm New Password',
    settingsSavePassword: 'Update Password',
    settingsEmailNotif: 'Email Notifications',
    settingsEmailNotifDesc: 'Receive emails about new job listings and application updates.',
    settingsJobAlerts: 'Job Alerts',
    settingsJobAlertsDesc: 'Get notifications for new listings that match your profile.',
    settingsDeleteAccount: 'Delete Account',
    settingsDeleteAccountDesc: 'When you delete your account, all your data will be permanently deleted.',
    settingsDeleteBtn: 'Delete My Account',
    helpTitle: 'Help Center',
    helpSubtitle: 'How can we help you?',
    helpFAQ: 'Frequently Asked Questions',
    helpContact: 'Contact Us',
    helpSubject: 'Subject',
    helpMessage: 'Your Message',
    helpMessagePlaceholder: 'Write your question here...',
    helpSend: 'Send',
    faqQ1: 'How can I apply for a job?',
    faqA1: 'Click on the job listing you\'re interested in from the job listings page and use the "Apply Now" button. Make sure your profile and CV are up to date.',
    faqQ2: 'How can I update my CV?',
    faqA2: 'Go to your profile page and use the "Upload CV" section to upload your new CV (in PDF format).',
    faqQ3: 'How can I track my application status?',
    faqA3: 'You can see the current status of all your applications from the "My Applications" tab on your profile page.',
    subjectGeneral: 'General Questions',
    subjectTechnical: 'Technical Issue',
    subjectAccount: 'Account Management',
    subjectOther: 'Other',
    or: 'OR',
    btnGoogle: 'Sign in with Google',
    processing: 'Processing...',
    googleLoginCancelled: 'Google login was cancelled.',
    inclusiveWorkplaces: 'Inclusive workplaces for all.',
    cityIstanbul: 'Istanbul',
    cityAnkara: 'Ankara',
    cityIzmir: 'Izmir',
    cityBursa: 'Bursa',
    cityAntalya: 'Antalya',
    cityAdana: 'Adana',
    cityGaziantep: 'Gaziantep',
    filterCity: 'Select City',
    Trusted: 'Trusted by:',
    adminDashboard: 'Admin Dashboard',
    adminAccess: 'Access Admin Panel'
  }
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function translate(key) {
  return translations[state.currentLanguage][key] || key;
}

function updateTranslations() {
  // Update text content for all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = translate(key);
  });

  // Update placeholder text for elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    element.placeholder = translate(key);
  });
}

function formatDate(date) {
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) {
    return translate('today');
  }
  return `${diffDays} ${translate('daysAgo')}`;
}

function showPage(pageName) {
  // Hide all pages
  document.querySelectorAll('.page-content').forEach(page => {
    page.classList.add('hidden');
  });

  // Show target page
  const targetPage = document.getElementById(`${pageName}Page`);
  if (targetPage) {
    targetPage.classList.remove('hidden');
    state.currentPage = pageName;
  }

  closeMobileMenu();
}

function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

function openMobileMenu() {
  document.getElementById('mobileMenu').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('is-open');
  document.body.style.overflow = 'auto';
}

// ==========================================
// LANGUAGE SWITCHING
// ==========================================

function switchLanguage(lang) {
  state.currentLanguage = lang;
  localStorage.setItem('jobPortalLanguage', lang);
  document.documentElement.lang = lang;

  const currentLangEl = document.getElementById('currentLang');
  if (currentLangEl) {
    currentLangEl.textContent = lang.toUpperCase();
  }

  updateTranslations();
  renderFeaturedJobs();
  renderJobsList();
  renderCategories();

  const dropdown = document.getElementById('languageDropdown');
  if (dropdown) {
    dropdown.classList.add('hidden');
  }
}

// ==========================================
// AUTHENTICATION
// ==========================================

function updateAuthUI() {
  const authButtons = document.getElementById('authButtons');
  const userProfile = document.getElementById('userProfile');
  const mobileAuthButtons = document.getElementById('mobileAuthButtons');

  if (state.isLoggedIn && state.currentUser) {
    // Show user profile, hide auth buttons
    if (authButtons) authButtons.classList.add('hidden');
    if (userProfile) userProfile.classList.remove('hidden');
    if (mobileAuthButtons) mobileAuthButtons.classList.add('hidden');

    // Update user info
    const displayName = state.currentUser.displayName || state.currentUser.email.split('@')[0];
    const firstName = displayName.split(' ')[0];
    const initial = firstName.charAt(0).toUpperCase();

    const userNameEl = document.getElementById('userName');
    const profileUserNameEl = document.getElementById('profileUserName');
    const userAvatarEl = document.getElementById('userAvatar');

    if (userNameEl) userNameEl.textContent = displayName;
    if (profileUserNameEl) profileUserNameEl.textContent = displayName;
    if (userAvatarEl) userAvatarEl.innerHTML = initial;

    // Update profile manager
    profileManager.updateUserInfo(state.currentUser);

    // Check for admin access and show admin link if needed
    updateAdminUI();
  } else {
    // Show auth buttons, hide user profile
    if (authButtons) authButtons.classList.remove('hidden');
    if (userProfile) userProfile.classList.add('hidden');
    if (mobileAuthButtons) mobileAuthButtons.classList.remove('hidden');
  }
}

function updateAdminUI() {
  // Check if user is admin (you can implement your own logic here)
  const isAdmin = state.currentUser && state.currentUser.email === 'admin@jobportal.com';
  
  const adminLink = document.getElementById('adminLink');
  if (adminLink) {
    adminLink.style.display = isAdmin ? 'block' : 'none';
  }
}

// ==========================================
// JOB RENDERING FUNCTIONS
// ==========================================

function renderJobCard(job, isFeatured = false) {
  // Handle both string and object title formats
  const title = typeof job.title === 'string' ? JSON.parse(job.title) : job.title;
  const description = typeof job.description === 'string' ? JSON.parse(job.description) : job.description;
  const requirements = typeof job.requirements === 'string' ? JSON.parse(job.requirements) : job.requirements;

  const displayTitle = title[state.currentLanguage] || title.en || title.tr || 'Untitled Position';
  const displayDescription = description[state.currentLanguage] || description.en || description.tr || '';
  const displayRequirements = requirements[state.currentLanguage] || requirements.en || requirements.tr || [];

  return `
    <div class="job-card card hover:shadow-lg transition-all duration-300 ${isFeatured ? 'ring-2 ring-primary-200' : ''}">
      ${isFeatured ? '<div class="absolute top-4 right-4"><span class="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">Featured</span></div>' : ''}
      
      <div class="p-6">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h3 class="text-lg font-bold text-secondary-900 mb-2">${displayTitle}</h3>
            <div class="flex items-center text-secondary-600 text-sm mb-2">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              <span class="font-medium">${job.company}</span>
              <span class="mx-2">•</span>
              <span class="capitalize">${translate(`city${job.city.charAt(0).toUpperCase() + job.city.slice(1)}`) || job.city}</span>
            </div>
            <div class="flex items-center text-secondary-500 text-sm">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>${formatDate(job.date)}</span>
            </div>
          </div>
          <span class="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium">
            ${translate(`sector${job.sector.charAt(0).toUpperCase() + job.sector.slice(1)}`) || job.sector}
          </span>
        </div>
        
        <p class="text-secondary-600 text-sm mb-4 line-clamp-2">${displayDescription}</p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          ${displayRequirements.slice(0, 3).map(req => `
            <span class="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs">${req}</span>
          `).join('')}
          ${displayRequirements.length > 3 ? `<span class="px-2 py-1 bg-secondary-100 text-secondary-600 rounded text-xs">+${displayRequirements.length - 3} more</span>` : ''}
        </div>
        
        <div class="flex items-center justify-between">
          <button onclick="viewJobDetails(${job.id})" class="text-primary-600 hover:text-primary-700 font-medium text-sm">
            ${translate('viewDetails')} →
          </button>
          <button onclick="applyToJob(${job.id})" class="btn-primary btn-sm">
            ${translate('apply')}
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderFeaturedJobs() {
  const container = document.getElementById('featuredJobsList');
  if (!container) return;

  const featuredJobs = state.jobs.filter(job => job.featured).slice(0, 6);
  
  if (featuredJobs.length === 0) {
    container.innerHTML = '<div class="col-span-full text-center py-8 text-secondary-500">No featured jobs available at the moment.</div>';
    return;
  }

  container.innerHTML = featuredJobs.map(job => renderJobCard(job, true)).join('');
}

function renderJobsList() {
  const container = document.getElementById('jobsList');
  if (!container) return;

  const jobsToShow = state.filteredJobs.length > 0 ? state.filteredJobs : state.jobs;
  const jobsCount = document.getElementById('jobsCount');
  
  if (jobsCount) {
    jobsCount.textContent = jobsToShow.length;
  }

  if (jobsToShow.length === 0) {
    container.innerHTML = '<div class="text-center py-12"><p class="text-secondary-500">No jobs found matching your criteria.</p></div>';
    return;
  }

  container.innerHTML = jobsToShow.map(job => renderJobCard(job)).join('');
}

function renderCategories() {
  const container = document.getElementById('categoriesList');
  if (!container) return;

  container.innerHTML = state.categories.map(category => {
    const name = category.name[state.currentLanguage] || category.name.en || category.name.tr || 'Unknown';
    return `
      <div class="category-card card hover:shadow-md transition-all duration-300 cursor-pointer p-6 text-center" 
           onclick="filterByCategory('${category.id}')">
        <div class="text-3xl mb-3">${category.icon}</div>
        <h3 class="font-semibold text-secondary-900 mb-1">${name}</h3>
        <p class="text-secondary-500 text-sm">${category.count} jobs</p>
      </div>
    `;
  }).join('');
}

// ==========================================
// JOB FILTERING & ACTIONS
// ==========================================

function filterJobs() {
  const keyword = document.getElementById('searchKeyword')?.value.toLowerCase() || '';
  const city = document.getElementById('searchCity')?.value || '';
  const sector = document.getElementById('filterSector')?.value || '';
  const dateFilter = document.getElementById('filterDate')?.value || '';
  const sortBy = document.getElementById('sortJobs')?.value || 'newest';

  state.filteredJobs = state.jobs.filter(job => {
    // Keyword filter
    const title = typeof job.title === 'string' ? JSON.parse(job.title) : job.title;
    const titleText = (title.en + ' ' + title.tr).toLowerCase();
    const matchesKeyword = !keyword || titleText.includes(keyword);

    // City filter
    const matchesCity = !city || job.city === city;

    // Sector filter
    const matchesSector = !sector || job.sector === sector;

    // Date filter
    let matchesDate = true;
    if (dateFilter) {
      const jobDate = new Date(job.date);
      const now = new Date();
      const diffTime = Math.abs(now - jobDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      switch (dateFilter) {
        case 'today':
          matchesDate = diffDays <= 1;
          break;
        case 'week':
          matchesDate = diffDays <= 7;
          break;
        case 'month':
          matchesDate = diffDays <= 30;
          break;
      }
    }

    return matchesKeyword && matchesCity && matchesSector && matchesDate;
  });

  // Sort jobs
  state.filteredJobs.sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  renderJobsList();
}

function filterByCategory(categoryId) {
  // Switch to jobs page and apply sector filter
  showPage('jobs');
  const sectorFilter = document.getElementById('filterSector');
  if (sectorFilter) {
    sectorFilter.value = categoryId;
    filterJobs();
  }
}

function viewJobDetails(jobId) {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;

  // Handle JSON fields
  const title = typeof job.title === 'string' ? JSON.parse(job.title) : job.title;
  const description = typeof job.description === 'string' ? JSON.parse(job.description) : job.description;
  const requirements = typeof job.requirements === 'string' ? JSON.parse(job.requirements) : job.requirements;

  const displayTitle = title[state.currentLanguage] || title.en || title.tr || 'Untitled Position';
  const displayDescription = description[state.currentLanguage] || description.en || description.tr || '';
  const displayRequirements = requirements[state.currentLanguage] || requirements.en || requirements.tr || [];

  // Update modal content
  document.getElementById('modalJobTitle').textContent = displayTitle;
  document.getElementById('modalCompanyName').textContent = job.company;
  document.getElementById('modalJobCity').textContent = translate(`city${job.city.charAt(0).toUpperCase() + job.city.slice(1)}`) || job.city;
  document.getElementById('modalJobDate').textContent = formatDate(job.date);
  document.getElementById('modalJobSector').textContent = translate(`sector${job.sector.charAt(0).toUpperCase() + job.sector.slice(1)}`) || job.sector;
  document.getElementById('modalJobDescription').textContent = displayDescription;

  const requirementsList = document.getElementById('modalJobRequirements');
  requirementsList.innerHTML = displayRequirements.map(req => `<li>${req}</li>`).join('');

  // Show modal
  showModal('jobModal');
}

function applyToJob(jobId) {
  if (!state.isLoggedIn) {
    showToast(translate('authError'), 'error');
    showModal('loginModal');
    return;
  }

  // Here you would typically make an API call to apply for the job
  showToast('Application submitted successfully!', 'success');
}

// ==========================================
// EVENT LISTENERS
// ==========================================

function initEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      if (page) showPage(page);
    });
  });

  document.querySelectorAll('.nav-link-mobile').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      if (page) showPage(page);
    });
  });

  // Logo click goes to home
  document.getElementById('logo')?.addEventListener('click', () => showPage('home'));

  // Mobile menu
  document.getElementById('mobileMenuBtn')?.addEventListener('click', openMobileMenu);
  document.getElementById('mobileMenuCloseBtn')?.addEventListener('click', closeMobileMenu);

  // Language switcher
  document.getElementById('languageSwitcher')?.addEventListener('click', () => {
    const dropdown = document.getElementById('languageDropdown');
    dropdown?.classList.toggle('hidden');
  });

  document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', () => {
      const lang = option.getAttribute('data-lang');
      if (lang) switchLanguage(lang);
    });
  });

  // Auth buttons
  document.getElementById('loginBtn')?.addEventListener('click', () => showModal('loginModal'));
  document.getElementById('registerBtn')?.addEventListener('click', () => showModal('registerModal'));
  document.getElementById('mobileLoginBtn')?.addEventListener('click', () => showModal('loginModal'));
  document.getElementById('mobileRegisterBtn')?.addEventListener('click', () => showModal('registerModal'));

  // Modal close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal.id);
    });
  });

  // Close modals when clicking outside
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // Profile dropdown
  document.getElementById('profileBtn')?.addEventListener('click', () => {
    const dropdown = document.getElementById('profileDropdown');
    dropdown?.classList.toggle('hidden');
  });

  // Profile actions
  document.getElementById('goToProfileBtn')?.addEventListener('click', () => {
    showPage('profile');
    document.getElementById('profileDropdown')?.classList.add('hidden');
  });

  document.getElementById('settingsBtn')?.addEventListener('click', () => {
    showPage('settings');
    document.getElementById('profileDropdown')?.classList.add('hidden');
  });

  document.getElementById('helpBtn')?.addEventListener('click', () => {
    showPage('help');
    document.getElementById('profileDropdown')?.classList.add('hidden');
  });

  document.getElementById('logoutBtn')?.addEventListener('click', async () => {
    try {
      await logoutUser();
      showToast(translate('logoutSuccess'), 'success');
    } catch (error) {
      showToast(translate('authError'), 'error');
    }
  });

  // Auth forms
  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
      await loginUser(email, password);
      showToast(translate('loginSuccess'), 'success');
      closeModal('loginModal');
    } catch (error) {
      showToast(translate('authError'), 'error');
    }
  });

  document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (password !== confirmPassword) {
      showToast(translate('passwordMismatch'), 'error');
      return;
    }

    const firstName = document.getElementById('registerFirstName').value;
    const lastName = document.getElementById('registerLastName').value;

    try {
      await registerUser(email, password, { firstName, lastName });
      showToast(translate('registerSuccess'), 'success');
      closeModal('registerModal');
    } catch (error) {
      showToast(translate('authError'), 'error');
    }
  });

  // Google auth
  document.getElementById('googleLoginBtn')?.addEventListener('click', async () => {
    try {
      await loginWithGoogle();
      showToast(translate('loginSuccess'), 'success');
      closeModal('loginModal');
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        showToast(translate('authError'), 'error');
      }
    }
  });

  document.getElementById('googleRegisterBtn')?.addEventListener('click', async () => {
    try {
      await loginWithGoogle();
      showToast(translate('registerSuccess'), 'success');
      closeModal('registerModal');
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        showToast(translate('authError'), 'error');
      }
    }
  });

  // Modal switching
  document.getElementById('switchToRegister')?.addEventListener('click', () => {
    closeModal('loginModal');
    showModal('registerModal');
  });

  document.getElementById('switchToLogin')?.addEventListener('click', () => {
    closeModal('registerModal');
    showModal('loginModal');
  });

  // Job actions
  document.getElementById('viewAllJobsBtn')?.addEventListener('click', () => showPage('jobs'));
  document.getElementById('viewAllJobsMobileBtn')?.addEventListener('click', () => showPage('jobs'));
  document.getElementById('applyJobBtn')?.addEventListener('click', () => {
    // Get job ID from modal (you can store it when opening modal)
    closeModal('jobModal');
  });

  // Filtering
  document.getElementById('searchKeyword')?.addEventListener('input', filterJobs);
  document.getElementById('searchCity')?.addEventListener('change', filterJobs);
  document.getElementById('filterSector')?.addEventListener('change', filterJobs);
  document.getElementById('filterCity')?.addEventListener('change', filterJobs);
  document.getElementById('filterDate')?.addEventListener('change', filterJobs);
  document.getElementById('sortJobs')?.addEventListener('change', filterJobs);
  document.getElementById('clearFiltersBtn')?.addEventListener('click', () => {
    document.getElementById('searchKeyword').value = '';
    document.getElementById('searchCity').value = '';
    document.getElementById('filterSector').value = '';
    document.getElementById('filterCity').value = '';
    document.getElementById('filterDate').value = '';
    document.getElementById('sortJobs').value = 'newest';
    state.filteredJobs = [];
    renderJobsList();
  });

  // Click outside to close dropdowns
  document.addEventListener('click', (e) => {
    const languageDropdown = document.getElementById('languageDropdown');
    const languageSwitcher = document.getElementById('languageSwitcher');
    const profileDropdown = document.getElementById('profileDropdown');
    const profileBtn = document.getElementById('profileBtn');

    if (languageDropdown && !languageSwitcher.contains(e.target)) {
      languageDropdown.classList.add('hidden');
    }

    if (profileDropdown && !profileBtn.contains(e.target)) {
      profileDropdown.classList.add('hidden');
    }
  });
}

// ==========================================
// INITIALIZATION
// ==========================================

async function init() {
  // Fetch initial data
  await fetchInitialData();

  // Apply saved language
  switchLanguage(state.currentLanguage);

  // Listen for Firebase auth changes
  subscribeToAuthChanges((user) => {
    if (user) {
      state.isLoggedIn = true;
      state.currentUser = user;
    } else {
      state.isLoggedIn = false;
      state.currentUser = null;
    }
    updateAuthUI();
  });

  // Initial rendering
  renderFeaturedJobs();
  renderJobsList();
  renderCategories();

  // Initialize event listeners
  initEventListeners();

  // Initialize modules
  profileManager.init();
  settingsManager.init();
  helpManager.init();

  console.log('Job Portal başarıyla başlatıldı 🚀');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}