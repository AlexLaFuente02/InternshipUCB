const express = require('express');
const router = express.Router();
const convocatoriaService = require('../services/convocatoriaService');

/**
 * @openapi
 * /convocatoria/:
 *   get:
 *     tags:
 *       - Convocatoria
 *     summary: Obtener todas las convocatorias
 *     description: Devuelve una lista de todas las convocatorias.
 *     responses:
 *       200:
 *         description: Lista de convocatorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Convocatoria"
 * 
 *   post:
 *     tags:
 *       - Convocatoria
 *     summary: Crear una nueva convocatoria
 *     description: Crea una nueva convocatoria con la información proporcionada.
 *     requestBody:
 *       description: Datos de la convocatoria
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Convocatoria"
 *           example:
 *             areapasantia: "Área de prueba"
 *             descripcionfunciones: "Descripción de funciones"
 *             requisitoscompetencias: "Requisitos y competencias"
 *             horario_inicio: "08:00"
 *             horario_fin: "17:00"
 *             fechasolicitud: "2023-10-22"
 *             fechaseleccionpasante: "2025-12-12"
 *             estadoconvocatoria: 
 *               id: 2
 *             institucion: 
 *               id: 1
 *             tiempoacumplir: 
 *               id: 2
 *     responses:
 *       200:
 *         description: Convocatoria creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Convocatoria"
 * 
 * /convocatoria/{id}:
 *   get:
 *     tags:
 *       - Convocatoria
 *     summary: Obtener una convocatoria por ID
 *     description: Devuelve la información de una convocatoria basada en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la convocatoria
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Información de la convocatoria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Convocatoria"
 * 
 *   put:
 *     tags:
 *       - Convocatoria
 *     summary: Actualizar una convocatoria por ID
 *     description: Actualiza la información de una convocatoria basada en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la convocatoria
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       description: Datos actualizados de la convocatoria
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Convocatoria"
 *           example:
 *             areapasantia: "Area actualizada"
 *             descripcionfunciones: "Descripción actualizada"
 *             requisitoscompetencias: "Requisitos y competencias"
 *             horario_inicio: "08:00"
 *             horario_fin: "17:00"
 *             fechasolicitud: "2023-10-22"
 *             fechaseleccionpasante: "2025-12-12"
 *             estadoconvocatoria: 
 *               id: 2
 *             institucion: 
 *               id: 1
 *             tiempoacumplir: 
 *               id: 2
 *     responses:
 *       200:
 *         description: Convocatoria actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Convocatoria"
 * 
 *   delete:
 *     tags:
 *       - Convocatoria
 *     summary: Eliminar una convocatoria por ID
 *     description: Elimina una convocatoria basada en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la convocatoria
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Convocatoria eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Convocatoria"
 */

router.get('/', async (req, res) => {
    console.log('GET request received for getAllConvocatorias');
    const response = await convocatoriaService.getAllConvocatorias();
    res.json({
        method: 'getAllConvocatorias',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.get('/:id', async (req, res) => {
    console.log(`GET request received for getConvocatoriaById with ID: ${req.params.id}`);
    const response = await convocatoriaService.getConvocatoriaById(req.params.id);
    res.json({
        method: 'getConvocatoriaById',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.post('/', async (req, res) => {
    console.log('POST request received for createConvocatoria with data:', req.body);
    const response = await convocatoriaService.createConvocatoria(req.body);
    res.json({
        method: 'createConvocatoria',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.put('/:id', async (req, res) => {
    console.log(`PUT request received for updateConvocatoria with ID: ${req.params.id} and data:`, req.body);
    const response = await convocatoriaService.updateConvocatoria(req.params.id, req.body);
    res.json({
        method: 'updateConvocatoria',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.delete('/:id', async (req, res) => {
    console.log(`DELETE request received for deleteConvocatoria with ID: ${req.params.id}`);
    const response = await convocatoriaService.deleteConvocatoria(req.params.id);
    res.json({
        method: 'deleteConvocatoria',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

module.exports = router;
