const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 3050;




app.use(cors());
app.use(express.json());

// TÜM İŞLERİ GETİR
app.get('/api/jobs', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM jobs ORDER BY date DESC');
    
    // JSON alanlarının doğru şekilde parse edildiğinden emin ol
    const jobs = rows.map(job => ({
      ...job,
      title: typeof job.title === 'string' ? JSON.parse(job.title) : job.title,
      description: typeof job.description === 'string' ? JSON.parse(job.description) : job.description,
      requirements: typeof job.requirements === 'string' ? JSON.parse(job.requirements) : job.requirements,
      featured: Boolean(job.featured)
    }));

    res.json(jobs);
  } catch (error) {
    console.error('İş ilanları getirilirken hata oluştu:', error);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// TÜM KATEGORİLERİ GETİR
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    
    const categories = rows.map(cat => ({
      ...cat,
      name: typeof cat.name === 'string' ? JSON.parse(cat.name) : cat.name
    }));

    res.json(categories);
  } catch (error) {
    console.error('Kategoriler getirilirken hata oluştu:', error);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
