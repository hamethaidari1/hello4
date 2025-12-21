import { showToast } from '../utils/toast.js';

export class SettingsManager {
  constructor() {
    // State for settings
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
    // --- Password Change Form ---
    const passwordForm = document.getElementById('changePasswordForm');
    if (passwordForm) {
      passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleChangePassword();
      });
    }

    // --- Notification Toggles ---
    const emailNotifToggle = document.getElementById('emailNotifToggle');
    const jobAlertsToggle = document.getElementById('jobAlertsToggle');

    if (emailNotifToggle) {
      emailNotifToggle.addEventListener('change', (e) => {
        this.settings.emailNotifications = e.target.checked;
        this.saveSettings('Bildirim ayarları güncellendi (Notification settings updated)');
      });
    }

    if (jobAlertsToggle) {
      jobAlertsToggle.addEventListener('change', (e) => {
        this.settings.jobAlerts = e.target.checked;
        this.saveSettings('İş alarmı ayarları güncellendi (Job alert settings updated)');
      });
    }

    // --- Delete Account ---
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteAccountBtn) {
      deleteAccountBtn.addEventListener('click', () => {
        const confirmed = confirm('Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.\n(Are you sure you want to delete your account? This cannot be undone.)');
        if (confirmed) {
          showToast('Hesap silme isteği alındı. (Account deletion request received.)', 'info');
          // In a real app, this would call an API
        }
      });
    }
  }

  handleChangePassword() {
    const currentPass = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirmPass = document.getElementById('confirmNewPassword').value;

    if (!currentPass || !newPass || !confirmPass) {
      showToast('Lütfen tüm alanları doldurun. (Please fill in all fields.)', 'error');
      return;
    }

    if (newPass !== confirmPass) {
      showToast('Yeni şifreler eşleşmiyor! (New passwords do not match!)', 'error');
      return;
    }

    if (newPass.length < 6) {
      showToast('Şifre en az 6 karakter olmalıdır. (Password must be at least 6 chars.)', 'error');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      showToast('Şifreniz başarıyla güncellendi! (Password updated successfully!)', 'success');
      document.getElementById('changePasswordForm').reset();
    }, 1000);
  }

  saveSettings(message) {
    // Simulate saving to backend
    console.log('Saving settings:', this.settings);
    showToast(message, 'success');
  }
}

export const settingsManager = new SettingsManager();
