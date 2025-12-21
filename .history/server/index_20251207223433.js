const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 3050;

app.use(cors());
app.use(express.json());

// GET All Jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM jobs ORDER BY date DESC');
    
    // Ensure JSON fields are parsed correctly if the driver didn't do it
    const jobs = rows.map(job => ({
      ...job,
      title: typeof job.title === 'string' ? JSON.parse(job.title) : job.title,
      description: typeof job.description === 'string' ? JSON.parse(job.description) : job.description,
      requirements: typeof job.requirements === 'string' ? JSON.parse(job.requirements) : job.requirements,
      featured: Boolean(job.featured)
    }));

    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET All Categories
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    
    const categories = rows.map(cat => ({
      ...cat,
      name: typeof cat.name === 'string' ? JSON.parse(cat.name) : cat.name
    }));

    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
