const PostulacionDTO = require("../DTO/PostulacionDTO");
const ResponseDTO = require("../DTO/ResponseDTO");
const PostulacionENT = require("../ENT/PostulacionENT");
const EstadoPostulacionENT = require("../ENT/EstadoPostulacionENT");
const EstudianteENT = require("../ENT/EstudianteENT");
const ConvocatoriaENT = require("../ENT/ConvocatoriaENT");
const CarreraENT = require("../ENT/CarreraENT");
const SedeENT = require("../ENT/SedeENT");
const EstadoPostulacionDTO = require("../DTO/EstadoPostulacionDTO");
const EstudianteDTO = require("../DTO/EstudianteDTO");
const ConvocatoriaDTO = require("../DTO/ConvocatoriaDTO");

//para el trigger
const historicoService = require('./historicoPostulacionesService');

const sequelize = require("../../database/db");

const getAllPostulaciones = async () => {
  console.log("Obteniendo todas las postulaciones...");
  try {
    const postulaciones = await PostulacionENT.findAll({
      include: [
        { model: EstadoPostulacionENT, as: "estadopostulacion" },
        { model: EstudianteENT, as: "estudiante" },
        { model: ConvocatoriaENT, as: "convocatoria" },
      ],
    });
    const postulacionesDTO = postulaciones.map((postulacion) => {
      const estadoPostulacionDTO = {
        id: postulacion.estadopostulacion.id,
        nombreestadopostulacion:
          postulacion.estadopostulacion.nombreestadopostulacion,
      };
      const estudianteDTO = {
        id: postulacion.estudiante.id,
        usuario_id: postulacion.estudiante.usuario_id,
        nombres: postulacion.estudiante.nombres,
        apellidopaterno: postulacion.estudiante.apellidopaterno,
        apellidomaterno: postulacion.estudiante.apellidomaterno,
        carnetidentidad: postulacion.estudiante.carnetidentidad,
        correoelectronico: postulacion.estudiante.correoelectronico,
        celularcontacto: postulacion.estudiante.celularcontacto,
        graduado: postulacion.estudiante.graduado,
        carrera_id: postulacion.estudiante.carrera_id,
        semestre_id: postulacion.estudiante.semestre_id,
        sede_id: postulacion.estudiante.sede_id,
        aniograduacion: postulacion.estudiante.aniograduacion,
        linkcurriculumvitae: postulacion.estudiante.linkcurriculumvitae,
      };
      const convocatoriaDTO = {
        id: postulacion.convocatoria.id,
        areapasantia: postulacion.convocatoria.areapasantia,
        descripcionfunciones: postulacion.convocatoria.descripcionfunciones,
        requisitoscompetencias: postulacion.convocatoria.requisitoscompetencias,
        horario_inicio: postulacion.convocatoria.horario_inicio,
        horario_fin: postulacion.convocatoria.horario_fin,
        fechasolicitud: postulacion.convocatoria.fechasolicitud,
        fechaseleccionpasante: postulacion.convocatoria.fechaseleccionpasante,
        duracion: postulacion.convocatoria.duracion,
        estadoconvocatoria: postulacion.convocatoria.estadoconvocatoria,
        institucion: postulacion.convocatoria.institucion,
        tiempoacumplir: postulacion.convocatoria.tiempoacumplir,
      };

      return new PostulacionDTO(
        postulacion.id,
        postulacion.fechapostulacion,
        estadoPostulacionDTO,
        estudianteDTO,
        convocatoriaDTO
      );
    });
    console.log("Postulaciones obtenidas correctamente.");
    return new ResponseDTO(
      "P-0000",
      postulacionesDTO,
      "Postulaciones obtenidas correctamente"
    );
  } catch (error) {
    console.error("Error al obtener todas las postulaciones:", error);
    return new ResponseDTO(
      "P-1001",
      null,
      `Error al obtener todas las postulaciones: ${error}`
    );
  }
};

const getPostulacionById = async (id) => {
  console.log(`Obteniendo la postulación con ID: ${id}...`);
  try {
    const postulacion = await PostulacionENT.findByPk(id, {
      include: [
        { model: EstadoPostulacionENT, as: "estadopostulacion" },
        { model: EstudianteENT, as: "estudiante" },
        { model: ConvocatoriaENT, as: "convocatoria" },
      ],
    });
    if (!postulacion) {
      console.log(`Postulación con ID: ${id} no encontrada.`);
      return new ResponseDTO("P-1002", null, "Postulación no encontrada");
    }
    const estadoPostulacionDTO = {
      id: postulacion.estadopostulacion.id,
      nombreestadopostulacion:
        postulacion.estadopostulacion.nombreestadopostulacion,
    };
    const estudianteDTO = {
      id: postulacion.estudiante.id,
      usuario_id: postulacion.estudiante.usuario_id,
      nombres: postulacion.estudiante.nombres,
      apellidopaterno: postulacion.estudiante.apellidopaterno,
      apellidomaterno: postulacion.estudiante.apellidomaterno,
      carnetidentidad: postulacion.estudiante.carnetidentidad,
      correoelectronico: postulacion.estudiante.correoelectronico,
      celularcontacto: postulacion.estudiante.celularcontacto,
      graduado: postulacion.estudiante.graduado,
      carrera_id: postulacion.estudiante.carrera_id,
      semestre_id: postulacion.estudiante.semestre_id,
      sede_id: postulacion.estudiante.sede_id,
      aniograduacion: postulacion.estudiante.aniograduacion,
      linkcurriculumvitae: postulacion.estudiante.linkcurriculumvitae,
    };
    const convocatoriaDTO = {
      id: postulacion.convocatoria.id,
      areapasantia: postulacion.convocatoria.areapasantia,
      descripcionfunciones: postulacion.convocatoria.descripcionfunciones,
      requisitoscompetencias: postulacion.convocatoria.requisitoscompetencias,
      horario_inicio: postulacion.convocatoria.horario_inicio,
      horario_fin: postulacion.convocatoria.horario_fin,
      fechasolicitud: postulacion.convocatoria.fechasolicitud,
      fechaseleccionpasante: postulacion.convocatoria.fechaseleccionpasante,
      duracion: postulacion.convocatoria.duracion,
      estadoconvocatoria: postulacion.convocatoria.estadoconvocatoria,
      institucion: postulacion.convocatoria.institucion_id,
      tiempoacumplir: postulacion.convocatoria.tiempoacumplir,
    };

    return new ResponseDTO(
      "P-0000",
      new PostulacionDTO(
        postulacion.id,
        postulacion.fechapostulacion,
        estadoPostulacionDTO,
        estudianteDTO,
        convocatoriaDTO
      ),
      "Postulación obtenida correctamente"
    );
  } catch (error) {
    console.error(`Error al obtener la postulación con ID: ${id}.`, error);
    return new ResponseDTO(
      "P-1002",
      null,
      `Error al obtener la postulación: ${error}`
    );
  }
};

const getPostulacionesPorIdConvocatoria = async (idConvocatoria) => {
  console.log(`Obteniendo postulaciones para la convocatoria con ID: ${idConvocatoria}...`);
  try {
      const postulaciones = await PostulacionENT.findAll({
          where: { convocatoria_id: idConvocatoria },
          include: [
              { model: EstadoPostulacionENT, as: 'estadopostulacion' },
              { model: EstudianteENT, as: 'estudiante' },
              { model: ConvocatoriaENT, as: "convocatoria" },
          ]
      });

      if (!postulaciones || postulaciones.length === 0) {
          console.log(`No se encontraron postulaciones para la convocatoria con ID: ${idConvocatoria}.`);
          return new ResponseDTO('P-1002', null, 'No se encontraron postulaciones para la convocatoria.');
      }

      const postulacionesDTO = postulaciones.map((postulacion) => {
          const estadoPostulacionDTO = {
              id: postulacion.estadopostulacion.id,
              nombreestadopostulacion: postulacion.estadopostulacion.nombreestadopostulacion
          };
          const estudianteDTO = {
            id: postulacion.estudiante.id,
            usuario_id: postulacion.estudiante.usuario_id,
            nombres: postulacion.estudiante.nombres,
            apellidopaterno: postulacion.estudiante.apellidopaterno,
            apellidomaterno: postulacion.estudiante.apellidomaterno,
            carnetidentidad: postulacion.estudiante.carnetidentidad,
            correoelectronico: postulacion.estudiante.correoelectronico,
            celularcontacto: postulacion.estudiante.celularcontacto,
            graduado: postulacion.estudiante.graduado,
            carrera_id: postulacion.estudiante.carrera_id,
            semestre_id: postulacion.estudiante.semestre_id,
            sede_id: postulacion.estudiante.sede_id,
            aniograduacion: postulacion.estudiante.aniograduacion,
            linkcurriculumvitae: postulacion.estudiante.linkcurriculumvitae
        };
        const convocatoriaDTO = {
          id: postulacion.convocatoria.id,
          areapasantia: postulacion.convocatoria.areapasantia,
          descripcionfunciones: postulacion.convocatoria.descripcionfunciones,
          requisitoscompetencias: postulacion.convocatoria.requisitoscompetencias,
          horario_inicio: postulacion.convocatoria.horario_inicio,
          horario_fin: postulacion.convocatoria.horario_fin,
          fechasolicitud: postulacion.convocatoria.fechasolicitud,
          fechaseleccionpasante: postulacion.convocatoria.fechaseleccionpasante,
          duracion: postulacion.convocatoria.duracion,
          estadoconvocatoria: postulacion.convocatoria.estadoconvocatoria,
          institucion: postulacion.convocatoria.institucion,
          tiempoacumplir: postulacion.convocatoria.tiempoacumplir,
        };
        
          return new PostulacionDTO(
              postulacion.id,
              postulacion.fechapostulacion,
              estadoPostulacionDTO,
              estudianteDTO,
              convocatoriaDTO // No incluimos la convocatoria en este caso
          );
      });

      console.log(`Postulaciones obtenidas correctamente para la convocatoria con ID: ${idConvocatoria}.`);
      return new ResponseDTO('P-0000', postulacionesDTO, 'Postulaciones obtenidas correctamente');
  } catch (error) {
      console.error(`Error al obtener las postulaciones para la convocatoria con ID: ${idConvocatoria}.`, error);
      return new ResponseDTO('P-1002', null, `Error al obtener las postulaciones: ${error}`);
  }
};

const getPostulacionesPendientesPorIdConvocatoria = async (idConvocatoria) => {
  console.log(`Obteniendo postulaciones para la convocatoria con ID: ${idConvocatoria}...`);
  try {
      const postulaciones = await PostulacionENT.findAll({
          where: { convocatoria_id: idConvocatoria,
                  estadopostulacion_id: 2,
          },
          include: [
              { model: EstadoPostulacionENT, as: 'estadopostulacion' },
              { model: EstudianteENT, as: 'estudiante',
              include: [ 
              {
                model: CarreraENT,
                as: 'carrera'
              },
              {
                model: SedeENT,
                as: 'sede'
              },
            ] },
              { model: ConvocatoriaENT, as: "convocatoria" },
          ]
      });

      if (!postulaciones || postulaciones.length === 0) {
          console.log(`No se encontraron postulaciones para la convocatoria con ID: ${idConvocatoria}.`);
          return new ResponseDTO('P-1002', null, 'No se encontraron postulaciones para la convocatoria.');
      }

      const postulacionesDTO = postulaciones.map((postulacion) => {
        const carreraDTO = {
          id: postulacion.estudiante.carrera.id,
          nombreestadopostulacion: postulacion.estudiante.carrera.nombrecarrera
      };
      const sedeDTO = {
        id: postulacion.estudiante.sede.id,
        nombreestadopostulacion: postulacion.estudiante.sede.nombresede
    };
          const estadoPostulacionDTO = {
              id: postulacion.estadopostulacion.id,
              nombreestadopostulacion: postulacion.estadopostulacion.nombreestadopostulacion
          };
          const estudianteDTO = {
            id: postulacion.estudiante.id,
            usuario_id: postulacion.estudiante.usuario_id,
            nombres: postulacion.estudiante.nombres,
            apellidopaterno: postulacion.estudiante.apellidopaterno,
            apellidomaterno: postulacion.estudiante.apellidomaterno,
            carnetidentidad: postulacion.estudiante.carnetidentidad,
            correoelectronico: postulacion.estudiante.correoelectronico,
            celularcontacto: postulacion.estudiante.celularcontacto,
            graduado: postulacion.estudiante.graduado,
            carrera_id: carreraDTO,
            semestre_id: postulacion.estudiante.semestre_id,
            sede_id:sedeDTO,
            aniograduacion: postulacion.estudiante.aniograduacion,
            linkcurriculumvitae: postulacion.estudiante.linkcurriculumvitae
        };
        const convocatoriaDTO = {
          id: postulacion.convocatoria.id,
          areapasantia: postulacion.convocatoria.areapasantia,
          descripcionfunciones: postulacion.convocatoria.descripcionfunciones,
          requisitoscompetencias: postulacion.convocatoria.requisitoscompetencias,
          horario_inicio: postulacion.convocatoria.horario_inicio,
          horario_fin: postulacion.convocatoria.horario_fin,
          fechasolicitud: postulacion.convocatoria.fechasolicitud,
          fechaseleccionpasante: postulacion.convocatoria.fechaseleccionpasante,
          duracion: postulacion.convocatoria.duracion,
          estadoconvocatoria: postulacion.convocatoria.estadoconvocatoria,
          institucion: postulacion.convocatoria.institucion,
          tiempoacumplir: postulacion.convocatoria.tiempoacumplir,
        };
        
          return new PostulacionDTO(
              postulacion.id,
              postulacion.fechapostulacion,
              estadoPostulacionDTO,
              estudianteDTO,
              convocatoriaDTO 
          );
      });

      console.log(`Postulaciones obtenidas correctamente para la convocatoria con ID: ${idConvocatoria}.`);
      return new ResponseDTO('P-0000', postulacionesDTO, 'Postulaciones obtenidas correctamente');
  } catch (error) {
      console.error(`Error al obtener las postulaciones para la convocatoria con ID: ${idConvocatoria}.`, error);
      return new ResponseDTO('P-1002', null, `Error al obtener las postulaciones: ${error}`);
  }
};


const createPostulacion = async (postulationData) => {
    console.log('Creando una nueva postulación...');
    try {
        // Verificamos que los objetos necesarios estén definidos y contengan las propiedades requeridas
        if (!postulationData.estadopostulacion || !postulationData.estadopostulacion.id ||
            !postulationData.estudiante || !postulationData.estudiante.id ||
            !postulationData.convocatoria || !postulationData.convocatoria.id) {
            return new ResponseDTO('P-1002', null, 'Datos de postulación incompletos o inválidos');
        }

        // Verificamos si el estudiante ya postuló a la convocatoria
        const existingPostulation = await PostulacionENT.findOne({
            where: {
                estudiante_id: postulationData.estudiante.id,
                convocatoria_id: postulationData.convocatoria.id
            }
        });

        if (existingPostulation) {
            console.log('El estudiante ya postuló a esta convocatoria.');
            return new ResponseDTO('P-1005', null, 'Ya postulaste a esta convocatoria');
        }

        // Creamos la postulación y asociamos las relaciones
        const postulation = await PostulacionENT.create({
            fechapostulacion: postulationData.fechapostulacion,
            estadopostulacion_id: postulationData.estadopostulacion.id,
            estudiante_id: postulationData.estudiante.id,
            convocatoria_id: postulationData.convocatoria.id
        });

        // Creamos los objetos DTO
        const estadoPostulacionDTO = new EstadoPostulacionDTO(
            postulationData.estadopostulacion.id,
            postulationData.estadopostulacion.nombreestadopostulacion
        );

        const estudianteDTO = new EstudianteDTO(
            postulationData.estudiante.id,
            postulationData.estudiante.usuario_id,
            postulationData.estudiante.nombres,
            postulationData.estudiante.apellidopaterno,
            postulationData.estudiante.apellidomaterno,
            postulationData.estudiante.carnetidentidad,
            postulationData.estudiante.correoelectronico,
            postulationData.estudiante.celularcontacto,
            postulationData.estudiante.graduado,
            postulationData.estudiante.carrera_id,
            postulationData.estudiante.semestre_id,
            postulationData.estudiante.sede_id,
            postulationData.estudiante.aniograduacion,
            postulationData.estudiante.linkcurriculumvitae
        );

        const convocatoriaDTO = new ConvocatoriaDTO(
            postulationData.convocatoria.id,
            postulationData.convocatoria.areapasantia,
            postulationData.convocatoria.descripcionfunciones,
            postulationData.convocatoria.requisitoscompetencias,
            postulationData.convocatoria.horario_inicio,
            postulationData.convocatoria.horario_fin,
            postulationData.convocatoria.fechasolicitud,
            postulationData.convocatoria.fechaseleccionpasante,
            postulationData.convocatoria.duracion,
            postulationData.convocatoria.estadoconvocatoria_id, // Considera si necesitas el id o un objeto más detallado aquí
            postulationData.convocatoria.institucion_id,       // Lo mismo para institución y tiempo a cumplir
            postulationData.convocatoria.tiempoacumplir_id
        );
        const postulacionDTO=new PostulacionDTO(
            postulation.id,
            postulation.fechapostulacion,
            estadoPostulacionDTO,
            estudianteDTO,
            convocatoriaDTO
        );
        // Insertar en historico después de crear la postulación
        await historicoService.insertHistoricoPostulacion(postulation.dataValues, 'POST');
        console.log('Postulación creada correctamente.');
        return new ResponseDTO('P-0000', postulacionDTO,'Postulación creada correctamente');

    } catch (error) {
        console.error('Error al crear la postulación:', error);
        return new ResponseDTO('P-1003', null, `Error al crear la postulación: ${error}`);
    }
};

const updatePostulacion = async (id, postulacionData) => {
  console.log(`Actualizando la postulación con ID: ${id}...`);
  try {
    const postulacion = await PostulacionENT.findByPk(id);
    if (!postulacion) {
      console.log(`Postulación con ID: ${id} no encontrada.`);
      return new ResponseDTO("P-1004", null, "Postulación no encontrada");
    }
    await postulacion.update(postulacionData);
    // Insertar en historico después de actualizar una postulación
    await historicoService.insertHistoricoPostulacion(postulacion.dataValues, 'PUT');
    console.log("Postulación actualizada correctamente.");
    return new ResponseDTO(
      "P-0000",
      null,
      "Postulación actualizada correctamente"
    );
  } catch (error) {
    console.error(`Error al actualizar la postulación con ID: ${id}.`, error);
    return new ResponseDTO(
      "P-1004",
      null,
      `Error al actualizar la postulación: ${error}`
    );
  }
};

const updatePostulacionAprobadas = async (id) => {
  console.log(`Actualizando el estado de la postulación con ID: ${id} a Activo...`);
  try {
    const postulacion = await PostulacionENT.findByPk(id);
    if (!postulacion) {
      console.log(`Postulación con ID: ${id} no encontrada.`);
      return new ResponseDTO("P-1004", null, "Postulación no encontrada");
    }

    // Actualiza el campo estadopostulacion_id a 1 (Activo)
    await postulacion.update({ estadopostulacion_id: 1 });

    // Insertar en histórico después de actualizar el estado de una postulación
    await historicoService.insertHistoricoPostulacion({ ...postulacion.dataValues, estadopostulacion_id: 1 }, 'PUT');

    console.log("Estado de la postulación actualizado a Activo correctamente.");
    return new ResponseDTO(
      "P-0000",
      postulacion,
      "Estado de la postulación actualizado a Activo correctamente"
    );
  } catch (error) {
    console.error(`Error al actualizar el estado de la postulación con ID: ${id} a Activo.`, error);
    return new ResponseDTO(
      "P-1004",
      null,
      `Error al actualizar el estado de la postulación a Activo: ${error}`
    );
  }
};

const updatePostulacionRechazadas = async (id) => {
  console.log(`Actualizando el estado de la postulación con ID: ${id} a Inactivo...`);
  try {
    const postulacion = await PostulacionENT.findByPk(id);
    if (!postulacion) {
      console.log(`Postulación con ID: ${id} no encontrada.`);
      return new ResponseDTO("P-1004", null, "Postulación no encontrada");
    }

    // Actualiza el campo estadopostulacion_id a 3 (Inactivo)
    await postulacion.update({ estadopostulacion_id: 3 });

    // Insertar en histórico después de actualizar el estado de una postulación
    await historicoService.insertHistoricoPostulacion({ ...postulacion.dataValues, estadopostulacion_id: 3 }, 'PUT');

    console.log("Estado de la postulación actualizado a Inactivo correctamente.");
    return new ResponseDTO(
      "P-0000",
      postulacion,
      "Estado de la postulación actualizado a Inactivo correctamente"
    );
  } catch (error) {
    console.error(`Error al actualizar el estado de la postulación con ID: ${id} a Inactivo.`, error);
    return new ResponseDTO(
      "P-1004",
      null,
      `Error al actualizar el estado de la postulación a Inactivo: ${error}`
    );
  }
};

const deletePostulacion = async (id) => {
  console.log(`Eliminando la postulación con ID: ${id}...`);
  try {
    const postulacion = await PostulacionENT.findByPk(id);
    if (!postulacion) {
      console.log(`Postulación con ID: ${id} no encontrada.`);
      return new ResponseDTO("P-1005", null, "Postulación no encontrada");
    }
    // Insertar en historico después de eliminar una postulación
    await historicoService.insertHistoricoPostulacion(postulacion.dataValues, 'DELETE');
    await postulacion.destroy();
    console.log("Postulación eliminada correctamente.");
    return new ResponseDTO(
      "P-0000",
      null,
      "Postulación eliminada correctamente"
    );
  } catch (error) {
    console.error(`Error al eliminar la postulación con ID: ${id}.`, error);
    return new ResponseDTO(
      "P-1005",
      null,
      `Error al eliminar la postulación: ${error}`
    );
  }
};

const getPostulacionByStudent = async (studentId) => {
  console.log(`Obteniendo las postulaciones para el estudiante con ID: ${studentId}...`);
  try {
      const postulaciones = await PostulacionENT.findAll({
          include: [
              { model: EstadoPostulacionENT, as: "estadopostulacion" },
              { model: EstudianteENT, as: "estudiante", where: { id: studentId } },
              { model: ConvocatoriaENT, as: "convocatoria" },
          ],
      });

      if (postulaciones.length === 0) {
          console.log(`No se encontraron postulaciones para el estudiante con ID: ${studentId}.`);
          return new ResponseDTO("P-1006", null, "No se encontraron postulaciones para el estudiante");
      }

      const postulacionesDTO = postulaciones.map((postulacion) => {
        const estadoPostulacionDTO = {
          id: postulacion.estadopostulacion.id,
          nombreestadopostulacion:
            postulacion.estadopostulacion.nombreestadopostulacion,
        };
        const estudianteDTO = {
          id: postulacion.estudiante.id,
          usuario_id: postulacion.estudiante.usuario_id,
          nombres: postulacion.estudiante.nombres,
          apellidopaterno: postulacion.estudiante.apellidopaterno,
          apellidomaterno: postulacion.estudiante.apellidomaterno,
          carnetidentidad: postulacion.estudiante.carnetidentidad,
          correoelectronico: postulacion.estudiante.correoelectronico,
          celularcontacto: postulacion.estudiante.celularcontacto,
          graduado: postulacion.estudiante.graduado,
          carrera_id: postulacion.estudiante.carrera_id,
          semestre_id: postulacion.estudiante.semestre_id,
          sede_id: postulacion.estudiante.sede_id,
          aniograduacion: postulacion.estudiante.aniograduacion,
          linkcurriculumvitae: postulacion.estudiante.linkcurriculumvitae,
        };
        const convocatoriaDTO = {
          id: postulacion.convocatoria.id,
          areapasantia: postulacion.convocatoria.areapasantia,
          descripcionfunciones: postulacion.convocatoria.descripcionfunciones,
          requisitoscompetencias: postulacion.convocatoria.requisitoscompetencias,
          horario_inicio: postulacion.convocatoria.horario_inicio,
          horario_fin: postulacion.convocatoria.horario_fin,
          fechasolicitud: postulacion.convocatoria.fechasolicitud,
          fechaseleccionpasante: postulacion.convocatoria.fechaseleccionpasante,
          duracion: postulacion.convocatoria.duracion,
          estadoconvocatoria: postulacion.convocatoria.estadoconvocatoria,
          institucion: postulacion.convocatoria.institucion,
          tiempoacumplir: postulacion.convocatoria.tiempoacumplir,
        };
  
        return new PostulacionDTO(
          postulacion.id,
          postulacion.fechapostulacion,
          estadoPostulacionDTO,
          estudianteDTO,
          convocatoriaDTO
        );
      });

      console.log(`Postulaciones obtenidas correctamente para el estudiante con ID: ${studentId}.`);
      return new ResponseDTO("P-0000", postulacionesDTO, "Postulaciones obtenidas correctamente");
  } catch (error) {
      console.error(`Error al obtener las postulaciones para el estudiante con ID: ${studentId}:`, error);
      return new ResponseDTO("P-1006", null, `Error al obtener las postulaciones para el estudiante: ${error}`);
  }
};

const getPostulacionByStudentByStatus = async (studentId, estadopostulacionId) => {
  console.log(`Obteniendo las postulaciones por ESTADO POSTULACION -${estadopostulacionId}-  para el estudiante con ID: ${studentId}...`);
  try {
      const postulaciones = await PostulacionENT.findAll({
          where: { estadopostulacion_id: [estadopostulacionId] }, 
          include: [
              { model: EstadoPostulacionENT, as: "estadopostulacion" },
              { model: EstudianteENT, as: "estudiante", where: { id: studentId } },
              { model: ConvocatoriaENT, as: "convocatoria" },
          ],
      });

      if (postulaciones.length === 0) {
          console.log(`No se encontraron postulaciones con estado -${estadopostulacionId}- para el estudiante con ID: ${studentId}.`);
          return new ResponseDTO("P-1006", null, `No se encontraron postulaciones con estado -${estadopostulacionId}- para el estudiante con ID: ${studentId}.`);
      }

      const postulacionesDTO = postulaciones.map((postulacion) => {
        const estadoPostulacionDTO = {
          id: postulacion.estadopostulacion.id,
          nombreestadopostulacion:
            postulacion.estadopostulacion.nombreestadopostulacion,
        };
        const estudianteDTO = {
          id: postulacion.estudiante.id,
          usuario_id: postulacion.estudiante.usuario_id,
          nombres: postulacion.estudiante.nombres,
          apellidopaterno: postulacion.estudiante.apellidopaterno,
          apellidomaterno: postulacion.estudiante.apellidomaterno,
          carnetidentidad: postulacion.estudiante.carnetidentidad,
          correoelectronico: postulacion.estudiante.correoelectronico,
          celularcontacto: postulacion.estudiante.celularcontacto,
          graduado: postulacion.estudiante.graduado,
          carrera_id: postulacion.estudiante.carrera_id,
          semestre_id: postulacion.estudiante.semestre_id,
          sede_id: postulacion.estudiante.sede_id,
          aniograduacion: postulacion.estudiante.aniograduacion,
          linkcurriculumvitae: postulacion.estudiante.linkcurriculumvitae,
        };
        const convocatoriaDTO = {
          id: postulacion.convocatoria.id,
          areapasantia: postulacion.convocatoria.areapasantia,
          descripcionfunciones: postulacion.convocatoria.descripcionfunciones,
          requisitoscompetencias: postulacion.convocatoria.requisitoscompetencias,
          horario_inicio: postulacion.convocatoria.horario_inicio,
          horario_fin: postulacion.convocatoria.horario_fin,
          fechasolicitud: postulacion.convocatoria.fechasolicitud,
          fechaseleccionpasante: postulacion.convocatoria.fechaseleccionpasante,
          duracion: postulacion.convocatoria.duracion,
          estadoconvocatoria: postulacion.convocatoria.estadoconvocatoria,
          institucion: postulacion.convocatoria.institucion,
          tiempoacumplir: postulacion.convocatoria.tiempoacumplir,
        };
  
        return new PostulacionDTO(
          postulacion.id,
          postulacion.fechapostulacion,
          estadoPostulacionDTO,
          estudianteDTO,
          convocatoriaDTO
        );
      });

      console.log(`Postulaciones con estado -${estadopostulacionId}- obtenidas correctamente para el estudiante con ID: ${studentId}.`);
      return new ResponseDTO("P-0000", postulacionesDTO, "Postulaciones por estado obtenidas correctamente");
  } catch (error) {
      console.error(`Error al obtener las postulaciones con estado -${estadopostulacionId}- para el estudiante con ID: ${studentId}:`, error);
      return new ResponseDTO("P-1006", null, `Error al obtener las postulaciones por estado para el estudiante: ${error}`);
  }
};

const getPostulacionesActivasPorIdInstitucion = async (institutionId) => {
  console.log(`Obteniendo postulaciones activas para la institución con ID: ${institutionId}...`);
  try {
    const postulaciones = await sequelize.query(
      `SELECT 
        p.id,
        p.fechapostulacion,
        ep.id as 'estadopostulacion_id',
        ep.nombreestadopostulacion,
        e.id as 'estudiante_id',
        e.nombres as 'estudiante_nombres',
        e.apellidopaterno as 'estudiante_apellidopaterno',
        e.apellidomaterno as 'estudiante_apellidomaterno',
        e.carnetidentidad,
        e.correoelectronico,
        e.celularcontacto,
        e.graduado,
        e.carrera_id,
        e.semestre_id,
        e.sede_id,
        e.aniograduacion,
        e.linkcurriculumvitae,
        c.id as 'convocatoria_id',
        c.areapasantia,
        c.descripcionfunciones,
        c.requisitoscompetencias,
        c.horario_inicio,
        c.horario_fin,
        c.fechasolicitud,
        c.fechaseleccionpasante,
        c.duracion,
        i.nombreinstitucion
      FROM 
        postulacion p
      JOIN 
        convocatoria c ON p.convocatoria_id = c.id
      JOIN 
        institucion i ON c.institucion_id = i.id
      JOIN
        estadopostulacion ep ON p.estadopostulacion_id = ep.id
      JOIN
        estudiante e ON p.estudiante_id = e.id
      WHERE 
        i.id = :institutionId AND ep.id = 1;`, // Filtra por estado 'activo'
      { 
        replacements: { institutionId: institutionId },
        type: sequelize.QueryTypes.SELECT 
      }
    );

    // Mapear resultados a DTOs
    const postulacionesDTO = postulaciones.map(postulacion => {
      return new PostulacionDTO(
        postulacion.id,
        postulacion.fechapostulacion,
        new EstadoPostulacionDTO(postulacion.estadopostulacion_id, postulacion.nombreestadopostulacion),
        new EstudianteDTO(
          postulacion.estudiante_id,
          postulacion.estudiante_nombres,
          postulacion.estudiante_apellidopaterno,
          postulacion.estudiante_apellidomaterno,
          postulacion.carnetidentidad,
          postulacion.correoelectronico,
          postulacion.celularcontacto,
          postulacion.graduado,
          postulacion.carrera_id,
          postulacion.semestre_id,
          postulacion.sede_id,
          postulacion.aniograduacion,
          postulacion.linkcurriculumvitae
        ),
        new ConvocatoriaDTO(
          postulacion.convocatoria_id,
          postulacion.areapasantia,
          postulacion.descripcionfunciones,
          postulacion.requisitoscompetencias,
          postulacion.horario_inicio,
          postulacion.horario_fin,
          postulacion.fechasolicitud,
          postulacion.fechaseleccionpasante,
          postulacion.duracion
        )
      );
    });

    console.log(
      `Postulaciones activas obtenidas correctamente para la institución con ID: ${institutionId}.`
    );
    return new ResponseDTO(
      "IP-0000",
      postulacionesDTO,
      `Postulaciones activas obtenidas correctamente para la institución con ID: ${institutionId}`
    );
  } catch (error) {
    console.error(
      `Error al obtener postulaciones activas para la institución con ID: ${institutionId}:`,
      error
    );
    return new ResponseDTO(
      "IP-1002",
      null,
      `Error al obtener postulaciones activas para la institución con ID: ${institutionId}: ${error}`
    );
  }
};

const getPostulacionPendientesPorIdInstitucion = async (institutionId) => {
  console.log(`Obteniendo postulaciones pendientes para la institución con ID: ${institutionId}...`);
  try {
    const postulaciones = await sequelize.query(
      `SELECT 
        p.id,
        p.fechapostulacion,
        ep.id as 'estadopostulacion_id',
        ep.nombreestadopostulacion,
        e.id as 'estudiante_id',
        e.nombres as 'estudiante_nombres',
        e.apellidopaterno as 'estudiante_apellidopaterno',
        e.apellidomaterno as 'estudiante_apellidomaterno',
        e.carnetidentidad,
        e.correoelectronico,
        e.celularcontacto,
        e.graduado,
        e.carrera_id,
        e.semestre_id,
        e.sede_id,
        e.aniograduacion,
        e.linkcurriculumvitae,
        c.id as 'convocatoria_id',
        c.areapasantia,
        c.descripcionfunciones,
        c.requisitoscompetencias,
        c.horario_inicio,
        c.horario_fin,
        c.fechasolicitud,
        c.fechaseleccionpasante,
        c.duracion,
        i.nombreinstitucion
      FROM 
        postulacion p
      JOIN 
        convocatoria c ON p.convocatoria_id = c.id
      JOIN 
        institucion i ON c.institucion_id = i.id
      JOIN
        estadopostulacion ep ON p.estadopostulacion_id = ep.id
      JOIN
        estudiante e ON p.estudiante_id = e.id
      WHERE 
        i.id = :institutionId AND ep.id = 2;`, // Filtra por estado 'pendiente'
      { 
        replacements: { institutionId: institutionId },
        type: sequelize.QueryTypes.SELECT 
      }
    );

    // Mapear resultados a DTOs
    const postulacionesDTO = postulaciones.map(postulacion => {
      return new PostulacionDTO(
        postulacion.id,
        postulacion.fechapostulacion,
        new EstadoPostulacionDTO(postulacion.estadopostulacion_id, postulacion.nombreestadopostulacion),
        new EstudianteDTO(
          postulacion.estudiante_id,
          postulacion.estudiante_nombres,
          postulacion.estudiante_apellidopaterno,
          postulacion.estudiante_apellidomaterno,
          postulacion.carnetidentidad,
          postulacion.correoelectronico,
          postulacion.celularcontacto,
          postulacion.graduado,
          postulacion.carrera_id,
          postulacion.semestre_id,
          postulacion.sede_id,
          postulacion.aniograduacion,
          postulacion.linkcurriculumvitae
        ),
        new ConvocatoriaDTO(
          postulacion.convocatoria_id,
          postulacion.areapasantia,
          postulacion.descripcionfunciones,
          postulacion.requisitoscompetencias,
          postulacion.horario_inicio,
          postulacion.horario_fin,
          postulacion.fechasolicitud,
          postulacion.fechaseleccionpasante,
          postulacion.duracion
        )
      );
    });

    console.log(
      `Postulaciones pendientes obtenidas correctamente para la institución con ID: ${institutionId}.`
    );
    return new ResponseDTO(
      "IP-0000",
      postulacionesDTO,
      `Postulaciones pendientes obtenidas correctamente para la institución con ID: ${institutionId}`
    );
  }
  catch (error) {
    console.error(
      `Error al obtener postulaciones pendientes para la institución con ID: ${institutionId}:`,
      error
    );
    return new ResponseDTO(
      "IP-1002",
      null,
      `Error al obtener postulaciones pendientes para la institución con ID: ${institutionId}: ${error}`
    );
  }
};

const getPostulacionesRechazadasPorIdInstitucion = async (institutionId) => {
  console.log(`Obteniendo postulaciones rechazadas para la institución con ID: ${institutionId}...`);
  try {
    const postulaciones = await sequelize.query(
      `SELECT 
        p.id,
        p.fechapostulacion,
        ep.id as 'estadopostulacion_id',
        ep.nombreestadopostulacion,
        e.id as 'estudiante_id',
        e.nombres as 'estudiante_nombres',
        e.apellidopaterno as 'estudiante_apellidopaterno',
        e.apellidomaterno as 'estudiante_apellidomaterno',
        e.carnetidentidad,
        e.correoelectronico,
        e.celularcontacto,
        e.graduado,
        e.carrera_id,
        e.semestre_id,
        e.sede_id,
        e.aniograduacion,
        e.linkcurriculumvitae,
        c.id as 'convocatoria_id',
        c.areapasantia,
        c.descripcionfunciones,
        c.requisitoscompetencias,
        c.horario_inicio,
        c.horario_fin,
        c.fechasolicitud,
        c.fechaseleccionpasante,
        c.duracion,
        i.nombreinstitucion
      FROM 
        postulacion p
      JOIN 
        convocatoria c ON p.convocatoria_id = c.id
      JOIN 
        institucion i ON c.institucion_id = i.id
      JOIN
        estadopostulacion ep ON p.estadopostulacion_id = ep.id
      JOIN
        estudiante e ON p.estudiante_id = e.id
      WHERE 
        i.id = :institutionId AND ep.id = 3;`, // Filtra por estado 'rechazado'
      { 
        replacements: { institutionId: institutionId },
        type: sequelize.QueryTypes.SELECT 
      }
    );

    // Mapear resultados a DTOs
    const postulacionesDTO = postulaciones.map(postulacion => {
      return new PostulacionDTO(
        postulacion.id,
        postulacion.fechapostulacion,
        new EstadoPostulacionDTO(postulacion.estadopostulacion_id, postulacion.nombreestadopostulacion),
        new EstudianteDTO(
          postulacion.estudiante_id,
          postulacion.estudiante_nombres,
          postulacion.estudiante_apellidopaterno,
          postulacion.estudiante_apellidomaterno,
          postulacion.carnetidentidad,
          postulacion.correoelectronico,
          postulacion.celularcontacto,
          postulacion.graduado,
          postulacion.carrera_id,
          postulacion.semestre_id,
          postulacion.sede_id,
          postulacion.aniograduacion,
          postulacion.linkcurriculumvitae
        ),
        new ConvocatoriaDTO(
          postulacion.convocatoria_id,
          postulacion.areapasantia,
          postulacion.descripcionfunciones,
          postulacion.requisitoscompetencias,
          postulacion.horario_inicio,
          postulacion.horario_fin,
          postulacion.fechasolicitud,
          postulacion.fechaseleccionpasante,
          postulacion.duracion
        )
      );
    });
    console.log(
      `Postulaciones rechazadas obtenidas correctamente para la institución con ID: ${institutionId}.`
    );
    return new ResponseDTO(
      "IP-0000",
      postulacionesDTO,
      `Postulaciones rechazadas obtenidas correctamente para la institución con ID: ${institutionId}`
    );
  }
  catch (error) {
    console.error(
      `Error al obtener postulaciones rechazadas para la institución con ID: ${institutionId}:`,
      error
    );
    return new ResponseDTO(
      "IP-1002",
      null,
      `Error al obtener postulaciones rechazadas para la institución con ID: ${institutionId}: ${error}`
    );
  }
};




module.exports = {
  getAllPostulaciones,
  getPostulacionById,
  createPostulacion,
  updatePostulacion,
  deletePostulacion,
  getPostulacionByStudent,
  getPostulacionByStudentByStatus,
  getPostulacionesPorIdConvocatoria,
  getPostulacionesActivasPorIdInstitucion,
  getPostulacionPendientesPorIdInstitucion,
  getPostulacionesRechazadasPorIdInstitucion,
  getPostulacionesPendientesPorIdConvocatoria,
  updatePostulacionRechazadas,
  updatePostulacionAprobadas,
  
};
