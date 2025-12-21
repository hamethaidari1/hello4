import { showToast } from '../utils/toast.js';
import { db } from '../firebase/config.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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

  async setupContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        
        // Form alanları boşsa uyarı göster
        if (!subject || !message) {
          showToast('Lütfen tüm alanları doldurun. (Please fill all fields)', 'error');
          return;
        }

        // Firebase'e kaydet ve email gönder
        await this.saveContactMessageToFirebase(subject, message);
        await this.sendEmail(subject, message);
      });
    }
  }

  async saveContactMessageToFirebase(subject, message) {
    try {
      // Firestore'a kaydet
      await addDoc(collection(db, 'contacts'), {
        subject: subject,
        message: message,
        userEmail: '', // Kullanıcı giriş yapmamışsa boş
        createdAt: serverTimestamp(),
        status: 'new'
      });

    } catch (error) {
      console.error('Firebase error:', error);
      throw new Error('Failed to save to database');
    }
  }

  async sendEmail(subject, message) {
    try {
      const btn = document.querySelector('#contactForm button[type="submit"]');
      const originalText = btn.textContent;
      
      // Button durumunu güncelle
      btn.disabled = true;
      btn.textContent = 'Gönderiliyor... (Sending...)';

      // API'ye email gönderme isteği gönder
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject, message })
      });

      const result = await response.json();

      if (result.success) {
        // Başarı mesajı
        showToast('Mesajınız başarıyla gönderildi! E-posta adresinize yanıt gelecektir. (Message sent successfully!)', 'success');
        
        // Form'u temizle
        document.getElementById('contactForm').reset();
        
        // Eğer mailto link varsa, kullanıcıya seçenek sun
        if (result.mailtoLink) {
          setTimeout(() => {
            if (confirm('E-posta istemciniz açılsın mı? (Should your email client open?)')) {
              window.location.href = result.mailtoLink;
            }
          }, 1000);
        }
      } else {
        throw new Error(result.message || 'Email sending failed');
      }

      // Button'u eski haline çevir
      btn.disabled = false;
      btn.textContent = originalText;

    } catch (error) {
      console.error('Email sending error:', error);
      showToast('E-posta gönderilirken bir hata oluştu. Lütfen tekrar deneyin. (Email sending failed)', 'error');
      
      // Button'u eski haline çevir
      const btn = document.querySelector('#contactForm button[type="submit"]');
      btn.disabled = false;
      btn.textContent = 'Gönder';
    }
  }
}

export const helpManager = new HelpManager();