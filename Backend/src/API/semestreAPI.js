//REQUIREMENTS
const express = require("express");
const router = express.Router();
const semestreService = require("../services/semestreService");

/**
 * @swagger
 * /semestre/:
 *   get:
 *     tags:
 *       - Semestre
 *     summary: Obtiene todos los semestres.
 *     responses:
 *       200:
 *         description: Lista de semestres.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Semestre"
 */

//GET ALL SEMESTERS
router.get("/", async (req, res) => {
  console.log("GET request received for all semesters");
  const response = await semestreService.getAll();
  res.json({
    method: "getAll",
    code: response.code,
    result: response.result,
    message: response.message
  });
});

/**
 * @swagger
 * /semestre/{id}:
 *   get:
 *     tags:
 *       - Semestre
 *     summary: Obtiene un semestre por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del semestre.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles del semestre.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Semestre"
 */

// GET SEMESTER BY ID
router.get("/:id", async (req, res) => {
  console.log(`GET request received for getting semester by ID: '${req.params.id}'`);
  const response = await semestreService.getById(req.params.id);
  res.json({
    method: "getById",
    code: response.code,
    result: response.result,
    message: response.message
  });
});

/**
 * @swagger
 * /semestre/:
 *   post:
 *     tags:
 *       - Semestre
 *     summary: Crea un nuevo semestre.
 *     requestBody:
 *       description: Datos del semestre.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigosemestre:
 *                 type: string
 *                 example: 1 - 2024
 *     responses:
 *       200:
 *         description: Semestre creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Semestre"
 */

//CREATE SEMESTER
router.post("/", async (req, res) => {
  console.log(`POST request received for creating a new semester with code: ${req.body.codigosemestre}`);
  const response = await semestreService.create(req.body.codigosemestre);
  res.json({
    method: "create",
    code: response.code,
    result: response.result,
    message: response.message
  });
});

/**
 * @swagger
 * /semestre/{id}:
 *   put:
 *     tags:
 *       - Semestre
 *     summary: Actualiza un semestre por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del semestre.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       description: Datos actualizados del semestre.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigosemestre:
 *                 type: string
 *                 example: 2 - 2024
 *     responses:
 *       200:
 *         description: Semestre actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Semestre"
 */

//UPDATE A REGISTERED SEMESTER
router.put("/:id", async (req, res) => {
  console.log(`PUT request received for updating the semester with ID: '${req.params.id}', code: '${req.body.codigosemestre}'`);
  const response = await semestreService.update(
    req.params.id,
    req.body.codigosemestre
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
 * /semestre/{id}:
 *   delete:
 *     tags:
 *       - Semestre
 *     summary: Elimina un semestre por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del semestre.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Semestre eliminado exitosamente.
 */

//DELETE A REGISTERED SEMESTER
router.delete("/:id", async (req, res) => {
  console.log(`DELETE request received for deleting the semester with ID: '${req.params.id}'`);
  const response = await semestreService.remove(req.params.id);
  res.json({
    method: "remove",
    code: response.code,
    result: response.result,
    message: response.message
  });
});

module.exports = router;