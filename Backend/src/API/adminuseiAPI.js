const express = require("express");
const router = express.Router();
const adminuseiService = require("../services/adminuseiService");

/**
 * @swagger
 * /adminUSEI/:
 *   get:
 *     tags:
 *       - AdminUSEI
 *     summary: Obtiene todos los administradores USEI.
 *     responses:
 *       200:
 *         description: Lista de los administradores USEI.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AdminUSEI"
 */

router.get("/", async (req, res) => {
  console.log("GET request received to get all USEI Administrators.");
  const response = await adminuseiService.getAllAdminsUSEI();
  res.json({
    method: "GetAllAdminsUSEI",
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

/**
 * @swagger
 * /adminUSEI/{id}:
 *   get:
 *     tags:
 *       - AdminUSEI
 *     summary: Obtiene un administrador USEI por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del administrador USEI.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles del administrador USEI.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AdminUSEI"
 */

router.get("/:id", async (req, res) => {
  console.log(
    `GET request received to get a USEI Administrator by ID: '${req.params.id}'.`
  );
  const response = await adminuseiService.getAdminUSEIById(req.params.id);
  res.json({
    method: "GetAdminUSEIById",
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

/**
 * @swagger
 * /adminUSEI/:
 *   post:
 *     tags:
 *       - AdminUSEI
 *     summary: Crea un nuevo administrador USEI.
 *     requestBody:
 *       description: Datos del administrador USEI.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Administrador USEI creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AdminUSEI"
 */

router.post("/", async (req, res) => {
  console.log(
    `POST request received to create a new USEI Administrator with data: "${req.body}".`
  );
  const response = await adminuseiService.createAdminUSEI(req.body);
  res.json({
    method: "CreateAdminUSEI",
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

/**
 * @swagger
 * /adminUSEI/{id}:
 *   put:
 *     tags:
 *       - AdminUSEI
 *     summary: Actualiza un administrador USEI por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del administrador USEI.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       description: Datos actualizados del administrador USEI.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Administrador USEI actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AdminUSEI"
 */

router.put("/:id", async (req, res) => {
  console.log(
    `PUT request received to update the data of a USEI Administrator with ID: '${req.params.id}', with data: "${req.body}".`
  );
  const response = await adminuseiService.updateAdminUSEI(
    req.params.id,
    req.body
  );
  res.json({
    method: "UpdateAdminUSEI",
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

/**
 * @swagger
 * /adminUSEI/{id}:
 *   delete:
 *     tags:
 *       - AdminUSEI
 *     summary: Elimina un administrador USEI por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del administrador USEI.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Administrador USEI eliminado exitosamente.
 */

router.delete("/:id", async (req, res) => {
  console.log(
    `DELETE request received to delete a USEI Administrator with ID: '${req.params.id}'.`
  );
  const response = await adminuseiService.deleteAdminUSEI(req.params.id);
  res.json({
    method: "DeleteAdminUSEI",
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

module.exports = router;
