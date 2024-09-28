const express = require('express');
const router = express.Router();
const usuarioService = require('../services/usuarioService');

/**
 * @swagger
 * /usuario/:
 *   get:
 *     tags:
 *       - Usuario
 *     summary: Obtiene todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */
router.get('/', async (req, res) => {
    console.log('GET request received for getAllUsers');
    const response = await usuarioService.getAllUsers();
    res.json({
        method: 'getAllUsers',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     tags:
 *       - Usuario
 *     summary: Obtiene un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */
router.get('/:id', async (req, res) => {
    console.log(`GET request received for getUserById with ID: ${req.params.id}`);
    const response = await usuarioService.getUserById(req.params.id);
    res.json({
        method: 'getUserById',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

/**
 * @swagger
 * /usuario/:
 *   post:
 *     tags:
 *       - Usuario
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       description: Datos del usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idusuario:
 *                 type: string
 *                 example: usernew
 *               contrasenia:
 *                 type: string
 *                 example: passnew
 *               tipousuario:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *     responses:
 *       200:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */
router.post('/', async (req, res) => {
    console.log('POST request received for createUser with data:', req.body);
    const response = await usuarioService.createUser(req.body);
    res.json({
        method: 'createUser',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

/**
 * @swagger
 * /usuario/{id}:
 *   put:
 *     tags:
 *       - Usuario
 *     summary: Actualiza un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       description: Datos actualizados del usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idusuario:
 *                 type: string
 *                 example: userupdated
 *               contrasenia:
 *                 type: string
 *                 example: passupdated
 *               tipousuario:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 3
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */

//PUT DE USUARIO
router.put('/:id', async (req, res) => {
    console.log(`PUT request received for updateUser with ID: ${req.params.id}`);
    const response = await usuarioService.updateUser(req.params.id, req.body);
    res.json({
        method: 'updateUser',
        code: response.code,
        result: response.result,
        message: response.message,
    });
}
);

//PUT para actualizar la contraseña de un usuario
router.put('/updatePassword', async (req, res) => {
    console.log(`PUT request received for updatePassword with ID: PTM`);
    const response = await usuarioService.updatePassword(req);
    res.json({
        method: 'updatePassword',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});






/**
 * @swagger
 * /usuario/{id}:
 *   delete:
 *     tags:
 *       - Usuario
 *     summary: Elimina un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */
router.delete('/:id', async (req, res) => {
    console.log(`DELETE request received for deleteUser with ID: ${req.params.id}`);
    const response = await usuarioService.deleteUser(req.params.id);
    res.json({
        method: 'deleteUser',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});
/*Obtener los datos de usuario por idUsuario*/
router.get('/getUsuarioByIdUsuario/:idUsuario', async (req, res) => {
    console.log(`GET request received for getUsuarioByIdUsuario with ID: ${req.params.idUsuario}`);
    const response = await usuarioService.getUserByIdUsuario(req.params.idUsuario);
    res.json({
        method: 'getUsuarioByIdUsuario',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});
module.exports = router;
