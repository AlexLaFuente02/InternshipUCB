const express = require('express');
const router = express.Router();
const institucionService = require('../services/institucionService');

//Fotos
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../..', 'images')); // Subir un nivel y luego entrar a la carpeta images
      },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

const upload = multer({ storage: storage });

/**
 * @openapi
 * /institucion/:
 *   get:
 *     tags:
 *       - Institucion
 *     summary: Obtener todas las instituciones
 *     description: Devuelve una lista de todas las instituciones.
 *     responses:
 *       200:
 *         description: Lista de instituciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Institucion"
 * 
 * /institucion/destacadas:
 *   get:
 *     tags:
 *       - Institucion
 *     summary: Obtener el total de postulaciones por institución
 *     description: Devuelve un resumen del total de postulaciones para cada institución, incluyendo el nombre, la reseña y el logo de la institución.
 *     responses:
 *       200:
 *         description: Resumen de postulaciones por institución
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombreinstitucion:
 *                     type: string
 *                     description: Nombre de la institución
 *                   reseniainstitucion:
 *                     type: string
 *                     description: Reseña de la institución
 *                     nullable: true
 *                   logoinstitucion:
 *                     type: string
 *                     format: byte
 *                     description: Logo de la institución en formato binario
 *                     nullable: true
 *                   totalpostulaciones:
 *                     type: number
 *                     description: Total de postulaciones asociadas a la institución
 * 
 *   post:
 *     tags:
 *       - Institucion
 *     summary: Crear una nueva institución
 *     description: Crea una nueva institución con la información proporcionada.
 *     requestBody:
 *       description: Datos de la institución
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Institucion"
 *           example:
 *             nombreinstitucion: "Universidad XYZ"
 *             reseniainstitucion: "Una breve descripción de la universidad."
 *             logoinstitucion: null
 *             nombrecontacto: "Juan Pérez"
 *             correocontacto: "juan.perez@univez.com"
 *             celularcontacto: "12345678"
 *             usuario: 
 *               id: 1
 *             sectorpertenencia: 
 *               id: 3
 *     responses:
 *       200:
 *         description: Institución creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Institucion"
 * 
 * /institucion/{id}:
 *   get:
 *     tags:
 *       - Institucion
 *     summary: Obtener una institución por ID
 *     description: Devuelve la información de una institución basada en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la institución
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Información de la institución
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Institucion"
 * 
 *   put:
 *     tags:
 *       - Institucion
 *     summary: Actualizar una institución por ID
 *     description: Actualiza la información de una institución basada en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la institución
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       description: Datos actualizados de la institución
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Institucion"
 *           example:
 *             nombreinstitucion: "Universidad ABC"
 *             reseniainstitucion: "Descripción actualizada de la universidad."
 *             logoinstitucion: null
 *             nombrecontacto: "María García"
 *             correocontacto: "maria.garcia@universidadabc.com"
 *             celularcontacto: "987654321"
 *             usuario: 
 *               id: 2
 *             sectorpertenencia: 
 *               id: 1
 *     responses:
 *       200:
 *         description: Institución actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Institucion"
 * 
 *   delete:
 *     tags:
 *       - Institucion
 *     summary: Eliminar una institución por ID
 *     description: Elimina una institución basada en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la institución
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Institución eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Institucion"
 */

router.get('/', async (req, res) => {
    console.log('GET request received for getAllInstitutions');
    const response = await institucionService.getAllInstitutions();
    res.json({
        method: 'getAllInstitutions',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.get('/destacadas', async (req, res) => {
    console.log('GET request received for getInstitutionPostulations');
    
        const response = await institucionService.getInstitutionPostulations();
        res.json({
            method: 'getInstitutionPostulations',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    
});

router.get('/:id', async (req, res) => {
    console.log(`GET request received for getInstitutionById with ID: ${req.params.id}`);
    const response = await institucionService.getInstitutionById(req.params.id);
    res.json({
        method: 'getInstitutionById',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.post('/', upload.single('logoinstitucion'), async (req, res) => {
    console.log('POST request received for createInstitution');
  
    // Extrae los datos del cuerpo de la solicitud y la ruta del archivo de imagen
    const institutionData = {
        ...req.body,
        logoinstitucion: req.file ? req.file.filename : null, // Usa filename y no path
    };
  
    // Llama al servicio y pasa los datos de la institución, incluyendo la ruta de la imagen
    const response = await institucionService.createInstitution(institutionData);
  
    // Envía la respuesta
    res.json({
      method: 'createInstitution',
      code: response.code,
      result: response.result,
      message: response.message,
    });
  });
  

router.put('/:id', async (req, res) => {
    console.log(`PUT request received for updateInstitution with ID: ${req.params.id} and data:`, req.body);
    const response = await institucionService.updateInstitution(req.params.id, req.body);
    res.json({
        method: 'updateInstitution',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.delete('/:id', async (req, res) => {
    console.log(`DELETE request received for deleteInstitution with ID: ${req.params.id}`);
    const response = await institucionService.deleteInstitution(req.params.id);
    res.json({
        method: 'deleteInstitution',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

module.exports = router;
