/**
 * @openapi
 * components:
 *   schemas:
 *     Postulacion:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la postulación.
 *           example: 1
 *         fechapostulacion:
 *           type: string
 *           format: date
 *           description: Fecha de postulación.
 *           example: "2023-10-27"
 *         estadopostulacion_id:
 *           type: integer
 *           description: ID del estado de la postulación.
 *           example: 2
 *         estudiante_id:
 *           type: integer
 *           description: ID del estudiante que realizó la postulación.
 *           example: 3
 *         convocatoria_id:
 *           type: integer
 *           description: ID de la convocatoria a la que se postuló.
 *           example: 4
 *       required:
 *         - id
 *         - fechapostulacion
 *         - estadopostulacion_id
 *         - estudiante_id
 *         - convocatoria_id
 */

class PostulacionDTO {
  constructor(
    id,
    fechapostulacion,
    estadopostulacion_id,
    estudiante_id,
    convocatoria_id
  ) {
    this.id = id;
    this.fechapostulacion = fechapostulacion;
    this.estadopostulacion_id = estadopostulacion_id;
    this.estudiante_id = estudiante_id;
    this.convocatoria_id = convocatoria_id;
  }
}

module.exports = PostulacionDTO;
