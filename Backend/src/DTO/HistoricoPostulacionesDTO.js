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
 *           format: date
 *           description: Fecha de la postulación.
 *           example: "2023-10-22"
 *         accion:
 *           type: string
 *           description: Acción realizada en el histórico (post, put, delete).
 *           example: "post"
 *         fecha_accion:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora en la que se realizó la acción.
 *           example: "2023-10-22T18:25:43.511Z"
 *         estadopostulacion_id:
 *           type: integer
 *           description: ID del estado de la postulación.
 *           example: 1
 *         estudiante_id:
 *           type: integer
 *           description: ID del estudiante asociado.
 *           example: 5
 *         convocatoria_id:
 *           type: integer
 *           description: ID de la convocatoria asociada.
 *           example: 2
 *       required:
 *         - id_h
 *         - id_p
 *         - fechapostulacion
 *         - accion
 *         - fecha_accion
 *         - estadopostulacion_id
 *         - estudiante_id
 *         - convocatoria_id
 */
class HistoricoPostulacionesDTO {
    constructor(
        id_h,
        id_p,
        fechapostulacion,
        accion,
        fecha_accion,
        estadopostulacion_id, 
        estudiante_id,        
        convocatoria_id       
    ) {
        this.id_h = id_h;
        this.id_p = id_p;
        this.fechapostulacion = fechapostulacion;
        this.accion = accion;
        this.fecha_accion = fecha_accion;
        this.estadopostulacion_id = estadopostulacion_id; 
        this.estudiante_id = estudiante_id;               
        this.convocatoria_id = convocatoria_id;           
    }
}

module.exports = HistoricoPostulacionesDTO;
