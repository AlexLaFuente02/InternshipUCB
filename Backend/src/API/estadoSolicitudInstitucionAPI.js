const express = require('express');
const router = express.Router();
const estadoSolicitudInstitucionService = require('../services/estadoSolicitudInstitucionService');

/**
 * @openapi
 * /estadosolicitudinstitucion/:
 *   get:
 *     tags:
 *       - EstadoSolicitudInstitucion
 *     summary: Obtener todos los estados de solicitud de institución
 *     description: Devuelve una lista de todos los estados de solicitud de institución.
 *     responses:
 *       200:
 *         description: Lista de estados de solicitud de institución
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 * 
 *   post:
 *     tags:
 *       - EstadoSolicitudInstitucion
 *     summary: Crear un nuevo estado de solicitud de institución
 *     description: Crea un nuevo estado de solicitud de institución con la información proporcionada.
 *     requestBody:
 *       description: Datos del estado de solicitud de institución
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaaprobacion:
 *                 type: string
 *                 format: date
 *                 example: "2023-10-28"
 *               estadosolicitud:
 *                 type: string
 *                 example: "Rechazado"
 *               adminusei:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *               institucion:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *     responses:
 *       200:
 *         description: Estado de solicitud de institución creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 * 
 * /estadosolicitudinstitucion/{id}:
 *   get:
 *     tags:
 *       - EstadoSolicitudInstitucion
 *     summary: Obtener un estado de solicitud de institución por ID
 *     description: Devuelve la información de un estado de solicitud de institución basado en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del estado de solicitud de institución
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Información del estado de solicitud de institución
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 * 
 *   put:
 *     tags:
 *       - EstadoSolicitudInstitucion
 *     summary: Actualizar un estado de solicitud de institución por ID
 *     description: Actualiza la información de un estado de solicitud de institución basado en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del estado de solicitud de institución
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       description: Datos actualizados del estado de solicitud de institución
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaaprobacion:
 *                 type: string
 *                 format: date
 *                 example: "2023-11-12"
 *               estadosolicitud:
 *                 type: string
 *                 example: "Aprobado"
 *               adminusei:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *               institucion:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *     responses:
 *       200:
 *         description: Estado de solicitud de institución actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 * 
 *   delete:
 *     tags:
 *       - EstadoSolicitudInstitucion
 *     summary: Eliminar un estado de solicitud de institución por ID
 *     description: Elimina un estado de solicitud de institución basado en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del estado de solicitud de institución
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Estado de solicitud de institución eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */

router.get('/', async (req, res) => {
    console.log('GET request received for getAllEstadoSolicitudInstitucion');
    const response = await estadoSolicitudInstitucionService.getAllEstadoSolicitudInstitucion();
    res.json({
        method: 'getAllEstadoSolicitudInstitucion',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.get('/:id', async (req, res) => {
    console.log(`GET request received for getEstadoSolicitudInstitucionById with ID: ${req.params.id}`);
    const response = await estadoSolicitudInstitucionService.getEstadoSolicitudInstitucionById(req.params.id);
    res.json({
        method: 'getEstadoSolicitudInstitucionById',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.post('/', async (req, res) => {
    console.log('POST request received for createEstadoSolicitudInstitucion with data:', req.body);
    const response = await estadoSolicitudInstitucionService.createEstadoSolicitudInstitucion(req.body);
    res.json({
        method: 'createEstadoSolicitudInstitucion',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.put('/:id', async (req, res) => {
    console.log(`PUT request received for updateEstadoSolicitudInstitucion with ID: ${req.params.id} and data:`, req.body);
    const response = await estadoSolicitudInstitucionService.updateEstadoSolicitudInstitucion(req.params.id, req.body);
    res.json({
        method: 'updateEstadoSolicitudInstitucion',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.delete('/:id', async (req, res) => {
    console.log(`DELETE request received for deleteEstadoSolicitudInstitucion with ID: ${req.params.id}`);
    const response = await estadoSolicitudInstitucionService.deleteEstadoSolicitudInstitucion(req.params.id);
    res.json({
        method: 'deleteEstadoSolicitudInstitucion',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

module.exports = router;
