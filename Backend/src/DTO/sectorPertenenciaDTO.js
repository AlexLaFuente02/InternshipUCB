/**
 * @openapi
 * components:
 *   schemas:
 *     SectorPertenencia:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: El ID del sector de pertenencia.
 *           example: 1
 *         nombresectorpertenencia:
 *           type: string
 *           description: El nombre del sector de pertenencia.
 *           example: "Sector 4"
 *       required:
 *         - id
 *         - nombresectorpertenencia
 */

class SectorPertenenciaDTO {
    constructor(id, nombresectorpertenencia) {
      this.id = id;
      this.nombresectorpertenencia = nombresectorpertenencia;
    }
  }
  
  module.exports = SectorPertenenciaDTO;
  