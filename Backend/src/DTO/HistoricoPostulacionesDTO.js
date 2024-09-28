/**
 * @openapi
 * components:
 *   schemas:
 *     HistoricoPostulaciones:
 *       type: object
 *       properties:
 *         id_h:
 *           type: integer
 *           description: ID único del registro histórico de postulación.
 *           example: 1
 *         id_p:
 *           type: integer
 *           description: ID de la postulación.
 *           example: 10
 *         fechapostulacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de la postulación.
 *           example: "2023-10-22T18:25:43.511Z"
 *         estadopostulacion:
 *           $ref: "#/components/schemas/EstadoPostulacion"
 *         estudiante:
 *           $ref: "#/components/schemas/Estudiante"
 *         convocatoria:
 *           $ref: "#/components/schemas/Convocatoria"
 *       required:
 *         - id_h
 *         - id_p
 *         - fechapostulacion
 *         - estadopostulacion
 *         - estudiante
 *         - convocatoria
 */
class HistoricoPostulacionesDTO {
    constructor(id_h, id_p, fechapostulacion, estadopostulacion, estudiante, convocatoria) {
        this.id_h = id_h;
        this.id_p = id_p;
        this.fechapostulacion = fechapostulacion;
        this.estadopostulacion = estadopostulacion;
        this.estudiante = estudiante;
        this.convocatoria = convocatoria;
    }
}

module.exports = HistoricoPostulacionesDTO;
