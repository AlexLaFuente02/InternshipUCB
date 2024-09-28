const HistoricoPostulacionesENT = require("../ENT/HistoricoPostulacionesENT");
const HistoricoPostulacionesDTO = require("../DTO/HistoricoPostulacionesDTO");
const ResponseDTO = require("../DTO/ResponseDTO");

const EstadoPostulacionENT = require("../ENT/EstadoPostulacionENT");
const EstudianteENT = require("../ENT/EstudianteENT");
const ConvocatoriaENT = require("../ENT/ConvocatoriaENT");
const EstadoPostulacionDTO = require("../DTO/EstadoPostulacionDTO");
const EstudianteDTO = require("../DTO/EstudianteDTO");
const ConvocatoriaDTO = require("../DTO/ConvocatoriaDTO");

const insertHistoricoPostulacion = async (postulacionData) => {
    console.log('Insertando en historico_postulaciones...');
    try {
        await HistoricoPostulacionesENT.create({
            id_p: postulacionData.id,
            fechapostulacion: postulacionData.fechapostulacion,
            estadopostulacion_id: postulacionData.estadopostulacion_id,
            estudiante_id: postulacionData.estudiante_id,
            convocatoria_id: postulacionData.convocatoria_id
        });
        console.log('Insertado en historico_postulaciones correctamente.');
    } catch (error) {
        console.error('Error al insertar en historico_postulaciones:', error);
        throw error;
    }
};

const getAllHistoricosPostulaciones = async () => {
    try {
        const historicos = await HistoricoPostulacionesENT.findAll({
            include: [
                { model: EstadoPostulacionENT, as: 'estadopostulacion' },
                { model: EstudianteENT, as: 'estudiante' },
                { model: ConvocatoriaENT, as: 'convocatoria' }
            ]
        });
        return {
            code: 'HP-0000',
            result: historicos.map(historico => new HistoricoPostulacionesDTO(
                historico.id_h,
                historico.id_p,
                historico.fechapostulacion,
                new EstadoPostulacionDTO(historico.estadopostulacion.id, historico.estadopostulacion.nombreestadopostulacion),
                new EstudianteDTO(
                    historico.estudiante.id,
                    historico.estudiante.usuario_id,
                    historico.estudiante.nombres,
                    historico.estudiante.apellidopaterno,
                    historico.estudiante.apellidomaterno,
                    historico.estudiante.carnetidentidad,
                    historico.estudiante.correoelectronico,
                    historico.estudiante.celularcontacto,
                    historico.estudiante.graduado,
                    historico.estudiante.carrera_id,
                    historico.estudiante.semestre_id,
                    historico.estudiante.sede_id,
                    historico.estudiante.aniograduacion,
                    historico.estudiante.linkcurriculumvitae
                ),
                new ConvocatoriaDTO(
                    historico.convocatoria.id,
                    historico.convocatoria.areapasantia,
                    historico.convocatoria.descripcionfunciones,
                    historico.convocatoria.requisitoscompetencias,
                    historico.convocatoria.horario_inicio,
                    historico.convocatoria.horario_fin,
                    historico.convocatoria.fechasolicitud,
                    historico.convocatoria.fechaseleccionpasante,
                    historico.convocatoria.estadoconvocatoria,
                    historico.convocatoria.institucion,
                    historico.convocatoria.tiempoacumplir
                )
            )),
            message: 'Registros históricos de postulaciones obtenidos correctamente.'
        };
    } catch (error) {
        console.error('Error al obtener todos los registros históricos de postulaciones:', error);
        return new ResponseDTO('H-2002', null, `Error al obtener todos los registros históricos de postulaciones: ${error}`);
    }
};

const getHistoricoPostulacionById = async (id_h) => {
    try {
        const historico = await HistoricoPostulacionesENT.findByPk(id_h, {
            include: [
                { model: EstadoPostulacionENT, as: 'estadopostulacion' },
                { model: EstudianteENT, as: 'estudiante' },
                { model: ConvocatoriaENT, as: 'convocatoria' }
            ]
        });

        if (!historico) {
            return new ResponseDTO('H-2003', null, 'Registro histórico de postulación no encontrado');
        }
        return {
            code: 'HP-0000',
            result: new HistoricoPostulacionesDTO(
                historico.id_h,
                historico.id_p,
                historico.fechapostulacion,
                new EstadoPostulacionDTO(historico.estadopostulacion.id, historico.estadopostulacion.nombreestadopostulacion),
                new EstudianteDTO(
                    historico.estudiante.id,
                    historico.estudiante.usuario_id,
                    historico.estudiante.nombres,
                    historico.estudiante.apellidopaterno,
                    historico.estudiante.apellidomaterno,
                    historico.estudiante.carnetidentidad,
                    historico.estudiante.correoelectronico,
                    historico.estudiante.celularcontacto,
                    historico.estudiante.graduado,
                    historico.estudiante.carrera_id,
                    historico.estudiante.semestre_id,
                    historico.estudiante.sede_id,
                    historico.estudiante.aniograduacion,
                    historico.estudiante.linkcurriculumvitae
                ),
                new ConvocatoriaDTO(
                    historico.convocatoria.id,
                    historico.convocatoria.areapasantia,
                    historico.convocatoria.descripcionfunciones,
                    historico.convocatoria.requisitoscompetencias,
                    historico.convocatoria.horario_inicio,
                    historico.convocatoria.horario_fin,
                    historico.convocatoria.fechasolicitud,
                    historico.convocatoria.fechaseleccionpasante,
                    historico.convocatoria.estadoconvocatoria,
                    historico.convocatoria.institucion,
                    historico.convocatoria.tiempoacumplir
                )
            ),
            message: 'Registro histórico de postulación obtenido correctamente.'
        };
    } catch (error) {
        console.error(`Error al obtener el registro histórico de postulación con ID: ${id_h}.`, error);
        return new ResponseDTO('H-2003', null, `Error al obtener el registro histórico de postulación: ${error}`);
    }
};
module.exports = {
    insertHistoricoPostulacion,
    getAllHistoricosPostulaciones,
    getHistoricoPostulacionById
};
