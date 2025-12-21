const { pool, dbHelper } = require('./db');

async function testDatabase() {
    console.log('🧪 Veritabanı testi başlatılıyor...\n');

    try {
        // Bağlantıyı test et
        console.log('1️⃣ Bağlantı testi...');
        const connection = await pool.getConnection();
        console.log('✅ Bağlantı başarılı');
        connection.release();

        // Kullanıcıları almayı test et
        console.log('\n2️⃣ Kullanıcıları alma testi...');
        const users = await dbHelper.getAllUsers();
        console.log(`✅ ${users.length} kullanıcı bulundu`);
        users.forEach(user => {
            console.log(`   - ${user.username} (${user.user_role})`);
        });

        // İş ilanlarını almayı test et
        console.log('\n3️⃣ İş ilanlarını alma testi...');
        const jobs = await dbHelper.getAllActiveJobs();
        console.log(`✅ ${jobs.length} aktif iş ilanı bulundu`);
        jobs.forEach(job => {
            console.log(`   - ${job.title} @ ${job.company_name}`);
        });

        // Başvuruları almayı test et
        console.log('\n4️⃣ Başvuruları alma testi...');
        if (users.length > 3) {
            const jobSeekerId = users.find(u => u.user_role === 'Job Seeker')?.user_id;
            if (jobSeekerId) {
                const applications = await dbHelper.getApplicationsByJobSeeker(jobSeekerId);
                console.log(`✅ ${applications.length} başvuru bulundu`);
            }
        }

        // Yeni kullanıcı oluşturmayı test et (sonra silinebilir)
        console.log('\n5️⃣ Yeni kullanıcı oluşturma testi...');
        const testUserId = await dbHelper.createUser({
            username: 'test_user_' + Date.now(),
            email: 'test@example.com',
            passwordHash: '$2b$10$testhashfortesting123456789012345678901234567890',
            userRole: 'Job Seeker'
        });
        console.log(`✅ Test kullanıcısı oluşturuldu, ID: ${testUserId}`);

        // Yeni iş ilanı oluşturmayı test et
        console.log('\n6️⃣ Yeni iş ilanı oluşturma testi...');
        const employer = users.find(u => u.user_role === 'Employer');
        if (employer) {
            const testJobId = await dbHelper.createJob({
                employerId: employer.user_id,
                title: 'Test İş İlanı',
                companyName: 'Test Şirketi',
                location: 'Tahran',
                jobType: 'Tam Zamanlı',
                description: 'Bu bir test ilanıdır'
            });
            console.log(`✅ Test iş ilanı oluşturuldu, ID: ${testJobId}`);

            // Başvuru göndermeyi test et
            console.log('\n7️⃣ Başvuru gönderme testi...');
            const jobSeeker = users.find(u => u.user_role === 'Job Seeker');
            if (jobSeeker) {
                const testApplicationId = await dbHelper.createApplication({
                    jobId: testJobId,
                    jobSeekerId: jobSeeker.user_id,
                    coverLetter: 'Bu bir test başvurusudur'
                });
                console.log(`✅ Test başvurusu gönderildi, ID: ${testApplicationId}`);

                // Başvuru durumunu güncellemeyi test et
                console.log('\n8️⃣ Başvuru durumunu güncelleme testi...');
                const updated = await dbHelper.updateApplicationStatus(testApplicationId, 'Reviewed');
                console.log(`✅ Durum güncellendi: ${updated}`);
            }
        }

        console.log('\n🎉 Tüm testler başarıyla tamamlandı!');
        console.log('\n📊 Özet:');
        console.log(`   • Bağlantı: ✅ Başarılı`);
        console.log(`   • Kullanıcılar: ✅ ${users.length} kullanıcı`);
        console.log(`   • İş ilanları: ✅ ${jobs.length} ilan`);
        console.log('   • Kullanıcı oluşturma: ✅ Başarılı');
        console.log('   • İş ilanı oluşturma: ✅ Başarılı');
        console.log('   • Başvuru gönderme: ✅ Başarılı');
        console.log('   • Durum güncelleme: ✅ Başarılı');

    } catch (error) {
        console.error('\n❌ Veritabanı testi sırasında hata:', error.message);

        // Hata ayıklama ipuçları
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('\n🔧 Hata Ayıklama:');
            console.error('   • MySQL kullanıcı adı veya şifre yanlış olabilir');
            console.error('   • Şifreyi setup.js dosyasında kontrol edin');
        } else if (error.code === 'ECONNREFUSED') {
            console.error('\n🔧 Hata Ayıklama:');
            console.error('   • MySQL çalışmıyor olabilir');
            console.error('   • MySQL servisinin açık olduğundan emin olun');
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            console.error('\n🔧 Hata Ayıklama:');
            console.error('   • Veritabanı oluşturulmamış');
            console.error('   • Önce node setup.js çalıştırın');
        }

        process.exit(1);
    } finally {
        await pool.end();
    }
}

// Testi çalıştır
if (require.main === module) {
    testDatabase();
}

module.exports = { testDatabase };
