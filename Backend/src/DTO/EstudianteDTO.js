/**
 * @openapi
 * components:
 *   schemas:
 *     Estudiante:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del estudiante.
 *           example: 1
 *         usuario_id:
 *           type: integer
 *           description: ID del usuario asociado al estudiante.
 *           example: 2
 *         nombres:
 *           type: string
 *           description: Nombres del estudiante.
 *           example: "Juan"
 *         apellidopaterno:
 *           type: string
 *           description: Apellido paterno del estudiante.
 *           example: "Perez"
 *         apellidomaterno:
 *           type: string
 *           description: Apellido materno del estudiante.
 *           example: "Sanchez"
 *         carnetidentidad:
 *           type: string
 *           description: Carné de identidad del estudiante.
 *           example: "1234567"
 *         correoelectronico:
 *           type: string
 *           description: Correo electrónico del estudiante.
 *           example: "juan@example.com"
 *         celularcontacto:
 *           type: string
 *           description: Número de celular de contacto del estudiante.
 *           example: "+1234567890"
 *         graduado:
 *           type: boolean
 *           description: Indica si el estudiante ha graduado.
 *           example: true
 *         carrera_id:
 *           type: integer
 *           description: ID de la carrera en la que el estudiante se encuentra inscrito.
 *           example: 3
 *         semestre_id:
 *           type: integer
 *           description: ID del semestre en el que el estudiante se encuentra.
 *           example: 2
 *         sede_id:
 *           type: integer
 *           description: ID de la sede en la que el estudiante estudia.
 *           example: 1
 *         aniograduacion:
 *           type: integer
 *           description: Año de graduación del estudiante (si está graduado).
 *           example: 2023
 *         linkcurriculumvitae:
 *           type: string
 *           description: Enlace al currículum vitae del estudiante.
 *           example: "https://example.com/cv/juanperez"
 *       required:
 *         - id
 *         - usuario_id
 *         - nombres
 *         - apellidopaterno
 *         - apellidomaterno
 *         - carnetidentidad
 *         - correoelectronico
 *         - celularcontacto
 *         - graduado
 *         - carrera_id
 *         - semestre_id
 *         - sede_id
 *         - linkcurriculumvitae
 */

class EstudianteDTO {
    constructor(id, usuario_id, nombres, apellidopaterno, apellidomaterno, carnetidentidad, correoelectronico, celularcontacto, graduado, carrera_id, semestre_id, sede_id, aniograduacion, linkcurriculumvitae) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.nombres = nombres;
        this.apellidopaterno = apellidopaterno;
        this.apellidomaterno = apellidomaterno;
        this.carnetidentidad = carnetidentidad;
        this.correoelectronico = correoelectronico;
        this.celularcontacto = celularcontacto;
        this.graduado = graduado;
        this.carrera_id = carrera_id;
        this.semestre_id = semestre_id;
        this.sede_id = sede_id;
        this.aniograduacion = aniograduacion;
        this.linkcurriculumvitae = linkcurriculumvitae;
    }
}

module.exports = EstudianteDTO;
