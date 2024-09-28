/**
 * @openapi
 * components:
 *   schemas:
 *     Semestre:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del semestre.
 *           example: 1
 *         codigosemestre:
 *           type: string
 *           description: Código del semestre.
 *           example: 2 - 2023
 *       required:
 *         - id
 *         - codigosemestre
 */

// Data Transfer Object of Semestre Table
class SemestreDTO {
  constructor(id, codigosemestre) {
    this.id = id;
    this.codigosemestre = codigosemestre;
  }
}
module.exports = SemestreDTO;