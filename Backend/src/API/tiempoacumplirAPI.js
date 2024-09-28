const express = require('express');
const router = express.Router();
const tiempoAcumplirService = require('../services/tiempoacumplirService');

/**
 * @openapi
 * /tiempoacumplir/:
 *   get:
 *     tags:
 *       - TiempoAcumplir
 *     summary: Obtener todos los registros de TiempoAcumplir
 *     description: Devuelve una lista de todos los registros de TiempoAcumplir.
 *     responses:
 *       200:
 *         description: Lista de TiempoAcumplir
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   descripcion:
 *                     type: string
 *                     example: "Tiempo de prueba"
 * 
 *   post:
 *     tags:
 *       - TiempoAcumplir
 *     summary: Crear un nuevo registro de TiempoAcumplir
 *     description: Crea un nuevo registro con la descripción proporcionada.
 *     requestBody:
 *       description: Datos del TiempoAcumplir
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *                 example: "Tiempo de prueba"
 *     responses:
 *       200:
 *         description: Registro de TiempoAcumplir creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 descripcion:
 *                   type: string
 *                   example: "Tiempo de prueba"
 * 
 * /tiempoacumplir/{id}:
 *   get:
 *     tags:
 *       - TiempoAcumplir
 *     summary: Obtener un registro de TiempoAcumplir por ID
 *     description: Devuelve la información de un registro basado en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del registro
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Información del registro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 descripcion:
 *                   type: string
 *                   example: "Tiempo de prueba"
 * 
 *   put:
 *     tags:
 *       - TiempoAcumplir
 *     summary: Actualizar un registro de TiempoAcumplir por ID
 *     description: Actualiza la descripción de un registro basado en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del registro
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       description: Datos actualizados del registro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *                 example: "Tiempo actualizado"
 *     responses:
 *       200:
 *         description: Registro de TiempoAcumplir actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 descripcion:
 *                   type: string
 *                   example: "Tiempo actualizado"
 * 
 *   delete:
 *     tags:
 *       - TiempoAcumplir
 *     summary: Eliminar un registro de TiempoAcumplir por ID
 *     description: Elimina un registro basado en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del registro
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Registro de TiempoAcumplir eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registro eliminado exitosamente"
 */

router.get('/', async (req, res) => {
    const response = await tiempoAcumplirService.getAllTiempoAcumplir();
    res.json(response);
});

router.get('/:id', async (req, res) => {
    const response = await tiempoAcumplirService.getTiempoAcumplirById(req.params.id);
    res.json(response);
});

router.post('/', async (req, res) => {
    const response = await tiempoAcumplirService.createTiempoAcumplir(req.body);
    res.json(response);
});

router.put('/:id', async (req, res) => {
    const response = await tiempoAcumplirService.updateTiempoAcumplir(req.params.id, req.body);
    res.json(response);
});

router.delete('/:id', async (req, res) => {
    const response = await tiempoAcumplirService.deleteTiempoAcumplir(req.params.id);
    res.json(response);
});

module.exports = router;
