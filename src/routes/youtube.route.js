const youtubeCtrl = require('../controllers/youtube.controller');
const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/auth.middleware');


router.get('/buscar', verificarToken, youtubeCtrl.buscarVideos);

module.exports = router;
