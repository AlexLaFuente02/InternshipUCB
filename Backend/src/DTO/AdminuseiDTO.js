/**
 * @openapi
 * components:
 *   schemas:
 *     AdminUSEI:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único deL Administrador USEI.
 *           example: 1
 *         usuario_id:
 *           type: integer
 *           description: ID de la cuenta del Administrador USEI.
 *           example: 4
 *       required:
 *         - id
 *         - usuario_id
 */

class AdminuseiDTO {
  constructor(id, usuario_id) {
    this.id = id;
    this.usuario_id = usuario_id;
  }
}

module.exports = AdminuseiDTO;
