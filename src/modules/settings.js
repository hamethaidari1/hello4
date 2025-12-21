import { showToast } from '../utils/toast.js';

export class SettingsManager {
  constructor() {
    // Ayarlar durumu
    this.settings = {
      emailNotifications: true,
      jobAlerts: true,
      profileVisibility: 'public'
    };
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // --- Şifre Değiştirme Formu ---
    const passwordForm = document.getElementById('changePasswordForm');
    if (passwordForm) {
      passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleChangePassword();
      });
    }

    // --- Bildirim Anahtarları ---
    const emailNotifToggle = document.getElementById('emailNotifToggle');
    const jobAlertsToggle = document.getElementById('jobAlertsToggle');

    if (emailNotifToggle) {
      emailNotifToggle.addEventListener('change', (e) => {
        this.settings.emailNotifications = e.target.checked;
        this.saveSettings('Bildirim ayarları güncellendi');
      });
    }

    if (jobAlertsToggle) {
      jobAlertsToggle.addEventListener('change', (e) => {
        this.settings.jobAlerts = e.target.checked;
        this.saveSettings('İş alarmı ayarları güncellendi');
      });
    }

    // --- Hesap Silme ---
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteAccountBtn) {
      deleteAccountBtn.addEventListener('click', () => {
        const confirmed = confirm('Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.');
        if (confirmed) {
          showToast('Hesap silme isteği alındı.', 'info');
          // Gerçek uygulamada API çağrısı yapılır
        }
      });
    }
  }

  handleChangePassword() {
    const currentPass = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirmPass = document.getElementById('confirmNewPassword').value;

    if (!currentPass || !newPass || !confirmPass) {
      showToast('Lütfen tüm alanları doldurun.', 'error');
      return;
    }

    if (newPass !== confirmPass) {
      showToast('Yeni şifreler eşleşmiyor!', 'error');
      return;
    }

    if (newPass.length < 6) {
      showToast('Şifre en az 6 karakter olmalıdır.', 'error');
      return;
    }

    // API simülasyonu
    setTimeout(() => {
      showToast('Şifreniz başarıyla güncellendi!', 'success');
      document.getElementById('changePasswordForm').reset();
    }, 1000);
  }

  saveSettings(message) {
    // Arka uca kaydetme simülasyonu
    console.log('Ayarlar kaydediliyor:', this.settings);
    showToast(message, 'success');
  }
}

export const settingsManager = new SettingsManager();
