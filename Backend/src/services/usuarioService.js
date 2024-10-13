const UsuarioDTO = require("../DTO/UsuarioDTO");
const TipoUsuarioDTO = require("../DTO/TipoUsuarioDTO");
const Usuario = require("../ENT/UsuarioENT");
const ResponseDTO = require("../DTO/ResponseDTO");
const TipoUsuario = require("../ENT/TipoUsuarioENT");
const EstudianteDTO = require("../DTO/EstudianteDTO");
const Estudiante = require("../ENT/EstudianteENT");
const AdminuseiDTO = require("../DTO/AdminuseiDTO");
const Adminusei = require("../ENT/AdminuseiENT");
const InstitucionDTO = require("../DTO/InstitucionDTO");
const Institucion = require("../ENT/InstitucionENT");

// TRIGGER
const HistoricoUsuarioService = require("../services/historicoUsuarioService");
const SECRET_KEY_CODES = require('../../config/secretKey.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const nodemailer = require('nodemailer');
const accountTransport = require('../../config/account_transport.json'); 

const getAllUsers = async () => {
  console.log("Obteniendo todos los usuarios...");
  try {
    const usuarios = await Usuario.findAll({
      include: [{ model: TipoUsuario, as: "tipousuario" }],
    });
    const usuariosDTO = usuarios.map((usuario) => {
      const tipoUsuarioDTO = new TipoUsuarioDTO(
        usuario.tipousuario.id,
        usuario.tipousuario.tipo
      );
      return new UsuarioDTO(
        usuario.id,
        usuario.idusuario,
        tipoUsuarioDTO,
        usuario.numero_intentos,
        usuario.estado
      );
    });
    console.log("Usuarios obtenidos correctamente.");
    return new ResponseDTO(
      "U-0000",
      usuariosDTO,
      "Usuarios obtenidos correctamente"
    );
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    return new ResponseDTO(
      "U-1001",
      null,
      `Error al obtener todos los usuarios: ${error}`
    );
  }
};

const getUserById = async (id) => {
  console.log(`Obteniendo el usuario con ID: ${id}...`);
  try {
    const usuario = await Usuario.findByPk(id, {
      include: [{ model: TipoUsuario, as: "tipousuario" }],
    });
    if (!usuario) {
      console.log(`Usuario con ID: ${id} no encontrado.`);
      return new ResponseDTO("U-1002", null, "Usuario no encontrado");
    }
    const tipoUsuarioDTO = new TipoUsuarioDTO(
      usuario.tipousuario.id,
      usuario.tipousuario.tipo
    );
    const usuarioDTO = new UsuarioDTO(
      usuario.id,
      usuario.idusuario,
      tipoUsuarioDTO,
      usuario.numero_intentos,
      usuario.estado
    );
    console.log("Usuario obtenido correctamente.");
    return new ResponseDTO(
      "U-0000",
      usuarioDTO,
      "Usuario obtenido correctamente"
    );
  } catch (error) {
    console.error(`Error al obtener el usuario con ID: ${id}.`, error);
    return new ResponseDTO(
      "U-1002",
      null,
      `Error al obtener el usuario: ${error}`
    );
  }
};

const { Op } = require("sequelize"); // Importar operadores

const createUser = async (userData) => {
  console.log("Creando un nuevo usuario...");

  try {
    // Hashea la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(userData.contrasenia, 10);

    // Función para obtener la secuencia del último usuario creado basado en el tipo
    const obtenerSiguienteSecuencia = async (tipoUsuarioId) => {
      let prefijo = "";
      switch (tipoUsuarioId) {
        case 1: // Estudiante
          prefijo = "EST";
          break;
        case 2: // Institución
          prefijo = "INS";
          break;
        case 3: // USEI
          prefijo = "USEI";
          break;
        default:
          throw new Error("Tipo de usuario no válido");
      }

      let secuencia = 1; // Comenzar desde 1 si no hay usuarios previos

      // Buscar el último usuario del tipo correspondiente que siga el formato correcto
      const ultimoUsuario = await Usuario.findOne({
        where: {
          tipousuario_id: tipoUsuarioId,
          idusuario: {
            [Op.regexp]: `^${prefijo}-\\d{4}$`, // Buscar usuarios que sigan el formato correcto como EST-0001
          },
        },
        order: [["idusuario", "DESC"]], // Ordenar por idusuario para obtener el último de este tipo
      });

      console.log(
        `Último usuario encontrado: ${
          ultimoUsuario ? ultimoUsuario.idusuario : "Ninguno"
        }`
      );

      if (ultimoUsuario && ultimoUsuario.idusuario) {
        // Extraer la secuencia numérica del último ID de usuario
        const partesIdUsuario = ultimoUsuario.idusuario.split("-");
        const numeroSecuencia = parseInt(partesIdUsuario[1], 10);
        console.log(`Número de secuencia extraído: ${numeroSecuencia}`);

        // Incrementar la secuencia si es válida
        if (!isNaN(numeroSecuencia)) {
          secuencia = numeroSecuencia + 1;
        }
      }

      // Retornar el nuevo ID de usuario con el formato adecuado
      const nuevoIdUsuario = `${prefijo}-${String(secuencia).padStart(4, "0")}`;
      console.log(`Nuevo ID de usuario generado: ${nuevoIdUsuario}`);
      return nuevoIdUsuario;
    };

    // Obtener la secuencia para este tipo de usuario
    const idUsuarioGenerado = await obtenerSiguienteSecuencia(
      userData.tipousuario.id
    );

    // Crear el nuevo usuario en la base de datos
    const nuevoUsuario = await Usuario.create({
      idusuario: idUsuarioGenerado, // Asignamos el ID generado
      contrasenia: hashedPassword, // Almacenamos la contraseña hasheada
      tipousuario_id: userData.tipousuario.id,
      numero_intentos: 0, // Valores por defecto
      estado: "ACTIVADO", // Valores por defecto
    });

    const tipoUsuarioDTO = new TipoUsuarioDTO(
      userData.tipousuario.id,
      userData.tipousuario.tipo
    );
    const nuevoUsuarioDTO = new UsuarioDTO(
      nuevoUsuario.id,
      nuevoUsuario.idusuario,
      tipoUsuarioDTO,
      nuevoUsuario.numero_intentos,
      nuevoUsuario.estado
    );

    await HistoricoUsuarioService.insertHistoricoUsuario(
      nuevoUsuario.dataValues,
      "Inserción de usuario"
    );

    console.log("Usuario creado correctamente.");
    return new ResponseDTO(
      "U-0000",
      nuevoUsuarioDTO,
      "Usuario creado correctamente"
    );
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return new ResponseDTO(
      "U-1003",
      null,
      `Error al crear el usuario: ${error}`
    );
  }
};

const updateUser = async (id, userData) => {
  console.log(`Actualizando el usuario con ID: ${id}...`);
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      console.log(`Usuario con ID: ${id} no encontrado.`);
      return new ResponseDTO("U-1004", null, "Usuario no encontrado");
    }

    // Hashea la contraseña antes de actualizarla en la base de datos
    const hashedPassword = await bcrypt.hash(userData.contrasenia, 10);

    await usuario.update({
      idusuario: userData.idusuario,
      contrasenia: hashedPassword, // Actualizamos con la contraseña hasheada
      tipousuario_id: userData.tipousuario.id,
      numero_intentos: userData.numero_intentos,
      estado: userData.estado,
    });
    console.log("Usuario actualizado correctamente.");

    await HistoricoUsuarioService.insertHistoricoUsuario(
      usuario.dataValues,
      "Actualización de usuario"
    );
    console.log(
      "Actualización de usuario registrada en historico_usuario correctamente."
    );

    return new ResponseDTO("U-0000", null, "Usuario actualizado correctamente");
  } catch (error) {
    console.error(`Error al actualizar el usuario con ID: ${id}.`, error);
    return new ResponseDTO(
      "U-1004",
      null,
      `Error al actualizar el usuario: ${error}`
    );
  }
};
//Funcion para cambiar la contraseña de un usuario
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: accountTransport.auth.user,  // Tu correo electrónico
        pass: accountTransport.auth.pass   // Tu App Password
    },
    secure: true, // Usa SSL/TLS
    port: 465,    // Puerto para SMTP seguro
    tls: {
        rejectUnauthorized: false // Opcional, pero útil en ciertos entornos para evitar problemas de certificados
    }
});

// Función para enviar el correo electrónico
const sendEmail = async (email, subject, text) => {
    const mailOptions = {
        from: accountTransport.auth.user,  // El correo desde el que se envía
        to: email,                         // El correo del destinatario
        subject: subject,
        text: text
    };

    try {
        const result = await transport.sendMail(mailOptions);
        console.log('Correo enviado correctamente a', email);
        return result;
    } catch (error) {
        console.error('Error al enviar correo:', error);
        throw error;
    }
    // Hashea la contraseña antes de actualizarla en la base de datos
    console.log(req.body.contrasenia);
    const hashedPassword = await bcrypt.hash(req.body.contrasenia, 10);
    await usuario.update({
      contrasenia: hashedPassword, // Actualizamos con la contraseña hasheada
    });
    console.log("Usuario actualizado correctamente.");

    await HistoricoUsuarioService.insertHistoricoUsuario(
      usuario.dataValues,
      "Actualización de contraseña"
    );
    console.log(
      "Actualización de usuario registrada en historico_usuario correctamente."
    );

    return new ResponseDTO("U-0000", null, "Usuario actualizado correctamente");
  } catch (error) {
			console.error(
				`Error al actualizar el usuario con ID: ${req.body.id}.`,
				error
			);
			return new ResponseDTO(
				"U-1004",
				null,
				`Error al actualizar el usuario: ${error}`
			);
  }
};

// Función para validar el token
const validateToken = (req) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        console.error('Token no proporcionado o formato incorrecto.');
        return null;
    }
    const tokenWithoutBearer = token.substring(7, token.length);
    try {
        console.log('Validando el token...');
        const decoded = jwt.verify(tokenWithoutBearer, SECRET_KEY_CODES.SECRET_KEY);
        return decoded;
    } catch (error) {
        console.error('Error al validar el token:', error);
        return null;
    }
};

// Función para cambiar la contraseña de un usuario
const updatePassword = async (req) => {
    try {
        const decoded = validateToken(req); // Decodifica el token y obtiene el email
        if (!decoded) {
            return new ResponseDTO('U-1004', null, 'Token no válido o expirado');
        }
        
        console.log(`Actualizando la contraseña del usuario con ID: ${decoded.id} y email: ${decoded.email}...`);
        
        const usuario = await Usuario.findByPk(decoded.id);
        if (!usuario) {
            console.log(`Usuario con ID: ${decoded.id} no encontrado.`);
            return new ResponseDTO('U-1004', null, 'Usuario no encontrado');
        }

        // Hashea la nueva contraseña antes de actualizarla en la base de datos
        const hashedPassword = await bcrypt.hash(req.body.contrasenia, 10);
        await usuario.update({
            contrasenia: hashedPassword, // Actualizamos con la contraseña hasheada
        });

        console.log('Usuario actualizado correctamente.');
        await HistoricoUsuarioService.insertHistoricoUsuario(usuario.dataValues, 'Actualización de contraseña');

        // Enviar correo electrónico con la nueva contraseña en texto plano
        const emailSubject = "Tu contraseña ha sido actualizada en Internship by UCB";
        const emailBody = `Hola ${usuario.idusuario},\n\nTu contraseña ha sido actualizada exitosamente. Tus credenciales son:\n\nidusuario: ${usuario.idusuario}\ncontraseña: ${req.body.contrasenia}\n\nPor favor, mantén esta información segura.`;
        
        await sendEmail(decoded.email, emailSubject, emailBody); // Enviar el correo con la nueva contraseña
        console.log(`Correo enviado a ${decoded.email} con las nuevas credenciales.`);

        return new ResponseDTO('U-0000', null, 'Contraseña actualizada correctamente y correo enviado');
    } catch (error) {
        console.error(`Error al actualizar la contraseña del usuario con ID: ${req.body.id}.`, error);
        return new ResponseDTO('U-1004', null, `Error al actualizar la contraseña: ${error}`);
    }
};


const deleteUser = async (id) => {
  console.log(`Eliminando el usuario con ID: ${id}...`);
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      console.log(`Usuario con ID: ${id} no encontrado.`);
      return new ResponseDTO("U-1005", null, "Usuario no encontrado");
    }
    await usuario.destroy();
    console.log("Usuario eliminado correctamente.");
    return new ResponseDTO("U-0000", null, "Usuario eliminado correctamente");
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID: ${id}.`, error);
    return new ResponseDTO(
      "U-1005",
      null,
      `Error al eliminar el usuario: ${error}`
    );
  }
};
/*Obtener los datos de un usuario por el idusuario*/
const getUserByIdUsuario = async (idusuario) => {
  console.log(`Obteniendo el usuario con idusuario: ${idusuario}...`);
  try {
    const usuario = await Usuario.findOne({
      where: {
        id: idusuario,
      },
      include: [{ model: TipoUsuario, as: "tipousuario" }],
    });
    if (!usuario) {
      console.log(`Usuario con idusuario: ${idusuario} no encontrado.`);
      return new ResponseDTO("U-1002", null, "Usuario no encontrado");
    }
    if (usuario.tipousuario.id === 1) {
      return await getEstudianteByIdUsuario(idusuario);
    } else if (usuario.tipousuario.id === 2) {
      return await getInstitucionByIdUsuario(idusuario);
    } else if (usuario.tipousuario.id === 3) {
      return await getAdmiUseiByIdUsuario(idusuario);
    }

    return new ResponseDTO(
      "U-0000",
      usuarioDTO,
      "Usuario obtenido correctamente"
    );
  } catch (error) {
    console.error(
      `Error al obtener el usuario con idusuario: ${idusuario}.`,
      error
    );
    return new ResponseDTO(
      "U-1002",
      null,
      `Error al obtener el usuario: ${error}`
    );
  }
};
const getEstudianteByIdUsuario = async (idusuario) => {
  console.log(`Obteniendo el estudiante con idusuario: ${idusuario}...`);
  try {
    const estudiante = await Estudiante.findOne({
      where: {
        usuario_id: idusuario,
      },
    });
    if (!estudiante) {
      console.log(`Estudiante con idusuario: ${idusuario} no encontrado.`);
      return new ResponseDTO("U-1002", null, "Estudiante no encontrado");
    }
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
      estudiante.carrera_id,
      estudiante.semestre_id,
      estudiante.sede_id,
      estudiante.aniograduacion,
      estudiante.linkcurriculumvitae
    );
    console.log("Estudiante obtenido correctamente.");
    return new ResponseDTO(
      "U-0000",
      estudianteDTO,
      "Estudiante obtenido correctamente"
    );
  } catch (error) {
    console.error(
      `Error al obtener el estudiante con idusuario: ${idusuario}.`,
      error
    );
    return new ResponseDTO(
      "U-1002",
      null,
      `Error al obtener el estudiante: ${error}`
    );
  }
};
const getInstitucionByIdUsuario = async (idusuario) => {
  console.log(`Obteniendo la institucion con idusuario: ${idusuario}...`);
  try {
    const institucion = await Institucion.findOne({
      where: {
        usuario_id: idusuario,
      },
      include: [{ model: Institucion, as: "institucion" }],
    });
    if (!institucion) {
      console.log(`Institucion con idusuario: ${idusuario} no encontrado.`);
      return new ResponseDTO("U-1002", null, "Institucion no encontrado");
    }
    const institucionDTO = new InstitucionDTO(
      institucion.id,
      institucion.usuario_id,
      institucion.nombre,
      institucion.direccion,
      institucion.telefono,
      institucion.correoelectronico,
      institucion.sitioweb,
      institucion.logo
    );
    console.log("Institucion obtenido correctamente.");
    return new ResponseDTO(
      "U-0000",
      institucionDTO,
      "Institucion obtenido correctamente"
    );
  } catch (error) {
    console.error(
      `Error al obtener la institucion con idusuario: ${idusuario}.`,
      error
    );
    return new ResponseDTO(
      "U-1002",
      null,
      `Error al obtener la institucion: ${error}`
    );
  }
};
const getAdmiUseiByIdUsuario = async (idusuario) => {
  console.log(
    `Obteniendo el administrador de la usei con idusuario: ${idusuario}...`
  );
  try {
    const adminusei = await Adminusei.findOne({
      where: {
        usuario_id: idusuario,
      },
      include: [{ model: Adminusei, as: "adminusei" }],
    });
    if (!adminusei) {
      return new ResponseDTO(
        "U-1002",
        null,
        "Administrador de la usei no encontrado"
      );
    }
    const adminuseiDTO = new AdminuseiDTO(adminusei.id, adminusei.usuario_id);
    return new ResponseDTO(
      "U-0000",
      adminuseiDTO,
      "Administrador de la usei obtenido correctamente"
    );
  } catch (error) {
    console.error(
      `Error al obtener el administrador de la usei con idusuario: ${idusuario}.`,
      error
    );
    return new ResponseDTO(
      "U-1002",
      null,
      `Error al obtener el administrador de la usei: ${error}`
    );
  }
};

const changeEstadoActivado = async (id) => {
  console.log(`Actualizando Estado del usuario con ID: ${id}...`);
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      console.log(`Usuario con ID: ${id} no encontrado.`);
      return new ResponseDTO("U-1004", null, "Usuario no encontrado");
    }

    await usuario.update({
        estado: "ACTIVADO",
    });

    console.log("Estado de Usuario actualizado correctamente.");

    await HistoricoUsuarioService.insertHistoricoUsuario(
      usuario.dataValues,
      "Actualización de usuario"
    );
    console.log(
      "Actualización de usuario registrada en historico_usuario correctamente."
    );

    return new ResponseDTO("U-0000", null, "Usuario actualizado correctamente");
  } catch (error) {
    console.error(`Error al actualizar el usuario con ID: ${id}.`, error);
    return new ResponseDTO(
      "U-1004",
      null,
      `Error al actualizar el usuario: ${error}`
    );
  }
};

const changeEstadoBloqueado = async (id) => {
    console.log(`Actualizando Estado del usuario con ID: ${id}...`);
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        console.log(`Usuario con ID: ${id} no encontrado.`);
        return new ResponseDTO("U-1004", null, "Usuario no encontrado");
      }
  
      await usuario.update({
          estado: "BLOQUEADO",
      });
  
      console.log("Estado de Usuario actualizado correctamente.");
  
      await HistoricoUsuarioService.insertHistoricoUsuario(
        usuario.dataValues,
        "Actualización de usuario"
      );
      console.log(
        "Actualización de usuario registrada en historico_usuario correctamente."
      );
  
      return new ResponseDTO("U-0000", null, "Usuario actualizado correctamente");
    } catch (error) {
      console.error(`Error al actualizar el usuario con ID: ${id}.`, error);
      return new ResponseDTO(
        "U-1004",
        null,
        `Error al actualizar el usuario: ${error}`
      );
    }
  };

  const changeEstadoEliminado = async (id) => {
    console.log(`Actualizando Estado del usuario con ID: ${id}...`);
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        console.log(`Usuario con ID: ${id} no encontrado.`);
        return new ResponseDTO("U-1004", null, "Usuario no encontrado");
      }
  
      await usuario.update({
          estado: "ELIMINADO",
      });
  
      console.log("Estado de Usuario actualizado correctamente.");
  
      await HistoricoUsuarioService.insertHistoricoUsuario(
        usuario.dataValues,
        "Actualización de usuario"
      );
      console.log(
        "Actualización de usuario registrada en historico_usuario correctamente."
      );
  
      return new ResponseDTO("U-0000", null, "Usuario actualizado correctamente");
    } catch (error) {
      console.error(`Error al actualizar el usuario con ID: ${id}.`, error);
      return new ResponseDTO(
        "U-1004",
        null,
        `Error al actualizar el usuario: ${error}`
      );
    }
  };

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updatePassword,
  getUserByIdUsuario,
  changeEstadoActivado,
  changeEstadoBloqueado,
  changeEstadoEliminado
};
