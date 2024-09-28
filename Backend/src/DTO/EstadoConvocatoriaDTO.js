/**
 * @openapi
 * components:
 *   schemas:
 *     EstadoConvocatoria:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del estado de convocatoria.
 *           example: 1
 *         nombreestadoconvocatoria:
 *           type: string
 *           description: Nombre del estado de convocatoria.
 *           example: "En Proceso"
 *       required:
 *         - id
 *         - nombreestadoconvocatoria
 */

class EstadoConvocatoriaDTO {
    constructor(id, nombreestadoconvocatoria) {
      this.id = id;
      this.nombreestadoconvocatoria = nombreestadoconvocatoria;
    }
}

module.exports = EstadoConvocatoriaDTO;
