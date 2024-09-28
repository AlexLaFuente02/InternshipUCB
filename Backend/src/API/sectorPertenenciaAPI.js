const express = require('express');
const router = express.Router();
const sectorPertenenciaService = require('../services/sectorPertenenciaService');

/**
 * @openapi
 * /sectorPertenencia/:
 *   get:
 *     tags:
 *       - SectorPertenencia
 *     summary: Obtener todos los sectores de pertenencia
 *     description: Devuelve una lista de todos los sectores de pertenencia.
 *     responses:
 *       200:
 *         description: Lista de sectores de pertenencia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SectorPertenencia"
 * 
 *   post:
 *     tags:
 *       - SectorPertenencia
 *     summary: Crear un nuevo sector de pertenencia
 *     description: Crea un nuevo sector de pertenencia con la información proporcionada.
 *     requestBody:
 *       description: Datos del sector de pertenencia
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SectorPertenencia"
 *           example:
 *             nombresectorpertenencia: "Sector 4"
 *     responses:
 *       200:
 *         description: Sector de pertenencia creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SectorPertenencia"
 * 
 * /sectorPertenencia/{id}:
 *   get:
 *     tags:
 *       - SectorPertenencia
 *     summary: Obtener un sector de pertenencia por ID
 *     description: Devuelve la información de un sector de pertenencia basado en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del sector de pertenencia
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Información del sector de pertenencia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SectorPertenencia"
 * 
 *   put:
 *     tags:
 *       - SectorPertenencia
 *     summary: Actualizar un sector de pertenencia por ID
 *     description: Actualiza la información de un sector de pertenencia basado en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del sector de pertenencia
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       description: Datos actualizados del sector de pertenencia
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SectorPertenencia"
 *           example:
 *             nombresectorpertenencia: "Sector 2"
 *     responses:
 *       200:
 *         description: Sector de pertenencia actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SectorPertenencia"
 * 
 *   delete:
 *     tags:
 *       - SectorPertenencia
 *     summary: Eliminar un sector de pertenencia por ID
 *     description: Elimina un sector de pertenencia basado en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del sector de pertenencia
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Sector de pertenencia eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SectorPertenencia"
 */

router.get('/', async (req, res) => {
  console.log('GET request received for getAll');
  const response = await sectorPertenenciaService.getAll();
  res.json({
    method: 'getAll',
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

router.get('/:id', async (req, res) => {
  console.log(`GET request received for getById with ID: ${req.params.id}`);
  const response = await sectorPertenenciaService.getById(req.params.id);
  res.json({
    method: 'getById',
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

router.post('/', async (req, res) => {
  console.log('POST request received for create with nombresectorpertenencia:', req.body.nombresectorpertenencia);
  const response = await sectorPertenenciaService.create(req.body.nombresectorpertenencia);
  res.json({
    method: 'create',
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

router.put('/:id', async (req, res) => {
  console.log(`PUT request received for update with ID: ${req.params.id}, nombresectorpertenencia: ${req.body.nombresectorpertenencia}`);
  const response = await sectorPertenenciaService.update(req.params.id, req.body.nombresectorpertenencia);
  res.json({
    method: 'update',
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

router.delete('/:id', async (req, res) => {
  console.log(`DELETE request received for remove with ID: ${req.params.id}`);
  const response = await sectorPertenenciaService.remove(req.params.id);
  res.json({
    method: 'remove',
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

module.exports = router;
