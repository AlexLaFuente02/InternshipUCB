/**
 * @openapi
 * components:
 *   schemas:
 *     Carrera:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la carrera.
 *           example: 1
 *         nombrecarrera:
 *           type: string
 *           description: Nombre de la carrera.
 *           example: "Ingeniería Informática"
 *       required:
 *         - id
 *         - nombrecarrera
 */

class CarreraDTO {
  constructor(id, nombrecarrera) {
    this.id = id;
    this.nombrecarrera = nombrecarrera;
  }
}

module.exports = CarreraDTO;
