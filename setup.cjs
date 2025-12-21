const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// MySQL bağlantı ayarları (veritabanını seçmeden)
const config = {
    host: 'localhost',
    user: 'root',
    password: 'Hamedrasa1212',  // MySQL şifre
    multipleStatements: true
};

async function setupDatabase() {
    let connection;
    
    try {
        console.log('🚀 İş portalı veritabanı kurulumu başlatılıyor...\n');

        // MySQL bağlantısı (veritabanı seçmeden)
        connection = await mysql.createConnection(config);
        console.log('✅ MySQL bağlantısı kuruldu\n');

        // SQL dosyalarını oku
        const createDbPath = path.join(__dirname, 'database', 'create_database.sql');
        const sampleDataPath = path.join(__dirname, 'database', 'sample_data.sql');

        if (!fs.existsSync(createDbPath)) {
            throw new Error('create_database.sql dosyası bulunamadı');
        }

        if (!fs.existsSync(sampleDataPath)) {
            throw new Error('sample_data.sql dosyası bulunamadı');
        }

        const createDbSQL = fs.readFileSync(createDbPath, 'utf8');
        const sampleDataSQL = fs.readFileSync(sampleDataPath, 'utf8');

        console.log('📁 SQL dosyaları okundu\n');

        // Veritabanı ve tabloları oluştur
        console.log('🗄️ Veritabanı ve tablolar oluşturuluyor...');
        await connection.execute(createDbSQL);
        console.log('✅ Veritabanı ve tablolar başarıyla oluşturuldu\n');

        // Örnek verileri ekle
        console.log('📊 Örnek veriler ekleniyor...');
        await connection.execute(sampleDataSQL);
        console.log('✅ Örnek veriler başarıyla eklendi\n');

        // Veritabanını test et
        console.log('🧪 Veritabanı testi yapılıyor...');
        const [users] = await connection.execute('SELECT COUNT(*) as count FROM users');
        const [jobs] = await connection.execute('SELECT COUNT(*) as count FROM jobs');
        const [applications] = await connection.execute('SELECT COUNT(*) as count FROM applications');

        console.log(`📊 Kullanıcı sayısı: ${users[0].count}`);
        console.log(`📊 İş ilanı sayısı: ${jobs[0].count}`);
        console.log(`📊 Başvuru sayısı: ${applications[0].count}\n`);

        console.log('🎉 Veritabanı başarıyla kuruldu!');
        console.log('\n📝 Önemli bilgiler:');
        console.log('   • Veritabanı adı: job_portall');
        console.log('   • Tablolar: users, jobs, applications');
        console.log('   • Örnek kullanıcılar: Admin, Employer ve Job Seeker');
        console.log('   • Tüm örnek kullanıcıların şifresi: password123');
        
        console.log('\n🚀 Artık uygulamayı çalıştırabilirsiniz:');
        console.log('   npm run dev');

    } catch (error) {
        console.error('\n❌ Veritabanı kurulumu sırasında hata oluştu:', error.message);
        console.error('\n🔧 Hata ayıklama ipuçları:');
        console.error('   1. MySQL servisinin çalıştığından emin olun');
        console.error('   2. MySQL kullanıcı adı ve şifresini setup.js dosyasında kontrol edin');
        console.error('   3. Veritabanı oluşturma yetkisine sahip olduğunuzdan emin olun');
        
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// Kurulumu çalıştır
if (require.main === module) {
    setupDatabase();
}

module.exports = { setupDatabase };
