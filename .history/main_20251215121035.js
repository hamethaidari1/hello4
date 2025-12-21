import { registerUser, loginUser, logoutUser, subscribeToAuthChanges, loginWithGoogle } from './src/firebase/auth.js';
import { profileManager } from './src/modules/profile.js';
import { settingsManager } from './src/modules/settings.js';
import { helpManager } from './src/modules/help.js';
import { mockJobs, mockCategories } from './src/data/mockData.js'; // Keeping as fallback
import { showToast } from './src/utils/toast.js';

const state = {
  currentPage: 'home',
  currentLanguage: localStorage.getItem('jobPortalLanguage') || 'en',
  isLoggedIn: false,
  currentUser: null,
  jobs: [],
  filteredJobs: [],
  categories: []
};


// DATA FETCHING (MySQL Integration)

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
    searchKeyword: 'İş pozisyonu, şirket...',
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
    googleLoginCancelled: 'Google girişi iptal edildi.'
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
    searchKeyword: 'Job position, company...',
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
    jobsPageSubtitle: 'Discover suitable job opportunities',
    filtersTitle: 'Filters',
    filterSector: 'Sector',
    filterCity: 'City',
    filterDate: 'Date',
    jobsFound: 'listings found',
    sortNewest: 'Newest',
    sortOldest: 'Oldest',
    aboutTitle: 'About Us',
    aboutText1: 'Job Portal is an innovative platform that bridges job seekers and employers. Our mission is to connect talented professionals with their dream career opportunities.',
    aboutText2: 'With our technology-driven solutions and user-friendly interface, we simplify the job search process and make it more accessible for everyone.',
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
    placeholderConfirmPassword: 'Re-enter your password',
    rememberMe: 'Remember Me',
    forgotPassword: 'Forgot Password',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    acceptTerms: 'I accept the terms of use and privacy policy',
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
    jobRequirements: 'Requirements',
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
    authError: 'Authentication Error',
    passwordMismatch: 'Passwords do not match!',
    loginSuccess: 'Login successful!',
    registerSuccess: 'Registration successful!',
    logoutSuccess: 'Logged out successfully.',
    profileResume: 'CV / Resume',
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
    settingsEmailNotifDesc: 'Receive emails about new jobs and application updates.',
    settingsJobAlerts: 'Job Alerts',
    settingsJobAlertsDesc: 'Get notified about new jobs matching your profile.',
    settingsDeleteAccount: 'Delete Account',
    settingsDeleteAccountDesc: 'Deleting your account will permanently remove all your data.',
    settingsDeleteBtn: 'Delete My Account',
    helpTitle: 'Help Center',
    helpSubtitle: 'How can we help you?',
    helpFAQ: 'Frequently Asked Questions',
    helpContact: 'Contact Us',
    helpSubject: 'Subject',
    helpMessage: 'Your Message',
    helpMessagePlaceholder: 'Type your question here...',
    helpSend: 'Send',
    faqQ1: 'How do I apply for a job?',
    faqA1: 'Click on a job listing and use the "Apply Now" button. Make sure your profile and CV are up to date.',
    faqQ2: 'How do I update my CV?',
    faqA2: 'Go to your profile page and use the "Upload CV" section to upload a new PDF file.',
    faqQ3: 'How do I track my application status?',
    faqA3: 'You can check the status of all your applications in the "My Applications" tab on your profile page.',
    subjectGeneral: 'General Questions',
    subjectTechnical: 'Technical Issue',
    subjectAccount: 'Account Issues',
    subjectOther: 'Other',
    or: 'OR',
    btnGoogle: 'Sign in with Google',
    processing: 'Processing...',
    googleLoginCancelled: 'Google sign-in cancelled.'
  }
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function translate(key) {
  return translations[state.currentLanguage][key] || key;
}

function updateTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = translate(key);
  });

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
  document.querySelectorAll('.page-content').forEach(page => {
    page.classList.add('hidden');
  });
  
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
  
  document.getElementById('currentLang').textContent = lang.toUpperCase();
  updateTranslations();
  
  renderFeaturedJobs();
  renderJobsList();
  renderCategories();
  
  document.getElementById('languageDropdown').classList.add('hidden');
}

// ==========================================
// AUTHENTICATION
// ==========================================
async function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  if (email && password) {
    const result = await loginUser(email, password);
    
    if (result.success) {
      closeModal('loginModal');
      document.getElementById('loginForm').reset();
      showToast(translate('loginSuccess'), 'success');
    } else {
      showToast(`${translate('authError')}: ${result.error}`, 'error');
    }
  }
}

async function handleRegister(e) {
  e.preventDefault();
  
  const firstName = document.getElementById('registerFirstName').value;
  const lastName = document.getElementById('registerLastName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;
  
  if (password !== confirmPassword) {
    showToast(translate('passwordMismatch'), 'error');
    return;
  }
  
  if (firstName && lastName && email && password) {
    const fullName = `${firstName} ${lastName}`;
    const result = await registerUser(email, password, fullName);
    
    if (result.success) {
      closeModal('registerModal');
      document.getElementById('registerForm').reset();
      showToast(translate('registerSuccess'), 'success');
    } else {
      showToast(`${translate('authError')}: ${result.error}`, 'error');
    }
  }
}

async function handleGoogleLogin(e) {
  const btn = e.currentTarget;
  if (btn.disabled) return;
  
  btn.disabled = true;
  const originalContent = btn.innerHTML;
  
  btn.innerHTML = `
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-secondary-600 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span>${translate('processing')}</span>
  `;
  
  try {
    const result = await loginWithGoogle();
    
    if (result.success) {
      closeModal('loginModal');
      closeModal('registerModal');
      showToast(translate('loginSuccess'), 'success');
    } else {
      console.error('Google Login Error:', result);
      if (result.error && (result.error.includes('auth/popup-blocked') || result.error.includes('auth/cancelled-popup-request'))) {
        alert(`⚠️ CONFIGURATION ERROR: Domain not authorized in Firebase.`);
      } else if (result.error && (result.error.includes('auth/popup-closed-by-user') || result.code === 'auth/popup-closed-by-user')) {
        console.warn('Google login interrupted by user');
      } else {
        showToast(`${translate('authError')}: ${result.error}`, 'error');
      }
    }
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalContent;
  }
}

async function handleLogout() {
  const result = await logoutUser();
  if (result.success) {
    document.getElementById('profileDropdown').classList.add('hidden');
    if (state.currentPage === 'profile' || state.currentPage === 'settings') {
      showPage('home');
    }
    showToast(translate('logoutSuccess'), 'info');
  } else {
    console.error('Logout failed:', result.error);
  }
}

function updateAuthUI() {
  const authButtons = document.getElementById('authButtons');
  const mobileAuthButtons = document.getElementById('mobileAuthButtons');
  const userProfile = document.getElementById('userProfile');
  
  if (state.isLoggedIn && state.currentUser) {
    authButtons.style.display = 'none';
    mobileAuthButtons.classList.add('hidden');
    userProfile.classList.remove('hidden');
    
    const displayName = state.currentUser.displayName || state.currentUser.email.split('@')[0];
    const firstName = displayName.split(' ')[0];
    const initial = firstName.charAt(0).toUpperCase();
    
    document.getElementById('userAvatar').textContent = initial;
    document.getElementById('userName').textContent = firstName;
    document.getElementById('profileUserName').textContent = displayName;
    
    profileManager.updateUserInfo(state.currentUser);
  } else {
    authButtons.style.display = '';
    mobileAuthButtons.classList.remove('hidden');
    userProfile.classList.add('hidden');
  }
}

// ==========================================
// JOB FILTERING & RENDERING
// ==========================================
function filterJobs() {
  const keyword = document.getElementById('searchKeyword')?.value.toLowerCase() || '';
  const city = document.getElementById('searchCity')?.value || '';
  const sector = document.getElementById('filterSector')?.value || '';
  const filterCity = document.getElementById('filterCity')?.value || '';
  const dateFilter = document.getElementById('filterDate')?.value || '';
  
  state.filteredJobs = state.jobs.filter(job => {
    // Handle title as object (from DB JSON) or fallback
    const titleObj = job.title || {};
    const titleText = (titleObj[state.currentLanguage] || '').toLowerCase();
    const companyText = (job.company || '').toLowerCase();

    const titleMatch = !keyword || titleText.includes(keyword) || companyText.includes(keyword);
    const cityMatch = !city && !filterCity || job.city === city || job.city === filterCity;
    const sectorMatch = !sector || job.sector === sector;
    
    let dateMatch = true;
    if (dateFilter) {
      const now = new Date();
      const jobDate = new Date(job.date);
      const diffDays = Math.ceil((now - jobDate) / (1000 * 60 * 60 * 24));
      
      if (dateFilter === 'today') dateMatch = diffDays <= 1;
      else if (dateFilter === 'week') dateMatch = diffDays <= 7;
      else if (dateFilter === 'month') dateMatch = diffDays <= 30;
    }
    
    return titleMatch && cityMatch && sectorMatch && dateMatch;
  });
  
  return state.filteredJobs;
}

function sortJobs(jobs, sortBy = 'newest') {
  return [...jobs].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });
}

function renderJobCard(job, isFeatured = false) {
  const card = document.createElement('div');
  card.className = `card p-6 cursor-pointer ${isFeatured ? 'border-primary-200' : ''}`;
  card.addEventListener('click', () => showJobDetails(job));
  
  const title = job.title[state.currentLanguage] || job.title.en || 'No Title';
  const description = job.description[state.currentLanguage] || job.description.en || '';

  card.innerHTML = `
    <div class="flex justify-between items-start mb-4">
      <div class="flex-1">
        <h3 class="text-lg font-bold text-secondary-900 mb-2 hover:text-primary-600 transition-colors">
          ${title}
        </h3>
        <p class="text-secondary-600 font-medium mb-1">${job.company}</p>
        <div class="flex flex-wrap items-center gap-2 text-sm text-secondary-500">
          <span class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            ${job.city.charAt(0).toUpperCase() + job.city.slice(1)}
          </span>
          <span class="w-1 h-1 bg-secondary-400 rounded-full"></span>
          <span class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            ${formatDate(new Date(job.date))}
          </span>
        </div>
      </div>
      ${isFeatured ? '<span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">⭐ Featured</span>' : ''}
    </div>
    
    <div class="mb-4">
      <span class="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
        ${translate('sector' + job.sector.charAt(0).toUpperCase() + job.sector.slice(1))}
      </span>
    </div>
    
    <p class="text-secondary-600 text-sm mb-4 line-clamp-2">
      ${description}
    </p>
    
    <button class="btn-primary w-full">
      ${translate('btnApply')}
    </button>
  `;

  const applyButton = card.querySelector('button.btn-primary');
  if (applyButton) {
    applyButton.addEventListener('click', (event) => {
      event.stopPropagation();
      applyJob(job.id);
    });
  }
  
  return card;
}

function renderFeaturedJobs() {
  const container = document.getElementById('featuredJobsList');
  if (!container) return;
  
  container.innerHTML = '';
  const featuredJobs = state.jobs.filter(job => job.featured).slice(0, 6);
  
  featuredJobs.forEach(job => {
    container.appendChild(renderJobCard(job, true));
  });
}

function renderJobsList() {
  const container = document.getElementById('jobsList');
  if (!container) return;
  
  const filtered = filterJobs();
  const sortBy = document.getElementById('sortJobs')?.value || 'newest';
  const sorted = sortJobs(filtered, sortBy);
  
  container.innerHTML = '';
  document.getElementById('jobsCount').textContent = sorted.length;
  
  if (sorted.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12">
        <svg class="w-24 h-24 mx-auto text-secondary-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-secondary-600 text-lg">
          ${state.currentLanguage === 'tr' ? 'İlan bulunamadı' : 'No jobs found'}
        </p>
      </div>
    `;
    return;
  }
  
  sorted.forEach(job => {
    container.appendChild(renderJobCard(job, false));
  });
}

function renderCategories() {
  const container = document.getElementById('categoriesList');
  if (!container) return;
  
  container.innerHTML = '';
  
  state.categories.forEach(category => {
    const card = document.createElement('button');
    card.className = 'card p-6 text-left hover:border-primary-300 transition-all group';
    card.onclick = () => filterByCategory(category.id);
    
    const name = category.name[state.currentLanguage] || category.name.en || 'Unknown';

    card.innerHTML = `
      <div class="text-4xl mb-3">${category.icon}</div>
      <h3 class="font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
        ${name}
      </h3>
      <p class="text-secondary-600 text-sm">
        ${category.count} ${state.currentLanguage === 'tr' ? 'ilan' : 'listings'}
      </p>
    `;
    
    container.appendChild(card);
  });
}

function filterByCategory(categoryId) {
  showPage('jobs');
  document.getElementById('filterSector').value = categoryId;
  filterJobs();
  renderJobsList();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showJobDetails(job) {
  const title = job.title[state.currentLanguage] || job.title.en;
  const description = job.description[state.currentLanguage] || job.description.en;
  const requirements = job.requirements[state.currentLanguage] || job.requirements.en || [];

  document.getElementById('modalJobTitle').textContent = title;
  document.getElementById('modalCompanyName').textContent = job.company;
  document.getElementById('modalJobCity').textContent = job.city.charAt(0).toUpperCase() + job.city.slice(1);
  document.getElementById('modalJobDate').textContent = formatDate(new Date(job.date));
  document.getElementById('modalJobSector').textContent = translate('sector' + job.sector.charAt(0).toUpperCase() + job.sector.slice(1));
  document.getElementById('modalJobDescription').textContent = description;
  
  const requirementsList = document.getElementById('modalJobRequirements');
  requirementsList.innerHTML = '';
  requirements.forEach(req => {
    const li = document.createElement('li');
    li.textContent = req;
    requirementsList.appendChild(li);
  });
  
  document.getElementById('applyJobBtn').onclick = () => applyJob(job.id);
  
  showModal('jobModal');
}

function applyJob(jobId) {
  if (!state.isLoggedIn) {
    closeModal('jobModal');
    showModal('loginModal');
    return;
  }
  
  const message = state.currentLanguage === 'tr' 
    ? 'Başvurunuz başarıyla alındı! İlgilendiğiniz için teşekkür ederiz.'
    : 'Your application has been received successfully! Thank you for your interest.';
  
  showToast(message, 'success');
  closeModal('jobModal');
}

function clearFilters() {
  document.getElementById('filterSector').value = '';
  document.getElementById('filterCity').value = '';
  document.getElementById('filterDate').value = '';
  filterJobs();
  renderJobsList();
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function initEventListeners() {
  // Language Switcher
  document.getElementById('languageSwitcher')?.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('languageDropdown').classList.toggle('hidden');
  });
  
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      switchLanguage(e.target.dataset.lang);
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#languageSwitcher')) {
      document.getElementById('languageDropdown').classList.add('hidden');
    }
    if (!e.target.closest('#profileBtn')) {
      document.getElementById('profileDropdown')?.classList.add('hidden');
    }
  });
  
  // Navigation
  document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(e.target.dataset.page);
    });
  });
  
  document.getElementById('logo')?.addEventListener('click', () => showPage('home'));
  
  document.getElementById('viewAllJobsBtn')?.addEventListener('click', () => showPage('jobs'));
  document.getElementById('viewAllJobsMobileBtn')?.addEventListener('click', () => showPage('jobs'));
  
  // Mobile Menu
  document.getElementById('mobileMenuBtn')?.addEventListener('click', openMobileMenu);
  document.getElementById('mobileMenuCloseBtn')?.addEventListener('click', closeMobileMenu);
  
  // Auth Buttons
  document.getElementById('loginBtn')?.addEventListener('click', () => showModal('loginModal'));
  document.getElementById('mobileLoginBtn')?.addEventListener('click', () => {
    closeMobileMenu();
    showModal('loginModal');
  });
  document.getElementById('registerBtn')?.addEventListener('click', () => showModal('registerModal'));
  document.getElementById('mobileRegisterBtn')?.addEventListener('click', () => {
    closeMobileMenu();
    showModal('registerModal');
  });
  
  document.getElementById('switchToRegister')?.addEventListener('click', () => {
    closeModal('loginModal');
    showModal('registerModal');
  });
  
  document.getElementById('switchToLogin')?.addEventListener('click', () => {
    closeModal('registerModal');
    showModal('loginModal');
  });

  // Google Sign-In
  document.getElementById('googleLoginBtn')?.addEventListener('click', handleGoogleLogin);
  document.getElementById('googleRegisterBtn')?.addEventListener('click', handleGoogleLogin);
  
  // Profile Dropdown
  document.getElementById('profileBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('profileDropdown').classList.toggle('hidden');
  });
  
  document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);
  
  document.getElementById('goToProfileBtn')?.addEventListener('click', () => {
    showPage('profile');
    document.getElementById('profileDropdown').classList.add('hidden');
  });

  document.getElementById('settingsBtn')?.addEventListener('click', () => {
    showPage('settings');
    document.getElementById('profileDropdown').classList.add('hidden');
  });
  
  document.getElementById('helpBtn')?.addEventListener('click', () => {
    showPage('help');
    document.getElementById('profileDropdown').classList.add('hidden');
  });
  
  // Forms
  document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
  document.getElementById('registerForm')?.addEventListener('submit', handleRegister);
  
  // Modal Close
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal-overlay');
      if (modal) {
        closeModal(modal.id);
      }
    });
  });
  
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });
  
  // Search and Filters
  document.getElementById('searchBtn')?.addEventListener('click', () => {
    showPage('jobs');
    filterJobs();
    renderJobsList();
  });
  
  document.getElementById('searchKeyword')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      showPage('jobs');
      filterJobs();
      renderJobsList();
    }
  });
  
  document.getElementById('filterSector')?.addEventListener('change', () => {
    filterJobs();
    renderJobsList();
  });
  
  document.getElementById('filterCity')?.addEventListener('change', () => {
    filterJobs();
    renderJobsList();
  });
  
  document.getElementById('filterDate')?.addEventListener('change', () => {
    filterJobs();
    renderJobsList();
  });
  
  document.getElementById('sortJobs')?.addEventListener('change', renderJobsList);
  
  document.getElementById('clearFiltersBtn')?.addEventListener('click', clearFilters);
}

// ==========================================
// INITIALIZATION
// ==========================================
async function init() {
  // Fetch data from API (MySQL) or fall back to mock data
  await fetchInitialData();
  
  switchLanguage(state.currentLanguage);
  
  // Initialize Firebase Auth Listener
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
  
  renderFeaturedJobs();
  renderJobsList();
  renderCategories();
  
  initEventListeners();
  
  // Initialize Modules
  profileManager.init();
  settingsManager.init();
  helpManager.init();
  
  console.log('Job Portal initialized successfully!');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
