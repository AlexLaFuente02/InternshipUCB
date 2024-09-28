const express = require('express');
const router = express.Router();
const sedeService = require('../services/sedeService');

/**
 * @swagger
 * /sede/:
 *   get:
 *     tags:
 *       - Sede
 *     summary: Obtiene todas las sedes.
 *     responses:
 *       200:
 *         description: Lista de sedes.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Sede"
 */

router.get('/', async (req, res) => {
    console.log('GET request received for getAll');
    const response = await sedeService.getAll();
    res.json({
        method: 'getAll',
        code: response.code,
        result: response.result,
        message: response.message,
    });
    }
);

/**
 * @swagger
 * /sede/{id}:
 *   get:
 *     tags:
 *       - Sede
 *     summary: Obtiene una sede por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la sede.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles de la sede.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Sede"
 */

router.get('/:id', async (req, res) => {
    console.log(`GET request received for getById with ID: ${req.params.id}`);
    const response = await sedeService.getById(req.params.id);
    res.json({
        method: 'getById',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

/**
 * @swagger
 * /sede/:
 *   post:
 *     tags:
 *       - Sede
 *     summary: Crea una nueva sede.
 *     requestBody:
 *       description: Datos de la sede.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombresede:
 *                 type: string
 *                 example: Cochabamba
 *     responses:
 *       200:
 *         description: Sede creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Sede"
 */

router.post('/', async (req, res) => {
    console.log('POST request received for create with nombresede:', req.body.nombresede);
    const response = await sedeService.create(req.body.nombresede);
    res.json({
        method: 'create',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

/**
 * @swagger
 * /sede/{id}:
 *   put:
 *     tags:
 *       - Sede
 *     summary: Actualiza una sede por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la sede.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       description: Datos actualizados de la sede.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombresede:
 *                 type: string
 *                 example: Tarija
 *     responses:
 *       200:
 *         description: Sede actualizada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Sede"
 */

router.put('/:id', async (req, res) => {
    console.log(`PUT request received for update with ID: ${req.params.id}, nombresede: ${req.body.nombresede}`);
    const response = await sedeService.update(req.params.id, req.body.nombresede);
    res.json({
        method: 'update',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

/**
 * @swagger
 * /sede/{id}:
 *   delete:
 *     tags:
 *       - Sede
 *     summary: Elimina una sede por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la sede.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Sede eliminada exitosamente.
 */

router.delete('/:id', async (req, res) => {
    console.log(`DELETE request received for remove with ID: ${req.params.id}`);
    const response = await sedeService.remove(req.params.id);
    res.json({
        method: 'remove',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

module.exports = router;