/**
 * @openapi
 * components:
 *   schemas:
 *     EstadoPostulacion:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del estado de la solicitud de postulación a la convocatoria.
 *           example: 1
 *         nombreestadopostulacion:
 *           type: string
 *           description: Nombre del estado de la solicitud de postulación a la convocatoria.
 *           example: APROBADO
 *       required:
 *         - id
 *         - nombreestadopostulacion
 */

// Data Transfer Object of EstadoPostulacion Table
class EstadoPostulacionDTO {
  constructor(id, nombreestadopostulacion) {
    this.id = id;
    this.nombreestadopostulacion = nombreestadopostulacion;
  }
}
module.exports = EstadoPostulacionDTO;