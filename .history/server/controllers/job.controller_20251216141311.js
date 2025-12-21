const pool = require('../db');

// TÜM İŞ İLANLARINI GETİR (GET All   s)
exports.getAllJobs = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM jobs ORDER BY created_at DESC' // Tarihe göre sırala
        );
        res.json(rows);
    } catch (err) {
        console.error('İş ilanları alınırken hata oluştu:', err);
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
};

// ID'YE GÖRE İŞ İLANI GETİR (GET Job by ID)
exports.getJobById = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM jobs WHERE id = ?',
            [req.params.id]
        );

        // İlan bulunamazsa
        if (rows.length === 0) {
            return res.status(404).json({ message: 'İş ilanı bulunamadı' });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error('İş ilanı alınırken hata oluştu:', err);
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
};

// YENİ İŞ İLANI OLUŞTUR (CREATE Job)
exports.createJob = async (req, res) => {
    const { title, company, city, sector, description, requirements, featured } = req.body;

    try {
        const sql = `
            INSERT INTO jobs 
            (title, company, city, sector, description, requirements, featured)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.query(sql, [
            JSON.stringify(title),         // Çok dilli başlık
            company,
            city,
            sector,
            JSON.stringify(description),   // Çok dilli açıklama
            JSON.stringify(requirements),  // Çok dilli gereksinimler
            featured ? 1 : 0               // Öne çıkan ilan
        ]);

        res.status(201).json({
            message: 'İş ilanı başarıyla oluşturuldu',
            id: result.insertId
        });
    } catch (err) {
        console.error('İş ilanı oluşturulurken hata oluştu:', err);
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
};

// İŞ İLANINI GÜNCELLE (UPDATE Job)
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

        // Güncellenecek ilan bulunamazsa
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'İş ilanı bulunamadı' });
        }

        res.json({ message: 'İş ilanı başarıyla güncellendi' });
    } catch (err) {
        console.error('İş ilanı güncellenirken hata oluştu:', err);
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
};

// İŞ İLANINI SİL (DELETE Job)
exports.deleteJob = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM jobs WHERE id = ?',
            [req.params.id]
        );

        // Silinecek ilan bulunamazsa
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'İş ilanı bulunamadı' });
        }

        res.json({ message: 'İş ilanı başarıyla silindi' });
    } catch (err) {
        console.error('İş ilanı silinirken hata oluştu:', err);
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
};
