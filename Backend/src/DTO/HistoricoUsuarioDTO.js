/**
 * @openapi
 * components:
 *   schemas:
 *     HistoricoUsuario:
 *       type: object
 *       properties:
 *         id_h:
 *           type: integer
 *           description: ID único del registro Histórico de Usuario.
 *           example: 1
 *         id_u:
 *           type: integer
 *           description: Identificador único del Usuario.
 *           $ref: "#/components/schemas/Usuario"
 *         idusuario:
 *           type: string
 *           description: ID del Usuario.
 *           example: "osqui_menacho28"
 *         contrasenia:
 *           type: string
 *           description: Contraseña del Usuario.
 *           example: "osquiM2468"
 *         tipousuario_id:
 *           type: integer
 *           description: Identificador del Tipo de Usuario del Usuario.
 *           $ref: "#/components/schemas/TipoUsuario"
 *       required:
 *         - id_h
 *         - id_u
 *         - idusuario
 *         - contrasenia
 *         - tipousuario_id
 */

class HistoricoUsuarioDTO {
  constructor(id_h, id_u, idusuario, contrasenia, tipousuario_id) {
    this.id_h = id_h;
    this.id_u = id_u;
    this.idusuario = idusuario;
    this.contrasenia = contrasenia;
    this.tipousuario_id = tipousuario_id;
  }
}

module.exports = HistoricoUsuarioDTO;
