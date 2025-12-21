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

    // Update Profile Page Elements
    const profileNameEl = document.getElementById('profilePageName');
    const profileAvatarEl = document.getElementById('profilePageAvatar');
    const profileEmailEl = document.getElementById('profilePageEmail');

    if (profileNameEl) profileNameEl.textContent = displayName;
    if (profileAvatarEl) {
      // Reset avatar to initial state (letter) if no image is saved (simulated)
      profileAvatarEl.innerHTML = initial;
    }
    if (profileEmailEl) profileEmailEl.textContent = user.email;
  }

  initTabs() {
    const tabButtons = document.querySelectorAll('.profile-tab-btn');
    
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(b => {
          b.classList.remove('active', 'border-primary-500', 'text-primary-600');
          b.classList.add('border-transparent', 'text-secondary-500');
        });
        
        // Add active class to clicked button
        btn.classList.add('active', 'border-primary-500', 'text-primary-600');
        btn.classList.remove('border-transparent', 'text-secondary-500');
        
        // Hide all tab contents
        document.querySelectorAll('.profile-tab-content').forEach(content => {
          content.classList.add('hidden');
        });
        
        // Show selected tab content
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

    // Clear existing (hardcoded) content
    container.innerHTML = '';

    mockApplications.forEach(app => {
      const appEl = document.createElement('div');
      appEl.className = 'flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-secondary-200 rounded-lg hover:border-primary-300 transition-colors';
      
      appEl.innerHTML = `
        <div class="mb-3 sm:mb-0">
          <h4 class="font-bold text-secondary-900">${app.title}</h4>
          <p class="text-secondary-600 text-sm">${app.company} • ${app.location}</p>
          <p class="text-secondary-400 text-xs mt-1">Applied on: ${app.date}</p>
        </div>
        <span class="px-3 py-1 bg-${app.statusColor}-100 text-${app.statusColor}-800 rounded-full text-xs font-bold uppercase tracking-wide text-center sm:text-right">
          ${app.status}
        </span>
      `;
      
      container.appendChild(appEl);
    });
  }

  setupEventListeners() {
    // --- Avatar Upload Logic ---
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    const avatarInput = document.getElementById('avatarInput');
    const profileAvatarEl = document.getElementById('profilePageAvatar');

    if (changeAvatarBtn && avatarInput) {
      changeAvatarBtn.addEventListener('click', () => {
        avatarInput.click();
      });

      avatarInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            // Create an image element to replace the text content
            profileAvatarEl.innerHTML = ''; // Clear the initial letter
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'w-full h-full object-cover';
            profileAvatarEl.appendChild(img);
            
            // Show Success Toast
            showToast('Profil fotoğrafı başarıyla güncellendi! (Profile picture updated!)', 'success');
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // --- CV Upload Logic (PDF Only) ---
    const uploadCvBtn = document.getElementById('uploadCvBtn');
    const cvInput = document.getElementById('cvInput');
    const cvFileName = document.getElementById('cvFileName');
    const cvUpdateDate = document.getElementById('cvUpdateDate');

    if (uploadCvBtn && cvInput) {
      uploadCvBtn.addEventListener('click', () => {
        cvInput.click();
      });

      cvInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          // Validate File Type
          if (file.type !== 'application/pdf') {
            showToast('Lütfen sadece PDF dosyası yükleyin. (Please upload PDF files only.)', 'error');
            cvInput.value = ''; // Clear the input
            return;
          }

          // Update UI
          if (cvFileName) cvFileName.textContent = file.name;
          if (cvUpdateDate) {
            const now = new Date();
            cvUpdateDate.textContent = `Last updated: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
          }
          
          // Show Success Toast
          showToast('CV başarıyla yüklendi! (CV uploaded successfully!)', 'success');
        }
      });
    }

    // Add Skill Button
    const addSkillBtn = document.querySelector('#profilePage .card button.text-primary-600');
    if (addSkillBtn) {
      addSkillBtn.addEventListener('click', () => {
        const skill = prompt('Enter a new skill:');
        if (skill) {
          const skillsContainer = document.querySelector('#profilePage .flex.flex-wrap.gap-2');
          if (skillsContainer) {
            const span = document.createElement('span');
            span.className = 'px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium';
            span.textContent = skill;
            skillsContainer.appendChild(span);
            showToast('Yetenek eklendi! (Skill added!)', 'success');
          }
        }
      });
    }
  }
}

// Create and export a singleton instance
export const profileManager = new ProfileManager();
