const youtubeCtrl = require('../controllers/youtube.controller');
const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/auth.middleware');

// Cualquier usuario logueado puede buscar videos de ejercicios
router.get('/buscar', verificarToken, youtubeCtrl.buscarVideos);

module.exports = router;
