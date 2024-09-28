const express = require("express");
const router = express.Router();
const estadoPostulacionService = require("../services/estadoPostulacionService");

/**
 * @swagger
 * /estadoPostulacion/:
 *   get:
 *     tags:
 *       - EstadoPostulacion
 *     summary: Obtiene todos los estados de las postulaciones.
 *     responses:
 *       200:
 *         description: Lista de los estados de las postulaciones.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/EstadoPostulacion"
 */

router.get("/", async (req, res) => {
  console.log("GET request received for getAll");
  const response = await estadoPostulacionService.getAll();
  res.json({
    method: "getAll",
    code: response.code,
    result: response.result,
    message: response.message
  });
});

/**
 * @swagger
 * /estadoPostulacion/{id}:
 *   get:
 *     tags:
 *       - EstadoPostulacion
 *     summary: Obtiene un estado de postulación por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del estado de postulación.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles del estado de postulación.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/EstadoPostulacion"
 */

router.get("/:id", async (req, res) => {
  console.log(`GET request received for getById with ID: ${req.params.id}`);
  const response = await estadoPostulacionService.getById(req.params.id);
  res.json({
    method: "getById",
    code: response.code,
    result: response.result,
    message: response.message
  });
});

/**
 * @swagger
 * /estadoPostulacion/:
 *   post:
 *     tags:
 *       - EstadoPostulacion
 *     summary: Crea un nuevo estado de postulación.
 *     requestBody:
 *       description: Datos del estado de postulación.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreestadopostulacion:
 *                 type: string
 *                 example: EN ESPERA
 *     responses:
 *       200:
 *         description: Estado de postulación creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/EstadoPostulacion"
 */

router.post("/", async (req, res) => {
  console.log(`POST request received for create with postulation status name: ${req.body.nombreestadopostulacion}`);
  const response = await estadoPostulacionService.create(req.body.nombreestadopostulacion);
  res.json({
    method: "create",
    code: response.code,
    result: response.result,
    message: response.message
  });
});

/**
 * @swagger
 * /estadoPostulacion/{id}:
 *   put:
 *     tags:
 *       - EstadoPostulacion
 *     summary: Actualiza un estado de postulación por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del estado de postulación.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       description: Datos actualizados del estado de postulación.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreestadopostulacion:
 *                 type: string
 *                 example: APROBADO
 *     responses:
 *       200:
 *         description: Estado de postulación actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/EstadoPostulacion"
 */

router.put("/:id", async (req, res) => {
  console.log(`PUT request received for update with ID: ${req.params.id}, postulation status name: ${req.body.nombreestadopostulacion}`);
  const response = await estadoPostulacionService.update(
    req.params.id,
    req.body.nombreestadopostulacion
  );
  res.json({
    method: "update",
    code: response.code,
    result: response.result,
    message: response.message
  });
});

/**
 * @swagger
 * /estadoPostulacion/{id}:
 *   delete:
 *     tags:
 *       - EstadoPostulacion
 *     summary: Elimina un estado de postulación por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del estado de postulación.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Estado de postulación eliminado exitosamente.
 */

router.delete("/:id", async (req, res) => {
  console.log(`DELETE request received for remove with ID: ${req.params.id}`);
  const response = await estadoPostulacionService.remove(req.params.id);
  res.json({
    method: "remove",
    code: response.code,
    result: response.result,
    message: response.message
  });
});

module.exports = router;