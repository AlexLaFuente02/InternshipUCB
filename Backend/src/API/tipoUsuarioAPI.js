const express = require('express');
const router = express.Router();
const tipoUsuarioService = require('../services/tipoUsuarioService');

/**
 * @openapi
 * /tipoUsuario/:
 *   get:
 *     tags:
 *       - TipoUsuario
 *     summary: Obtiene todos los tipos de usuario
 *     responses:
 *       200:
 *         description: Lista de tipos de usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TipoUsuario"
 * 
 *   post:
 *     tags:
 *       - TipoUsuario
 *     summary: Crea un nuevo tipo de usuario
 *     requestBody:
 *       description: Datos del tipo de usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 example: "TipoOscar"
 *     responses:
 *       200:
 *         description: Tipo de usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TipoUsuario"
 * 
 * /tipoUsuario/{id}:
 *   get:
 *     tags:
 *       - TipoUsuario
 *     summary: Obtiene un tipo de usuario por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del tipo de usuario
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Detalles del tipo de usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TipoUsuario"
 * 
 *   put:
 *     tags:
 *       - TipoUsuario
 *     summary: Actualiza un tipo de usuario por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del tipo de usuario
 *         required: true
 *         schema:
 *           type: integer
 *           example: 3
 *     requestBody:
 *       description: Datos actualizados del tipo de usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 example: "TipoOsqui"
 *     responses:
 *       200:
 *         description: Tipo de usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TipoUsuario"
 * 
 *   delete:
 *     tags:
 *       - TipoUsuario
 *     summary: Elimina un tipo de usuario por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del tipo de usuario
 *         required: true
 *         schema:
 *           type: integer
 *           example: 11
 *     responses:
 *       200:
 *         description: Tipo de usuario eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TipoUsuario"
 */

router.get('/', async (req, res) => {
  console.log('GET request received for getAll');
  const response = await tipoUsuarioService.getAll();
  res.json({
    method: 'getAll',
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

router.get('/:id', async (req, res) => {
  console.log(`GET request received for getById with ID: ${req.params.id}`);
  const response = await tipoUsuarioService.getById(req.params.id);
  res.json({
    method: 'getById',
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

router.post('/', async (req, res) => {
  console.log('POST request received for create with tipo:', req.body.tipo);
  const response = await tipoUsuarioService.create(req.body.tipo);
  res.json({
    method: 'create',
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

router.put('/:id', async (req, res) => {
  console.log(`PUT request received for update with ID: ${req.params.id}`);
  const response = await tipoUsuarioService.update(req.params.id, req.body.tipo);
  res.json({
    method: 'update',
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

router.delete('/:id', async (req, res) => {
  console.log(`DELETE request received for remove with ID: ${req.params.id}`);
  const response = await tipoUsuarioService.remove(req.params.id);
  res.json({
    method: 'remove',
    code: response.code,
    result: response.result,
    message: response.message,
  });
}
);

module.exports = router;
