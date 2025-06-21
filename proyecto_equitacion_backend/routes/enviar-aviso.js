const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ing.daniel.blanco.f@gmail.com",
    pass: "gbcfngaouzcmirgd", // Usa App Password si tienes 2FA
  },
});

router.post("/", async (req, res) => {
  const { to, subject, text } = req.body;
  console.log("Datos recibidos:", req.body);
  try {
    await transporter.sendMail({
      from: '"Avisos Equitación" <ing.daniel.blanco.f@gmail.com>',
      to,
      subject,
      text,
    });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
