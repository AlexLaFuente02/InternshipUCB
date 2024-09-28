const express = require('express');
const router = express.Router();
const estudianteService = require('../services/estudianteService');

/**
 * @openapi
 * /estudiante/:
 *   get:
 *     tags:
 *       - Estudiante
 *     summary: Obtener todos los estudiantes
 *     description: Devuelve una lista de todos los estudiantes.
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 * 
 *   post:
 *     tags:
 *       - Estudiante
 *     summary: Crear un nuevo estudiante
 *     description: Crea un nuevo estudiante con la información proporcionada.
 *     requestBody:
 *       description: Datos del estudiante
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *                 example: 2
 *               nombres:
 *                 type: string
 *                 example: Juan
 *               apellidopaterno:
 *                 type: string
 *                 example: Pérez
 *               apellidomaterno:
 *                 type: string
 *                 example: Sanchez
 *               carnetidentidad:
 *                 type: string
 *                 example: 123456789
 *               correoelectronico:
 *                 type: string
 *                 example: juan.perez@email.com
 *               celularcontacto:
 *                 type: string
 *                 example: 555-555-5555
 *               graduado:
 *                 type: boolean
 *                 example: true
 *               carrera:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *               semestre:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *               sede:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *               aniograduacion:
 *                 type: number
 *                 example: 2022
 *               linkcurriculumvitae:
 *                 type: string
 *                 example: http://example.com/juan_perez_cv.pdf
 *     responses:
 *       200:
 *         description: Estudiante creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 * 
 * /estudiante/{id}:
 *   get:
 *     tags:
 *       - Estudiante
 *     summary: Obtener un estudiante por ID
 *     description: Devuelve la información de un estudiante basado en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del estudiante
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Información del estudiante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 * 
 *   put:
 *     tags:
 *       - Estudiante
 *     summary: Actualizar un estudiante por ID
 *     description: Actualiza la información de un estudiante basado en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del estudiante
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       description: Datos actualizados del estudiante
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *                 example: 1
 *               nombres:
 *                 type: string
 *                 example: Juan Modificado
 *               apellidopaterno:
 *                 type: string
 *                 example: Pérez Modificado
 *               apellidomaterno:
 *                 type: string
 *                 example: Sanchez Modificado
 *               carnetidentidad:
 *                 type: string
 *                 example: 987654321
 *               correoelectronico:
 *                 type: string
 *                 example: juan.modificado@email.com
 *               celularcontacto:
 *                 type: string
 *                 example: 555-555-5556
 *               graduado:
 *                 type: boolean
 *                 example: false
 *               carrera:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 3
 *               semestre:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 2
 *               sede:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *               aniograduacion:
 *                 type: number
 *                 example: 2023
 *               linkcurriculumvitae:
 *                 type: string
 *                 example: http://example.com/juan_modificado_cv.pdf
 *     responses:
 *       200:
 *         description: Estudiante actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 * 
 *   delete:
 *     tags:
 *       - Estudiante
 *     summary: Eliminar un estudiante por ID
 *     description: Elimina un estudiante basado en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del estudiante
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Estudiante eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseDTO"
 */

router.get('/', async (req, res) => {
    console.log('GET request received for getAllStudents');
    const response = await estudianteService.getAllStudents();
    res.json({
        method: 'getAllStudents',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.get('/:id', async (req, res) => {
    console.log(`GET request received for getStudentById with ID: ${req.params.id}`);
    const response = await estudianteService.getStudentById(req.params.id);
    res.json({
        method: 'getStudentById',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.post('/', async (req, res) => {
    console.log('POST request received for createStudent with data:', req.body);
    //Verificar el token en los headers
    const decoded = await estudianteService.validateToken(req);
    if(decoded != null){
        const response = await estudianteService.createStudent(req.body,decoded);
        res.json({
            method: 'createStudent',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    }
});

router.put('/:id', async (req, res) => {
    console.log(`PUT request received for updateStudent with ID: ${req.params.id} and data:`, req.body);
    const response = await estudianteService.updateStudent(req.params.id, req.body);
    res.json({
        method: 'updateStudent',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

router.delete('/:id', async (req, res) => {
    console.log(`DELETE request received for deleteStudent with ID: ${req.params.id}`);
    const response = await estudianteService.deleteStudent(req.params.id);
    res.json({
        method: 'deleteStudent',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});
/*Funcion para enviar el correo de confirmacion de cuenta*/
router.post('/sendEmail', async (req, res) => {
    console.log('POST request received for sendEmail with data:', req.body);
    const response = await estudianteService.sendCode(req.body.email);
    console.log(response);
    res.json({
        method: 'sendEmail',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});
/*Funcion para validar el codigo de confirmacion de cuenta y enviar el token*/
router.post('/validateCode', async (req, res) => {
    console.log('POST request received for validateCode with data:', req.body);
    const response = await estudianteService.validateCodeAndGenerateToken(req.body.code);
    console.log(response);
    res.json({
        method: 'validateCode',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

module.exports = router;
