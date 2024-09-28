/**
 * @swagger
 * components:
 *   schemas:
 *     ResponseDTO:
 *       type: object
 *       properties:
 *         method:
 *           type: string
 *           description: Método que se llamó.
 *         code:
 *           type: string
 *           description: Código de respuesta.
 *         result:
 *           type: object
 *           description: Resultado de la operación.
 *         message:
 *           type: string
 *           description: Mensaje descriptivo de la respuesta.
 *       required:
 *         - method
 *         - code
 *         - message
 */

class ResponseDTO {
  constructor(code, result, message) {
    this.code = code;
    this.result = result;
    this.message = message;
  }
}

module.exports = ResponseDTO;