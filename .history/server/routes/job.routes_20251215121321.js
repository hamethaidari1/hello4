const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');

// Rotaları controller metotlarına eşleştir
router.get('/', jobController.getAllJobs);        // Tüm işleri listele
router.get('/:id', jobController.getJobById);     // ID'ye göre işi getir
router.post('/', jobController.createJob);        // Yeni iş oluştur
router.put('/:id', jobController.updateJob);      // İşi güncelle
router.delete('/:id', jobController.deleteJob);   // İşi sil

module.exports = router;
