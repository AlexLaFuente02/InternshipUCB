const express = require('express');
const { isAuthenticated, checkRole } = require('../services/authService');
const institucionService = require('../services/institucionService');
const estudianteService = require('../services/estudianteService');
const sectorPertenenciaService = require('../services/sectorPertenenciaService');
const usuarioService = require('../services/usuarioService');
const semestreService = require("../services/semestreService");
const sedeService = require('../services/sedeService');
const carreraService = require("../services/carreraService");
const router = express.Router();

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

// Ruta para crear estudiante
router.post('/estudiante', async (req, res) => {
    try {
        console.log('POST request received for createStudent with data:', req.body);
        // Verificar el token en los headers
        const decoded = await estudianteService.validateToken(req);
        if (decoded != null) {
            const response = await estudianteService.createStudent(req.body, decoded);
            res.json({
                method: 'createStudent',
                code: response.code,
                result: response.result,
                message: response.message,
            });
        }
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/sectorPertenencia', async (req, res) => {
  console.log('GET request received for getAll');
  const response = await sectorPertenenciaService.getAll();
  res.json({
    method: 'getAll',
    code: response.code,
    result: response.result,
    message: response.message,
  });
});
router.get("/carrera", async (req, res) => {
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
router.get('/sede', async (req, res) => {
    console.log('GET request received for getAll');
    const response = await sedeService.getAll();
    res.json({
        method: 'getAll',
        code: response.code,
        result: response.result,
        message: response.message,
    });
    }
);
router.get("/semestre", async (req, res) => {
  console.log("GET request received for all semesters");
  const response = await semestreService.getAll();
  res.json({
    method: "getAll",
    code: response.code,
    result: response.result,
    message: response.message
  });
});

// Ruta para añadir una institucion
router.post('/institucion', upload.single('logoinstitucion'), async (req, res) => {
    try {
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
    } catch (error) {
        console.error('Error creating institution:', error);
        res.status(500).json({ error: error.message });
    }
});
/*Funcion para enviar el correo de confirmacion de cuenta*/
router.post('/sendEmail', async (req, res) => {
    try {
        console.log('POST request received for sendEmail with data:', req.body);
        const response = await estudianteService.sendCode(req.body.email);
        res.json({
            method: 'sendEmail',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: error.message });
    }
});
/*Funcion para validar el codigo de confirmacion de cuenta y enviar el token*/
router.post('/validateCode', async (req, res) => {
    try {
        console.log('POST request received for validateCode with data:', req.body);
        const response = await estudianteService.validateCodeAndGenerateToken(req.body.code);
        console.log(response);
        res.json({
            method: 'validateCode',
            code: response.code,
            result: response.result,
            message: response.message,
        });
    } catch (error) {
        console.error('Error validating code:', error);
        res.status(500).json({ error: error.message });
    }
});
//PUT para actualizar la contraseña de un usuario
router.put('/updatePassword', async (req, res) => {
  console.log(`PUT request received for updatePassword with ID: PTM`);
  const response = await usuarioService.updatePassword(req);
  res.json({
      method: 'updatePassword',
      code: response.code,
      result: response.result,
      message: response.message,
  });
});

module.exports = router;