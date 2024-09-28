const express = require('express');
const router = express.Router();
const historicoConvocatoriasService = require('../services/historicoConvocatoriasService');

/**
 * @swagger
 * /historicoConvocatorias/:
 *   get:
 *     tags:
 *       - HistoricoConvocatorias
 *     summary: Obtiene todos los registros históricos de convocatorias
 *     responses:
 *       200:
 *         description: Lista de registros históricos de convocatorias
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */
router.get('/', async (req, res) => {
    console.log('GET request received for getAllHistoricosConvocatorias');
    const response = await historicoConvocatoriasService.getAllHistoricos();
    res.json({
        method: 'getAllHistoricosConvocatorias',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

/**
 * @swagger
 * /historicoConvocatorias/{id_h}:
 *   get:
 *     tags:
 *       - HistoricoConvocatorias
 *     summary: Obtiene un registro histórico de convocatoria por ID
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
    console.log(`GET request received for getHistoricoConvocatoriaById with ID: ${req.params.id_h}`);
    const response = await historicoConvocatoriasService.getHistoricoById(req.params.id_h);
    res.json({
        method: 'getHistoricoConvocatoriaById',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

module.exports = router;
