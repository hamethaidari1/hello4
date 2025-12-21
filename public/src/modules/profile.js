import { mockApplications } from '../data/mockData.js';
import { showToast } from '../utils/toast.js';

export class ProfileManager {
  constructor() {
    this.currentUser = null;
  }

  init() {
    this.initTabs();
    this.renderApplications();
    this.setupEventListeners();
  }

  updateUserInfo(user) {
    this.currentUser = user;
    if (!user) return;

    const displayName = user.displayName || user.email.split('@')[0];
    const firstName = displayName.split(' ')[0];
    const initial = firstName.charAt(0).toUpperCase();

    // Profil sayfasındaki kullanıcı bilgilerini güncelle
    const profileNameEl = document.getElementById('profilePageName');
    const profileAvatarEl = document.getElementById('profilePageAvatar');
    const profileEmailEl = document.getElementById('profilePageEmail');

    if (profileNameEl) profileNameEl.textContent = displayName;

    if (profileAvatarEl) {
      // Profil fotoğrafı yoksa baş harf göster
      profileAvatarEl.innerHTML = initial;
    }

    if (profileEmailEl) profileEmailEl.textContent = user.email;

    // Admin UI'sini güncelle
    this.updateAdminUI();
  }

  updateAdminUI() {
    // Kullanıcının admin olup olmadığını kontrol et
    // Bu örnekte belirli bir e-posta adresini admin olarak kabul ediyoruz
    const isAdmin = this.currentUser && this.currentUser.email === 'admin@jobportal.com';
    
    // Admin dropdown menüsüne admin linki ekle (eğer yoksa)
    const profileDropdown = document.getElementById('profileDropdown');
    if (profileDropdown && isAdmin) {
      // Admin linki zaten var mı kontrol et
      let adminLink = profileDropdown.querySelector('#adminLink');
      
      if (!adminLink) {
        // "Ayarlar" ve "Yardım" butonlarından önce admin linki ekle
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
          adminLink = document.createElement('button');
          adminLink.id = 'adminLink';
          adminLink.className = 'w-full text-left px-4 py-2 hover:bg-secondary-50 text-secondary-700 flex items-center space-x-2';
          adminLink.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            <span>Yönetici Paneli</span>
          `;
          
          adminLink.addEventListener('click', () => {
            this.goToAdminDashboard();
            profileDropdown.classList.add('hidden');
          });
          
          // Ayarlar butonundan önce ekle
          settingsBtn.parentNode.insertBefore(adminLink, settingsBtn);
        }
      }
    }
  }

  goToAdminDashboard() {
    // Admin sayfasına git
    window.location.href = '/admin';
  }

  initTabs() {
    const tabButtons = document.querySelectorAll('.profile-tab-btn');
    
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {

        // Tüm butonlardan aktif sınıfı kaldır
        tabButtons.forEach(b => {
          b.classList.remove('active', 'border-primary-500', 'text-primary-600');
          b.classList.add('border-transparent', 'text-secondary-500');
        });
        
        // Tıklanan butonu aktif yap
        btn.classList.add('active', 'border-primary-500', 'text-primary-600');
        btn.classList.remove('border-transparent', 'text-secondary-500');
        
        // Tüm sekme içeriklerini gizle
        document.querySelectorAll('.profile-tab-content').forEach(content => {
          content.classList.add('hidden');
        });
        
        // Seçilen sekmeyi göster
        const tabId = btn.getAttribute('data-tab');
        const tabContent = document.getElementById(`tab-${tabId}`);
        if (tabContent) {
          tabContent.classList.remove('hidden');
        }
      });
    });
  }

  renderApplications() {
    const container = document.getElementById('applicationsList');
    if (!container) return;

    // Önceden bulunan sabit içerikleri temizle
    container.innerHTML = '';

    mockApplications.forEach(app => {
      const appEl = document.createElement('div');
      appEl.className = 'flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-secondary-200 rounded-lg hover:border-primary-300 transition-colors';
      
      appEl.innerHTML = `
        <div class="mb-3 sm:mb-0">
          <h4 class="font-bold text-secondary-900">${app.title}</h4>
          <p class="text-secondary-600 text-sm">${app.company} • ${app.location}</p>
          <p class="text-secondary-400 text-xs mt-1">Başvuru tarihi: ${app.date}</p>
        </div>
        <span class="px-3 py-1 bg-${app.statusColor}-100 text-${app.statusColor}-800 rounded-full text-xs font-bold uppercase tracking-wide text-center sm:text-right">
          ${app.status}
        </span>
      `;
      
      container.appendChild(appEl);
    });
  }

  setupEventListeners() {

    // --- Profil Fotoğrafı Yükleme ---
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    const avatarInput = document.getElementById('avatarInput');
    const profileAvatarEl = document.getElementById('profilePageAvatar');

    if (changeAvatarBtn && avatarInput) {
      changeAvatarBtn.addEventListener('click', () => {
        // Gizli dosya inputunu tetikler
        avatarInput.click();
      });

      avatarInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {

            // Harf avatarını temizleyip yerine fotoğraf ekle
            profileAvatarEl.innerHTML = '';
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'w-full h-full object-cover';
            profileAvatarEl.appendChild(img);
            
            // Başarılı toast bildirimi
            showToast('Profil fotoğrafı başarıyla güncellendi!', 'success');
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // --- CV Yükleme (Sadece PDF) ---
    const uploadCvBtn = document.getElementById('uploadCvBtn');
    const cvInput = document.getElementById('cvInput');
    const cvFileName = document.getElementById('cvFileName');
    const cvUpdateDate = document.getElementById('cvUpdateDate');

    if (uploadCvBtn && cvInput) {
      uploadCvBtn.addEventListener('click', () => {
        // Gizli PDF yükleme inputunu açar
        cvInput.click();
      });

      cvInput.addEventListener('change', (e) => {
        const file = e.target.files[0];

        if (file) {
          // PDF dosyası değilse hata göster
          if (file.type !== 'application/pdf') {
            showToast('Lütfen sadece PDF dosyası yükleyin.', 'error');
            cvInput.value = '';
            return;
          }

          // Ekrandaki dosya adını güncelle
          if (cvFileName) cvFileName.textContent = file.name;

          // Güncellenme tarihini göster
          if (cvUpdateDate) {
            const now = new Date();
            cvUpdateDate.textContent = `Son güncelleme: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
          }
          
          showToast('CV başarıyla yüklendi!', 'success');
        }
      });
    }

    // --- Yetenek Ekleme ---
    const addSkillBtn = document.querySelector('#profilePage .card button.text-primary-600');
    if (addSkillBtn) {
      addSkillBtn.addEventListener('click', () => {
        const skill = prompt('Yeni yetenek girin:');
        if (skill) {
          const skillsContainer = document.querySelector('#profilePage .flex.flex-wrap.gap-2');
          
          if (skillsContainer) {
            const span = document.createElement('span');
            span.className = 'px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium';
            span.textContent = skill;
            skillsContainer.appendChild(span);
            
            showToast('Yetenek eklendi!', 'success');
          }
        }
      });
    }
  }
}

// Tekil (singleton) profil yöneticisi oluştur ve dışa aktar
export const profileManager = new ProfileManager();