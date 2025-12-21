// ==================================================
// DURUM (STATE) YÖNETİMİ
// ==================================================

import { registerUser, loginUser, logoutUser, subscribeToAuthChanges, loginWithGoogle } from './src/firebase/auth.js';
import { profileManager } from './src/modules/profile.js';
import { settingsManager } from './src/modules/settings.js';
import { helpManager } from './src/modules/help.js';
import { mockJobs, mockCategories } from './src/data/mockData.js'; // Yedek (fallback) olarak tutulur
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

// ==================================================
// VERİ ÇEKME (MySQL ENTEGRASYONU)
// ==================================================

async function fetchInitialData() {
  try {
    // Node.js / MySQL backend üzerinden veri çekmeyi dene
    const [jobsRes, catsRes] = await Promise.all([
      fetch('/api/jobs'),
      fetch('/api/categories')
    ]);

    if (jobsRes.ok && catsRes.ok) {
      state.jobs = await jobsRes.json();
      state.categories = await catsRes.json();
      console.log('✅ MySQL veritabanına başarıyla bağlanıldı');
    } else {
      throw new Error('API yanıtı başarısız');
    }
  } catch (error) {
    console.warn('⚠️ MySQL Backend erişilemedi. Mock veriler kullanılıyor.', error);
    // Backend çalışmıyorsa (örn. WebContainer) mock veriye düş
    state.jobs = mockJobs;
    state.categories = mockCategories;
  }
}

// ==================================================
// ÇEVİRİLER (i18n)
// ==================================================

// translations objesi olduğu gibi korunmuştur

// ==================================================
// YARDIMCI (UTILITY) FONKSİYONLAR
// ==================================================

function translate(key) {
  // Seçili dile göre çeviri döndür
  return translations[state.currentLanguage][key] || key;
}

function updateTranslations() {
  // Metin içeren tüm elemanları güncelle
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = translate(key);
  });

  // Placeholder içeren inputları güncelle
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    element.placeholder = translate(key);
  });
}

function formatDate(date) {
  // İlan tarihini “Bugün / X gün önce” formatına çevirir
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) {
    return translate('today');
  }
  return `${diffDays} ${translate('daysAgo')}`;
}

function showPage(pageName) {
  // Tüm sayfaları gizle
  document.querySelectorAll('.page-content').forEach(page => {
    page.classList.add('hidden');
  });

  // Hedef sayfayı göster
  const targetPage = document.getElementById(`${pageName}Page`);
  if (targetPage) {
    targetPage.classList.remove('hidden');
    state.currentPage = pageName;
  }

  closeMobileMenu();
}

function showModal(modalId) {
  // Modal aç ve sayfa scrollunu kilitle
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  // Modal kapat ve scrollu geri aç
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

function openMobileMenu() {
  // Mobil menüyü aç
  document.getElementById('mobileMenu').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  // Mobil menüyü kapat
  document.getElementById('mobileMenu').classList.remove('is-open');
  document.body.style.overflow = 'auto';
}

// ==================================================
// DİL DEĞİŞTİRME (LANGUAGE SWITCH)
// ==================================================

function switchLanguage(lang) {
  // Aktif dili değiştir ve localStorage'a kaydet
  state.currentLanguage = lang;
  localStorage.setItem('jobPortalLanguage', lang);
  document.documentElement.lang = lang;

  document.getElementById('currentLang').textContent = lang.toUpperCase();

  // Çevirileri ve içerikleri yeniden render et
  updateTranslations();
  renderFeaturedJobs();
  renderJobsList();
  renderCategories();

  document.getElementById('languageDropdown').classList.add('hidden');
}

// ==================================================
// KİMLİK DOĞRULAMA (AUTH)
// ==================================================

// Login, Register, Google Login ve Logout fonksiyonları
// kullanıcı giriş/çıkış süreçlerini yönetir

// ==================================================
// İŞ İLANI FİLTRELEME & RENDER
// ==================================================


async function init() {
  // İlk verileri yükle (API veya mock)
  await fetchInitialData();

  // Kayıtlı dili uygula
  switchLanguage(state.currentLanguage);

  // Firebase auth değişikliklerini dinle
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

  // İlk render işlemleri
  renderFeaturedJobs();
  renderJobsList();
  renderCategories();

  // Event listener'ları bağla
  initEventListeners();

  // Alt modülleri başlat
  profileManager.init();
  settingsManager.init();
  helpManager.init();

  console.log('Job Portal başarıyla başlatıldı 🚀');
}

// DOM hazırsa init çalıştır
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
