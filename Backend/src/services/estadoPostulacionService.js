const EstadoPostulacionENT = require("../ENT/EstadoPostulacionENT");
const ResponseDTO = require("../DTO/ResponseDTO");
const EstadoPostulacionDTO = require("../DTO/EstadoPostulacionDTO");

const getAll = async () => {
  console.log("Obteniendo todos los estados de las postulaciones...");
  try {
    const estadosPostulacion = await EstadoPostulacionENT.findAll();
    const estadosPostulacionDTO = estadosPostulacion.map(
      (estadoPostulacion) =>
        new EstadoPostulacionDTO(
          estadoPostulacion.id,
          estadoPostulacion.nombreestadopostulacion
        )
    );
    return new ResponseDTO(
      "EP-0000",
      estadosPostulacionDTO,
      "Estados de postulación obtenidos correctamente."
    );
  } catch (error) {
    console.error(
      "Error al obtener todos los estados de las postulaciones:",
      error
    );
    return new ResponseDTO(
      "EP-1000",
      null,
      "Error al obtener todos los estados de las postulaciones."
    );
  }
};

const getById = async (id) => {
  console.log(`Obteniendo el estado de postulación con ID: ${id}...`);
  try {
    const estadoPostulacion = await EstadoPostulacionENT.findByPk(id);
    if (!estadoPostulacion) {
      console.log(`El estado de postulación con ID: '${id}' no existe.`);
      return new ResponseDTO(
        "EP-2000",
        null,
        `El estado de postulación con ID: '${id}' no existe.`
      );
    }
    console.log("Estado de postulación obtenido correctamente.");
    return new ResponseDTO(
      "EP-0000",
      estadoPostulacion,
      "Estado de postulación obtenido correctamente."
    );
  } catch (error) {
    console.error(
      `Error al obtener el estado de postulación con ID: '${id}':`,
      error
    );
    return new ResponseDTO(
      "EP-2000",
      null,
      `Error al obtener el estado de postulación con ID: '${id}'`
    );
  }
};

const create = async (nombreestadopostulacion) => {
  console.log(
    `Creando un nuevo estado de postulación: ${nombreestadopostulacion}...`
  );
  try {
    const nuevoEstadoPostulacion = await EstadoPostulacionENT.create({ nombreestadopostulacion });
    return new ResponseDTO(
      "EP-0000",
      nuevoEstadoPostulacion,
      `Estado de postulación '${nombreestadopostulacion}' creado correctamente.`
    );
  } catch (error) {
    console.error(
      `Error al crear el nuevo estado de postulación '${nombreestadopostulacion}'`,
      error
    );
    return new ResponseDTO(
      "EP-3000",
      null,
      `Error al crear el nuevo estado de postulación '${nombreestadopostulacion}'`
    );
  }
};

const update = async (id, nombreestadopostulacion) => {
  console.log(`Actualizando el estado de postulación con ID: '${id}'...`);
  try {
    const estadoPostulacion = await EstadoPostulacionENT.findByPk(id);
    if (!estadoPostulacion) {
      console.log(`El estado de postulación con ID: '${id}' no existe.`);
      return new ResponseDTO(
        "EP-4000",
        null,
        `El estado de postulación con ID: '${id}' no existe.`
      );
    }
    estadoPostulacion.nombreestadopostulacion = nombreestadopostulacion;
    await estadoPostulacion.save();
    console.log(
      `Estado de postulación con ID: '${id}' actualizado correctamente.`
    );
    return new ResponseDTO(
      "EP-0000",
      estadoPostulacion,
      `Estado de postulación con ID: '${id}' actualizado correctamente.`
    );
  } catch (error) {
    console.error(
      `Error al actualizar el estado de postulación con ID: '${id}'`,
      error
    );
    return new ResponseDTO(
      "EP-4000",
      null,
      `Error al actualizar el estado de postulación con ID: '${id}'`
    );
  }
};

const remove = async (id) => {
  console.log(`Eliminando el estado de postulación con ID: '${id}'`);
  try {
    const estadoPostulacion = await EstadoPostulacionENT.findByPk(id);
    if (!estadoPostulacion) {
      console.log(`El estado de postulación con ID: '${id}' no existe.`);
      return new ResponseDTO(
        "EP-5000",
        null,
        `El estado de postulación con ID: '${id}' no existe.`
      );
    }
    await estadoPostulacion.destroy();
    console.log("Estado de postulación eliminado correctamente.");
    return new ResponseDTO(
      "EP-0000",
      "Estado de postulación eliminado correctamente."
    );
  } catch (error) {
    console.error(
      `Error al eliminar el estado de postulación con ID: '${id}'`,
      error
    );
    return new ResponseDTO(
      "EP-5000",
      null,
      `Error al eliminar el estado de postulación con ID: '${id}'`
    );
  }
};

module.exports = { getAll, getById, create, update, remove };
