// CarreraService.js

const CarreraENT = require("../ENT/CarreraENT");
const CarreraDTO = require("../DTO/CarreraDTO");
const ResponseDTO = require("../DTO/ResponseDTO");

const getAllCarreras = async () => {
  try {
    const carreras = await CarreraENT.findAll();
    const carrerasDTO = carreras.map((carrera) => new CarreraDTO(carrera.id, carrera.nombrecarrera));
    return new ResponseDTO('C-0000', carrerasDTO, 'Carreras obtenidas correctamente');
  } catch (error) {
    return new ResponseDTO('C-1001', null, 'Error al obtener todas las carreras');
  }
};

const getCarreraById = async (id) => {
  try {
    const carrera = await CarreraENT.findByPk(id);
    if (!carrera) {
      return new ResponseDTO('C-1002', null, `Carrera con ID: ${id} no encontrada`);
    }
    const carreraDTO = new CarreraDTO(carrera.id, carrera.nombrecarrera);
    return new ResponseDTO('C-0000', carreraDTO, 'Carrera obtenida correctamente');
  } catch (error) {
    return new ResponseDTO('C-1002', null, `Error al obtener la carrera con ID: ${id}`);
  }
};

const createCarrera = async (nombrecarrera) => {
  try {
    const nuevaCarrera = await CarreraENT.create({ nombrecarrera });
    const carreraDTO = new CarreraDTO(nuevaCarrera.id, nuevaCarrera.nombrecarrera);
    return new ResponseDTO('C-0000', carreraDTO, 'Carrera creada correctamente');
  } catch (error) {
    return new ResponseDTO('C-1003', null, 'Error al crear la carrera');
  }
};

const updateCarrera = async (id, nombrecarrera) => {
  try {
    const carrera = await CarreraENT.findByPk(id);
    if (!carrera) {
      return new ResponseDTO('C-1004', null, `Carrera con ID: ${id} no encontrada`);
    }
    carrera.nombrecarrera = nombrecarrera;
    await carrera.save();
    const carreraDTO = new CarreraDTO(carrera.id, carrera.nombrecarrera);
    return new ResponseDTO('C-0000', carreraDTO, 'Carrera actualizada correctamente');
  } catch (error) {
    return new ResponseDTO('C-1004', null, `Error al actualizar la carrera con ID: ${id}`);
  }
};

const deleteCarrera = async (id) => {
  try {
    const carrera = await CarreraENT.findByPk(id);
    if (!carrera) {
      return new ResponseDTO('C-1005', null, `Carrera con ID: ${id} no encontrada`);
    }
    await carrera.destroy();
    return new ResponseDTO('C-0000', carrera, 'Carrera eliminada correctamente');
  } catch (error) {
    return new ResponseDTO('C-1005', null, `Error al eliminar la carrera con ID: ${id}`);
  }
};

module.exports = {
  getAllCarreras,
  getCarreraById,
  createCarrera,
  updateCarrera,
  deleteCarrera,
};
