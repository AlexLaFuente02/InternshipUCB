/**
 * @openapi
 * components:
 *   schemas:
 *     TiempoACumplir:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del tiempo a cumplir.
 *           example: 1
 *         descripcion:
 *           type: string
 *           description: Descripción del tiempo a cumplir.
 *           example: "Tiempo de prueba"
 *       required:
 *         - id
 *         - descripcion
 */
class TiempoAcumplirDTO {
    constructor(id, descripcion) {
        this.id = id;
        this.descripcion = descripcion;
    }
}

module.exports = TiempoAcumplirDTO;
