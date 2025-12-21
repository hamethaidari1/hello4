const pool = require('../db');

// Helper to safely parse JSON if needed (though mysql2 typeCast handles reads usually)
const safeJSONParse = (str) => {
    try {
        return typeof str === 'string' ? JSON.parse(str) : str;
    } catch (e) {
        return str;
    }
};

// GET All Jobs
exports.getAllJobs = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM jobs ORDER BY date DESC');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching jobs:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// GET Job by ID
exports.getJobById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error('Error fetching job:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// CREATE Job
exports.createJob = async (req, res) => {
    const { title, company, city, sector, description, requirements, featured } = req.body;

    // Prepare JSON fields
    const titleJson = JSON.stringify(title);
    const descJson = JSON.stringify(description);
    const reqJson = JSON.stringify(requirements);
    const isFeatured = featured ? 1 : 0;

    try {
        const sql = `INSERT INTO jobs (title, company, city, sector, description, requirements, featured, date) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;
        const [result] = await pool.query(sql, [titleJson, company, city, sector, descJson, reqJson, isFeatured]);
        
        res.status(201).json({ 
            message: 'Job created successfully', 
            id: result.insertId 
        });
    } catch (err) {
        console.error('Error creating job:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// UPDATE Job
exports.updateJob = async (req, res) => {
    const { title, company, city, sector, description, requirements, featured } = req.body;
    const jobId = req.params.id;

    const titleJson = JSON.stringify(title);
    const descJson = JSON.stringify(description);
    const reqJson = JSON.stringify(requirements);
    const isFeatured = featured ? 1 : 0;

    try {
        const sql = `UPDATE jobs SET title=?, company=?, city=?, sector=?, description=?, requirements=?, featured=? WHERE id=?`;
        const [result] = await pool.query(sql, [titleJson, company, city, sector, descJson, reqJson, isFeatured, jobId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json({ message: 'Job updated successfully' });
    } catch (err) {
        console.error('Error updating job:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// DELETE Job
exports.deleteJob = async (req, res) => {
    const jobId = req.params.id;

    try {
        const [result] = await pool.query('DELETE FROM jobs WHERE id = ?', [jobId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json({ message: 'Job deleted successfully' });
    } catch (err) {
        console.error('Error deleting job:', err);
        res.status(500).json({ error: 'Database error' });
    }
};
