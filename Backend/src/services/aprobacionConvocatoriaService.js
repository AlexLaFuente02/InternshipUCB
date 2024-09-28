const AprobacionConvocatoriaENT = require("../ENT/AprobacionConvocatoriaENT");
const AdminuseiENT = require("../ENT/AdminuseiENT");
const AdminuseiDTO = require('../DTO/AdminuseiDTO');
const ConvocatoriaENT = require("../ENT/ConvocatoriaENT");
const ConvocatoriaDTO = require('../DTO/ConvocatoriaDTO');
const ResponseDTO = require("../DTO/ResponseDTO");
const EstadoConvocatoriaENT = require("../ENT/EstadoConvocatoriaENT");
const EstadoConvocatoriaDTO = require('../DTO/EstadoConvocatoriaDTO');
const InstitucionENT = require("../ENT/InstitucionENT");
const InstitucionDTO = require('../DTO/InstitucionDTO');
const TiempoAcumplirENT = require("../ENT/TiempoACumplirENT");
const TiempoAcumplirDTO = require('../DTO/TiempoACumplirDTO');

const getAllAprobaciones = async () => {
    console.log('Obteniendo todas las aprobaciones...');
    try {
        const aprobaciones = await AprobacionConvocatoriaENT.findAll({
            include: [
                { model: AdminuseiENT, as: 'adminusei' },
                { 
                    model: ConvocatoriaENT, 
                    as: 'convocatoria',
                    include: [
                        { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
                        { model: InstitucionENT, as: 'institucion' },
                        { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
                    ]
                }
            ]
        });
        const aprobacionesDTO = aprobaciones.map(aprobacion => {
            const adminDTO = new AdminuseiDTO(aprobacion.adminusei.id, aprobacion.adminusei.usuario_id);
            const estadoDTO = new EstadoConvocatoriaDTO(aprobacion.convocatoria.estadoconvocatoria.id, aprobacion.convocatoria.estadoconvocatoria.nombreestadoconvocatoria);
            const institucionDTO = new InstitucionDTO(aprobacion.convocatoria.institucion.id, aprobacion.convocatoria.institucion.nombreinstitucion);
            const tiempoDTO = new TiempoAcumplirDTO(aprobacion.convocatoria.tiempoacumplir.id, aprobacion.convocatoria.tiempoacumplir.descripcion);
            const convocatoriaDTO = new ConvocatoriaDTO(
                aprobacion.convocatoria.id,
                aprobacion.convocatoria.areapasantia,
                aprobacion.convocatoria.descripcionfunciones,
                aprobacion.convocatoria.requisitoscompetencias,
                aprobacion.convocatoria.horario_inicio,
                aprobacion.convocatoria.horario_fin,
                aprobacion.convocatoria.fechasolicitud,
                aprobacion.convocatoria.fechaseleccionpasante,
                estadoDTO,
                institucionDTO,
                tiempoDTO
            );
            return {
                id: aprobacion.id,
                fechaaprobacion: aprobacion.fechaaprobacion,
                estado: aprobacion.estado,
                adminusei: adminDTO,
                convocatoria: convocatoriaDTO
            };
        });
        console.log('Aprobaciones obtenidas correctamente.');
        return new ResponseDTO('A-0000', aprobacionesDTO, 'Aprobaciones obtenidas correctamente');
    } catch (error) {
        console.error('Error al obtener todas las aprobaciones:', error);
        return new ResponseDTO('A-1001', null, `Error al obtener todas las aprobaciones: ${error}`);
    }
};

const getAprobacionById = async (id) => {
    console.log(`Obteniendo la aprobación con ID: ${id}...`);
    try {
        const aprobacion = await AprobacionConvocatoriaENT.findByPk(id, {
            include: [
                { model: AdminuseiENT, as: 'adminusei' },
                { 
                    model: ConvocatoriaENT, 
                    as: 'convocatoria',
                    include: [
                        { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
                        { model: InstitucionENT, as: 'institucion' },
                        { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
                    ]
                }
            ]
        });
        if (!aprobacion) {
            console.log(`Aprobación con ID: ${id} no encontrada.`);
            return new ResponseDTO('A-1002', null, 'Aprobación no encontrada');
        }
        const adminDTO = new AdminuseiDTO(aprobacion.adminusei.id, aprobacion.adminusei.usuario_id);
        const estadoDTO = new EstadoConvocatoriaDTO(aprobacion.convocatoria.estadoconvocatoria.id, aprobacion.convocatoria.estadoconvocatoria.nombreestadoconvocatoria);
        const institucionDTO = new InstitucionDTO(aprobacion.convocatoria.institucion.id, aprobacion.convocatoria.institucion.nombreinstitucion);
        const tiempoDTO = new TiempoAcumplirDTO(aprobacion.convocatoria.tiempoacumplir.id, aprobacion.convocatoria.tiempoacumplir.descripcion);
        const convocatoriaDTO = new ConvocatoriaDTO(
            aprobacion.convocatoria.id,
            aprobacion.convocatoria.areapasantia,
            aprobacion.convocatoria.descripcionfunciones,
            aprobacion.convocatoria.requisitoscompetencias,
            aprobacion.convocatoria.horario_inicio,
            aprobacion.convocatoria.horario_fin,
            aprobacion.convocatoria.fechasolicitud,
            aprobacion.convocatoria.fechaseleccionpasante,
            estadoDTO,
            institucionDTO,
            tiempoDTO
        );
        return new ResponseDTO('A-0000', {
            id: aprobacion.id,
            fechaaprobacion: aprobacion.fechaaprobacion,
            estado: aprobacion.estado,
            adminusei: adminDTO,
            convocatoria: convocatoriaDTO
        }, 'Aprobación obtenida correctamente');
    } catch (error) {
        console.error(`Error al obtener la aprobación con ID: ${id}.`, error);
        return new ResponseDTO('A-1002', null, `Error al obtener la aprobación: ${error}`);
    }
};

const createAprobacion = async (data) => {
    console.log('Creando una nueva aprobación...');
    try {
        const aprobacion = await AprobacionConvocatoriaENT.create({
            fechaaprobacion: data.fechaaprobacion,
            estado: data.estado,
            adminusei_id: data.adminusei.id,
            convocatoria_id: data.convocatoria.id
        });
        const adminDTO = new AdminuseiDTO(data.adminusei.id, data.adminusei.usuario_id);
        const convocatoriaDTO = new ConvocatoriaDTO(
            data.convocatoria.id,
            data.convocatoria.areapasantia,
            data.convocatoria.descripcionfunciones,
            data.convocatoria.requisitoscompetencias,
            data.convocatoria.horario_inicio,
            data.convocatoria.horario_fin,
            data.convocatoria.fechasolicitud,
            data.convocatoria.fechaseleccionpasante,
            data.convocatoria.estadoconvocatoria,
            data.convocatoria.institucion,
            data.convocatoria.tiempoacumplir
        );
        console.log('Aprobación creada correctamente.');
        return new ResponseDTO('A-0000', {
            id: aprobacion.id,
            fechaaprobacion: aprobacion.fechaaprobacion,
            estado: aprobacion.estado,
            adminusei: adminDTO,
            convocatoria: convocatoriaDTO
        }, 'Aprobación creada correctamente');
    } catch (error) {
        console.error('Error al crear la aprobación:', error);
        return new ResponseDTO('A-1003', null, `Error al crear la aprobación: ${error}`);
    }
};

const updateAprobacion = async (id, data) => {
    console.log(`Actualizando la aprobación con ID: ${id}...`);
    try {
        const aprobacion = await AprobacionConvocatoriaENT.findByPk(id);
        if (!aprobacion) {
            console.log(`Aprobación con ID: ${id} no encontrada.`);
            return new ResponseDTO('A-1004', null, 'Aprobación no encontrada');
        }
        await aprobacion.update({
            fechaaprobacion: data.fechaaprobacion,
            estado: data.estado,
            adminusei_id: data.adminusei.id,
            convocatoria_id: data.convocatoria.id
        });
        const adminDTO = new AdminuseiDTO(data.adminusei.id, data.adminusei.usuario_id);
        const convocatoriaDTO = new ConvocatoriaDTO(
            data.convocatoria.id,
            data.convocatoria.areapasantia,
            data.convocatoria.descripcionfunciones,
            data.convocatoria.requisitoscompetencias,
            data.convocatoria.horario_inicio,
            data.convocatoria.horario_fin,
            data.convocatoria.fechasolicitud,
            data.convocatoria.fechaseleccionpasante,
            data.convocatoria.estadoconvocatoria,
            data.convocatoria.institucion,
            data.convocatoria.tiempoacumplir
        );
        console.log('Aprobación actualizada correctamente.');
        return new ResponseDTO('A-0000', {
            id: aprobacion.id,
            fechaaprobacion: aprobacion.fechaaprobacion,
            estado: aprobacion.estado,
            adminusei: adminDTO,
            convocatoria: convocatoriaDTO
        }, 'Aprobación actualizada correctamente');
    } catch (error) {
        console.error(`Error al actualizar la aprobación con ID: ${id}.`, error);
        return new ResponseDTO('A-1004', null, `Error al actualizar la aprobación: ${error}`);
    }
};

const deleteAprobacion = async (id) => {
    console.log(`Eliminando la aprobación con ID: ${id}...`);
    try {
        const aprobacion = await AprobacionConvocatoriaENT.findByPk(id);
        if (!aprobacion) {
            console.log(`Aprobación con ID: ${id} no encontrada.`);
            return new ResponseDTO('A-1005', null, 'Aprobación no encontrada');
        }
        await aprobacion.destroy();
        console.log('Aprobación eliminada correctamente.');
        return new ResponseDTO('A-0000', aprobacion, 'Aprobación eliminada correctamente');
    } catch (error) {
        console.error(`Error al eliminar la aprobación con ID: ${id}.`, error);
        return new ResponseDTO('A-1005', null, `Error al eliminar la aprobación: ${error}`);
    }
};

module.exports = {
    getAllAprobaciones,
    getAprobacionById,
    createAprobacion,
    updateAprobacion,
    deleteAprobacion
};