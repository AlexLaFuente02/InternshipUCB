const AnalisisRiesgosENT = require("../ENT/AnalisisRiesgosENT");
const AnalisisRiesgosDTO = require("../DTO/AnalisisRiesgosDTO");
const ResponseDTO = require("../DTO/ResponseDTO");

const getAll = async () => {
    try {
        const riesgos = await AnalisisRiesgosENT.findAll();
        const riesgosDTO = riesgos.map((riesgo) => new AnalisisRiesgosDTO(
            riesgo.id,
            riesgo.aplicativo_sistema_servicio,
            riesgo.amenaza_vulnerabilidad,
            riesgo.consecuencia,
            riesgo.probabilidad_inherente,
            riesgo.impacto_inherente,
            riesgo.riesgo_inherente,
            riesgo.nivel_riesgo_inherente,
            riesgo.tratamiento_riesgo_inherente,
            riesgo.control,
            riesgo.tipo_control,
            riesgo.nivel_control,
            riesgo.frecuencia_control,
            riesgo.probabilidad_residual,
            riesgo.impacto_residual,
            riesgo.riesgo_residual,
            riesgo.nivel_riesgo_residual
        ));
        return new ResponseDTO("AR-0000", riesgosDTO, "Análisis de riesgos obtenidos correctamente.");
    } catch (error) {
        console.error("Error al obtener los análisis de riesgos:", error);
        return new ResponseDTO("AR-1001", null, "Error al obtener los análisis de riesgos.");
    }
};

const getById = async (id) => {
    try {
        const riesgo = await AnalisisRiesgosENT.findByPk(id);
        if (!riesgo) {
            return new ResponseDTO("AR-1002", null, "Análisis de riesgo no encontrado.");
        }
        const riesgoDTO = new AnalisisRiesgosDTO(
            riesgo.id,
            riesgo.aplicativo_sistema_servicio,
            riesgo.amenaza_vulnerabilidad,
            riesgo.consecuencia,
            riesgo.probabilidad_inherente,
            riesgo.impacto_inherente,
            riesgo.riesgo_inherente,
            riesgo.nivel_riesgo_inherente,
            riesgo.tratamiento_riesgo_inherente,
            riesgo.control,
            riesgo.tipo_control,
            riesgo.nivel_control,
            riesgo.frecuencia_control,
            riesgo.probabilidad_residual,
            riesgo.impacto_residual,
            riesgo.riesgo_residual,
            riesgo.nivel_riesgo_residual
        );
        return new ResponseDTO("AR-0000", riesgoDTO, "Análisis de riesgo obtenido correctamente.");
    } catch (error) {
        console.error(`Error al obtener el análisis de riesgo con ID: ${id}.`, error);
        return new ResponseDTO("AR-1002", null, "Error al obtener el análisis de riesgo.");
    }
};

const create = async (data) => {
    try {
        const nuevoRiesgo = await AnalisisRiesgosENT.create(data);
        const riesgoDTO = new AnalisisRiesgosDTO(
            nuevoRiesgo.id,
            nuevoRiesgo.aplicativo_sistema_servicio,
            nuevoRiesgo.amenaza_vulnerabilidad,
            nuevoRiesgo.consecuencia,
            nuevoRiesgo.probabilidad_inherente,
            nuevoRiesgo.impacto_inherente,
            nuevoRiesgo.riesgo_inherente,
            nuevoRiesgo.nivel_riesgo_inherente,
            nuevoRiesgo.tratamiento_riesgo_inherente,
            nuevoRiesgo.control,
            nuevoRiesgo.tipo_control,
            nuevoRiesgo.nivel_control,
            nuevoRiesgo.frecuencia_control,
            nuevoRiesgo.probabilidad_residual,
            nuevoRiesgo.impacto_residual,
            nuevoRiesgo.riesgo_residual,
            nuevoRiesgo.nivel_riesgo_residual
        );
        return new ResponseDTO("AR-0000", riesgoDTO, "Análisis de riesgo creado correctamente.");
    } catch (error) {
        console.error("Error al crear el análisis de riesgo:", error);
        return new ResponseDTO("AR-1003", null, "Error al crear el análisis de riesgo.");
    }
};

const update = async (id, data) => {
    try {
        const riesgo = await AnalisisRiesgosENT.findByPk(id);
        if (!riesgo) {
            return new ResponseDTO("AR-1004", null, "Análisis de riesgo no encontrado.");
        }
        Object.assign(riesgo, data);
        await riesgo.save();
        return new ResponseDTO("AR-0000", new AnalisisRiesgosDTO(
            riesgo.id,
            riesgo.aplicativo_sistema_servicio,
            riesgo.amenaza_vulnerabilidad,
            riesgo.consecuencia,
            riesgo.probabilidad_inherente,
            riesgo.impacto_inherente,
            riesgo.riesgo_inherente,
            riesgo.nivel_riesgo_inherente,
            riesgo.tratamiento_riesgo_inherente,
            riesgo.control,
            riesgo.tipo_control,
            riesgo.nivel_control,
            riesgo.frecuencia_control,
            riesgo.probabilidad_residual,
            riesgo.impacto_residual,
            riesgo.riesgo_residual,
            riesgo.nivel_riesgo_residual
        ), "Análisis de riesgo actualizado correctamente.");
    } catch (error) {
        console.error(`Error al actualizar el análisis de riesgo con ID: ${id}.`, error);
        return new ResponseDTO("AR-1004", null, "Error al actualizar el análisis de riesgo.");
    }
};

const remove = async (id) => {
    try {
        const riesgo = await AnalisisRiesgosENT.findByPk(id);
        if (!riesgo) {
            return new ResponseDTO("AR-1005", null, "Análisis de riesgo no encontrado.");
        }
        await riesgo.destroy();
        return new ResponseDTO("AR-0000", null, "Análisis de riesgo eliminado correctamente.");
    } catch (error) {
        console.error(`Error al eliminar el análisis de riesgo con ID: ${id}.`, error);
        return new ResponseDTO("AR-1005", null, "Error al eliminar el análisis de riesgo.");
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
