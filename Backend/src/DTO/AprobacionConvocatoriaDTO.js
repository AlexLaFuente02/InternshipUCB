/**
 * @openapi
 * components:
 *   schemas:
 *     AprobacionConvocatoria:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la aprobación de convocatoria.
 *           example: 1
 *         fechaaprobacion:
 *           type: string
 *           format: date
 *           description: Fecha de aprobación de la convocatoria.
 *           example: "2023-10-27"
 *         estado:
 *           type: string
 *           description: Estado de la aprobación.
 *           example: "Aprobada"
 *         adminusei:
 *           type: object
 *           description: Información del administrador que realizó la aprobación.
 *           properties:
 *             id:
 *               type: integer
 *               description: ID único del administrador.
 *               example: 2
 *             nombre:
 *               type: string
 *               description: Nombre del administrador.
 *               example: "John Doe"
 *         convocatoria:
 *           type: object
 *           description: Información de la convocatoria aprobada.
 *           properties:
 *             id:
 *               type: integer
 *               description: ID único de la convocatoria.
 *               example: 3
 *             titulo:
 *               type: string
 *               description: Título de la convocatoria.
 *               example: "Convocatoria de Empleo"
 *       required:
 *         - id
 *         - fechaaprobacion
 *         - estado
 *         - adminusei
 *         - convocatoria
 */

class AprobacionConvocatoriaDTO {
    constructor(id, fechaaprobacion, estado, adminusei, convocatoria) {
      this.id = id;
      this.fechaaprobacion = fechaaprobacion;
      this.estado = estado;
      this.adminusei = adminusei;
      this.convocatoria = convocatoria;
    }
  }
  
  module.exports = AprobacionConvocatoriaDTO;
  