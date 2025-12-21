const pool = require('../db');

// GET All Jobs
exports.getAllJobs = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM jobs ORDER BY created_at DESC'
        );
        res.json(rows);
    } catch (err) {
        console.error('Error fetching jobs:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// GET Job by ID
exports.getJobById = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM jobs WHERE id = ?',
            [req.params.id]
        );

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

    try {
        const sql = `
            INSERT INTO jobs 
            (title, company, city, sector, description, requirements, featured)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.query(sql, [
            JSON.stringify(title),
            company,
            city,
            sector,
            JSON.stringify(description),
            JSON.stringify(requirements),
            featured ? 1 : 0
        ]);

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

    try {
        const sql = `
            UPDATE jobs SET
                title = ?,
                company = ?,
                city = ?,
                sector = ?,
                description = ?,
                requirements = ?,
                featured = ?
            WHERE id = ?
        `;

        const [result] = await pool.query(sql, [
            JSON.stringify(title),
            company,
            city,
            sector,
            JSON.stringify(description),
            JSON.stringify(requirements),
            featured ? 1 : 0,
            jobId
        ]);

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
    try {
        const [result] = await pool.query(
            'DELETE FROM jobs WHERE id = ?',
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json({ message: 'Job deleted successfully' });
    } catch (err) {
        console.error('Error deleting job:', err);
        res.status(500).json({ error: 'Database error' });
    }
};
