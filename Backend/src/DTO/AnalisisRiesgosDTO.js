/**
 * @openapi
 * components:
 *   schemas:
 *     AnalisisRiesgos:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del análisis de riesgos.
 *           example: 1
 *         aplicativo_sistema_servicio:
 *           type: string
 *           description: Aplicativo, sistema o servicio evaluado.
 *           example: Gestión de Usuarios
 *         amenaza_vulnerabilidad:
 *           type: string
 *           description: Amenaza o vulnerabilidad detectada.
 *           example: Almacenamiento de Contraseñas en Texto Plano
 *         consecuencia:
 *           type: string
 *           description: Consecuencia potencial de la amenaza o vulnerabilidad.
 *           example: Compromiso de Seguridad de Contraseñas
 *         probabilidad_inherente:
 *           type: integer
 *           description: Probabilidad inherente de la amenaza.
 *           example: 4
 *         impacto_inherente:
 *           type: integer
 *           description: Impacto inherente de la amenaza.
 *           example: 5
 *         riesgo_inherente:
 *           type: integer
 *           description: Nivel de riesgo inherente calculado.
 *           example: 20
 *         nivel_riesgo_inherente:
 *           type: string
 *           description: Nivel de riesgo inherente (Ej. Bajo, Moderado, Alto).
 *           example: Extremo
 *         tratamiento_riesgo_inherente:
 *           type: string
 *           description: Tratamiento propuesto para el riesgo inherente.
 *           example: Eliminar
 *         control:
 *           type: string
 *           description: Control implementado.
 *           example: Hash de Contraseñas
 *         tipo_control:
 *           type: string
 *           description: Tipo de control (Ej. Preventivo, Detectivo).
 *           example: Preventivo
 *         nivel_control:
 *           type: string
 *           description: Nivel de implementación del control.
 *           example: Automático
 *         frecuencia_control:
 *           type: string
 *           description: Frecuencia del control.
 *           example: Por Evento
 *         probabilidad_residual:
 *           type: integer
 *           description: Probabilidad residual de la amenaza.
 *           example: 1
 *         impacto_residual:
 *           type: integer
 *           description: Impacto residual de la amenaza.
 *           example: 2
 *         riesgo_residual:
 *           type: integer
 *           description: Nivel de riesgo residual calculado.
 *           example: 2
 *         nivel_riesgo_residual:
 *           type: string
 *           description: Nivel de riesgo residual (Ej. Bajo, Moderado, Alto).
 *           example: Bajo
 *       required:
 *         - id
 *         - aplicativo_sistema_servicio
 *         - amenaza_vulnerabilidad
 *         - consecuencia
 *         - probabilidad_inherente
 *         - impacto_inherente
 *         - riesgo_inherente
 *         - nivel_riesgo_inherente
 *         - tratamiento_riesgo_inherente
 *         - control
 *         - tipo_control
 *         - nivel_control
 *         - frecuencia_control
 *         - probabilidad_residual
 *         - impacto_residual
 *         - riesgo_residual
 *         - nivel_riesgo_residual
 */

class AnalisisRiesgosDTO {
    constructor(
        id,
        aplicativo_sistema_servicio,
        amenaza_vulnerabilidad,
        consecuencia,
        probabilidad_inherente,
        impacto_inherente,
        riesgo_inherente,
        nivel_riesgo_inherente,
        tratamiento_riesgo_inherente,
        control,
        tipo_control,
        nivel_control,
        frecuencia_control,
        probabilidad_residual,
        impacto_residual,
        riesgo_residual,
        nivel_riesgo_residual
    ) {
        this.id = id;
        this.aplicativo_sistema_servicio = aplicativo_sistema_servicio;
        this.amenaza_vulnerabilidad = amenaza_vulnerabilidad;
        this.consecuencia = consecuencia;
        this.probabilidad_inherente = probabilidad_inherente;
        this.impacto_inherente = impacto_inherente;
        this.riesgo_inherente = riesgo_inherente;
        this.nivel_riesgo_inherente = nivel_riesgo_inherente;
        this.tratamiento_riesgo_inherente = tratamiento_riesgo_inherente;
        this.control = control;
        this.tipo_control = tipo_control;
        this.nivel_control = nivel_control;
        this.frecuencia_control = frecuencia_control;
        this.probabilidad_residual = probabilidad_residual;
        this.impacto_residual = impacto_residual;
        this.riesgo_residual = riesgo_residual;
        this.nivel_riesgo_residual = nivel_riesgo_residual;
    }
}

module.exports = AnalisisRiesgosDTO;
