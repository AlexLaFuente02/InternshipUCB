/**
 * @openapi
 * components:
 *   schemas:
 *     Sede:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la sede.
 *           example: 1
 *         nombresede:
 *           type: string
 *           description: Nombre completo de la sede.
 *           example: La Paz
 *       required:
 *         - id
 *         - nombresede
 */

class SedeDTO {
    constructor(id, nombresede) {
        this.id = id;
        this.nombresede = nombresede;
    }
}

module.exports = SedeDTO;