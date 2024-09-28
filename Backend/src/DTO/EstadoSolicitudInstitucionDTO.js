/**
 * @openapi
 * components:
 *   schemas:
 *     EstadoSolicitudInstitucion:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del estado de solicitud de institución.
 *           example: 1
 *         fechaaprobacion:
 *           type: string
 *           format: date
 *           description: Fecha de aprobación del estado de solicitud.
 *           example: "2023-10-27"
 *         estadosolicitud:
 *           type: string
 *           description: Estado de la solicitud de institución.
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
 *         institucion:
 *           type: object
 *           description: Información de la institución relacionada con el estado de solicitud.
 *           properties:
 *             id:
 *               type: integer
 *               description: ID único de la institución.
 *               example: 3
 *             nombre:
 *               type: string
 *               description: Nombre de la institución.
 *               example: "Universidad XYZ"
 *       required:
 *         - id
 *         - fechaaprobacion
 *         - estadosolicitud
 *         - adminusei
 *         - institucion
 */

class EstadoSolicitudInstitucionDTO {
    constructor(id, fechaaprobacion, estadosolicitud, adminusei, institucion) {
      this.id = id;
      this.fechaaprobacion = fechaaprobacion;
      this.estadosolicitud = estadosolicitud;
      this.adminusei = adminusei;
      this.institucion = institucion;
    }
  }
  
  module.exports = EstadoSolicitudInstitucionDTO;
  