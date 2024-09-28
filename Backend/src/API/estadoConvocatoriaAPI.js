const express = require('express');
const router = express.Router();
const estadoConvocatoriaService = require('../services/estadoConvocatoriaService');

/**
 * @openapi
 * /estadoconvocatoria/:
 *   get:
 *     tags:
 *       - EstadoConvocatoria
 *     summary: Obtener todos los estados de convocatoria
 *     description: Devuelve una lista de todos los estados de convocatoria.
 *     responses:
 *       200:
 *         description: Lista de estados de convocatoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/EstadoConvocatoria"
 * 
 *   post:
 *     tags:
 *       - EstadoConvocatoria
 *     summary: Crear un nuevo estado de convocatoria
 *     description: Crea un nuevo estado de convocatoria con la información proporcionada.
 *     requestBody:
 *       description: Datos del estado de convocatoria
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreestadoconvocatoria:
 *                 type: string
 *                 example: "En Proceso"
 *     responses:
 *       200:
 *         description: Estado de convocatoria creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/EstadoConvocatoria"
 * 
 * /estadoconvocatoria/{id}:
 *   get:
 *     tags:
 *       - EstadoConvocatoria
 *     summary: Obtener un estado de convocatoria por ID
 *     description: Devuelve la información de un estado de convocatoria basado en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del estado de convocatoria
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Información del estado de convocatoria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/EstadoConvocatoria"
 * 
 *   put:
 *     tags:
 *       - EstadoConvocatoria
 *     summary: Actualizar un estado de convocatoria por ID
 *     description: Actualiza la información de un estado de convocatoria basado en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del estado de convocatoria
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     requestBody:
 *       description: Datos actualizados del estado de convocatoria
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreestadoconvocatoria:
 *                 type: string
 *                 example: "Finalizado"
 *     responses:
 *       200:
 *         description: Estado de convocatoria actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/EstadoConvocatoria"
 * 
 *   delete:
 *     tags:
 *       - EstadoConvocatoria
 *     summary: Eliminar un estado de convocatoria por ID
 *     description: Elimina un estado de convocatoria basado en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del estado de convocatoria
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Estado de convocatoria eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/EstadoConvocatoria"
 */

router.get('/', async (req, res) => {
    const response = await estadoConvocatoriaService.getAllEstadoConvocatorias();
    res.json(response);
});

router.get('/:id', async (req, res) => {
    const response = await estadoConvocatoriaService.getEstadoConvocatoriaById(req.params.id);
    res.json(response);
});

router.post('/', async (req, res) => {
    const response = await estadoConvocatoriaService.createEstadoConvocatoria(req.body);
    res.json(response);
});

router.put('/:id', async (req, res) => {
    const response = await estadoConvocatoriaService.updateEstadoConvocatoria(req.params.id, req.body);
    res.json(response);
});

router.delete('/:id', async (req, res) => {
    const response = await estadoConvocatoriaService.deleteEstadoConvocatoria(req.params.id);
    res.json(response);
});

module.exports = router;
