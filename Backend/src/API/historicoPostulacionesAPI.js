const express = require('express');
const router = express.Router();
const historicoPostulacionesService = require('../services/historicoPostulacionesService');

/**
 * @swagger
 * /historicoPostulaciones/:
 *   get:
 *     tags:
 *       - HistoricoPostulaciones
 *     summary: Obtiene todos los registros históricos de postulaciones
 *     responses:
 *       200:
 *         description: Lista de registros históricos de postulaciones
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */
router.get('/', async (req, res) => {
    console.log('GET request received for getAllHistoricosPostulaciones');
    const response = await historicoPostulacionesService.getAllHistoricosPostulaciones();
    res.json({
        method: 'getAllHistoricosPostulaciones',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

/**
 * @swagger
 * /historicoPostulaciones/{id_h}:
 *   get:
 *     tags:
 *       - HistoricoPostulaciones
 *     summary: Obtiene un registro histórico de postulación por ID
 *     parameters:
 *       - in: path
 *         name: id_h
 *         required: true
 *         description: ID del registro histórico
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles del registro histórico
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */
router.get('/:id_h', async (req, res) => {
    console.log(`GET request received for getHistoricoPostulacionById with ID: ${req.params.id_h}`);
    const response = await historicoPostulacionesService.getHistoricoPostulacionById(req.params.id_h);
    res.json({
        method: 'getHistoricoPostulacionById',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

module.exports = router;
