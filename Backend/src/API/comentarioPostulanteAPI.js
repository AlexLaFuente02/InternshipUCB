const express = require('express');
const router = express.Router();
const comentarioPostulanteService = require('../services/comentarioPostulanteService');

router.get('/', async (req, res) => {
    const response = await comentarioPostulanteService.getAllComentarios();
    res.json({
        method: 'getAllComentariosPostulante',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.get('/:id', async (req, res) => {
    const response = await comentarioPostulanteService.getComentarioById(req.params.id);
    res.json({
        method: 'getComentariosPostulanteById',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.post('/', async (req, res) => {
    const response = await comentarioPostulanteService.createComentario(req.body);
    res.json({
        method: 'createComentariosPostulante',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.put('/:id', async (req, res) => {
    const response = await comentarioPostulanteService.updateComentario(req.params.id, req.body);
    res.json({
        method: 'updateComentariosPostulante',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.delete('/:id', async (req, res) => {
    const response = await comentarioPostulanteService.deleteComentario(req.params.id);
    res.json({
        method: 'deleteComentariosPostulante',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

module.exports = router;
