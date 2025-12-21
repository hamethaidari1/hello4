import { showToast } from '../utils/toast.js';

export class HelpManager {
  init() {
    this.setupFAQ();
    this.setupContactForm();
  }

  // =========================
  // FAQ ACCORDION
  // =========================
  setupFAQ() {
    const faqButtons = document.querySelectorAll('.faq-item button');

    faqButtons.forEach(button => {
      button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('svg');

        content.classList.toggle('hidden');

        if (content.classList.contains('hidden')) {
          icon.style.transform = 'rotate(0deg)';
        } else {
          icon.style.transform = 'rotate(180deg)';
        }
      });
    });
  }

  // =========================
  // CONTACT FORM (NO FIREBASE)
  // =========================
  setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const subject = document.getElementById('contactSubject')?.value;
      const message = document.getElementById('contactMessage')?.value;

      if (!subject || !message) {
        showToast(
          'Lütfen tüm alanları doldurun. (Please fill all fields)',
          'error'
        );
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.disabled = true;
      btn.textContent = 'Gönderildi ✔';

      showToast(
        'Mesajınız başarıyla gönderildi! (Message sent successfully!)',
        'success'
      );

      form.reset();

      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = originalText;
      }, 1500);
    });
  }
}

export const helpManager = new HelpManager();
