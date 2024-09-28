const express = require("express");
const router = express.Router();
const historicoUsuarioService = require("../services/historicoUsuarioService");

/**
 * @swagger
 * /historicoUsuario/:
 *   get:
 *     tags:
 *       - HistoricoUsuario
 *     summary: Obtiene todos los registros históricos de usuarios
 *     responses:
 *       200:
 *         description: Lista de registros históricos de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/HistoricoUsuario"
 */

router.get("/", async (req, res) => {
  console.log("GET request received to get all users history.");
  const response = await historicoUsuarioService.getAllUserHistory();
  res.json({
    method: "GetAllUserHistory",
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

/**
 * @swagger
 * /historicoUsuario/{id_h}:
 *   get:
 *     tags:
 *       - HistoricoUsuario
 *     summary: Obtiene un registro histórico de usuario por ID
 *     parameters:
 *       - in: path
 *         name: id_h
 *         required: true
 *         description: ID del registro histórico
 *         schema:
 *           type: integer
 *           example: 4
 *     responses:
 *       200:
 *         description: Detalles del registro histórico
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/HistoricoUsuario"
 */

router.get("/:id", async (req, res) => {
  console.log(
    `GET request received to get a user history by ID: '${req.params.id}'.`
  );
  const response = await historicoUsuarioService.getUserHistoryById(
    req.params.id
  );
  res.json({
    method: "GetUserHistoryById",
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

module.exports = router;
