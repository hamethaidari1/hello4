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
    const adminPage = document.getElementById('adminPage');
    if (adminPage) {
      // Tüm sayfaları gizle
      document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
      });
      
      // Admin sayfasını göster
      adminPage.classList.remove('hidden');
      
      // Admin sayfası içeriğini yükle
      this.loadAdminDashboard();
    }
  }

  async loadAdminDashboard() {
    const adminPage = document.getElementById('adminPage');
    if (!adminPage) return;

    // Admin dashboard içeriğini yükle
    adminPage.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-3xl font-bold text-secondary-900">Yönetici Paneli</h1>
            <p class="text-secondary-600">İş ilanlarını ve başvuruları yönetin</p>
          </div>
          <button onclick="profileManager.openJobModal()" class="btn-primary flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Yeni İş Ekle
          </button>
        </div>

        <!-- İstatistikler -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="card p-6">
            <h3 class="text-secondary-500 text-sm font-medium">Toplam İş İlanı</h3>
            <p class="text-3xl font-bold text-secondary-900 mt-2" id="totalJobsCount">0</p>
          </div>
          <div class="card p-6">
            <h3 class="text-secondary-500 text-sm font-medium">Aktif Başvurular</h3>
            <p class="text-3xl font-bold text-secondary-900 mt-2">12</p>
          </div>
          <div class="card p-6">
            <h3 class="text-secondary-500 text-sm font-medium">Toplam Görüntüleme</h3>
            <p class="text-3xl font-bold text-secondary-900 mt-2">1,234</p>
          </div>
        </div>

        <!-- İş İlanları Tablosu -->
        <div class="card overflow-hidden">
          <div class="px-6 py-4 border-b border-secondary-200 bg-secondary-50 flex justify-between items-center">
            <h2 class="font-semibold text-secondary-800">İş İlanları</h2>
            <button onclick="profileManager.fetchAdminJobs()" class="text-sm text-primary-600 hover:text-primary-700 font-medium">Listeyi Yenile</button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="bg-secondary-50 border-b border-secondary-200 text-xs uppercase text-secondary-500 font-semibold">
                  <th class="px-6 py-4">ID</th>
                  <th class="px-6 py-4">Başlık</th>
                  <th class="px-6 py-4">Şirket</th>
                  <th class="px-6 py-4">Sektör</th>
                  <th class="px-6 py-4">Konum</th>
                  <th class="px-6 py-4">Tarih</th>
                  <th class="px-6 py-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody id="adminJobsList" class="divide-y divide-secondary-200">
                <tr>
                  <td colspan="7" class="px-6 py-8 text-center text-secondary-500">Yükleniyor...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- İş Ekleme/Düzenleme Modal -->
      <div id="adminJobModal" class="modal-overlay hidden">
        <div class="modal-content max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-secondary-900" id="adminModalTitle">Yeni İş Ekle</h2>
            <button class="modal-close p-2 hover:bg-secondary-100 rounded-lg transition-colors">
              <svg class="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <form id="adminJobForm" class="space-y-4">
            <input type="hidden" id="adminJobId">
            
            <div>
              <label class="block text-sm font-semibold text-secondary-700 mb-2">İş Başlığı (İngilizce)</label>
              <input type="text" id="adminTitleEn" required class="w-full" placeholder="örn. Senior Frontend Developer">
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-secondary-700 mb-2">İş Başlığı (Türkçe - Opsiyonel)</label>
              <input type="text" id="adminTitleTr" class="w-full" placeholder="örn. Kıdemli Önyüz Geliştirici">
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-secondary-700 mb-2">Şirket Adı</label>
                <input type="text" id="adminCompany" required class="w-full">
              </div>
              <div>
                <label class="block text-sm font-semibold text-secondary-700 mb-2">Sektör</label>
                <select id="adminSector" required class="w-full">
                  <option value="technology">Teknoloji</option>
                  <option value="finance">Finans</option>
                  <option value="health">Sağlık</option>
                  <option value="education">Eğitim</option>
                  <option value="marketing">Pazarlama</option>
                  <option value="sales">Satış</option>
                </select>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-secondary-700 mb-2">Şehir</label>
              <select id="adminCity" required class="w-full">
                <option value="istanbul">İstanbul</option>
                <option value="ankara">Ankara</option>
                <option value="izmir">İzmir</option>
                <option value="bursa">Bursa</option>
                <option value="antalya">Antalya</option>
                <option value="remote">Uzaktan</option>
              </select>
            </div>
            
            <div class="flex items-center">
              <input type="checkbox" id="adminFeatured" class="mr-2">
              <label class="text-sm text-secondary-700">Öne Çıkan İş</label>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-secondary-700 mb-2">Açıklama (İngilizce)</label>
              <textarea id="adminDescEn" rows="3" required class="w-full"></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-secondary-700 mb-2">Açıklama (Türkçe - Opsiyonel)</label>
              <textarea id="adminDescTr" rows="3" class="w-full"></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-secondary-700 mb-2">Gereksinimler (Virgülle ayırın)</label>
              <input type="text" id="adminRequirements" class="w-full" placeholder="örn. React, Node.js, 3+ yıl deneyim">
            </div>
            
            <div class="flex justify-end gap-3 pt-4">
              <button type="button" class="btn-secondary" onclick="profileManager.closeAdminModal()">İptal</button>
              <button type="submit" class="btn-primary">İşi Kaydet</button>
            </div>
          </form>
        </div>
      </div>
    `;

    // Event listener'ları ekle
    this.setupAdminEventListeners();
    
    // İşleri yükle
    this.fetchAdminJobs();
  }

  setupAdminEventListeners() {
    // Modal kapatma
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => this.closeAdminModal());
    });

    // Form submit
    const form = document.getElementById('adminJobForm');
    if (form) {
      form.addEventListener('submit', (e) => this.handleAdminJobSubmit(e));
    }

    // Modal dışına tıklama
    document.getElementById('adminJobModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'adminJobModal') {
        this.closeAdminModal();
      }
    });
  }

  async fetchAdminJobs() {
    const tbody = document.getElementById('adminJobsList');
    if (!tbody) return;

    tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-8 text-center text-secondary-500">Yükleniyor...</td></tr>';

    try {
      const response = await fetch('/api/jobs');
      const jobs = await response.json();
      
      const totalJobsCount = document.getElementById('totalJobsCount');
      if (totalJobsCount) {
        totalJobsCount.textContent = jobs.length;
      }
      
      this.renderAdminJobsTable(jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-8 text-center text-red-500">İşler yüklenirken hata oluştu. Lütfen tekrar deneyin.</td></tr>';
    }
  }

  renderAdminJobsTable(jobs) {
    const tbody = document.getElementById('adminJobsList');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (jobs.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-8 text-center text-secondary-500">İş bulunamadı. Başlamak için bir tane ekleyin!</td></tr>';
      return;
    }

    jobs.forEach(job => {
      // Handle JSON fields safely
      const title = typeof job.title === 'string' ? JSON.parse(job.title) : job.title;
      const displayTitle = title.en || title.tr || 'Başlıksız';
      const date = new Date(job.date).toLocaleDateString();

      const tr = document.createElement('tr');
      tr.className = 'hover:bg-secondary-50 transition-colors border-b border-secondary-100';
      tr.innerHTML = `
        <td class="px-6 py-4 font-mono text-sm text-secondary-500">#${job.id}</td>
        <td class="px-6 py-4 font-medium text-secondary-900">${displayTitle}</td>
        <td class="px-6 py-4 text-secondary-600">${job.company}</td>
        <td class="px-6 py-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            ${job.sector}
          </span>
        </td>
        <td class="px-6 py-4 text-secondary-600 capitalize">${job.city}</td>
        <td class="px-6 py-4 text-secondary-500 text-sm">${date}</td>
        <td class="px-6 py-4 text-right space-x-2">
          <button onclick='profileManager.openAdminEditModal(${JSON.stringify(job).replace(/'/g, "&#39;")})' class="text-indigo-600 hover:text-indigo-900 font-medium text-sm">Düzenle</button>
          <button onclick="profileManager.deleteAdminJob(${job.id})" class="text-red-600 hover:text-red-900 font-medium text-sm">Sil</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  openJobModal() {
    document.getElementById('adminModalTitle').textContent = 'Yeni İş Ekle';
    document.getElementById('adminJobForm').reset();
    document.getElementById('adminJobId').value = '';
    document.getElementById('adminJobModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  openAdminEditModal(job) {
    document.getElementById('adminModalTitle').textContent = 'İşi Düzenle';
    document.getElementById('adminJobId').value = job.id;

    // Parse JSON fields
    const title = typeof job.title === 'string' ? JSON.parse(job.title) : job.title;
    const desc = typeof job.description === 'string' ? JSON.parse(job.description) : job.description;
    const reqs = typeof job.requirements === 'string' ? JSON.parse(job.requirements) : job.requirements;

    // Fill Form
    document.getElementById('adminTitleEn').value = title.en || '';
    document.getElementById('adminTitleTr').value = title.tr || '';
    document.getElementById('adminCompany').value = job.company;
    document.getElementById('adminSector').value = job.sector;
    document.getElementById('adminCity').value = job.city;
    document.getElementById('adminDescEn').value = desc.en || '';
    document.getElementById('adminDescTr').value = desc.tr || '';
    document.getElementById('adminFeatured').checked = !!job.featured;
    
    // Join requirements array to comma string
    const reqArray = reqs.en || reqs.tr || [];
    document.getElementById('adminRequirements').value = Array.isArray(reqArray) ? reqArray.join(', ') : '';

    document.getElementById('adminJobModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  closeAdminModal() {
    document.getElementById('adminJobModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  async handleAdminJobSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById('adminJobId').value;
    const isEdit = !!id;
    
    // Construct Data Object
    const jobData = {
      title: {
        en: document.getElementById('adminTitleEn').value,
        tr: document.getElementById('adminTitleTr').value
      },
      company: document.getElementById('adminCompany').value,
      sector: document.getElementById('adminSector').value,
      city: document.getElementById('adminCity').value,
      description: {
        en: document.getElementById('adminDescEn').value,
        tr: document.getElementById('adminDescTr').value
      },
      requirements: {
        en: document.getElementById('adminRequirements').value.split(',').map(s => s.trim()).filter(s => s)
      },
      featured: document.getElementById('adminFeatured').checked
    };

    const url = isEdit ? `/api/jobs/${id}` : '/api/jobs';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });

      if (response.ok) {
        this.closeAdminModal();
        this.fetchAdminJobs(); // Refresh table
        showToast(isEdit ? 'İş başarıyla güncellendi!' : 'İş başarıyla oluşturuldu!', 'success');
      } else {
        const err = await response.json();
        showToast('Hata: ' + (err.error || 'İş kaydedilemedi'), 'error');
      }
    } catch (error) {
      console.error('Error saving job:', error);
      showToast('Ağ hatası oluştu.', 'error');
    }
  }

  async deleteAdminJob(id) {
    if (!confirm('Bu işi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) return;

    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        this.fetchAdminJobs();
        showToast('İş başarıyla silindi.', 'success');
      } else {
        showToast('İş silinemedi.', 'error');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      showToast('Ağ hatası oluştu.', 'error');
    }
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
