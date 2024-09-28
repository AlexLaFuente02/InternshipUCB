const EstadoSolicitudInstitucionENT = require("../ENT/EstadoSolicitudInstitucionENT");
const AdminuseiENT = require("../ENT/AdminuseiENT");
const AdminuseiDTO = require('../DTO/AdminuseiDTO');
const InstitucionENT = require("../ENT/InstitucionENT");
const InstitucionDTO = require('../DTO/InstitucionDTO');
const ResponseDTO = require("../DTO/ResponseDTO");
const EstadoSolicitudInstitucionDTO = require("../DTO/EstadoSolicitudInstitucionDTO");

const getAllEstadoSolicitudInstitucion = async () => {
    console.log('Obteniendo todos los estados de solicitud de institución...');
    try {
        const estados = await EstadoSolicitudInstitucionENT.findAll({
            include: [
                { model: AdminuseiENT, as: 'adminusei' },
                { model: InstitucionENT, as: 'institucion' }
            ]
        });
        const estadosDTO = estados.map(estado => {
            const adminDTO = new AdminuseiDTO(estado.adminusei.id, estado.adminusei.usuario_id);
            const institucionDTO = new InstitucionDTO(estado.institucion.id, estado.institucion.nombreinstitucion);
            return new EstadoSolicitudInstitucionDTO(
                estado.id,
                estado.fechaaprobacion,
                estado.estadosolicitud,
                adminDTO,
                institucionDTO
            );
        });
        console.log('Estados de solicitud de institución obtenidos correctamente.');
        return new ResponseDTO('E-0000', estadosDTO, 'Estados de solicitud de institución obtenidos correctamente');
    } catch (error) {
        console.error('Error al obtener todos los estados de solicitud de institución:', error);
        return new ResponseDTO('E-1001', null, `Error al obtener todos los estados de solicitud de institución: ${error}`);
    }
};

const getEstadoSolicitudInstitucionById = async (id) => {
    console.log(`Obteniendo el estado de solicitud de institución con ID: ${id}...`);
    try {
        const estado = await EstadoSolicitudInstitucionENT.findByPk(id, {
            include: [
                { model: AdminuseiENT, as: 'adminusei' },
                { model: InstitucionENT, as: 'institucion' }
            ]
        });
        if (!estado) {
            console.log(`Estado de solicitud de institución con ID: ${id} no encontrado.`);
            return new ResponseDTO('E-1002', null, 'Estado de solicitud de institución no encontrado');
        }
        const adminDTO = new AdminuseiDTO(estado.adminusei.id, estado.adminusei.usuario_id);
        const institucionDTO = new InstitucionDTO(estado.institucion.id, estado.institucion.nombreinstitucion);
        return new ResponseDTO('E-0000', {
            id: estado.id,
            fechaaprobacion: estado.fechaaprobacion,
            estadosolicitud: estado.estadosolicitud,
            adminusei: adminDTO,
            institucion: institucionDTO
        }, 'Estado de solicitud de institución obtenido correctamente');
    } catch (error) {
        console.error(`Error al obtener el estado de solicitud de institución con ID: ${id}.`, error);
        return new ResponseDTO('E-1002', null, `Error al obtener el estado de solicitud de institución: ${error}`);
    }
};

const createEstadoSolicitudInstitucion = async (data) => {
    console.log('Creando un nuevo estado de solicitud de institución...');
    try {
        const estado = await EstadoSolicitudInstitucionENT.create({
            fechaaprobacion: data.fechaaprobacion,
            estadosolicitud: data.estadosolicitud,
            adminusei_id: data.adminusei.id,
            institucion_id: data.institucion.id
        });
        const adminDTO = new AdminuseiDTO(data.adminusei.id, data.adminusei.usuario_id);
        const institucionDTO = new InstitucionDTO(data.institucion.id, data.institucion.nombreinstitucion);
        console.log('Estado de solicitud de institución creado correctamente.');
        return new ResponseDTO('E-0000', {
            id: estado.id,
            fechaaprobacion: estado.fechaaprobacion,
            estadosolicitud: estado.estadosolicitud,
            adminusei: adminDTO,
            institucion: institucionDTO
        }, 'Estado de solicitud de institución creado correctamente');
    } catch (error) {
        console.error('Error al crear el estado de solicitud de institución:', error);
        return new ResponseDTO('E-1003', null, `Error al crear el estado de solicitud de institución: ${error}`);
    }
};

const updateEstadoSolicitudInstitucion = async (id, data) => {
    console.log(`Actualizando el estado de solicitud de institución con ID: ${id}...`);
    try {
        const estado = await EstadoSolicitudInstitucionENT.findByPk(id);
        if (!estado) {
            console.log(`Estado de solicitud de institución con ID: ${id} no encontrado.`);
            return new ResponseDTO('E-1004', null, 'Estado de solicitud de institución no encontrado');
        }
        await estado.update({
            fechaaprobacion: data.fechaaprobacion,
            estadosolicitud: data.estadosolicitud,
            adminusei_id: data.adminusei.id,
            institucion_id: data.institucion.id
        });
        const adminDTO = new AdminuseiDTO(data.adminusei.id, data.adminusei.usuario_id);
        const institucionDTO = new InstitucionDTO(data.institucion.id, data.institucion.nombreinstitucion);
        console.log('Estado de solicitud de institución actualizado correctamente.');
        return new ResponseDTO('E-0000', {
            id: estado.id,
            fechaaprobacion: estado.fechaaprobacion,
            estadosolicitud: estado.estadosolicitud,
            adminusei: adminDTO,
            institucion: institucionDTO
        }, 'Estado de solicitud de institución actualizado correctamente');
    } catch (error) {
        console.error(`Error al actualizar el estado de solicitud de institución con ID: ${id}.`, error);
        return new ResponseDTO('E-1004', null, `Error al actualizar el estado de solicitud de institución: ${error}`);
    }
};

const deleteEstadoSolicitudInstitucion = async (id) => {
    console.log(`Eliminando el estado de solicitud de institución con ID: ${id}...`);
    try {
        const estado = await EstadoSolicitudInstitucionENT.findByPk(id);
        if (!estado) {
            console.log(`Estado de solicitud de institución con ID: ${id} no encontrado.`);
            return new ResponseDTO('E-1005', null, 'Estado de solicitud de institución no encontrado');
        }
        await estado.destroy();
        console.log('Estado de solicitud de institución eliminado correctamente.');
        return new ResponseDTO('E-0000', estado, 'Estado de solicitud de institución eliminado correctamente');
    } catch (error) {
        console.error(`Error al eliminar el estado de solicitud de institución con ID: ${id}.`, error);
        return new ResponseDTO('E-1005', null, `Error al eliminar el estado de solicitud de institución: ${error}`);
    }
};

module.exports = {
    getAllEstadoSolicitudInstitucion,
    getEstadoSolicitudInstitucionById,
    createEstadoSolicitudInstitucion,
    updateEstadoSolicitudInstitucion,
    deleteEstadoSolicitudInstitucion
};
