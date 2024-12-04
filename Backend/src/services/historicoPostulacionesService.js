const HistoricoPostulacionesENT = require("../ENT/HistoricoPostulacionesENT");
const HistoricoPostulacionesDTO = require("../DTO/HistoricoPostulacionesDTO");
const ResponseDTO = require("../DTO/ResponseDTO");

const EstadoPostulacionENT = require("../ENT/EstadoPostulacionENT");
const EstudianteENT = require("../ENT/EstudianteENT");
const ConvocatoriaENT = require("../ENT/ConvocatoriaENT");
const UsuarioENT = require("../ENT/UsuarioENT"); // Importar UsuarioENT
const EstadoPostulacionDTO = require("../DTO/EstadoPostulacionDTO");
const EstudianteDTO = require("../DTO/EstudianteDTO");
const ConvocatoriaDTO = require("../DTO/ConvocatoriaDTO");
const UsuarioDTO = require("../DTO/UsuarioDTO"); // Importar UsuarioDTO

const insertHistoricoPostulacion = async (postulacionData, accion) => {
    console.log('Insertando en historico_postulaciones...');
    try {
        await HistoricoPostulacionesENT.create({
            id_p: postulacionData.id,
            fechapostulacion: postulacionData.fechapostulacion,
            estadopostulacion_id: postulacionData.estadopostulacion_id,
            estudiante_id: postulacionData.estudiante_id,
            convocatoria_id: postulacionData.convocatoria_id,
            accion: accion, 
            fecha_accion: new Date() 
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
                {
                    model: EstudianteENT,
                    as: 'estudiante',
                    include: [
                        {
                            model: UsuarioENT,
                            as: 'usuario', // Incluimos los datos completos del usuario
                        },
                    ],
                },
                { model: ConvocatoriaENT, as: 'convocatoria' },
            ],
        });

        return {
            code: 'HP-0000',
            result: historicos.map((historico) => {
                const estudiante = historico.estudiante;
                const usuario = estudiante.usuario; // Obtenemos el usuario relacionado

                // Creamos manualmente el sub-JSON del usuario
                const usuarioSubJSON = {
                    id: usuario.id,
                    idusuario: usuario.idusuario,
                    tipousuario: usuario.tipousuario
                        ? {
                              id: usuario.tipousuario.id,
                              nombre: usuario.tipousuario.nombre,
                          }
                        : null,
                    numero_intentos: usuario.numero_intentos,
                    estado: usuario.estado,
                };

                return new HistoricoPostulacionesDTO(
                    historico.id_h,
                    historico.id_p,
                    historico.fechapostulacion,
                    historico.accion,
                    historico.fecha_accion,
                    new EstadoPostulacionDTO(
                        historico.estadopostulacion.id,
                        historico.estadopostulacion.nombreestadopostulacion
                    ),
                    new EstudianteDTO(
                        estudiante.id,
                        usuarioSubJSON, // En lugar de usuario_id, pasamos el sub-JSON completo
                        estudiante.nombres,
                        estudiante.apellidopaterno,
                        estudiante.apellidomaterno,
                        estudiante.carnetidentidad,
                        estudiante.correoelectronico,
                        estudiante.celularcontacto,
                        estudiante.graduado,
                        estudiante.carrera_id,
                        estudiante.semestre_id,
                        estudiante.sede_id,
                        estudiante.aniograduacion,
                        estudiante.linkcurriculumvitae
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
                );
            }),
            message: 'Registros históricos de postulaciones obtenidos correctamente.',
        };
    } catch (error) {
        console.error('Error al obtener todos los registros históricos de postulaciones:', error);
        return new ResponseDTO(
            'H-2002',
            null,
            `Error al obtener todos los registros históricos de postulaciones: ${error}`
        );
    }
};


const getHistoricoPostulacionById = async (id_h) => {
    try {
        const historico = await HistoricoPostulacionesENT.findByPk(id_h, {
            include: [
                { model: EstadoPostulacionENT, as: 'estadopostulacion' },
                { 
                    model: EstudianteENT, 
                    as: 'estudiante',
                    include: [
                        { model: UsuarioENT, as: 'usuario' } // Incluimos el modelo Usuario
                    ]
                },
                { model: ConvocatoriaENT, as: 'convocatoria' }
            ]
        });

        if (!historico) {
            return new ResponseDTO('H-2003', null, 'Registro histórico de postulación no encontrado');
        }

        const estudiante = historico.estudiante;
        const usuario = estudiante.usuario; // Obtenemos el usuario relacionado

        // Creamos manualmente el sub-JSON del usuario
        const usuarioSubJSON = {
            id: usuario.id,
            idusuario: usuario.idusuario,
            tipousuario: usuario.tipousuario
                ? {
                      id: usuario.tipousuario.id,
                      nombre: usuario.tipousuario.nombre,
                  }
                : null,
            numero_intentos: usuario.numero_intentos,
            estado: usuario.estado,
        };

        return {
            code: 'HP-0000',
            result: new HistoricoPostulacionesDTO(
                historico.id_h,
                historico.id_p,
                historico.fechapostulacion,
                historico.accion,
                historico.fecha_accion,
                new EstadoPostulacionDTO(
                    historico.estadopostulacion.id,
                    historico.estadopostulacion.nombreestadopostulacion
                ),
                new EstudianteDTO(
                    estudiante.id,
                    usuarioSubJSON, // En lugar de usuario_id, pasamos el sub-JSON completo
                    estudiante.nombres,
                    estudiante.apellidopaterno,
                    estudiante.apellidomaterno,
                    estudiante.carnetidentidad,
                    estudiante.correoelectronico,
                    estudiante.celularcontacto,
                    estudiante.graduado,
                    estudiante.carrera_id,
                    estudiante.semestre_id,
                    estudiante.sede_id,
                    estudiante.aniograduacion,
                    estudiante.linkcurriculumvitae
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
