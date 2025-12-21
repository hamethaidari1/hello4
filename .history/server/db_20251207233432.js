// mysql2/promise kütüphanesini içe aktar (promise yapısını kullanarak asenkron işlemleri kolaylaştırır)
const mysql = require('mysql2/promise');

// Ekran görüntünüzdeki ve sağlanan kimlik bilgilerinizle eşleşen Veritabanı yapılandırması
const pool = mysql.createPool({
  // Veritabanı sunucusunun adresi (genellikle kendi bilgisayarınız/sunucunuz)
  host: 'localhost',
  // Veritabanı kullanıcısı
  user: 'root',
  // Kullanıcı şifresi
  password: 'Hamedrasa1212',
  // Bağlanılacak veritabanının adı
  database: 'job_portal_updatedl',
  waitForConnections: true,
  connectionLimit: 10,
  // Bağlantı kuyruğu sınırı (0 sınırsız demektir)
  queueLimit: 0,
  // JSON sütunları için JSON ayrıştırmayı etkinleştir
  typeCast: function (field, next) {
    // Eğer alan tipi 'JSON' ise
    if (field.type === 'JSON') {
      // Dizeyi (string) JSON nesnesine ayrıştır ve döndür
      return JSON.parse(field.string());
    }
    // Aksi takdirde, varsayılan işleyiciye bırak
    return next();
  }
});

// Oluşturulan bağlantı havuzunu diğer dosyalarda kullanılmak üzere dışa aktar
module.exports = pool;
