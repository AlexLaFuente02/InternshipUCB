const InstitucionDTO = require("../DTO/InstitucionDTO");
const SectorPertenenciaDTO = require("../DTO/sectorPertenenciaDTO");
const Institucion = require("../ENT/InstitucionENT");
const ResponseDTO = require("../DTO/ResponseDTO");
const SectorPertenencia = require("../ENT/sectorPertenenciaENT");
const Usuario = require("../ENT/UsuarioENT");
const UsuarioDTO = require("../DTO/UsuarioDTO");
const sequelize = require("../../database/db");

const UsuarioService = require('./usuarioService'); 
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const accountTransport = require('../../config/account_transport.json'); // Asegúrate de que la ruta sea correcta



const { baseURL } = require("../../config/constants");

const getImageUrl = (imageName) => {
  return imageName ? `${baseURL}/images/${imageName}` : null;
};

const getAllInstitutions = async () => {
  console.log("Obteniendo todas las instituciones...");
  try {
    const instituciones = await Institucion.findAll({
      include: [
        { model: SectorPertenencia, as: "sectorpertenencia" },
        { model: Usuario, as: "usuario" },
      ],
    });
    const institucionesDTO = instituciones.map((institucion) => {
      let sectorPertenenciaDTO = null;
      if (institucion.sectorpertenencia) {
        sectorPertenenciaDTO = new SectorPertenenciaDTO(
          institucion.sectorpertenencia.id,
          institucion.sectorpertenencia.nombresectorpertenencia
        );
      }

      let usuarioDTO = null;
      if (institucion.usuario) {
        usuarioDTO = new UsuarioDTO(
          institucion.usuario.id,
          institucion.usuario.idusuario
        );
      }
      const imageUrl = institucion.logoinstitucion
        ? `${baseURL}/images/${institucion.logoinstitucion}`
        : null;
      return new InstitucionDTO(
        institucion.id,
        institucion.nombreinstitucion,
        institucion.reseniainstitucion,
        imageUrl,
        institucion.nombrecontacto,
        institucion.correocontacto,
        institucion.celularcontacto,
        institucion.estado, 
        usuarioDTO,
        sectorPertenenciaDTO
      );
    });
    console.log("Instituciones obtenidas correctamente.");
    return new ResponseDTO(
      "I-0000",
      institucionesDTO,
      "Instituciones obtenidas correctamente"
    );
  } catch (error) {
    console.error("Error al obtener todas las instituciones:", error);
    return new ResponseDTO(
      "I-1001",
      null,
      `Error al obtener todas las instituciones: ${error}`
    );
  }
};

const getInstitutionById = async (id) => {
  console.log(`Obteniendo la institución con ID: ${id}...`);
  try {
    const institucion = await Institucion.findByPk(id, {
      include: [
        { model: SectorPertenencia, as: "sectorpertenencia" },
        { model: Usuario, as: "usuario" },
      ],
    });

    if (!institucion) {
      console.log(`Institución con ID: ${id} no encontrada.`);
      return new ResponseDTO("I-1002", null, "Institución no encontrada");
    }

    let sectorPertenenciaDTO = null;
    if (institucion.sectorpertenencia) {
      sectorPertenenciaDTO = new SectorPertenenciaDTO(
        institucion.sectorpertenencia.id,
        institucion.sectorpertenencia.nombresectorpertenencia
      );
    }

    let usuarioDTO = null;
    if (institucion.usuario) {
      usuarioDTO = new UsuarioDTO(
        institucion.usuario.id,
        institucion.usuario.idusuario
      );
    }

    const imageUrl = institucion.logoinstitucion
      ? `${baseURL}/images/${institucion.logoinstitucion}`
      : null;

    const institucionDTO = new InstitucionDTO(
      institucion.id,
      institucion.nombreinstitucion,
      institucion.reseniainstitucion,
      imageUrl,
      institucion.nombrecontacto,
      institucion.correocontacto,
      institucion.celularcontacto,
      institucion.estado,
      usuarioDTO,
      sectorPertenenciaDTO
    );

    console.log("Institución obtenida correctamente.");
    return new ResponseDTO(
      "I-0000",
      institucionDTO,
      "Institución obtenida correctamente"
    );
  } catch (error) {
    console.error(`Error al obtener la institución con ID: ${id}.`, error);
    return new ResponseDTO(
      "I-1002",
      null,
      `Error al obtener la institución: ${error}`
    );
  }
};


const createInstitution = async (institutionData) => {
  console.log("Creando una nueva institución...");

  try {
    // Verificar si ya existe una institución con el mismo correo
    const existingInstitution = await Institucion.findOne({
      where: { correocontacto: institutionData.correocontacto }
    });

    if (existingInstitution) {
      console.log("Ya existe una institución con el correo proporcionado.");
      return new ResponseDTO(
        "I-1003",
        null,
        "Ya existe una institución con el correo proporcionado."
      );
    }

    // Crear la institución si no existe un correo duplicado
    const fileName = institutionData.logoinstitucion
      ? institutionData.logoinstitucion
      : null;
    const nuevaInstitucion = await Institucion.create({
      nombreinstitucion: institutionData.nombreinstitucion,
      sectorpertenencia_id: institutionData.sectorpertenencia_id,
      usuario_id: institutionData.usuario_id,
      reseniainstitucion: institutionData.reseniainstitucion,
      logoinstitucion: fileName,
      nombrecontacto: institutionData.nombrecontacto,
      correocontacto: institutionData.correocontacto,
      celularcontacto: institutionData.celularcontacto,
      estado: institutionData.estado,
    });

    const imageUrl = fileName ? `${baseURL}/images/${fileName}` : null;
    const sectorPertenenciaDTO = new SectorPertenenciaDTO(institutionData.sectorpertenencia_id);
    const usuarioDTO = new UsuarioDTO(institutionData.usuario_id);

    const nuevaInstitucionDTO = new InstitucionDTO(
      nuevaInstitucion.id,
      nuevaInstitucion.nombreinstitucion,
      nuevaInstitucion.reseniainstitucion,
      imageUrl,
      nuevaInstitucion.nombrecontacto,
      nuevaInstitucion.correocontacto,
      nuevaInstitucion.celularcontacto,
      nuevaInstitucion.estado,
      usuarioDTO,
      sectorPertenenciaDTO
    );

    console.log("Institución creada correctamente.");
    return new ResponseDTO(
      "I-0000",
      nuevaInstitucionDTO,
      "Institución creada correctamente"
    );
  } catch (error) {
    console.error("Error al crear la institución:", error);
    return new ResponseDTO(
      "I-1003",
      null,
      `Error al crear la institución: ${error}`
    );
  }
};


const updateInstitution = async (id, institutionData) => {
  console.log(`Actualizando la institución con ID: ${id}...`);
  try {
    const institucion = await Institucion.findByPk(id);
    if (!institucion) {
      console.log(`Institución con ID: ${id} no encontrada.`);
      return new ResponseDTO("I-1004", null, "Institución no encontrada");
    }
    await institucion.update({
      nombreinstitucion: institutionData.nombreinstitucion,
      sectorpertenencia_id: institutionData.sectorpertenencia_id,
      usuario_id: institutionData.usuario_id,
      reseniainstitucion: institutionData.reseniainstitucion,
      logoinstitucion: institutionData.logoinstitucion,
      nombrecontacto: institutionData.nombrecontacto,
      correocontacto: institutionData.correocontacto,
      celularcontacto: institutionData.celularcontacto,
      estado: institutionData.estado,
    });
    const sectorPertenenciaDTO = new SectorPertenenciaDTO(
      institutionData.sectorpertenencia_id,
    );
    const usuarioDTO = new UsuarioDTO(
      institutionData.usuario_id,
    ); // Usamos institutionData para el usuarioDTO
    const imageUrl = getImageUrl(institucion.logoinstitucion);
    const actulizadoInstitucionDTO = new InstitucionDTO(
      institucion.id,
      institucion.nombreinstitucion,
      institucion.reseniainstitucion,
      imageUrl,
      institucion.nombrecontacto,
      institucion.correocontacto,
      institucion.celularcontacto,
      institucion.estado,
      usuarioDTO,
      sectorPertenenciaDTO
    );
    console.log("Institución actualizada correctamente.");
    return new ResponseDTO(
      "I-0000",
      actulizadoInstitucionDTO,
      "Institución actualizada correctamente"
    );
  } catch (error) {
    console.error(`Error al actualizar la institución con ID: ${id}.`, error);
    return new ResponseDTO(
      "I-1004",
      null,
      `Error al actualizar la institución: ${error}`
    );
  }
};

const deleteInstitution = async (id) => {
  console.log(`Eliminando la institución con ID: ${id}...`);
  try {
    const institucion = await Institucion.findByPk(id);
    if (!institucion) {
      console.log(`Institución con ID: ${id} no encontrada.`);
      return new ResponseDTO("I-1005", null, "Institución no encontrada");
    }
    await institucion.destroy();
    console.log("Institución eliminada correctamente.");
    return new ResponseDTO(
      "I-0000",
      null,
      "Institución eliminada correctamente"
    );
  } catch (error) {
    console.error(`Error al eliminar la institución con ID: ${id}.`, error);
    return new ResponseDTO(
      "I-1005",
      null,
      `Error al eliminar la institución: ${error}`
    );
  }
};

const getInstitutionPostulations = async () => {
  console.log("Obteniendo total de postulaciones por institución...");
  try {
    const result = await sequelize.query(
      `SELECT 
      institucion.id,
      institucion.nombreinstitucion,
      institucion.reseniainstitucion,
      institucion.logoinstitucion,
      institucion.nombrecontacto,
      institucion.correocontacto,
      institucion.celularcontacto,
      institucion.estado,
      usuario.id as usuario_id,
      usuario.idusuario,
      sectorpertenencia.id as sectorpertenencia_id,
      sectorpertenencia.nombresectorpertenencia,
      COUNT(postulacion.id) AS totalpostulaciones
    FROM 
      institucion
    JOIN 
      usuario ON institucion.usuario_id = usuario.id
    JOIN 
      sectorpertenencia ON institucion.sectorpertenencia_id = sectorpertenencia.id
    JOIN 
      convocatoria ON institucion.id = convocatoria.institucion_id
    JOIN 
      postulacion ON convocatoria.id = postulacion.convocatoria_id
    GROUP BY 
      institucion.id, usuario.id, sectorpertenencia.id
    ORDER BY 
      totalpostulaciones DESC;    
          `,
      { type: sequelize.QueryTypes.SELECT }
    );

    
    const institucionesDTO = result.map((institucion) => {
      const sectorPertenenciaDTO = new SectorPertenenciaDTO(
          institucion.sectorpertenencia_id,
          institucion.nombresectorpertenencia
      );
      const usuarioDTO = new UsuarioDTO(
          institucion.usuario_id,
          institucion.idusuario
      );
      const imageUrl = getImageUrl(institucion.logoinstitucion);
      return new InstitucionDTO(
          institucion.id,
          institucion.nombreinstitucion,
          institucion.reseniainstitucion,
          imageUrl,
          institucion.nombrecontacto,
          institucion.correocontacto,
          institucion.celularcontacto,
          institucion.estado,
          usuarioDTO,
          sectorPertenenciaDTO,
          institucion.totalpostulaciones
      );
  });

    console.log(
      "Total de postulaciones por institución obtenido correctamente."
    );
    return new ResponseDTO(
      "IP-0000",
      institucionesDTO,
      "Total de postulaciones por institución obtenido correctamente"
    );
  } catch (error) {
    console.error(
      "Error al obtener el total de postulaciones por institución:",
      error
    );
    return new ResponseDTO(
      "IP-1001",
      null,
      `Error al obtener el total de postulaciones por institución: ${error}`
    );
  }
};

const getPostulationsCountByInstitutionId = async (institutionId) => {
  console.log(`Obteniendo sumatoria de postulaciones para la institución con ID: ${institutionId}...`);
  try {
    const result = await sequelize.query(
      `SELECT 
      institucion.id,
      institucion.nombreinstitucion,
      institucion.reseniainstitucion,
      institucion.logoinstitucion,
      institucion.nombrecontacto,
      institucion.correocontacto,
      institucion.celularcontacto,
      institucion.estado,
      usuario.id as usuario_id,
      usuario.idusuario,
      sectorpertenencia.id as sectorpertenencia_id,
      sectorpertenencia.nombresectorpertenencia,
      COUNT(postulacion.id) AS totalpostulaciones
    FROM 
      institucion
    JOIN 
      usuario ON institucion.usuario_id = usuario.id
    JOIN 
      sectorpertenencia ON institucion.sectorpertenencia_id = sectorpertenencia.id
    JOIN 
      convocatoria ON institucion.id = convocatoria.institucion_id
    JOIN 
      postulacion ON convocatoria.id = postulacion.convocatoria_id
		WHERE
			institucion.id=1
    GROUP BY 
      institucion.id, usuario.id, sectorpertenencia.id
    ORDER BY 
      totalpostulaciones DESC;      
          `,
      { 
        replacements: { institutionId: institutionId },
        type: sequelize.QueryTypes.SELECT 
      }
    );

    
    const institucionesDTO = result.map((institucion) => {
      const sectorPertenenciaDTO = new SectorPertenenciaDTO(
          institucion.sectorpertenencia_id,
          institucion.nombresectorpertenencia
      );
      const usuarioDTO = new UsuarioDTO(
          institucion.usuario_id,
          institucion.idusuario
      );
      const imageUrl = getImageUrl(institucion.logoinstitucion);
      return new InstitucionDTO(
          institucion.id,
          institucion.nombreinstitucion,
          institucion.reseniainstitucion,
          imageUrl,
          institucion.nombrecontacto,
          institucion.correocontacto,
          institucion.celularcontacto,
          institucion.estado,
          usuarioDTO,
          sectorPertenenciaDTO,
          institucion.totalpostulaciones
      );
  });

    console.log(
      "Total de postulaciones por institución obtenido correctamente."
    );
    return new ResponseDTO(
      "IP-0000",
      institucionesDTO,
      "Total de postulaciones por institución obtenido correctamente"
    );
  } catch (error) {
    console.error(
      "Error al obtener el total de postulaciones por institución:",
      error
    );
    return new ResponseDTO(
      "IP-1001",
      null,
      `Error al obtener el total de postulaciones por institución: ${error}`
    );
  }
};

const getPostulationsByInstitutionId = async (institutionId) => {
  console.log(`Obteniendo postulaciones para la institución con ID: ${institutionId}...`);
  try {
    const result = await sequelize.query(
      `SELECT 
        postulacion.id,
        postulacion.fechapostulacion,
        postulacion.estadopostulacion_id,
        postulacion.estudiante_id,
        postulacion.convocatoria_id
      FROM 
        postulacion
      JOIN 
        convocatoria ON postulacion.convocatoria_id = convocatoria.id
      JOIN 
        institucion ON convocatoria.institucion_id = institucion.id
      WHERE 
        institucion.id = :institutionId;
      `,
      { 
        replacements: { institutionId: institutionId },
        type: sequelize.QueryTypes.SELECT 
      }
    );

    console.log(
      `Postulaciones obtenidas correctamente para la institución con ID: ${institutionId}.`
    );
    return new ResponseDTO(
      "IP-0000",
      result,
      `Postulaciones obtenidas correctamente para la institución con ID: ${institutionId}`
    );
  } catch (error) {
    console.error(
      `Error al obtener postulaciones para la institución con ID: ${institutionId}:`,
      error
    );
    return new ResponseDTO(
      "IP-1001",
      null,
      `Error al obtener postulaciones para la institución con ID: ${institutionId}: ${error}`
    );
  }
};



const getInstitutionsBySector = async (sectorId) => {
  console.log(`Obteniendo instituciones del sector con ID: ${sectorId}...`);
  try {
      const instituciones = await Institucion.findAll({
          where: { sectorpertenencia_id: sectorId },
          include: [
              { model: SectorPertenencia, as: "sectorpertenencia" },
              { model: Usuario, as: "usuario" },
          ],
      });

      if (!instituciones || instituciones.length === 0) {
          console.log(`No se encontraron instituciones para el sector con ID: ${sectorId}.`);
          return new ResponseDTO("I-1003", null, "No se encontraron instituciones para el sector especificado");
      }

      const institucionesDTO = instituciones.map((institucion) => {
          const sectorPertenenciaDTO = new SectorPertenenciaDTO(
              institucion.sectorpertenencia.id,
              institucion.sectorpertenencia.nombresectorpertenencia
          );
          const usuarioDTO = new UsuarioDTO(
              institucion.usuario.id,
              institucion.usuario.idusuario
          );
          const imageUrl = getImageUrl(institucion.logoinstitucion);
          return new InstitucionDTO(
              institucion.id,
              institucion.nombreinstitucion,
              institucion.reseniainstitucion,
              imageUrl,
              institucion.nombrecontacto,
              institucion.correocontacto,
              institucion.celularcontacto,
              institucion.estado,
              usuarioDTO,
              sectorPertenenciaDTO
          );
      });

      console.log("Instituciones del sector obtenidas correctamente.");
      return new ResponseDTO(
          "I-0000",
          institucionesDTO,
          "Instituciones del sector obtenidas correctamente"
      );
  } catch (error) {
      console.error(`Error al obtener las instituciones del sector con ID: ${sectorId}:`, error);
      return new ResponseDTO(
          "I-1003",
          null,
          `Error al obtener las instituciones del sector: ${error}`
      );
  }
};


// USEI:
const getInstitutionApproved = async () => {
  console.log("Obteniendo institucion con estado ACTIVO...");
  try {
    const result = await sequelize.query(`
      SELECT
        institucion.id, 
        institucion.nombreinstitucion, 
        institucion.reseniainstitucion, 
        institucion.logoinstitucion, 
        institucion.nombrecontacto, 
        institucion.correocontacto, 
        institucion.celularcontacto, 
        institucion.estado, 
        institucion.usuario_id, 
        sectorpertenencia.id AS sectorpertenencia_id,
        sectorpertenencia.nombresectorpertenencia
      FROM
        institucion
      LEFT JOIN sectorpertenencia ON institucion.sectorpertenencia_id = sectorpertenencia.id
      WHERE
        institucion.estado = "ACTIVO"
    `, { type: sequelize.QueryTypes.SELECT });

    const resultWithImageUrl = result.map((item) => ({
      id: item.id,
      nombreinstitucion: item.nombreinstitucion,
      reseniainstitucion: item.reseniainstitucion,
      logoinstitucion: getImageUrl(item.logoinstitucion),
      nombrecontacto: item.nombrecontacto,
      correocontacto: item.correocontacto,
      celularcontacto: item.celularcontacto,
      estado: item.estado,
      usuario_id: item.usuario_id,
      sectorpertenencia: item.nombresectorpertenencia ? {
        id: item.sectorpertenencia_id,
        nombresectorpertenencia: item.nombresectorpertenencia
      } : null,
    }));

    console.log("Instituciones con estado ACTIVO obtenidas correctamente");
    return new ResponseDTO(
      "IP-0000",
      resultWithImageUrl,
      "Instituciones con estado ACTIVO obtenidas correctamente"
    );
  } catch (error) {
    console.error("Error al obtener Instituciones con estado ACTIVO: ", error);
    return new ResponseDTO(
      "IP-1001",
      null,
      `Error al obtener Instituciones con estado ACTIVO: ${error}`
    );
  }
};


const getInstitutionPending = async () => {
  console.log("Obteniendo institucion con estado PENDIENTE...");
  try {
    const result = await sequelize.query(
      `SELECT
        institucion.id, 
        institucion.nombreinstitucion, 
        institucion.reseniainstitucion, 
        institucion.logoinstitucion, 
        institucion.nombrecontacto, 
        institucion.correocontacto, 
        institucion.celularcontacto, 
        institucion.estado, 
        institucion.usuario_id, 
        sectorpertenencia.id AS sectorpertenencia_id,
        sectorpertenencia.nombresectorpertenencia
      FROM
        institucion
      LEFT JOIN sectorpertenencia ON institucion.sectorpertenencia_id = sectorpertenencia.id
      WHERE
        institucion.estado = "PENDIENTE"      
          `,
      { type: sequelize.QueryTypes.SELECT }
    );

    const resultWithImageUrl = result.map((item) => ({
      id: item.id,
      nombreinstitucion: item.nombreinstitucion,
      reseniainstitucion: item.reseniainstitucion,
      logoinstitucion: getImageUrl(item.logoinstitucion),
      nombrecontacto: item.nombrecontacto,
      correocontacto: item.correocontacto,
      celularcontacto: item.celularcontacto,
      estado: item.estado,
      usuario_id: item.usuario_id,
      sectorpertenencia: item.nombresectorpertenencia ? {
        id: item.sectorpertenencia_id,
        nombresectorpertenencia: item.nombresectorpertenencia
      } : null,
    }));

    console.log(
      "Instituciones con estado PENDIENTE obtenidas correctamente"
    );
    return new ResponseDTO(
      "IP-0000",
      resultWithImageUrl,
      "Instituciones con estado PENDIENTE obtenidas correctamente"
    );
  } catch (error) {
    console.error(
      "Error al obtener Instituciones con estado PENDIENTE: ",
      error
    );
    return new ResponseDTO(
      "IP-1001",
      null,
      `Error al obtener Instituciones con estado PENDIENTE: ${error}`
    );
  }
};


const getInstitutionRejected = async () => {
  console.log("Obteniendo institucion con estado RECHAZADO...");
  try {
    const result = await sequelize.query(
      `SELECT
        institucion.id, 
        institucion.nombreinstitucion, 
        institucion.reseniainstitucion, 
        institucion.logoinstitucion, 
        institucion.nombrecontacto, 
        institucion.correocontacto, 
        institucion.celularcontacto, 
        institucion.estado, 
        institucion.usuario_id, 
        institucion.sectorpertenencia_id
      FROM
        institucion
      WHERE
        institucion.estado = "RECHAZADO"      
          `,
      { type: sequelize.QueryTypes.SELECT }
    );

    const resultWithImageUrl = result.map((item) => ({
      id: item.id,
      nombreinstitucion: item.nombreinstitucion,
      reseniainstitucion: item.reseniainstitucion,
      logoinstitucion: getImageUrl(item.logoinstitucion),
      nombrecontacto: item.nombrecontacto,
      correocontacto: item.correocontacto,
      celularcontacto: item.celularcontacto,
      estado: item.estado,
      usuario_id: item.usuario_id,
      sectorpertenencia_id: item.sectorpertenencia_id,
    }));

    console.log(
      "Instituciones con estado RECHAZADO obtenidas correctamente"
    );
    return new ResponseDTO(
      "IP-0000",
      resultWithImageUrl,
      "Instituciones con estado RECHAZADO obtenidas correctamente"
    );
  } catch (error) {
    console.error(
      "Error al obtener Instituciones con estado RECHAZADO: ",
      error
    );
    return new ResponseDTO(
      "IP-1001",
      null,
      `Error al obtener Instituciones con estado RECHAZADO: ${error}`
    );
  }
};

//ACTIVAR CUENTA - USEI
// Función para enviar correo
const sendEmail = async (email, subject, text) => {
  const oauth2Client = new OAuth2(
      accountTransport.auth.clientId,
      accountTransport.auth.clientSecret,
      "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
      refresh_token: accountTransport.auth.refreshToken
  });

  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          type: 'OAuth2',
          user: accountTransport.auth.user,
          clientId: accountTransport.auth.clientId,
          clientSecret: accountTransport.auth.clientSecret,
          refreshToken: accountTransport.auth.refreshToken,
          accessToken: accessToken.token
      }
  });

  const mailOptions = {
      from: accountTransport.auth.user,
      to: email,
      subject: subject,
      text: text
  };

  try {
      await transporter.sendMail(mailOptions);
      console.log('Correo enviado correctamente a', email);
  } catch (error) {
      console.error('Error al enviar correo:', error);
  }
};

const activateInstitution = async (id) => {
  console.log(`Activando la institución con ID: ${id}...`);
  try {
    const institucion = await Institucion.findByPk(id, {
      include: [
        { model: SectorPertenencia, as: "sectorpertenencia" },
      ],
    });
    if (!institucion) {
      console.log(`Institución con ID: ${id} no encontrada.`);
      return new ResponseDTO("I-1004", null, "Institución no encontrada");
    }

    // Actualizar el estado de la institución a 'ACTIVO'
    await institucion.update({ estado: 'ACTIVO' });

    // Preparar los datos del usuario y crear el usuario
    const userData = {
      idusuario: institucion.correocontacto,
      contrasenia: institucion.celularcontacto,
      tipousuario: { id: 2 }
    };
    const resultadoUsuario = await UsuarioService.createUser(userData);
    if (resultadoUsuario.code !== 'U-0000') {
      throw new Error('Error al crear el usuario para la institución.');
    }

    // Actualizar la institución con el ID del usuario creado
    await institucion.update({ usuario_id: resultadoUsuario.result.id });

    // Recargar la institución para obtener los datos actualizados
    await institucion.reload();

    // Convertir el logoinstitucion en URL
    const imageUrl = getImageUrl(institucion.logoinstitucion);

    // Crear DTO para sector pertenencia
    let sectorPertenenciaDTO = null;
    if (institucion.sectorpertenencia) {
      sectorPertenenciaDTO = new SectorPertenenciaDTO(
        institucion.sectorpertenencia.id,
        institucion.sectorpertenencia.nombresectorpertenencia
      );
    }

    // Crear DTO para la institución, incluyendo el usuario actualizado
    const actulizadoInstitucionDTO = new InstitucionDTO(
      institucion.id,
      institucion.nombreinstitucion,
      institucion.reseniainstitucion,
      imageUrl,
      institucion.nombrecontacto,
      institucion.correocontacto,
      institucion.celularcontacto,
      institucion.estado,
      resultadoUsuario.result, // Usuario actualizado
      sectorPertenenciaDTO
    );


    // MENSAJE DE CORREO ELECTRONICO
    const emailSubject = "Activación de Cuenta en Internship by UCB";
    const emailBody = `Su solicitud de adición a la página de Internship by UCB fue aceptada por la USEI. Sus credenciales para iniciar sesión son:
    idusuario: ${institucion.correocontacto}
    contraseña: ${institucion.celularcontacto}`;

    // Enviar correo electrónico
    await sendEmail(institucion.correocontacto, emailSubject, emailBody);

    console.log("Institución activada y usuario creado correctamente. Correo enviado a", institucion.correocontacto);
    return new ResponseDTO(
      "I-0000",
      actulizadoInstitucionDTO,
      "Institución activada y usuario creado correctamente"
    );
  } catch (error) {
    console.error(`Error al activar la institución con ID: ${id}.`, error);
    return new ResponseDTO(
      "I-1004",
      null,
      `Error al activar la institución: ${error}`
    );
  }
};

const getInstitutionIdByUserId = async (userId) => {
  console.log(`Obteniendo InstitutionID para UserID: ${userId}...`);
  try {
      // Suponiendo que tienes un modelo de Sequelize que relaciona los usuarios con las instituciones.
      const institucion = await Institucion.findOne({
          where: { usuario_id: userId },
          attributes: ['id'], // Solo necesitamos el ID de la institución
      });

      if (!institucion) {
          console.log(`No se encontró una institución para el UserID: ${userId}.`);
          return new ResponseDTO("I-1006", null, "Institución no encontrada para el usuario especificado");
      }

      console.log(`InstitutionID encontrado para UserID ${userId}: ${institucion.id}`);
      return new ResponseDTO(
          "I-0000",
          { institutionId: institucion.id },
          "InstitutionID obtenido correctamente"
      );
  } catch (error) {
      console.error(`Error al obtener InstitutionID para UserID: ${userId}:`, error);
      return new ResponseDTO(
          "I-1006",
          null,
          `Error al obtener InstitutionID para UserID: ${error}`
      );
  }
};

const rejectInstitution = async (id) => {
  console.log(`Rechazando la institución con ID: ${id}...`);
  try {
    const institucion = await Institucion.findByPk(id, {
      include: [
        { model: SectorPertenencia, as: "sectorpertenencia" },
        { model: Usuario, as: "usuario"},
      ],
    });
    if (!institucion) {
      console.log(`Institución con ID: ${id} no encontrada.`);
      return new ResponseDTO("I-1004", null, "Institución no encontrada");
    }

    // Actualizar el estado de la institución a 'RECHAZADO'
    await institucion.update({ estado: 'RECHAZADO' });

    // Convertir el logoinstitucion en URL
    const imageUrl = getImageUrl(institucion.logoinstitucion);

    // Crear DTO para sector pertenencia
    let sectorPertenenciaDTO = null;
    if (institucion.sectorpertenencia) {
      sectorPertenenciaDTO = new SectorPertenenciaDTO(
        institucion.sectorpertenencia.id,
        institucion.sectorpertenencia.nombresectorpertenencia
      );
    }

    // Crear DTO para el usuario
    let usuarioDTO = null;
    if (institucion.usuario) {
      usuarioDTO = new UsuarioDTO(
        institucion.usuario.id,
        institucion.usuario.idusuario
      );
    }

    // Crear DTO para la institución, incluyendo el usuario actualizado
    const actulizadoInstitucionDTO = new InstitucionDTO(
      institucion.id,
      institucion.nombreinstitucion,
      institucion.reseniainstitucion,
      imageUrl,
      institucion.nombrecontacto,
      institucion.correocontacto,
      institucion.celularcontacto,
      institucion.estado,
      usuarioDTO,
      sectorPertenenciaDTO
    );


    // MENSAJE DE CORREO ELECTRONICO
    const emailSubject = "Internship by UCB";
    const emailBody = `Su solicitud de adición a la página de Internship by UCB fue rechaada por la USEI. 
                      Por favor comuníquese con nuestros contactos para mayor información.`;

    // Enviar correo electrónico
    await sendEmail(institucion.correocontacto, emailSubject, emailBody);

    console.log("Institución rechazada. Correo de rechazo enviado a", institucion.correocontacto);
    return new ResponseDTO(
      "I-0000",
      actulizadoInstitucionDTO,
      "Institución rechazada."
    );
  } catch (error) {
    console.error(`Error al rechazar la institución con ID: ${id}.`, error);
    return new ResponseDTO(
      "I-1004",
      null,
      `Error al rechazar la institución: ${error}`
    );
  }
};

const pendingInstitution = async (id) => {
  console.log(`Poniendo en pendiente la institución con ID: ${id}...`);
  try {
    const institucion = await Institucion.findByPk(id, {
      include: [
        { model: SectorPertenencia, as: "sectorpertenencia" },
        { model: Usuario, as: "usuario"},
      ],
    });
    if (!institucion) {
      console.log(`Institución con ID: ${id} no encontrada.`);
      return new ResponseDTO("I-1004", null, "Institución no encontrada");
    }

    // Actualizar el estado de la institución a 'PENDIENTE'
    await institucion.update({ estado: 'PENDIENTE' });

    // Convertir el logoinstitucion en URL
    const imageUrl = getImageUrl(institucion.logoinstitucion);

    // Crear DTO para sector pertenencia
    let sectorPertenenciaDTO = null;
    if (institucion.sectorpertenencia) {
      sectorPertenenciaDTO = new SectorPertenenciaDTO(
        institucion.sectorpertenencia.id,
        institucion.sectorpertenencia.nombresectorpertenencia
      );
    }

    // Crear DTO para el usuario
    let usuarioDTO = null;
    if (institucion.usuario) {
      usuarioDTO = new UsuarioDTO(
        institucion.usuario.id,
        institucion.usuario.idusuario
      );
    }

    // Crear DTO para la institución, incluyendo el usuario actualizado
    const actulizadoInstitucionDTO = new InstitucionDTO(
      institucion.id,
      institucion.nombreinstitucion,
      institucion.reseniainstitucion,
      imageUrl,
      institucion.nombrecontacto,
      institucion.correocontacto,
      institucion.celularcontacto,
      institucion.estado,
      usuarioDTO,
      sectorPertenenciaDTO
    );

    console.log(`Institución puesta en pendiente con ID: ${id}.`);
    return new ResponseDTO(
      "I-0000",
      actulizadoInstitucionDTO,
      "Institución puesta en pendiente."
    );
  }
  catch (error) {
    console.error(`Error al poner en pendiente la institución con ID: ${id}.`, error);
    return new ResponseDTO(
      "I-1004",
      null,
      `Error al poner en pendiente la institución: ${error}`
    );
  }
};



module.exports = {
  getAllInstitutions,
  getInstitutionById,
  createInstitution,
  updateInstitution,
  deleteInstitution,
  getInstitutionPostulations,
  getInstitutionsBySector,
  getInstitutionApproved,
  getInstitutionPending,
  getInstitutionRejected,
  activateInstitution,
  getInstitutionIdByUserId,
  getPostulationsByInstitutionId,
  rejectInstitution,
  pendingInstitution,
  getPostulationsCountByInstitutionId,
};
