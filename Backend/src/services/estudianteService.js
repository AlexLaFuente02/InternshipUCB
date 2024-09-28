const EstudianteDTO = require('../DTO/EstudianteDTO');
const CarreraDTO = require('../DTO/CarreraDTO');
const SedeDTO = require('../DTO/SedeDTO');
const SemestreDTO = require('../DTO/SemestreDTO');
const EstudianteENT = require("../ENT/EstudianteENT");
const ResponseDTO = require("../DTO/ResponseDTO");
const Carrera = require('../ENT/CarreraENT');
const Sede = require('../ENT/SedeENT');
const Semestre = require('../ENT/semestreENT');
/*Importaciones para los correos*/
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const accountTransport = require('../../config/account_transport.json');
const { books } = require('googleapis/build/src/apis/books');
/*Importaciones para los tokens*/
const jwt = require('jsonwebtoken');
const SECRET_KEY_CODES = require('../../config/secretKey.js');
/*Servicio de usuario*/
const usuarioService = require('../services/usuarioService');
const getAllStudents = async () => {
    console.log('Obteniendo todos los estudiantes...');
    try {
        const estudiantes = await EstudianteENT.findAll({
            include: [
                { model: Carrera, as: 'carrera' },
                { model: Semestre, as: 'semestre' },
                { model: Sede, as: 'sede' }
            ]
        });
        const estudiantesDTO = estudiantes.map(estudiante => {
            const carreraDTO = new CarreraDTO(estudiante.carrera.id, estudiante.carrera.nombrecarrera);
            const semestreDTO = new SemestreDTO(estudiante.semestre.id, estudiante.semestre.codigosemestre);
            const sedeDTO = new SedeDTO(estudiante.sede.id, estudiante.sede.nombresede);

            return new EstudianteDTO(
                estudiante.id,
                estudiante.usuario_id,
                estudiante.nombres,
                estudiante.apellidopaterno,
                estudiante.apellidomaterno,
                estudiante.carnetidentidad,
                estudiante.correoelectronico,
                estudiante.celularcontacto,
                estudiante.graduado,
                carreraDTO,
                semestreDTO,
                sedeDTO,
                estudiante.aniograduacion,
                estudiante.linkcurriculumvitae
            );
        });
        console.log('Estudiantes obtenidos correctamente.');
        return new ResponseDTO('E-0000', estudiantesDTO, 'Estudiantes obtenidos correctamente');
    } catch (error) {
        console.error('Error al obtener todos los estudiantes:', error);
        return new ResponseDTO('E-1001', null, `Error al obtener todos los estudiantes: ${error}`);
    }
};

const getStudentById = async (id) => {
    console.log(`Obteniendo el estudiante con ID: ${id}...`);
    try {
        const estudiante = await EstudianteENT.findByPk(id, {
            include: [
                { model: Carrera, as: 'carrera' },
                { model: Semestre, as: 'semestre' },
                { model: Sede, as: 'sede' }
            ]
        });
        if (!estudiante) {
            console.error(`Estudiante con ID: ${id} no encontrado.`);
            return new ResponseDTO('E-1002', null, 'Estudiante no encontrado');
        }
        const carreraDTO = new CarreraDTO(estudiante.carrera.id, estudiante.carrera.nombrecarrera);
        const semestreDTO = new SemestreDTO(estudiante.semestre.id, estudiante.semestre.codigosemestre);
        const sedeDTO = new SedeDTO(estudiante.sede.id, estudiante.sede.nombresede);

        const estudianteDTO = new EstudianteDTO(
            estudiante.id,
            estudiante.usuario_id,
            estudiante.nombres,
            estudiante.apellidopaterno,
            estudiante.apellidomaterno,
            estudiante.carnetidentidad,
            estudiante.correoelectronico,
            estudiante.celularcontacto,
            estudiante.graduado,
            carreraDTO,
            semestreDTO,
            sedeDTO,
            estudiante.aniograduacion,
            estudiante.linkcurriculumvitae
        );
        console.log('Estudiante obtenido correctamente.');
        return new ResponseDTO('E-0000', estudianteDTO, 'Estudiante obtenido correctamente');
    } catch (error) {
        console.error(`Error al obtener el estudiante con ID: ${id}.`, error);
        return new ResponseDTO('E-1002', null, `Error al obtener el estudiante: ${error}`);
    }
};

const createStudent = async (estudianteData,decoded) => {
    console.log('Creando un nuevo estudiante...');
    try {
        let newStudentData = {
            usuario_id: decoded.id,
            nombres: estudianteData.nombres,
            apellidopaterno: estudianteData.apellidopaterno,
            apellidomaterno: estudianteData.apellidomaterno,
            carnetidentidad: estudianteData.carnetidentidad,
            correoelectronico: decoded.email,
            celularcontacto: estudianteData.celularcontacto,
            graduado: estudianteData.graduado,
            carrera_id: estudianteData.carrera.id,
            semestre_id: estudianteData.semestre.id,
            linkcurriculumvitae: estudianteData.linkcurriculumvitae
        };

        if (estudianteData.sede && estudianteData.sede.id) {
            newStudentData.sede_id = estudianteData.sede.id;
        }

        if (estudianteData.aniograduacion) {
            newStudentData.aniograduacion = estudianteData.aniograduacion;
        }

        const nuevoEstudiante = await EstudianteENT.create(newStudentData);

        const carreraDTO = new CarreraDTO(estudianteData.carrera.id, estudianteData.carrera.nombrecarrera);
        const semestreDTO = new SemestreDTO(estudianteData.semestre.id, estudianteData.semestre.codigosemestre);
        const sedeDTO = estudianteData.sede ? new SedeDTO(estudianteData.sede.id, estudianteData.sede.nombresede) : null;

        const estudianteDTO = new EstudianteDTO(
            nuevoEstudiante.id,
            nuevoEstudiante.usuario_id,
            nuevoEstudiante.nombres,
            nuevoEstudiante.apellidopaterno,
            nuevoEstudiante.apellidomaterno,
            nuevoEstudiante.carnetidentidad,
            nuevoEstudiante.correoelectronico,
            nuevoEstudiante.celularcontacto,
            nuevoEstudiante.graduado,
            carreraDTO,
            semestreDTO,
            sedeDTO,
            nuevoEstudiante.aniograduacion,
            nuevoEstudiante.linkcurriculumvitae
        );

        console.log('Estudiante creado correctamente.');
        return new ResponseDTO('E-0000', estudianteDTO, 'Estudiante creado correctamente');
    } catch (error) {
        console.error('Error al crear el estudiante:', error);
        return new ResponseDTO('E-1003', null, `Error al crear el estudiante: ${error}`);
    }
};


const updateStudent = async (id, estudianteData) => {
    console.log(`Actualizando el estudiante con ID: ${id}...`);
    try {
        const estudiante = await EstudianteENT.findByPk(id);
        if (!estudiante) {
            console.log(`Estudiante con ID: ${id} no encontrado.`);
            return new ResponseDTO('E-1004', null, 'Estudiante no encontrado');
        }
        
        // Realiza la actualización del estudiante con los datos proporcionados
        await estudiante.update(estudianteData);
        
        // Vuelve a buscar el estudiante actualizado
        const estudianteActualizado = await EstudianteENT.findByPk(id, {
            include: [
                { model: Carrera, as: 'carrera' },
                { model: Semestre, as: 'semestre' },
                { model: Sede, as: 'sede' }
            ]
        });
        
        // Crea un nuevo objeto estudianteDTO con los datos actualizados
        const carreraDTO = new CarreraDTO(estudianteActualizado.carrera.id, estudianteActualizado.carrera.nombrecarrera);
        const semestreDTO = new SemestreDTO(estudianteActualizado.semestre.id, estudianteActualizado.semestre.codigosemestre);
        const sedeDTO = new SedeDTO(estudianteActualizado.sede.id, estudianteActualizado.sede.nombresede);

        const estudianteDTO = new EstudianteDTO(
            estudianteActualizado.id,
            estudianteActualizado.usuario_id,
            estudianteActualizado.nombres,
            estudianteActualizado.apellidopaterno,
            estudianteActualizado.apellidomaterno,
            estudianteActualizado.carnetidentidad,
            estudianteActualizado.correoelectronico,
            estudianteActualizado.celularcontacto,
            estudianteActualizado.graduado,
            carreraDTO,
            semestreDTO,
            sedeDTO,
            estudianteActualizado.aniograduacion,
            estudianteActualizado.linkcurriculumvitae
        );

        console.log('Estudiante actualizado correctamente.');
        
        // Retorna el estudianteDTO actualizado
        return new ResponseDTO('E-0000', estudianteDTO, 'Estudiante actualizado correctamente');
    } catch (error) {
        console.error(`Error al actualizar el estudiante con ID: ${id}.`, error);
        return new ResponseDTO('E-1004', null, `Error al actualizar el estudiante: ${error}`);
    }
};


const deleteStudent = async (id) => {
    console.log(`Eliminando el estudiante con ID: ${id}...`);
    try {
        const estudiante = await EstudianteENT.findByPk(id);
        if (!estudiante) {
            console.log(`Estudiante con ID: ${id} no encontrado.`);
            return new ResponseDTO('E-1005', null, 'Estudiante no encontrado');
        }
        await estudiante.destroy();        
        console.log('Estudiante eliminado correctamente.');
        return new ResponseDTO('E-0000', "OK", 'Estudiante eliminado correctamente');
    } catch (error) {
        console.error(`Error al eliminar el estudiante con ID: ${id}.`, error);
        return new ResponseDTO('E-1005', null, `Error al eliminar el estudiante: ${error}`);
    }
};
/*Lista que almacena los codigos de validacion*/
let codes = [
    //Datos de prueba
    /*{
        code: 123456,
        expiration: new Date().getTime() + 300000 ,// 5 minutos
        email: "junito11@ucb.edu.bo"
    },
    {
        code: 654321,
        expiration: new Date().getTime() + 300000, // 5 minutos
        email: "junito21@ucb.edu.bo"
    },
    {
        code: 111111,
        expiration: new Date().getTime() + 300000, // 5 minutos
        email: "junito31@ucb.edu.bo"
    }*/
];
/*Funcion para generar los codigos de validacion*/
const generateCode = (email) => {
    let code;
    const expiration = new Date().getTime() + 300000; // 5 minutos
    do {
        code = Math.floor(Math.random() * (999999 - 100000) + 100000);
    } while (codes.some(c => c.code === code && c.expiration > new Date().getTime()));
    codes.push({ code, expiration, email });
    return code;
};
/*Funcion para eliminar los codigos de validacion expirados*/
const deleteExpiredCodes = () => {
    codes = codes.filter(c => c.expiration > new Date().getTime());
};
/*Funcion para enviar correo*/
const sendEmail = async (email) => {
    const subject = "Código de validación";
    const text = `Su código de validación es: ${generateCode(email)}`;
    const oauth2Client = new OAuth2(
        accountTransport.auth.clientId,
        accountTransport.auth.clientSecret,
        "https://developers.google.com/oauthplayground"
    );
    oauth2Client.setCredentials({
        refresh_token: accountTransport.auth.refreshToken
    });
    const accessToken = await oauth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: accountTransport.auth.user,
            clientId: accountTransport.auth.clientId,
            clientSecret: accountTransport.auth.clientSecret,
            refreshToken: accountTransport.auth.refreshToken,
            accessToken: accessToken
        }
    });
    const mailOptions = {
        from: accountTransport.auth.user,
        to: email,
        subject: subject,
        text: text
    };
    const result = await transport.sendMail(mailOptions);
    return result;
};
/*Funcion para enviar el codigo de validacion*/
const sendCode = async (email) => {
    /*Verificar que el correo acabe en @ucb.edu.bo*/
    const testCorreo = /@ucb.edu.bo$/;
    if (!testCorreo.test(email)) {
        return new ResponseDTO('E-1006', null, 'El correo debe ser el institucional de la UCB');
    }
    const result = await sendEmail(email);
    const response = new ResponseDTO('E-0000', result, 'Codigo de validacion enviado correctamente');
    return response;
};
/*Funcion para validar el codigo de validacion*/
const validateCode = (code) => {
    code = parseInt(code);
    const index = codes.findIndex(c => c.code === code);
    if (index === -1) {
        return null;
    }
    const expiration = codes[index].expiration;
    if (expiration < new Date().getTime()) {
        codes.splice(index, 1);
        return null;
    }
    console.log(codes[index]);
    const email = codes[index].email;
    codes.splice(index, 1);
    return email;
};
/*Funcion para generar el token*/
const generateToken = (idUser,email) => {
    const token = jwt.sign({ id: idUser, email: email }, SECRET_KEY_CODES.SECRET_KEY);
    return token;
};

/*Funcion que valida el codigo y genera el token*/
const validateCodeAndGenerateToken = async (code) => {
    try{
        const emailValid = validateCode(code);
        if (emailValid != null) {
            const body = {
                idusuario: emailValid,
                contrasenia: emailValid,
                tipousuario: {
                    id: 1
                }
            };
            const response = await usuarioService.createUser(body);
            const token = generateToken(response.result.id, emailValid);
            return new ResponseDTO('E-0000', token, 'Token generado correctamente');
        }
        return new ResponseDTO('E-1006', null, 'Codigo de validacion incorrecto');
    } catch (error) {
        console.error(`Error al validar el codigo de validacion: ${error}`);
        return new ResponseDTO('E-1006', null, `Error al validar el codigo de validacion: ${error}`);
    }
};
/*Funcion para validar el token*/
const validateToken = (req) => {
    const token = req.headers.authorization;
    if(!token || !token.startsWith('Bearer ')) {
        return null;
    }
    const tokenWithoutBearer = token.substring(7, token.length);
    try {
        const decoded = jwt.verify(tokenWithoutBearer, SECRET_KEY_CODES.SECRET_KEY);
        return decoded;
    } catch (error) {
        console.error(`Error al validar el token: ${error}`);
        return null;
    }
};

//Eliminar los codigos de validacion expirados cada 5 minutos
setInterval(deleteExpiredCodes, 300000);

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    sendCode,
    sendEmail,
    validateCodeAndGenerateToken,
    validateToken,
};
