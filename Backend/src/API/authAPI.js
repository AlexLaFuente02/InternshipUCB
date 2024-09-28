const express = require('express');
const { passport, isAuthenticated } = require('../services/authService');
const LoginDTO = require('../DTO/LoginDTO');
const ResponseDTO = require('../DTO/ResponseDTO');
const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Iniciar sesión
 *     description: Inicia sesión de usuario con las credenciales proporcionadas.
 *     requestBody:
 *       description: Credenciales de inicio de sesión
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idusuario:
 *                 type: string
 *                 example: user1
 *               password:
 *                 type: string
 *                 example: pass1
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 *       401:
 *         description: Autenticación fallida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, usuario, response) => {
    if (err || !usuario) {
      const status = err ? 500 : 401;
      return res.status(status).json(response);
    }

    req.logIn(usuario, (loginErr) => {
      if (loginErr) {
        return res.status(500).json(response);
      }

      const loginDTO = response.result;
      res.status(200).json(new ResponseDTO('AUTH-0000', loginDTO, 'Inicio de sesión exitoso'));
    });
  })(req, res, next);
});

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Cerrar sesión
 *     description: Cierra la sesión del usuario actualmente autenticado.
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */
router.get('/logout', isAuthenticated, (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json(new ResponseDTO('AUTH-1004', null, 'Error al cerrar sesión'));
    }
    res.status(200).json(new ResponseDTO('AUTH-0003', null, 'Cierre de sesión exitoso'));
  });
});

/**
 * @swagger
 * /auth/status:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Verificar estado de autenticación
 *     description: Verifica si el usuario está autenticado y devuelve información del usuario.
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 *       401:
 *         description: Usuario no autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */
router.get('/status', isAuthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    const userDTO = new LoginDTO(req.user.id, req.user.idusuario);
    res.status(200).json(new ResponseDTO('AUTH-0000', userDTO, 'Usuario autenticado'));
  } else {
    res.status(200).json(new ResponseDTO('AUTH-0001', null, 'Usuario no autenticado'));
  }
});

module.exports = router;
