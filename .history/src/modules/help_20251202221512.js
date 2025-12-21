import { showToast } from '../utils/toast.js';

export class HelpManager {
  init() {
    this.setupFAQ();
    this.setupContactForm();
  }

  setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item button');
    
    faqItems.forEach(button => {
      button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('svg');
        
        // Bu FAQ maddesini aç/kapat
        content.classList.toggle('hidden');
        
        // İkonu döndür (açık/kapalı duruma göre)
        if (content.classList.contains('hidden')) {
          icon.style.transform = 'rotate(0deg)';
        } else {
          icon.style.transform = 'rotate(180deg)';
        }
      });
    });
  }

  setupContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        
        // Form alanları boşsa uyarı göster
        if (!subject || !message) {
          showToast('Lütfen tüm alanları doldurun. (Please fill all fields)', 'error');
          return;
        }

        // E-posta gönderme simülasyonu
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Gönderiliyor... (Sending...)';

        setTimeout(() => {
          // Mesajın iletildiğini kullanıcıya bildir
          showToast('Mesajınız başarıyla gönderildi! (Message sent successfully!)', 'success');
          
          form.reset();
          btn.disabled = false;
          btn.textContent = originalText;
        }, 1500);
      });
    }
  }
}

export const helpManager = new HelpManager();
