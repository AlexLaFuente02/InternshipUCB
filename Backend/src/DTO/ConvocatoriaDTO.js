/**
 * @openapi
 * components:
 *   schemas:
 *     Convocatoria:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: El ID de la convocatoria.
 *           example: 1
 *         areapasantia:
 *           type: string
 *           description: El área de pasantía de la convocatoria.
 *           example: "Desarrollo de Software"
 *         descripcionfunciones:
 *           type: string
 *           description: Descripción de las funciones para la pasantía.
 *           example: "Desarrollo de aplicaciones web y móviles."
 *         requisitoscompetencias:
 *           type: string
 *           description: Requisitos y competencias necesarias para la pasantía.
 *           example: "Conocimientos en JavaScript y React."
 *         horario_inicio:
 *           type: string
 *           format: time
 *           description: Hora de inicio de la pasantía.
 *           example: "09:00"
 *         horario_fin:
 *           type: string
 *           format: time
 *           description: Hora de finalización de la pasantía.
 *           example: "17:00"
 *         fechasolicitud:
 *           type: string
 *           format: date
 *           description: Fecha de solicitud de la pasantía.
 *           example: "2023-01-01"
 *         fechaseleccionpasante:
 *           type: string
 *           format: date
 *           description: Fecha de selección del pasante.
 *           example: "2023-01-15"
 *         estadoconvocatoria:
 *           $ref: "#/components/schemas/EstadoConvocatoria"
 *         institucion:
 *           $ref: "#/components/schemas/Institucion"
 *         tiempoacumplir:
 *           $ref: "#/components/schemas/TiempoACumplir"
 *       required:
 *         - id
 *         - areapasantia
 *         - descripcionfunciones
 *         - requisitoscompetencias
 *         - horario_inicio
 *         - horario_fin
 *         - fechasolicitud
 *         - fechaseleccionpasante
 *         - estadoconvocatoria
 *         - institucion
 *         - tiempoacumplir
 */

class ConvocatoriaDTO {
    constructor(id, areapasantia, descripcionfunciones, requisitoscompetencias, horario_inicio, horario_fin, fechasolicitud, fechaseleccionpasante, duracion, estadoconvocatoria, institucion, tiempoacumplir, totalPostulaciones) {
        this.id = id;
        this.areapasantia = areapasantia;
        this.descripcionfunciones = descripcionfunciones;
        this.requisitoscompetencias = requisitoscompetencias;
        this.horario_inicio = horario_inicio;
        this.horario_fin = horario_fin;
        this.fechasolicitud = fechasolicitud;
        this.fechaseleccionpasante = fechaseleccionpasante;
        this.duracion = duracion;
        this.estadoconvocatoria = estadoconvocatoria;
        this.institucion = institucion;
        this.tiempoacumplir = tiempoacumplir;
        this.totalPostulaciones = totalPostulaciones;
    }
}

module.exports = ConvocatoriaDTO;
