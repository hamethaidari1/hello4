const express = require('express');
const path = require('path');
const pool = require('./server/db'); // Reusing your existing DB connection
const app = express();
const PORT = 3050;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Helper function for translations (Simplified for EJS)
const translations = {
    en: {
        home: 'Home',
        jobs: 'Job Listings',
        about: 'About Us',
        login: 'Login',
        register: 'Sign Up',
        profile: 'Profile',
        logout: 'Logout',
        featured_jobs: 'Featured Jobs',
        view_all: 'View All',
        apply: 'Apply Now',
        search_placeholder: 'Search job by title...',
        filter_city: 'Select City'
    },
    tr: {
        home: 'Ana Sayfa',
        jobs: 'İş İlanları',
        about: 'Hakkımızda',
        login: 'Giriş Yap',
        register: 'Kayıt Ol',
        profile: 'Profil',
        logout: 'Çıkış',
        featured_jobs: 'Öne Çıkan İlanlar',
        view_all: 'Tümünü Gör',
        apply: 'Başvur',
        search_placeholder: 'İş ara...',
        filter_city: 'Şehir Seçin'
    }
};

// Middleware to pass common data to all views
app.use((req, res, next) => {
    // Default language
    res.locals.lang = 'en'; 
    res.locals.t = translations['en'];
    res.locals.user = null; // In a real app, this would come from session/auth
    next();
});

// --- ROUTES ---

// 1. Home Page
app.get('/', async (req, res) => {
    try {
        // Fetch featured jobs from MySQL
        const [jobs] = await pool.query('SELECT * FROM jobs WHERE featured = 1 ORDER BY date DESC LIMIT 6');
        const [categories] = await pool.query('SELECT * FROM categories');
        
        res.render('pages/index', { 
            title: 'Home',
            jobs: jobs,
            categories: categories
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Database Error');
    }
});

// 2. Jobs Page
app.get('/jobs', async (req, res) => {
    try {
        let query = 'SELECT * FROM jobs ORDER BY date DESC';
        const [jobs] = await pool.query(query);
        
        res.render('pages/jobs', { 
            title: 'Job Listings',
            jobs: jobs 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Database Error');
    }
});

// 3. About Page
app.get('/about', (req, res) => {
    res.render('pages/about', { title: 'About Us' });
});

// 4. Login Page
app.get('/login', (req, res) => {
    res.render('pages/login', { title: 'Login' });
});

// 5. Register Page
app.get('/register', (req, res) => {
    res.render('pages/register', { title: 'Register' });
});

// 6. Profile Page
app.get('/profile', (req, res) => {
    // Mock user data for demonstration
    const user = {
        name: 'Student User',
        email: 'student@example.com',
        role: 'Frontend Developer'
    };
    res.render('pages/profile', { title: 'My Profile', user });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
