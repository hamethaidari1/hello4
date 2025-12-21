const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Hamedrasa1212',
  multipleStatements: true
};

const schemaName = 'job_portal_updatedl';

const setupSQL = `
  CREATE DATABASE IF NOT EXISTS ${schemaName};
  USE ${schemaName};

  DROP TABLE IF EXISTS jobs;
  DROP TABLE IF EXISTS categories;

  CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title JSON NOT NULL,
    company VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    description JSON NOT NULL,
    requirements JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    featured TINYINT(1) DEFAULT 0
  );

  CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    name JSON NOT NULL,
    count INT DEFAULT 0,
    icon VARCHAR(10)
  );

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

  INSERT INTO categories (id, name, count, icon) VALUES 
  ('technology', '{"tr": "Teknoloji", "en": "Technology"}', 234, '💻'),
  ('finance', '{"tr": "Finans", "en": "Finance"}', 156, '💰'),
  ('health', '{"tr": "Sağlık", "en": "Healthcare"}', 89, '🏥'),
  ('education', '{"tr": "Eğitim", "en": "Education"}', 67, '📚'),
  ('marketing', '{"tr": "Pazarlama", "en": "Marketing"}', 123, '📊');
`;

async function setup() {
  let connection;
  try {
    console.log('Connecting to MySQL...');
    connection = await mysql.createConnection(dbConfig);

    console.log(`Creating database & tables: ${schemaName}...`);
    await connection.query(setupSQL);

    console.log('✅ Database setup complete!');
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

setup();
