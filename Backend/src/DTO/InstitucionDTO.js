/**
 * @openapi
 * components:
 *   schemas:
 *     Institucion:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la institución.
 *         nombreinstitucion:
 *           type: string
 *           description: Nombre de la institución.
 *         reseniainstitucion:
 *           type: string
 *           description: Reseña o descripción de la institución.
 *         logoinstitucion:
 *           type: string
 *           description: Logo o imagen representativa de la institución.
 *           nullable: true
 *         nombrecontacto:
 *           type: string
 *           description: Nombre del contacto principal de la institución.
 *         correocontacto:
 *           type: string
 *           description: Correo electrónico del contacto principal.
 *         celularcontacto:
 *           type: string
 *           description: Número de celular del contacto principal.
 *         usuario:
 *            $ref: "#/components/schemas/Usuario"
 *         sectorpertenencia:
 *           $ref: "#/components/schemas/SectorPertenencia"
 *       required:
 *         - id
 *         - nombreinstitucion
 *         - reseniainstitucion
 *         - nombrecontacto
 *         - correocontacto
 *         - celularcontacto
 *         - usuario
 *         - sectorpertenencia
 */
class InstitucionDTO {
  constructor(id, nombreinstitucion, reseniainstitucion, logoinstitucion, nombrecontacto, correocontacto, celularcontacto,estado, usuario, sectorpertenencia, totalPostulaciones) {
    this.id = id;
    this.nombreinstitucion = nombreinstitucion;
    this.reseniainstitucion = reseniainstitucion;
    this.logoinstitucion = logoinstitucion;
    this.nombrecontacto = nombrecontacto;
    this.correocontacto = correocontacto;
    this.celularcontacto = celularcontacto;
    this.estado = estado; 
    this.usuario = usuario;
    this.sectorpertenencia = sectorpertenencia;
    this.totalPostulaciones = totalPostulaciones;
  }
}

module.exports = InstitucionDTO;
