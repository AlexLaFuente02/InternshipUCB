// comentarioConvocatoriaAPI.js
const express = require('express');
const router = express.Router();
const comentarioConvocatoriaService = require('../services/comentarioConvocatoriaService');

// Obtener todos los comentarios
router.get('/', async (req, res) => {
    const response = await comentarioConvocatoriaService.getAllComentarios();
    res.json({
        method: 'getAllComentariosConvocatoria',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

// Obtener un comentario por ID
router.get('/:id', async (req, res) => {
    const response = await comentarioConvocatoriaService.getComentarioById(req.params.id);
    res.json({
        method: 'getComentarioConvocatoria',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

// Crear un nuevo comentario
router.post('/', async (req, res) => {
    const response = await comentarioConvocatoriaService.createComentario(req.body);
    res.json({
        method: 'createComentarioConvocatoria',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

// Actualizar un comentario por ID
router.put('/:id', async (req, res) => {
    const response = await comentarioConvocatoriaService.updateComentario(req.params.id, req.body);
    res.json({
        method: 'updateComentarioConvocatoria',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

// Eliminar un comentario por ID
router.delete('/:id', async (req, res) => {
    const response = await comentarioConvocatoriaService.deleteComentario(req.params.id);
    res.json({
        method: 'deleteComentarioConvocatoria',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

module.exports = router;
