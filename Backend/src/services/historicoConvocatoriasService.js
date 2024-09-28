
const HistoricoConvocatoriasENT = require("../ENT/HistoricoConvocatoriasENT");
const HistoricoConvocatoriasDTO = require("../DTO/HistoricoConvocatoriasDTO");
const ResponseDTO = require("../DTO/ResponseDTO");

const EstadoConvocatoriaENT = require("../ENT/EstadoConvocatoriaENT");
const InstitucionENT = require("../ENT/InstitucionENT");
const TiempoAcumplirENT = require("../ENT/TiempoACumplirENT");
const EstadoConvocatoriaDTO = require("../DTO/EstadoConvocatoriaDTO");
const InstitucionDTO = require("../DTO/InstitucionDTO");
const TiempoAcumplirDTO = require("../DTO/TiempoACumplirDTO");

const insertHistoricoConvocatoria = async (convocatoriaData, accion) => {
    console.log('Insertando en historico_convocatorias...');
    try {
        await HistoricoConvocatoriasENT.create({
            id_c: convocatoriaData.id,
            areapasantia: convocatoriaData.areapasantia,
            descripcionfunciones: convocatoriaData.descripcionfunciones,
            requisitoscompetencias: convocatoriaData.requisitoscompetencias,
            horario_inicio: convocatoriaData.horario_inicio,
            horario_fin: convocatoriaData.horario_fin,
            fechasolicitud: convocatoriaData.fechasolicitud,
            fechaseleccionpasante: convocatoriaData.fechaseleccionpasante,
            estadoconvocatoria_id: convocatoriaData.estadoconvocatoria_id,
            institucion_id: convocatoriaData.institucion_id,
            tiempoacumplir_id: convocatoriaData.tiempoacumplir_id,
            accion: accion,
            fecha_accion: new Date() // Fecha y hora actual
        });
        console.log('Insertado en historico_convocatorias correctamente.');
    } catch (error) {
        console.error('Error al insertar en historico_convocatorias:', error);
        throw error;
    }
};
const getAllHistoricos = async () => {
    try {
        const historicos = await HistoricoConvocatoriasENT.findAll({
            include: [
                { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
                { model: InstitucionENT, as: 'institucion' },
                { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
            ]
        });
        return {
            code: 'HC-0000',
            result: historicos.map(historico => new HistoricoConvocatoriasDTO(
                historico.id_h,
                historico.id_c,
                historico.areapasantia,
                historico.descripcionfunciones,
                historico.requisitoscompetencias,
                historico.horario_inicio,
                historico.horario_fin,
                historico.fechasolicitud,
                historico.fechaseleccionpasante,
                historico.accion,
                historico.fecha_accion,
                new EstadoConvocatoriaDTO(historico.estadoconvocatoria.id, historico.estadoconvocatoria.nombreestadoconvocatoria),
                new InstitucionDTO(historico.institucion.id, historico.institucion.nombreinstitucion),
                new TiempoAcumplirDTO(historico.tiempoacumplir.id, historico.tiempoacumplir.descripcion)
            )),
            message: 'Registros históricos obtenidos correctamente.'
        };
    } catch (error) {
        console.error('Error al obtener todos los registros históricos:', error);
        return new ResponseDTO('H-1002', null, `Error al obtener todos los registros históricos: ${error}`);
    }
};

const getHistoricoById = async (id_h) => {
    try {
        const historico = await HistoricoConvocatoriasENT.findByPk(id_h, {
            include: [
                { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
                { model: InstitucionENT, as: 'institucion' },
                { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
            ]
        });

        if (!historico) {
            return new ResponseDTO('H-1003', null, 'Registro histórico no encontrado');
        }
        return {
            code: 'HC-0000',
            result: new HistoricoConvocatoriasDTO(
                historico.id_h,
                historico.id_c,
                historico.areapasantia,
                historico.descripcionfunciones,
                historico.requisitoscompetencias,
                historico.horario_inicio,
                historico.horario_fin,
                historico.fechasolicitud,
                historico.fechaseleccionpasante,
                historico.accion,
                historico.fecha_accion,
                new EstadoConvocatoriaDTO(historico.estadoconvocatoria.id, historico.estadoconvocatoria.nombreestadoconvocatoria),
                new InstitucionDTO(historico.institucion.id, historico.institucion.nombreinstitucion),
                new TiempoAcumplirDTO(historico.tiempoacumplir.id, historico.tiempoacumplir.descripcion)
            ),
            message: 'Registro histórico obtenido correctamente.'
        };
    } catch (error) {
        console.error(`Error al obtener el registro histórico con ID: ${id_h}.`, error);
        return new ResponseDTO('H-1003', null, `Error al obtener el registro histórico: ${error}`);
    }
};

module.exports = {
    insertHistoricoConvocatoria,
    getAllHistoricos,
    getHistoricoById
};
