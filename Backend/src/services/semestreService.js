const SemestreENT = require("../ENT/semestreENT");
const ResponseDTO = require("../DTO/ResponseDTO");
const SemestreDTO = require("../DTO/SemestreDTO");

const getAll = async () => {
  console.log("Obteniendo todos los semestres...");
  try {
    const semestres = await SemestreENT.findAll();
    const semestresDTO = semestres.map(
      (semestre) => new SemestreDTO(semestre.id, semestre.codigosemestre)
    );
    return new ResponseDTO(
      "S-0000",
      semestresDTO,
      "Semestres obtenidos correctamente."
    );
  } catch (error) {
    console.error("Error al obtener todos los semestres: ", error);
    return new ResponseDTO(
      "S-1000",
      null,
      "Error al obtener todos los semestres."
    );
  }
};

const getById = async (id) => {
  console.log(`Obteniendo semestre con ID: '${id}'...`);
  try {
    const semestre = await SemestreENT.findByPk(id);
    if (!semestre) {
      console.log(`Semestre con ID: '${id}' no existe.`);
      return new ResponseDTO(
        "S-2000",
        null,
        `Semestre con ID: '${id}' no existe.`
      );
    }
    console.log("Semestre obtenido correctamente.");
    return new ResponseDTO(
      "S-0000",
      semestre,
      "Semestre obtenido correctamente."
    );
  } catch (error) {
    console.error(`Error al obtener semestre con ID: '${id}': `, error);
    return new ResponseDTO(
      "S-2000",
      null,
      `Error al obtener semestre con ID: '${id}'.`
    );
  }
};

const create = async (codigosemestre) => {
  console.log(`Creando un nuevo semestre con código: '${codigosemestre}'...`);
  try {
    const nuevoSemestre = await SemestreENT.create({ codigosemestre });
    return new ResponseDTO(
      "S-0000",
      nuevoSemestre,
      `Nuevo semestre '${codigosemestre}' creado correctamente.`
    );
  } catch (error) {
    console.error(
      `Error al crear nuevo semestre: '${codigosemestre}': `,
      error
    );
    return new ResponseDTO(
      "S-3000",
      null,
      `Error al crear nuevo semestre: '${codigosemestre}'.`
    );
  }
};

const update = async (id, codigosemestre) => {
  console.log(`Actualizando semestre con ID: '${id}'...`);
  try {
    const semestre = await SemestreENT.findByPk(id);
    if (!semestre) {
      console.log(`Semestre con ID: '${id}' no existe.`);
      return new ResponseDTO(
        "S-4000",
        null,
        `Semestre con ID: '${id}' no existe.`
      );
    }
    semestre.codigosemestre = codigosemestre;
    await semestre.save();
    console.log("Semestre actualizado correctamente.");
    return new ResponseDTO(
      "S-0000",
      semestre,
      "Semestre actualizado correctamente."
    );
  } catch (error) {
    console.error(`Error al actualizar semestre con ID: '${id}': `, error);
    return new ResponseDTO(
      "S-4000",
      null,
      `Error al actualizar semestre con ID: '${id}'.`
    );
  }
};

const remove = async (id) => {
  console.log(`Eliminando semestre con ID: '${id}'...`);
  try {
    const semestre = await SemestreENT.findByPk(id);
    if (!semestre) {
      console.log(`Semestre con ID: '${id}' no existe.`);
      return new ResponseDTO(
        "S-5000",
        null,
        `Semestre con ID: '${id}' no existe.`
      );
    }
    await semestre.destroy();
    console.log("Semestre eliminado correctamente.");
    return new ResponseDTO("S-0000", "Semestre eliminado correctamente.");
  } catch (error) {
    console.error(`Error al eliminar semestre con ID: '${id}': `, error);
    return new ResponseDTO(
      "S-5000",
      null,
      `Error al eliminar semestre con ID: '${id}'.`
    );
  }
};

module.exports = { getAll, getById, create, update, remove };
