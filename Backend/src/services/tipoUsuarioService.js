const TipoUsuarioENT = require('../ENT/TipoUsuarioENT');
const TipoUsuarioDTO = require('../DTO/TipoUsuarioDTO');
const ResponseDTO = require('../DTO/ResponseDTO');

const getAll = async () => {
  console.log('Obteniendo todos los tipos de usuario...');
  try {
    const tiposUsuarios = await TipoUsuarioENT.findAll();
    // Mapear los resultados a objetos TipoUsuarioDTO
    const tiposUsuariosDTO = tiposUsuarios.map((tipoUsuario) => new TipoUsuarioDTO(tipoUsuario.id, tipoUsuario.tipo));
    console.log('Tipos de usuario obtenidos correctamente.');
    return new ResponseDTO('TU-0000', tiposUsuariosDTO, 'Tipos de usuario obtenidos correctamente');
  } catch (error) {
    console.error('Error al obtener todos los tipos de usuario:', error);
    return new ResponseDTO('TU-1001', null, 'Error al obtener todos los tipos de usuario');
  }
};

const getById = async (id) => {
  console.log(`Obteniendo el tipo de usuario con ID: ${id}...`);
  try {
    const tipoUsuario = await TipoUsuarioENT.findByPk(id);
    if (!tipoUsuario) {
      console.log(`Tipo de usuario con ID: ${id} no encontrado.`);
      return new ResponseDTO('TU-1002', null, 'Tipo de usuario no encontrado');
    }
    console.log('Tipo de usuario obtenido correctamente.');
    return new ResponseDTO('TU-0000', tipoUsuario, 'Tipo de usuario obtenido correctamente');
  } catch (error) {
    console.error(`Error al obtener el tipo de usuario con ID: ${id}.`, error);
    return new ResponseDTO('TU-1002', null, 'Error al obtener el tipo de usuario');
  }
};

const create = async (tipo) => {
  console.log(`Creando un nuevo tipo de usuario: ${tipo}...`);
  try {
    const nuevoTipoUsuario = await TipoUsuarioENT.create({ tipo });
    console.log('Tipo de usuario creado correctamente.');
    return new ResponseDTO('TU-0000', nuevoTipoUsuario, 'Tipo de usuario creado correctamente');
  } catch (error) {
    console.error(`Error al crear el tipo de usuario: ${tipo}.`, error);
    return new ResponseDTO('TU-1003', null, 'Error al crear el tipo de usuario');
  }
};

const update = async (id, tipo) => {
  console.log(`Actualizando el tipo de usuario con ID: ${id}...`);
  try {
    const tipoUsuario = await TipoUsuarioENT.findByPk(id);
    if (!tipoUsuario) {
      console.log(`Tipo de usuario con ID: ${id} no encontrado.`);
      return new ResponseDTO('TU-1004', null, 'Tipo de usuario no encontrado');
    }

    tipoUsuario.tipo = tipo;
    await tipoUsuario.save();

    console.log('Tipo de usuario actualizado correctamente.');
    return new ResponseDTO('TU-0000', tipoUsuario, 'Tipo de usuario actualizado correctamente');
  } catch (error) {
    console.error(`Error al actualizar el tipo de usuario con ID: ${id}.`, error);
    return new ResponseDTO('TU-1004', null, 'Error al actualizar el tipo de usuario');
  }
};

const remove = async (id) => {
  console.log(`Eliminando el tipo de usuario con ID: ${id}...`);
  try {
    const tipoUsuario = await TipoUsuarioENT.findByPk(id);
    if (!tipoUsuario) {
      console.log(`Tipo de usuario con ID: ${id} no encontrado.`);
      return new ResponseDTO('TU-1005', null, 'Tipo de usuario no encontrado');
    }

    await tipoUsuario.destroy();

    console.log('Tipo de usuario eliminado con éxito.');
    return new ResponseDTO('TU-0000', 'Tipo de usuario eliminado con éxito');
  } catch (error) {
    console.error(`Error al eliminar el tipo de usuario con ID: ${id}.`, error);
    return new ResponseDTO('TU-1005', null, 'Error al eliminar el tipo de usuario');
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
