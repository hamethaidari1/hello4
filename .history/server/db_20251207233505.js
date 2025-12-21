// mysql2/promise kütüphanesini içe aktar (promise yapısını kullanarak asenkron işlemleri kolaylaştırır)
const mysql = require('mysql2/promise');

// Ekran görüntünüzdeki ve sağlanan kimlik bilgilerinizle eşleşen Veritabanı yapılandırması
const pool = mysql.createPool({
  // Veritabanı sunucusunun adresi (genellikle kendi bilgisayarınız/sunucunuz)
  host: 'localhost',
  user: 'root',
  password: 'Hamedrasa1212',
  database: 'job_portal_updatedl',
  waitForConnections: true,
  connectionLimit: 10,
  // Bağlantı kuyruğu sınırı (0 sınırsız demektir)
  queueLimit: 0,
  typeCast: function (field, next) {
    if (field.type === 'JSON') {
      return JSON.parse(field.string());
    }
    return next();
  }
});

// Oluşturulan bağlantı havuzunu diğer dosyalarda kullanılmak üzere dışa aktar
module.exports = pool;
