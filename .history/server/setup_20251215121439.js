const mysql = require('mysql2/promise');

// Veritabanı bağlantı ayarları
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Hamedrasa1212',
  multipleStatements: true // Birden fazla SQL komutunun çalıştırılmasına izin verir
};

// Veritabanı (schema) adı
const schemaName = 'job_portal_updatedl';

// Veritabanı ve tabloları oluşturan SQL komutları
const setupSQL = `
  CREATE DATABASE IF NOT EXISTS ${schemaName};
  USE ${schemaName};

  -- Mevcut tabloları sil
  DROP TABLE IF EXISTS jobs;
  DROP TABLE IF EXISTS categories;

  -- İş ilanları tablosu
  CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title JSON NOT NULL,              -- Çok dilli iş başlığı
    company VARCHAR(255) NOT NULL,    -- Şirket adı
    city VARCHAR(100) NOT NULL,       -- Şehir
    sector VARCHAR(100) NOT NULL,     -- Sektör
    description JSON NOT NULL,        -- Çok dilli açıklama
    requirements JSON NOT NULL,       -- Çok dilli gereksinimler
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    featured TINYINT(1) DEFAULT 0     -- Öne çıkan ilan
  );

  -- Kategori tablosu
  CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,       -- Kategori anahtarı
    name JSON NOT NULL,               -- Çok dilli kategori adı
    count INT DEFAULT 0,              -- İlan sayısı
    icon VARCHAR(10)                  -- Emoji ikon
  );

  -- Örnek iş ilanları ekle
  INSERT INTO jobs 
  (title, company, city, sector, description, requirements, created_at, featured) 
  VALUES 
  (
    '{"tr": "Kıdemli Frontend Geliştirici", "en": "Senior Frontend Developer"}',
    'TechCorp',
    'istanbul',
    'technology',
    '{"tr": "Modern web teknolojileri kullanarak kullanıcı dostu arayüzler geliştirmek.", "en": "Develop user-friendly interfaces using modern web technologies."}',
    '{"tr": ["5+ yıl React", "TypeScript"], "en": ["5+ years React", "TypeScript"]}',
    NOW(),
    1
  ),
  (
    '{"tr": "Dijital Pazarlama Uzmanı", "en": "Digital Marketing Specialist"}',
    'MarketPro',
    'ankara',
    'marketing',
    '{"tr": "Dijital pazarlama stratejileri geliştirmek.", "en": "Develop digital marketing strategies."}',
    '{"tr": ["SEO", "Google Analytics"], "en": ["SEO", "Google Analytics"]}',
    DATE_SUB(NOW(), INTERVAL 2 DAY),
    1
  ),
  (
    '{"tr": "Veri Analisti", "en": "Data Analyst"}',
    'DataWorks',
    'izmir',
    'technology',
    '{"tr": "Büyük veri setlerini analiz etmek.", "en": "Analyze large datasets."}',
    '{"tr": ["SQL", "Python"], "en": ["SQL", "Python"]}',
    DATE_SUB(NOW(), INTERVAL 5 DAY),
    0
  );

  -- Kategorileri ekle
  INSERT INTO categories (id, name, count, icon) VALUES 
  ('technology', '{"tr": "Teknoloji", "en": "Technology"}', 234, '💻'),
  ('finance', '{"tr": "Finans", "en": "Finance"}', 156, '💰'),
  ('health', '{"tr": "Sağlık", "en": "Healthcare"}', 89, '🏥'),
  ('education', '{"tr": "Eğitim", "en": "Education"}', 67, '📚'),
  ('marketing', '{"tr": "Pazarlama", "en": "Marketing"}', 123, '📊');
`;

// Veritabanı kurulum fonksiyonu
async function setup() {
  let connection;
  try {
    console.log('MySQL bağlantısı kuruluyor...');
    connection = await mysql.createConnection(dbConfig);

    console.log(`Veritabanı ve tablolar oluşturuluyor: ${schemaName}...`);
    await connection.query(setupSQL);

    console.log('✅ Veritabanı kurulumu tamamlandı!');
  } catch (error) {
    console.error('❌ Veritabanı kurulumu başarısız:', error.message);
  } finally {
    if (connection) await connection.end(); // Bağlantıyı kapat
  }
}

// Kurulumu başlat
setup();
