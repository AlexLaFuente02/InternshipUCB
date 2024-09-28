const ComentarioPostulanteENT = require("../ENT/ComentarioPostulanteENT");
const PostulacionENT = require("../ENT/PostulacionENT");
const ConvocatoriaENT = require("../ENT/ConvocatoriaENT");
const ResponseDTO = require("../DTO/ResponseDTO");
const EstudianteENT = require("../ENT/EstudianteENT");
const EstudianteDTO = require("../DTO/EstudianteDTO");
const EstadoPostulacionENT = require("../ENT/EstadoPostulacionENT");
const EstadoConvocatoriaENT = require("../ENT/EstadoConvocatoriaENT");
const InstitucionENT = require("../ENT/InstitucionENT");
const TiempoAcumplirENT = require("../ENT/TiempoACumplirENT");
const ComentarioConvocatoriaDTO = require("../DTO/ComentarioConvocatoriaDTO");

const getAllComentarios = async () => {
    try {
        const comentarios = await ComentarioPostulanteENT.findAll({
            include: [
                {
                    model: PostulacionENT,
                    as: 'postulacion',
                    include: [
                        {
                            model: EstudianteENT,
                            as: 'estudiante'
                        },
                        { model: ConvocatoriaENT, as: 'convocatoria' },
                        { model: EstadoPostulacionENT, as: 'estadopostulacion' }
                    ]
                },
                { 
                    model: ConvocatoriaENT, 
                    as: 'convocatoria',
                    include: [
                        { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
                        { model: InstitucionENT, as: 'institucion'},
                        { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
                    ]

                }
            ]
        });

        const comentariosDTO = comentarios.map(comentario => (
            new ComentarioConvocatoriaDTO(
                comentario.id,
                comentario.comentario,
                comentario.fecha,
                {
                    id: comentario.postulacion.id,
                    fechapostulacion: comentario.postulacion.fechapostulacion,
                    estadopostulacion: comentario.postulacion.estadopostulacion,
                    estudiante: new EstudianteDTO(
                        comentario.postulacion.estudiante.id,
                        comentario.postulacion.estudiante.usuario_id,
                        comentario.postulacion.estudiante.nombres,
                        comentario.postulacion.estudiante.apellidopaterno,
                        comentario.postulacion.estudiante.apellidomaterno,
                        comentario.postulacion.estudiante.carnetidentidad,
                        comentario.postulacion.estudiante.correoelectronico,
                        comentario.postulacion.estudiante.celularcontacto,
                        comentario.postulacion.estudiante.graduado,
                        comentario.postulacion.estudiante.carrera_id,
                        comentario.postulacion.estudiante.semestre_id,
                        comentario.postulacion.estudiante.sede_id,
                        comentario.postulacion.estudiante.aniograduacion,
                        comentario.postulacion.estudiante.linkcurriculumvitae
                    ),
                    convocatoria: comentario.postulacion.convocatoria
                },
                {
                    id: comentario.convocatoria.id,
                    areapasantia: comentario.convocatoria.areapasantia,
                    descripcionfunciones: comentario.convocatoria.descripcionfunciones,
                    requisitoscompetencias: comentario.convocatoria.requisitoscompetencias,
                    horario_inicio: comentario.convocatoria.horario_inicio,
                    horario_fin: comentario.convocatoria.horario_fin,
                    fecha_solicitud: comentario.convocatoria.fecha_solicitud,
                    fechaslseccionpasante: comentario.convocatoria.fechaslseccionpasante,
                    duracion: comentario.convocatoria.duracion,
                    estadoconvocatoria: comentario.convocatoria.estadoconvocatoria,
                    institucion: comentario.convocatoria.institucion,
                    tiempoacumplir: comentario.convocatoria.tiempoacumplir
                }
            )
        ));

        return new ResponseDTO('C-0000', comentariosDTO, 'Comentarios obtenidos correctamente');
    } catch (error) {
        return new ResponseDTO('C-1001', null, `Error al obtener todos los comentarios: ${error}`);
    }
};

const getComentarioById = async (id) => {
    try {
        const comentario = await ComentarioPostulanteENT.findByPk(id, {
            include: [
                {
                    model: PostulacionENT,
                    as: 'postulacion',
                    include: [
                        {
                            model: EstudianteENT,
                            as: 'estudiante'
                        },
                        { model: ConvocatoriaENT, as: 'convocatoria' },
                        { model: EstadoPostulacionENT, as: 'estadopostulacion' }
                    ]
                },
                { 
                    model: ConvocatoriaENT, 
                    as: 'convocatoria',
                    include: [
                        { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
                        { model: InstitucionENT, as: 'institucion'},
                        { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
                    ]
                }
            ]
        });
        
        if (!comentario) {
            return new ResponseDTO('C-1002', null, 'Comentario no encontrado');
        }

        const postulacionDTO = {
            id: comentario.postulacion.id,
            fechapostulacion: comentario.postulacion.fechapostulacion,
            estadopostulacion: comentario.postulacion.estadopostulacion,
            estudiante: new EstudianteDTO(
                comentario.postulacion.estudiante.id,
                comentario.postulacion.estudiante.usuario_id,
                comentario.postulacion.estudiante.nombres,
                comentario.postulacion.estudiante.apellidopaterno,
                comentario.postulacion.estudiante.apellidomaterno,
                comentario.postulacion.estudiante.carnetidentidad,
                comentario.postulacion.estudiante.correoelectronico,
                comentario.postulacion.estudiante.celularcontacto,
                comentario.postulacion.estudiante.graduado,
                comentario.postulacion.estudiante.carrera_id,
                comentario.postulacion.estudiante.semestre_id,
                comentario.postulacion.estudiante.sede_id,
                comentario.postulacion.estudiante.aniograduacion,
                comentario.postulacion.estudiante.linkcurriculumvitae
            ),
            convocatoria: {
                id: comentario.postulacion.convocatoria.id,
                areapasantia: comentario.postulacion.convocatoria.areapasantia,
                descripcionfunciones: comentario.postulacion.convocatoria.descripcionfunciones,
                requisitoscompetencias: comentario.postulacion.convocatoria.requisitoscompetencias,
                horario_inicio: comentario.postulacion.convocatoria.horario_inicio,
                horario_fin: comentario.postulacion.convocatoria.horario_fin,
                fecha_solicitud: comentario.postulacion.convocatoria.fecha_solicitud,
                fechaslseccionpasante: comentario.postulacion.convocatoria.fechaslseccionpasante,
                duracion: comentario.postulacion.convocatoria.duracion,
                estadoconvocatoria: comentario.postulacion.convocatoria.estadoconvocatoria,
                institucion: comentario.postulacion.convocatoria.institucion,
                tiempoacumplir: comentario.postulacion.convocatoria.tiempoacumplir
            }
        };

        const convocatoriaDTO = {
            id: comentario.convocatoria.id,
            areapasantia: comentario.convocatoria.areapasantia,
            descripcionfunciones: comentario.convocatoria.descripcionfunciones,
            requisitoscompetencias: comentario.convocatoria.requisitoscompetencias,
            horario_inicio: comentario.convocatoria.horario_inicio,
            horario_fin: comentario.convocatoria.horario_fin,
            fecha_solicitud: comentario.convocatoria.fecha_solicitud,
            fechaslseccionpasante: comentario.convocatoria.fechaslseccionpasante,
            duracion: comentario.convocatoria.duracion,
            estadoconvocatoria: comentario.convocatoria.estadoconvocatoria,
            institucion: comentario.convocatoria.institucion,
            tiempoacumplir: comentario.convocatoria.tiempoacumplir
        };

        return new ResponseDTO('C-0000', {
            id: comentario.id,
            comentario: comentario.comentario,
            fecha: comentario.fecha,
            postulacion: postulacionDTO,
            convocatoria: convocatoriaDTO
        }, 'Comentario obtenido correctamente');
    } catch (error) {
        return new ResponseDTO('C-1002', null, `Error al obtener el comentario: ${error}`);
    }
};

const createComentario = async (data) => {
    try {
        const comentario = await ComentarioPostulanteENT.create({
            comentario: data.comentario,
            fecha: data.fecha,
            postulacion_id: data.postulacion.id,
            convocatoria_id: data.convocatoria.id
        });
        return new ResponseDTO('C-0000', {
            id: comentario.id,
            comentario: comentario.comentario,
            fecha: comentario.fecha,
            postulacion: comentario.postulacion,
            convocatoria: comentario.convocatoria
        }, 'Comentario creado correctamente');
    } catch (error) {
        return new ResponseDTO('C-1003', null, `Error al crear el comentario: ${error}`);
    }
};

const updateComentario = async (id, data) => {
    try {
        const comentario = await ComentarioPostulanteENT.findByPk(id);
        if (!comentario) {
            return new ResponseDTO('C-1004', null, 'Comentario no encontrado');
        }
        await comentario.update({
            comentario: data.comentario,
            fecha: data.fecha,
            postulacion_id: data.postulacion.id,
            convocatoria_id: data.convocatoria.id
        });
        return new ResponseDTO('C-0000', {
            id: comentario.id,
            comentario: comentario.comentario,
            fecha: comentario.fecha,
            postulacion: comentario.postulacion,
            convocatoria: comentario.convocatoria
        }, 'Comentario actualizado correctamente');
    } catch (error) {
        return new ResponseDTO('C-1004', null, `Error al actualizar el comentario: ${error}`);
    }
};

const deleteComentario = async (id) => {
    try {
        const comentario = await ComentarioPostulanteENT.findByPk(id);
        if (!comentario) {
            return new ResponseDTO('C-1005', null, 'Comentario no encontrado');
        }
        await comentario.destroy();
        return new ResponseDTO('C-0000', comentario, 'Comentario eliminado correctamente');
    } catch (error) {
        return new ResponseDTO('C-1005', null, `Error al eliminar el comentario: ${error}`);
    }
};

const getComentarioByConvocatoriaId = async (id) => {
    try {
        const comentarios = await ComentarioPostulanteENT.findAll({
            where: { convocatoria_id: id }, 
            include: [
                {
                    model: PostulacionENT,
                    as: 'postulacion',
                    include: [
                        {
                            model: EstudianteENT,
                            as: 'estudiante'
                        },
                        { model: ConvocatoriaENT, as: 'convocatoria' },
                        { model: EstadoPostulacionENT, as: 'estadopostulacion' }
                    ]
                },
                { 
                    model: ConvocatoriaENT, 
                    as: 'convocatoria',
                    include: [
                        { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
                        { model: InstitucionENT, as: 'institucion'},
                        { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
                    ]
                }
            ]
        });
        
        if (!comentarios) {
            return new ResponseDTO('C-1002', null, 'Comentarios no encontrados');
        }

        const comentariosDTO = comentarios.map(comentario => (
            new ComentarioConvocatoriaDTO(
                comentario.id,
                comentario.comentario,
                comentario.fecha,
                {
                    id: comentario.postulacion.id,
                    fechapostulacion: comentario.postulacion.fechapostulacion,
                    estadopostulacion: comentario.postulacion.estadopostulacion,
                    estudiante: new EstudianteDTO(
                        comentario.postulacion.estudiante.id,
                        comentario.postulacion.estudiante.usuario_id,
                        comentario.postulacion.estudiante.nombres,
                        comentario.postulacion.estudiante.apellidopaterno,
                        comentario.postulacion.estudiante.apellidomaterno,
                        comentario.postulacion.estudiante.carnetidentidad,
                        comentario.postulacion.estudiante.correoelectronico,
                        comentario.postulacion.estudiante.celularcontacto,
                        comentario.postulacion.estudiante.graduado,
                        comentario.postulacion.estudiante.carrera_id,
                        comentario.postulacion.estudiante.semestre_id,
                        comentario.postulacion.estudiante.sede_id,
                        comentario.postulacion.estudiante.aniograduacion,
                        comentario.postulacion.estudiante.linkcurriculumvitae
                    ),
                    convocatoria: comentario.postulacion.convocatoria
                },
                {
                    id: comentario.convocatoria.id,
                    areapasantia: comentario.convocatoria.areapasantia,
                    descripcionfunciones: comentario.convocatoria.descripcionfunciones,
                    requisitoscompetencias: comentario.convocatoria.requisitoscompetencias,
                    horario_inicio: comentario.convocatoria.horario_inicio,
                    horario_fin: comentario.convocatoria.horario_fin,
                    fecha_solicitud: comentario.convocatoria.fecha_solicitud,
                    fechaslseccionpasante: comentario.convocatoria.fechaslseccionpasante,
                    duracion: comentario.convocatoria.duracion,
                    estadoconvocatoria: comentario.convocatoria.estadoconvocatoria,
                    institucion: comentario.convocatoria.institucion,
                    tiempoacumplir: comentario.convocatoria.tiempoacumplir
                }
            )
        ));

        return new ResponseDTO('C-0000', comentariosDTO , 'Comentario obtenido correctamente');
    } catch (error) {
        console.error("Error al obtener el comentario: ", error);
        return new ResponseDTO('C-1002', null, `Error al obtener el comentario: ${error}`);
    }
};

module.exports = {
    getAllComentarios,
    getComentarioById,
    createComentario,
    updateComentario,
    deleteComentario,
    getComentarioByConvocatoriaId
};
