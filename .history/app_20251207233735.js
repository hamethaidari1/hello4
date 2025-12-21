const express = require('express');
const path = require('path');
const pool = require('./server/db'); 
const app = express();
const PORT = 3050;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik Dosyaları Sun
app.use(express.static(path.join(__dirname, 'public')));

// EJS Şablon Motorunu Ayarla
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Veritabanı çalışmazsa kullanılacak sahte veriler
const mockJobs = [
    { id: 1, title: { en: 'Senior Frontend Developer', tr: 'Kıdemli Frontend Geliştirici' }, company: 'TechCorp', city: 'istanbul', date: new Date(), sector: 'technology', description: { en: 'Great job', tr: 'Harika iş' }, featured: true },
    { id: 2, title: { en: 'Marketing Specialist', tr: 'Pazarlama Uzmanı' }, company: 'MarketPro', city: 'ankara', date: new Date(), sector: 'marketing', description: { en: 'Great job', tr: 'Harika iş' }, featured: true }
];
const mockCategories = [
    { id: 'technology', name: { en: 'Technology', tr: 'Teknoloji' }, count: 234, icon: '💻' },
    { id: 'finance', name: { en: 'Finance', tr: 'Finans' }, count: 156, icon: '💰' }
];

// EJS için çeviri metinleri
const translations = {
    en: {
        home: 'Home', jobs: 'Job Listings', about: 'About Us', login: 'Login', register: 'Sign Up',
        profile: 'Profile', logout: 'Logout', featured_jobs: 'Featured Jobs', view_all: 'View All',
        apply: 'Apply Now', search_placeholder: 'Search job by title...', filter_city: 'Select City',
        appName: 'Job Portal'
    },
    tr: {
        home: 'Ana Sayfa', jobs: 'İş İlanları', about: 'Hakkımızda', login: 'Giriş Yap', register: 'Kayıt Ol',
        profile: 'Profil', logout: 'Çıkış Yap', featured_jobs: 'Öne Çıkan İlanlar', view_all: 'Tümünü Gör',
        apply: 'Başvur', search_placeholder: 'İş ara...', filter_city: 'Şehir Seçin',
        appName: 'İŞBUL.ONLINE'
    }
};

// Tüm sayfalara ortak veri gönder
app.use((req, res, next) => {
    res.locals.lang = 'tr'; // Varsayılan dil
    res.locals.t = translations['tr'];
    res.locals.user = null;
    res.locals.path = req.path;
    next();
});

// --- ROUTES ---

// 1. Ana Sayfa
app.get('/', async (req, res) => {
    try {
        let jobs = mockJobs;
        let categories = mockCategories;
        try {
            const [dbJobs] = await pool.query('SELECT * FROM jobs WHERE featured = 1 ORDER BY date DESC LIMIT 6');
            const [dbCats] = await pool.query('SELECT * FROM categories');
            if(dbJobs.length) jobs = dbJobs;
            if(dbCats.length) categories = dbCats;
        } catch(e) { console.log("Veritabanı bağlı değil, mock veriler kullanılıyor"); }

        res.render('pages/index', { 
            title: 'Ana Sayfa',
            jobs: jobs,
            categories: categories
        });
    } catch (err) {
        console.error(err);
        res.render('pages/index', { title: 'Ana Sayfa', jobs: mockJobs, categories: mockCategories });
    }
});

// 2. İş İlanları Sayfası
app.get('/jobs', async (req, res) => {
    try {
        let jobs = mockJobs;
        try {
            const [dbJobs] = await pool.query('SELECT * FROM jobs ORDER BY date DESC');
            if(dbJobs.length) jobs = dbJobs;
        } catch(e) { console.log("Veritabanı bağlı değil, mock veriler kullanılıyor"); }
        
        res.render('pages/jobs', { 
            title: 'İş İlanları',
            jobs: jobs 
        });
    } catch (err) {
        console.error(err);
        res.render('pages/jobs', { title: 'İş İlanları', jobs: mockJobs });
    }
});

// 3. Hakkımızda Sayfası
app.get('/about', (req, res) => {
    res.render('pages/about', { title: 'Hakkımızda' });
});

// 4. Giriş Yap Sayfası
app.get('/login', (req, res) => {
    res.render('pages/login', { title: 'Giriş Yap' });
});

// 5. Kayıt Ol Sayfası
app.get('/register', (req, res) => {
    res.render('pages/register', { title: 'Kayıt Ol' });
});

// 6. Profil Sayfası
app.get('/profile', (req, res) => {
    const user = {
        name: 'Öğrenci Kullanıcı',
        email: 'student@example.com',
        role: 'Frontend Geliştirici'
    };
    res.render('pages/profile', { title: 'Profilim', user });
});

// 7. Ayarlar Sayfası
app.get('/settings', (req, res) => {
    res.render('pages/settings', { title: 'Ayarlar' });
});

// 8. Yardım Merkezi
app.get('/help', (req, res) => {
    res.render('pages/help', { title: 'Yardım Merkezi' });
});

// Sunucuyu Başlat
app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
