const EstadoConvocatoriaDTO = require('../DTO/EstadoConvocatoriaDTO');
const EstadoConvocatoria = require("../ENT/EstadoConvocatoriaENT");
const ResponseDTO = require("../DTO/ResponseDTO");

const getAllEstadoConvocatorias = async () => {
    try {
        const estados = await EstadoConvocatoria.findAll();
        const estadosDTO = estados.map(estado => new EstadoConvocatoriaDTO(estado.id, estado.nombreestadoconvocatoria));
        return new ResponseDTO('EC-0000', estadosDTO, 'Estados obtenidos correctamente');
    } catch (error) {
        return new ResponseDTO('EC-1001', null, `Error al obtener los estados: ${error}`);
    }
};

const getEstadoConvocatoriaById = async (id) => {
    try {
        const estado = await EstadoConvocatoria.findByPk(id);
        if (!estado) {
            return new ResponseDTO('EC-1002', null, 'Estado no encontrado');
        }
        const estadoDTO = new EstadoConvocatoriaDTO(estado.id, estado.nombreestadoconvocatoria);
        return new ResponseDTO('EC-0000', estadoDTO, 'Estado obtenido correctamente');
    } catch (error) {
        return new ResponseDTO('EC-1002', null, `Error al obtener el estado: ${error}`);
    }
};

const createEstadoConvocatoria = async (data) => {
    try {
        const estado = await EstadoConvocatoria.create({ nombreestadoconvocatoria: data.nombreestadoconvocatoria });
        const estadoDTO = new EstadoConvocatoriaDTO(estado.id, estado.nombreestadoconvocatoria);
        return new ResponseDTO('EC-0000', estadoDTO, 'Estado creado correctamente');
    } catch (error) {
        return new ResponseDTO('EC-1003', null, `Error al crear el estado: ${error}`);
    }
};

const updateEstadoConvocatoria = async (id, data) => {
    try {
        const estado = await EstadoConvocatoria.findByPk(id);
        if (!estado) {
            return new ResponseDTO('EC-1004', null, 'Estado no encontrado');
        }
        await estado.update({ nombreestadoconvocatoria: data.nombreestadoconvocatoria });

        // Crear el DTO con los datos actualizados
        const estadoDTO = new EstadoConvocatoriaDTO(estado.id, estado.nombreestadoconvocatoria);

        return new ResponseDTO('EC-0000', estadoDTO, 'Estado actualizado correctamente');
    } catch (error) {
        return new ResponseDTO('EC-1004', null, `Error al actualizar el estado: ${error}`);
    }
};

const deleteEstadoConvocatoria = async (id) => {
    try {
        const estado = await EstadoConvocatoria.findByPk(id);
        if (!estado) {
            return new ResponseDTO('EC-1005', null, 'Estado no encontrado');
        }
        await estado.destroy();
        return new ResponseDTO('EC-0000', null, 'Estado eliminado correctamente');
    } catch (error) {
        return new ResponseDTO('EC-1005', null, `Error al eliminar el estado: ${error}`);
    }
};

module.exports = {
    getAllEstadoConvocatorias,
    getEstadoConvocatoriaById,
    createEstadoConvocatoria,
    updateEstadoConvocatoria,
    deleteEstadoConvocatoria
};
