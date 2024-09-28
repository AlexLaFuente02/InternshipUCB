const TiempoAcumplirDTO = require('../DTO/TiempoACumplirDTO');
const TiempoAcumplir = require("../ENT/TiempoACumplirENT");
const ResponseDTO = require("../DTO/ResponseDTO");

const getAllTiempoAcumplir = async () => {
    try {
        const tiempos = await TiempoAcumplir.findAll();
        const tiemposDTO = tiempos.map(tiempo => new TiempoAcumplirDTO(tiempo.id, tiempo.descripcion));
        return new ResponseDTO('TA-0000', tiemposDTO, 'Tiempos obtenidos correctamente');
    } catch (error) {
        return new ResponseDTO('TA-1001', null, `Error al obtener todos los tiempos: ${error}`);
    }
};

const getTiempoAcumplirById = async (id) => {
    try {
        const tiempo = await TiempoAcumplir.findByPk(id);
        if (!tiempo) {
            return new ResponseDTO('TA-1002', null, 'Tiempo no encontrado');
        }
        return new ResponseDTO('TA-0000', new TiempoAcumplirDTO(tiempo.id, tiempo.descripcion), 'Tiempo obtenido correctamente');
    } catch (error) {
        return new ResponseDTO('TA-1002', null, `Error al obtener el tiempo: ${error}`);
    }
};

const createTiempoAcumplir = async (data) => {
    try {
        const tiempo = await TiempoAcumplir.create({ descripcion: data.descripcion });
        return new ResponseDTO('TA-0000', new TiempoAcumplirDTO(tiempo.id, tiempo.descripcion), 'Tiempo creado correctamente');
    } catch (error) {
        return new ResponseDTO('TA-1003', null, `Error al crear el tiempo: ${error}`);
    }
};

const updateTiempoAcumplir = async (id, data) => {
    try {
        const tiempo = await TiempoAcumplir.findByPk(id);
        if (!tiempo) {
            return new ResponseDTO('TA-1004', null, 'Tiempo no encontrado');
        }
        await tiempo.update({ descripcion: data.descripcion });
        return new ResponseDTO('TA-0000', new TiempoAcumplirDTO(tiempo.id, tiempo.descripcion), 'Tiempo actualizado correctamente');
    } catch (error) {
        return new ResponseDTO('TA-1004', null, `Error al actualizar el tiempo: ${error}`);
    }
};

const deleteTiempoAcumplir = async (id) => {
    try {
        const tiempo = await TiempoAcumplir.findByPk(id);
        if (!tiempo) {
            return new ResponseDTO('TA-1005', null, 'Tiempo no encontrado');
        }
        await tiempo.destroy();
        return new ResponseDTO('TA-0000', null, 'Tiempo eliminado correctamente');
    } catch (error) {
        return new ResponseDTO('TA-1005', null, `Error al eliminar el tiempo: ${error}`);
    }
};

module.exports = {
    getAllTiempoAcumplir,
    getTiempoAcumplirById,
    createTiempoAcumplir,
    updateTiempoAcumplir,
    deleteTiempoAcumplir
};
