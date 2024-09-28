/**
 * @openapi
 * components:
 *   schemas:
 *     TipoUsuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del tipo de usuario.
 *           example: 1
 *         tipo:
 *           type: string
 *           description: Tipo de usuario.
 *           example: "Administrador"
 *       required:
 *         - id
 *         - tipo
 */

class TipoUsuarioDTO{
    constructor(id, tipo){
        this.id = id;
        this.tipo = tipo;
    }
}
module.exports = TipoUsuarioDTO;