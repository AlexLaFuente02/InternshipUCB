const express = require('express');
const router = express.Router();
const postulacionService = require('../services/postulacionService');

/**
 * @openapi
 * /postulacion/:
 *   get:
 *     tags:
 *       - Postulacion
 *     summary: Obtener todas las postulaciones
 *     description: Devuelve una lista de todas las postulaciones.
 *     responses:
 *       200:
 *         description: Lista de postulaciones
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 * 
 *   post:
 *     tags:
 *       - Postulacion
 *     summary: Crear una nueva postulación
 *     description: Crea una nueva postulación con la información proporcionada.
 *     requestBody:
 *       description: Datos de la postulación
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechapostulacion:
 *                 type: string
 *                 format: date
 *                 example: "2023-10-27"
 *               estadopostulacion:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *               estudiante:
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
 *         description: Postulación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 * 
 * /postulacion/{id}:
 *   get:
 *     tags:
 *       - Postulacion
 *     summary: Obtener una postulación por ID
 *     description: Devuelve la información de una postulación basada en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la postulación
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Información de la postulación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 * 
 *   put:
 *     tags:
 *       - Postulacion
 *     summary: Actualizar una postulación por ID
 *     description: Actualiza la información de una postulación basada en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la postulación
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       description: Datos actualizados de la postulación
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechapostulacion:
 *                 type: string
 *                 format: date
 *                 example: "2023-11-15"
 *               estadopostulacion_id:
 *                 type: integer
 *                 example: 2
 *               estudiante_id:
 *                 type: integer
 *                 example: 1
 *               convocatoria_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Postulación actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 * 
 *   delete:
 *     tags:
 *       - Postulacion
 *     summary: Eliminar una postulación por ID
 *     description: Elimina una postulación basada en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la postulación
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Postulación eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */

router.get('/', async (req, res) => {
    console.log('GET request received for getAllPostulaciones');
    const response = await postulacionService.getAllPostulaciones();
    res.json({
        method: 'getAllPostulaciones',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.get('/:id', async (req, res) => {
    console.log(`GET request received for getPostulacionById with ID: ${req.params.id}`);
    const response = await postulacionService.getPostulacionById(req.params.id);
    res.json({
        method: 'getPostulacionById',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.post('/', async (req, res) => {
    console.log('POST request received for createPostulacion with data:', req.body);
    const response = await postulacionService.createPostulacion(req.body);
    res.json({
        method: 'createPostulacion',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.put('/:id', async (req, res) => {
    console.log(`PUT request received for updatePostulacion with ID: ${req.params.id} and data:`, req.body);
    const response = await postulacionService.updatePostulacion(req.params.id, req.body);
    res.json({
        method: 'updatePostulacion',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.delete('/:id', async (req, res) => {
    console.log(`DELETE request received for deletePostulacion with ID: ${req.params.id}`);
    const response = await postulacionService.deletePostulacion(req.params.id);
    res.json({
        method: 'deletePostulacion',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

module.exports = router;
