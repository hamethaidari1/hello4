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

        icon.style.transform = content.classList.contains('hidden')
          ? 'rotate(0deg)'
          : 'rotate(180deg)';
      });
    });
  }

  // =========================
  // CONTACT FORM (EMAILJS)
  // =========================
  setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
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
      btn.textContent = 'Gönderiliyor...';

      try {
        await emailjs.send(
          'service_10o6sic',
          'YOUR_TEMPLATE_ID',
          {
            subject: subject,
            message: message,
          }
        );

        showToast(
          'Mesajınız başarıyla gönderildi! (Message sent successfully!)',
          'success'
        );

        form.reset();
      } catch (error) {
        console.error('EmailJS error:', error);
        showToast(
          'Mesaj gönderilemedi. Lütfen tekrar deneyin.',
          'error'
        );
      }

      btn.disabled = false;
      btn.textContent = originalText;
    });
  }
}

export const helpManager = new HelpManager();
