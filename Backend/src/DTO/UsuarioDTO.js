/**
 * @openapi
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del usuario.
 *           example: 1
 *         idusuario:
 *           type: string
 *           description: Identificador único del usuario, nickname.
 *           example: "user123"
 *         tipousuario:
 *           type: object
 *           description: Tipo de usuario asociado.
 *           properties:
 *             id:
 *               type: integer
 *               description: ID único del tipo de usuario.
 *               example: 2
 *             nombre:
 *               type: string
 *               description: Nombre del tipo de usuario.
 *               example: "Administrador"
 *       required:
 *         - id
 *         - idusuario
 *         - tipousuario
 */

class UsuarioDTO {
  constructor(id, idusuario, tipousuario) {
    this.id = id;
    this.idusuario = idusuario;
    this.tipousuario = tipousuario;
  }
}

module.exports = UsuarioDTO;
