const express = require('express');
const router = express.Router();
const aprobacionConvocatoriaService = require('../services/aprobacionConvocatoriaService');

/**
 * @openapi
 * /aprobacionconvocatoria/:
 *   get:
 *     tags:
 *       - AprobacionConvocatoria
 *     summary: Obtener todas las aprobaciones de convocatoria
 *     description: Devuelve una lista de todas las aprobaciones de convocatoria.
 *     responses:
 *       200:
 *         description: Lista de aprobaciones de convocatoria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 * 
 *   post:
 *     tags:
 *       - AprobacionConvocatoria
 *     summary: Crear una nueva aprobación de convocatoria
 *     description: Crea una nueva aprobación de convocatoria con la información proporcionada.
 *     requestBody:
 *       description: Datos de la aprobación de convocatoria
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaaprobacion:
 *                 type: string
 *                 format: date
 *                 example: "2023-10-22"
 *               estado:
 *                 type: string
 *                 example: "Aprobado"
 *               adminusei:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *               convocatoria:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 2
 *     responses:
 *       200:
 *         description: Aprobación de convocatoria creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 * 
 * /aprobacionconvocatoria/{id}:
 *   get:
 *     tags:
 *       - AprobacionConvocatoria
 *     summary: Obtener una aprobación de convocatoria por ID
 *     description: Devuelve la información de una aprobación de convocatoria basada en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la aprobación de convocatoria
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Información de la aprobación de convocatoria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 * 
 *   put:
 *     tags:
 *       - AprobacionConvocatoria
 *     summary: Actualizar una aprobación de convocatoria por ID
 *     description: Actualiza la información de una aprobación de convocatoria basada en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la aprobación de convocatoria
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       description: Datos actualizados de la aprobación de convocatoria
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaaprobacion:
 *                 type: string
 *                 format: date
 *                 example: "2023-11-22"
 *               estado:
 *                 type: string
 *                 example: "Rechazado"
 *               adminusei:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *               convocatoria:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 3
 *     responses:
 *       200:
 *         description: Aprobación de convocatoria actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 * 
 *   delete:
 *     tags:
 *       - AprobacionConvocatoria
 *     summary: Eliminar una aprobación de convocatoria por ID
 *     description: Elimina una aprobación de convocatoria basada en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la aprobación de convocatoria
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Aprobación de convocatoria eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */

router.get('/', async (req, res) => {
    console.log('GET request received for getAllAprobaciones');
    const response = await aprobacionConvocatoriaService.getAllAprobaciones();
    res.json({
        method: 'getAllAprobaciones',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.get('/:id', async (req, res) => {
    console.log(`GET request received for getAprobacionById with ID: ${req.params.id}`);
    const response = await aprobacionConvocatoriaService.getAprobacionById(req.params.id);
    res.json({
        method: 'getAprobacionById',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.post('/', async (req, res) => {
    console.log('POST request received for createAprobacion with data:', req.body);
    const response = await aprobacionConvocatoriaService.createAprobacion(req.body);
    res.json({
        method: 'createAprobacion',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.put('/:id', async (req, res) => {
    console.log(`PUT request received for updateAprobacion with ID: ${req.params.id} and data:`, req.body);
    const response = await aprobacionConvocatoriaService.updateAprobacion(req.params.id, req.body);
    res.json({
        method: 'updateAprobacion',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.delete('/:id', async (req, res) => {
    console.log(`DELETE request received for deleteAprobacion with ID: ${req.params.id}`);
    const response = await aprobacionConvocatoriaService.deleteAprobacion(req.params.id);
    res.json({
        method: 'deleteAprobacion',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

module.exports = router;
