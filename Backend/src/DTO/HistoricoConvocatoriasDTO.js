/**
 * @openapi
 * components:
 *   schemas:
 *     HistoricoConvocatorias:
 *       type: object
 *       properties:
 *         id_h:
 *           type: integer
 *           description: ID único del registro histórico de convocatoria.
 *           example: 1
 *         id_c:
 *           type: integer
 *           description: ID de la convocatoria.
 *           example: 5
 *         areapasantia:
 *           type: string
 *           description: Área de pasantía.
 *           example: "Desarrollo Web"
 *         descripcionfunciones:
 *           type: string
 *           description: Descripción de las funciones.
 *           example: "Desarrollo de aplicaciones web con React y Node.js."
 *         requisitoscompetencias:
 *           type: string
 *           description: Requisitos y competencias necesarias.
 *           example: "Conocimientos en React, Node.js, Express.js."
 *         horario_inicio:
 *           type: string
 *           format: time
 *           description: Hora de inicio del horario.
 *           example: "09:00:00"
 *         horario_fin:
 *           type: string
 *           format: time
 *           description: Hora de fin del horario.
 *           example: "17:00:00"
 *         fechasolicitud:
 *           type: string
 *           format: date
 *           description: Fecha de solicitud de la convocatoria.
 *           example: "2023-10-01"
 *         fechaseleccionpasante:
 *           type: string
 *           format: date
 *           description: Fecha de selección del pasante.
 *           example: "2023-10-15"
 *         accion:
 *           type: string
 *           description: Acción realizada en el registro histórico.
 *           example: "CREATED"
 *         fecha_accion:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de la acción.
 *           example: "2023-10-22T18:25:43.511Z"
 *         estadoconvocatoria_id:
 *           $ref: "#/components/schemas/EstadoConvocatoria"
 *         institucion_id:
 *           $ref: "#/components/schemas/Institucion"
 *         tiempoacumplir_id:
 *           $ref: "#/components/schemas/TiempoACumplir"
 *       required:
 *         - id_h
 *         - id_c
 *         - areapasantia
 *         - descripcionfunciones
 *         - requisitoscompetencias
 *         - horario_inicio
 *         - horario_fin
 *         - fechasolicitud
 *         - fechaseleccionpasante
 *         - accion
 *         - fecha_accion
 *         - estadoconvocatoria_id
 *         - institucion_id
 *         - tiempoacumplir_id
 */
class HistoricoConvocatoriasDTO {
    constructor(id_h, id_c, areapasantia, descripcionfunciones, requisitoscompetencias, horario_inicio, horario_fin, fechasolicitud, fechaseleccionpasante, accion, fecha_accion, estadoconvocatoria_id, institucion_id, tiempoacumplir_id) {
        this.id_h = id_h;
        this.id_c = id_c;
        this.areapasantia = areapasantia;
        this.descripcionfunciones = descripcionfunciones;
        this.requisitoscompetencias = requisitoscompetencias;
        this.horario_inicio = horario_inicio;
        this.horario_fin = horario_fin;
        this.fechasolicitud = fechasolicitud;
        this.fechaseleccionpasante = fechaseleccionpasante;
        this.accion = accion;
        this.fecha_accion = fecha_accion;
        this.estadoconvocatoria_id = estadoconvocatoria_id; 
        this.institucion_id = institucion_id; 
        this.tiempoacumplir_id = tiempoacumplir_id; 
    }
}

module.exports = HistoricoConvocatoriasDTO;





