const express = require("express");
const router = express.Router();
const db = require("../db");

// OKUMA (READ)
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// OLUŞTURMA (CREATE)
router.post("/add", (req, res) => {
  const { name, email } = req.body;
  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Eklendi" });
    }
  );
});

// GÜNCELLEME (UPDATE)
router.put("/update/:id", (req, res) => {
  db.query(
    "UPDATE users SET name=? WHERE id=?",
    [req.body.name, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Güncellendi" });
    }
  );
});

// SİLME (DELETE)
router.delete("/delete/:id", (req, res) => {
  db.query(
    "DELETE FROM users WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Silindi" });
    }
  );
});

module.exports = router;
