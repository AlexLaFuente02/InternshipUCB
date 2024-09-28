// CarreraAPI.js

const express = require("express");
const router = express.Router();
const carreraService = require("../services/carreraService");

/**
 * @swagger
 * /carrera/:
 *   get:
 *     tags:
 *       - Carrera
 *     summary: Obtiene todas las carreras
 *     responses:
 *       200:
 *         description: Lista de carreras
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */
router.get("/", async (req, res) => {
  try {
    const response = await carreraService.getAllCarreras();
    res.json({
      method: 'getAllCarreras',
      code: response.code,
      result: response.result,
      message: response.message,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /carrera/{id}:
 *   get:
 *     tags:
 *       - Carrera
 *     summary: Obtiene una carrera por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la carrera
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles de la carrera
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await carreraService.getCarreraById(id);
    res.json({
      method: 'getCarreraById',
      code: response.code,
      result: response.result,
      message: response.message,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /carrera/:
 *   post:
 *     tags:
 *       - Carrera
 *     summary: Crea una nueva carrera
 *     requestBody:
 *       description: Datos de la carrera
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombrecarrera:
 *                 type: string
 *                 example: Ingeniería Informática
 *     responses:
 *       200:
 *         description: Carrera creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */
router.post("/", async (req, res) => {
  const { nombrecarrera } = req.body;
  try {
    const response = await carreraService.createCarrera(nombrecarrera);
    res.status(201).json({
      method: 'createCarrera',
      code: response.code,
      result: response.result,
      message: response.message,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /carrera/{id}:
 *   put:
 *     tags:
 *       - Carrera
 *     summary: Actualiza una carrera por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la carrera
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       description: Datos actualizados de la carrera
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombrecarrera:
 *                 type: string
 *                 example: Ingeniería de Software
 *     responses:
 *       200:
 *         description: Carrera actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombrecarrera } = req.body;
  try {
    const response = await carreraService.updateCarrera(id, nombrecarrera);
    res.json({
      method: 'updateCarrera',
      code: response.code,
      result: response.result,
      message: response.message,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /carrera/{id}:
 *   delete:
 *     tags:
 *       - Carrera
 *     summary: Elimina una carrera por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la carrera
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Carrera eliminada
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`DELETE request received for deleteCarrera with ID: ${req.params.id}`);
  try {
    const response = await carreraService.deleteCarrera(id);
    res.json({
      method: 'deleteCarrera',
      code: response.code,
      result: response.result,
      message: response.message,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
