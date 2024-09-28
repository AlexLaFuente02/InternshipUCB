const SectorPertenenciaENT = require('../ENT/sectorPertenenciaENT');
const SectorPertenenciaDTO = require('../DTO/sectorPertenenciaDTO');
const ResponseDTO = require('../DTO/ResponseDTO');

const getAll = async () => {
  console.log('Obteniendo todos los sectores de pertenencia...');
  try {
    const sectoresPertenencia = await SectorPertenenciaENT.findAll();
    const sectoresPertenenciaDTO = sectoresPertenencia.map((sector) => new SectorPertenenciaDTO(sector.id, sector.nombresectorpertenencia));
    console.log('Sectores de pertenencia obtenidos correctamente.');
    return new ResponseDTO('SP-0000', sectoresPertenenciaDTO, 'Sectores de pertenencia obtenidos correctamente');
  } catch (error) {
    console.error('Error al obtener todos los sectores de pertenencia:', error);
    return new ResponseDTO('SP-1001', null, 'Error al obtener todos los sectores de pertenencia');
  }
};

const getById = async (id) => {
  console.log(`Obteniendo el sector de pertenencia con ID: ${id}...`);
  try {
    const sectorPertenencia = await SectorPertenenciaENT.findByPk(id);
    if (!sectorPertenencia) {
      console.log(`Sector de pertenencia con ID: ${id} no encontrado.`);
      return new ResponseDTO('SP-1002', null, 'Sector de pertenencia no encontrado');
    }
    console.log('Sector de pertenencia obtenido correctamente.');
    return new ResponseDTO('SP-0000', new SectorPertenenciaDTO(sectorPertenencia.id, sectorPertenencia.nombresectorpertenencia), 'Sector de pertenencia obtenido correctamente');
  } catch (error) {
    console.error(`Error al obtener el sector de pertenencia con ID: ${id}.`, error);
    return new ResponseDTO('SP-1002', null, 'Error al obtener el sector de pertenencia');
  }
};

const create = async (nombresectorpertenencia) => {
  console.log(`Creando un nuevo sector de pertenencia: ${nombresectorpertenencia}...`);
  try {
    const nuevoSectorPertenencia = await SectorPertenenciaENT.create({ nombresectorpertenencia });
    console.log('Sector de pertenencia creado correctamente.');
    return new ResponseDTO('SP-0000', new SectorPertenenciaDTO(nuevoSectorPertenencia.id, nuevoSectorPertenencia.nombresectorpertenencia), 'Sector de pertenencia creado correctamente');
  } catch (error) {
    console.error(`Error al crear el sector de pertenencia: ${nombresectorpertenencia}.`, error);
    return new ResponseDTO('SP-1003', null, 'Error al crear el sector de pertenencia');
  }
};

const update = async (id, nombresectorpertenencia) => {
  console.log(`Actualizando el sector de pertenencia con ID: ${id}...`);
  try {
    const sectorPertenencia = await SectorPertenenciaENT.findByPk(id);
    if (!sectorPertenencia) {
      console.log(`Sector de pertenencia con ID: ${id} no encontrado.`);
      return new ResponseDTO('SP-1004', null, 'Sector de pertenencia no encontrado');
    }

    sectorPertenencia.nombresectorpertenencia = nombresectorpertenencia;
    await sectorPertenencia.save();

    console.log('Sector de pertenencia actualizado correctamente.');
    return new ResponseDTO('SP-0000', new SectorPertenenciaDTO(sectorPertenencia.id, sectorPertenencia.nombresectorpertenencia), 'Sector de pertenencia actualizado correctamente');
  } catch (error) {
    console.error(`Error al actualizar el sector de pertenencia con ID: ${id}.`, error);
    return new ResponseDTO('SP-1004', null, 'Error al actualizar el sector de pertenencia');
  }
};

const remove = async (id) => {
  console.log(`Eliminando el sector de pertenencia con ID: ${id}...`);
  try {
    const sectorPertenencia = await SectorPertenenciaENT.findByPk(id);
    if (!sectorPertenencia) {
      console.log(`Sector de pertenencia con ID: ${id} no encontrado.`);
      return new ResponseDTO('SP-1005', null, 'Sector de pertenencia no encontrado');
    }

    await sectorPertenencia.destroy();

    console.log('Sector de pertenencia eliminado con éxito.');
    return new ResponseDTO('SP-0000', 'Sector de pertenencia eliminado con éxito');
  } catch (error) {
    console.error(`Error al eliminar el sector de pertenencia con ID: ${id}.`, error);
    return new ResponseDTO('SP-1005', null, 'Error al eliminar el sector de pertenencia');
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
