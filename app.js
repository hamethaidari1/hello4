const express = require('express');
const path = require('path');
const pool = require('./server/db'); 
const jobRoutes = require('./server/routes/job.routes'); // Import new routes

const app = express();
const PORT = 3050;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Setup EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- API ROUTES (MVC) ---
app.use('/api/jobs', jobRoutes);

// Contact Form API Route
app.post('/api/contact', async (req, res) => {
    try {
        const { subject, message } = req.body;
        
        if (!subject || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Subject and message are required' 
            });
        }

        // Log the contact form submission
        console.log('=== CONTACT FORM SUBMISSION ===');
        console.log('Subject:', subject);
        console.log('Message:', message);
        console.log('Timestamp:', new Date().toISOString());
        console.log('===============================');

        // Here you can integrate with actual email services like:
        // - SendGrid
        // - Mailgun
        // - AWS SES
        // - Gmail API
        // For now, we'll provide a mailto link as fallback
        
        const emailSubject = encodeURIComponent(`Job Portal Contact: ${subject}`);
        const emailBody = encodeURIComponent(`Message from Job Portal contact form:\n\n${message}\n\n---\nSent at: ${new Date().toISOString()}`);
        const mailtoLink = `mailto:hamedhaidari2023@gmail.com?subject=${emailSubject}&body=${emailBody}`;

        // Simulate email processing time
        await new Promise(resolve => setTimeout(resolve, 500));

        res.json({ 
            success: true, 
            message: 'Email sent successfully!',
            mailtoLink: mailtoLink // Provide mailto link as fallback
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send email. Please try again.' 
        });
    }
});

// --- VIEW ROUTES ---

// Common Data Middleware
app.use((req, res, next) => {
    res.locals.lang = 'en'; // Default to English as per rules
    res.locals.path = req.path;
    next();
});

// 1. Home Page
app.get('/', async (req, res) => {
    try {
        // Fetch real data from DB for the view
        const [jobs] = await pool.query('SELECT * FROM jobs WHERE featured = 1 ORDER BY date DESC LIMIT 6');
        const [categories] = await pool.query('SELECT * FROM categories');
        
        res.render('pages/index', { 
            title: 'Home',
            jobs: jobs,
            categories: categories
        });
    } catch (err) {
        console.error(err);
        res.render('pages/index', { title: 'Home', jobs: [], categories: [] });
    }
});

// 2. Jobs Page
app.get('/jobs', async (req, res) => {
    try {
        const [jobs] = await pool.query('SELECT * FROM jobs ORDER BY date DESC');
        res.render('pages/jobs', { 
            title: 'Job Listings',
            jobs: jobs 
        });
    } catch (err) {
        console.error(err);
        res.render('pages/jobs', { title: 'Job Listings', jobs: [] });
    }
});

// 3. Admin Panel (New)
app.get('/admin', (req, res) => {
    res.render('pages/admin', { title: 'Admin Panel' });
});

// Other Pages
app.get('/about', (req, res) => res.render('pages/about', { title: 'About Us' }));
app.get('/login', (req, res) => res.render('pages/login', { title: 'Login' }));
app.get('/register', (req, res) => res.render('pages/register', { title: 'Register' }));
app.get('/profile', (req, res) => res.render('pages/profile', { title: 'Profile', user: { name: 'Admin User', email: 'admin@example.com' } }));
app.get('/settings', (req, res) => res.render('pages/settings', { title: 'Settings' }));
app.get('/help', (req, res) => res.render('pages/help', { title: 'Help Center' }));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});
