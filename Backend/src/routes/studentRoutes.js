const express = require('express');
const { isAuthenticated, checkRole } = require('../services/authService');
const convocatoriaService = require('../services/convocatoriaService');
const carreraService = require('../services/carreraService');
const usuarioService = require('../services/usuarioService');
const historicoPostulacionesService = require('../services/historicoPostulacionesService');
const postulacionService = require('../services/postulacionService');
const sedeService = require('../services/sedeService');
const institucionService = require('../services/institucionService');
const estudianteService = require('../services/estudianteService');
const comentarioPostulanteService = require('../services/comentarioPostulanteService');
const router = express.Router();

const { sendEmail } = require('../services/emailService');
// Ruta para obtener todas las convocatorias para estudiantes
router.get('/convocatoria', async (req, res) => {
    try {
        console.log('GET request received for getAllConvocatorias for STUDENT');
        const response = await convocatoriaService.getAllConvocatorias();
        res.json({
            method: 'getAllConvocatorias',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    } catch (error) {
        console.error('Error getting all convocatorias for STUDENT:', error);
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener una convocatoria por ID para estudiantes
router.get('/convocatoria/:id', async (req, res) => {
    try {
        console.log(`GET request received for getConvocatoriaById with ID: ${req.params.id} for STUDENT`);
        const response = await convocatoriaService.getConvocatoriaById(req.params.id);
        res.json({
            method: 'getConvocatoriasByID',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    } catch (error) {
        console.error(`Error getting convocatoria by ID: ${req.params.id} for STUDENT:`, error);
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener todas las carreras para estudiantes

router.get('/carrera', async (req, res) => {
    try {
        console.log('GET request received for getAllCarreras for STUDENT');
        const response = await carreraService.getAllCarreras();
        res.json({
            method: 'getAllCarreras',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    } catch (error) {
        console.error('Error getting all carreras for STUDENT:', error);
        res.status(500).json({ error: error.message });
    }
});

//Ruta para agregar un usuario
router.post('/usuario', async (req, res) => {
    try {
        console.log('POST request received for createUsuario for STUDENT');
        const response = await usuarioService.createUser(req.body);
        res.json({
            method: 'createUsuario',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    } catch (error) {
        console.error('Error creating usuario for STUDENT:', error);
        res.status(500).json({ error: error.message });
    }
});


//Ruta para obtener todos los historicos de postulaciones
router.get('/historicoPostulaciones', async (req, res) => {
    try {
        console.log('GET request received for getAllHistoricoPostulaciones for STUDENT');
        const response = await historicoPostulacionesService.getAllHistoricosPostulaciones();
        res.json({
            method: 'getAllHistoricoPostulaciones',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    } catch (error) {
        console.error('Error getting all historicoPostulaciones for STUDENT:', error);
        res.status(500).json({ error: error.message });
    }
});

//Ruta para agregar una postulacion
router.post('/postulacion', async (req, res) => {
    try {
        console.log('POST request received for createPostulacion for STUDENT');
        const response = await postulacionService.createPostulacion(req.body);
        res.json({
            method: 'createPostulacion',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    } catch (error) {
        console.error('Error creating postulacion for STUDENT:', error);
        res.status(500).json({ error: error.message });
    }
});

//Ruta para obtener todas las sedes
router.get('/sede', async (req, res) => {
    try {
        console.log('GET request received for getAllSedes for STUDENT');
        const response = await sedeService.getAll();
        res.json({
            method: 'getAllSedes',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    } catch (error) {
        console.error('Error getting all sedes for STUDENT:', error);
        res.status(500).json({ error: error.message });
    }
});


// OBTENIDOS POR EL FRONTEND

// Ruta para obtener las convoctarias activas para estudiantes
router.get('/convocatorias/activas', async (req, res) => {
    try {
        console.log('GET request received for getConvocatoriasActivas for STUDENT');
        const response = await convocatoriaService.getActiveConvocatorias();
        res.json({
            method: 'getConvocatoriasActivas',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    } catch (error) {
        console.error('Error getting convocatorias activas for STUDENT:', error);
        res.status(500).json({ error: error.message });
    }
});


//Ruta para obtener TODAS las postulaciones de un estudiante
router.get('/:studentId/postulaciones', async (req, res) => {
    try {
        console.log(`GET request received for getPostulacionByStudent with studentId: ${req.params.studentId}`);
        const studentId = req.params.studentId;
        const response = await postulacionService.getPostulacionByStudent(studentId);
        res.json({
            method: 'getPostulacionByStudent',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    } catch (error) {
        console.error(`Error getting postulaciones for student ID: ${req.params.studentId}:`, error);
        res.status(500).json({ error: error.message });
    }
});

//Ruta para obtener las postulaciones aprobadass de un estudiante
router.get('/:studentId/postulaciones/:estadopostulacionId', async (req, res) => {
    try {
        console.log(`GET request received for getPostulacionByStudentByStatus with studentId: ${req.params.studentId}`);
        const studentId = req.params.studentId;
        const estadopostulacionId = req.params.estadopostulacionId;
        const response = await postulacionService.getPostulacionByStudentByStatus(studentId, estadopostulacionId);
        res.json({
            method: 'getPostulacionByStudentByStatus',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    } catch (error) {
        console.error(`Error getting postulaciones for student ID: ${req.params.studentId}:`, error);
        res.status(500).json({ error: error.message });
    }
});


//Ruta para obtener las convocatorias populares
router.get('/convocatorias/populares', async (req, res) => {
    try {
        console.log(`GET request received for getPopularConvocatorias`);
        const response = await convocatoriaService.getPopularConvocatorias();
        res.json({
            method: 'getPopularConvocatorias',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    } catch (error) {
        console.error(`Error getting popular convocatorias:`, error);
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener instituciones por sector
router.get('/sectores/:sectorId/instituciones', async (req, res) => {
    try {
        console.log(`GET request received for getInstitutionsBySector with sectorId: ${req.params.sectorId}`);
        const sectorId = req.params.sectorId;
        const response = await institucionService.getInstitutionsBySector(sectorId);
        res.json({
            method: 'getInstitutionsBySector',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    } catch (error) {
        console.error(`Error getting institutions for sector ID: ${req.params.sectorId}:`, error);
        res.status(500).json({ error: error.message });
    }
});
router.get('/institucion', async (req, res) => {
    console.log('GET request received for getAllInstitutions');
    const response = await institucionService.getAllInstitutions();
    res.json({
        method: 'getAllInstitutions',
        code: response.code,
        result: response.result,
        message: response.message,
    });
});

// Ruta para obtener Student por ID
router.get('/:studentId', async (req, res) => {
    try {
        console.log(`GET request received for getStudentById with studentId: ${req.params.studentId}`);
        const studentId = req.params.studentId;
        const response = await estudianteService.getStudentById(studentId);
        res.json({
            method: 'getStudentById',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    } catch (error) {
        console.error(`Error getting student for student ID: ${req.params.studentId}:`, error);
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener Instituciones por ID
router.get('/institucion/:institucionId', async (req, res) => {
    try {
        console.log(`GET request received for getInstitutionById with institutionId: ${req.params.institucionId}`);
        const institucionId = req.params.institucionId;
        const response = await institucionService.getInstitutionById(institucionId);
        res.json({
            method: 'getInstitutionById',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    } catch (error) {
        console.error(`Error getting institution for institution ID: ${req.params.institucionId}:`, error);
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener Postulacion por ID
router.get('/postulacion/:postulacionId', async (req, res) => {
    try {
        console.log(`GET request received for getPostulacionById with postulacionId: ${req.params.postulacionId}`);
        const postulacionId = req.params.postulacionId;
        const response = await postulacionService.getPostulacionById(postulacionId);
        res.json({
            method: 'getPostulacionById',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    }	
    catch (error) {
        console.error(`Error getting postulacion for postulacion ID: ${req.params.postulacionId}:`, error);
        res.status(500).json({ error: error.message });
    }
});

// Ruta para añadir un comentario a una convocatoria
router.post('/comentariopostulante', async (req, res) => {
    try {
        console.log('POST request received for createComentarioPostulante');
        const response = await comentarioPostulanteService.createComentario(req.body);
        res.json({
            method: 'createComentarioPostulante',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    } catch (error) {
        console.error('Error creating comentarioPostulante:', error);
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener un comentario por ID de convocatoria
router.get('/comentariopostulante/:convocatoriaId', async (req, res) => {
    const { convocatoriaId } = req.params;
    try {
        const response = await comentarioPostulanteService.getComentarioByConvocatoriaId(convocatoriaId);
        res.json({
            method: 'getComentarioPostulanteByConvocatoriaId',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    } catch (error) {
        console.error(`Error al obtener el comentario para la convocatoria con ID: ${convocatoriaId}:`, error);
        res.status(500).json({
            method: 'getComentarioPostulanteByConvocatoriaId',
            code: 'C-1002',
            result: null,
            message: `Error al obtener el comentario para la convocatoria con ID: ${convocatoriaId}: ${error.message}`
        });
    }
});

module.exports = router;
