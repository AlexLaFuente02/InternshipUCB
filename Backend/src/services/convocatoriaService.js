const ConvocatoriaDTO = require('../DTO/ConvocatoriaDTO');
const EstadoConvocatoriaDTO = require('../DTO/EstadoConvocatoriaDTO');
const EstadoConvocatoriaENT = require('../ENT/EstadoConvocatoriaENT');
const InstitucionDTO = require('../DTO/InstitucionDTO');
const InstitucionENT = require('../ENT/InstitucionENT');
const TiempoAcumplirDTO = require('../DTO/TiempoACumplirDTO');
const TiempoAcumplirENT = require('../ENT/TiempoACumplirENT');
const ConvocatoriaENT = require("../ENT/ConvocatoriaENT");
const ResponseDTO = require("../DTO/ResponseDTO");
const sequelize = require("../../database/db");

//Para el trigger:
const historicoService = require('./historicoConvocatoriasService');

const getAllConvocatorias = async () => {
    console.log('Obteniendo todas las convocatorias...');
    try {
        const convocatorias = await ConvocatoriaENT.findAll({
            include: [
                { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
                { model: InstitucionENT, as: 'institucion' },
                { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
            ]
        });
        const convocatoriasDTO = convocatorias.map(convocatoria => {
            const estadoDTO = new EstadoConvocatoriaDTO(convocatoria.estadoconvocatoria.id, convocatoria.estadoconvocatoria.nombreestadoconvocatoria);
            const institucionDTO = new InstitucionDTO(convocatoria.institucion.id, convocatoria.institucion.nombreinstitucion);
            const tiempoDTO = new TiempoAcumplirDTO(convocatoria.tiempoacumplir.id, convocatoria.tiempoacumplir.descripcion);
            return new ConvocatoriaDTO(
                convocatoria.id,
                convocatoria.areapasantia,
                convocatoria.descripcionfunciones,
                convocatoria.requisitoscompetencias,
                convocatoria.horario_inicio,
                convocatoria.horario_fin,
                convocatoria.fechasolicitud,
                convocatoria.fechaseleccionpasante,
                convocatoria.duracion,
                estadoDTO,
                institucionDTO,
                tiempoDTO
            );
        });
        console.log('Convocatorias obtenidas correctamente.');
        return new ResponseDTO('C-0000', convocatoriasDTO, 'Convocatorias obtenidas correctamente');
    } catch (error) {
        console.error('Error al obtener todas las convocatorias:', error);
        return new ResponseDTO('C-1001', null, `Error al obtener todas las convocatorias: ${error}`);
    }
};

const getConvocatoriaById = async (id) => {
    console.log(`Obteniendo la convocatoria con ID: ${id}...`);
    try {
        const convocatoria = await ConvocatoriaENT.findByPk(id, {
            include: [
                { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
                { model: InstitucionENT, as: 'institucion' },
                { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
            ]
        });
        if (!convocatoria) {
            console.log(`Convocatoria con ID: ${id} no encontrada.`);
            return new ResponseDTO('C-1002', null, 'Convocatoria no encontrada');
        }
        const estadoDTO = new EstadoConvocatoriaDTO(convocatoria.estadoconvocatoria.id, convocatoria.estadoconvocatoria.nombreestadoconvocatoria);
        const institucionDTO = new InstitucionDTO(convocatoria.institucion.id, convocatoria.institucion.nombreinstitucion);
        const tiempoDTO = new TiempoAcumplirDTO(convocatoria.tiempoacumplir.id, convocatoria.tiempoacumplir.descripcion);
        console.log('Convocatoria obtenida correctamente.');
        return new ResponseDTO('C-0000', new ConvocatoriaDTO(
            convocatoria.id,
            convocatoria.areapasantia,
            convocatoria.descripcionfunciones,
            convocatoria.requisitoscompetencias,
            convocatoria.horario_inicio,
            convocatoria.horario_fin,
            convocatoria.fechasolicitud,
            convocatoria.fechaseleccionpasante,
            convocatoria.duracion,
            estadoDTO,
            institucionDTO,
            tiempoDTO
        ), 'Convocatoria obtenida correctamente');
    } catch (error) {
        console.error(`Error al obtener la convocatoria con ID: ${id}.`, error);
        return new ResponseDTO('C-1002', null, `Error al obtener la convocatoria: ${error}`);
    }
};

const getConvocatoriasPorIdInstitucion = async (idInstitucion) => {
    console.log(`Obteniendo convocatorias para la institución con ID: ${idInstitucion}...`);
    try {
        const convocatorias = await ConvocatoriaENT.findAll({
            where: { institucion_id: idInstitucion },
            include: [
                { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
                { model: InstitucionENT, as: 'institucion' },
                { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
            ]
        });
        
        if (!convocatorias || convocatorias.length === 0) {
            console.log(`No se encontraron convocatorias para la institución con ID: ${idInstitucion}.`);
            return new ResponseDTO('C-1002', null, 'No se encontraron convocatorias para la institución.');
        }
        
        const convocatoriasDTO = convocatorias.map((convocatoria) => {
            const estadoDTO = new EstadoConvocatoriaDTO(convocatoria.estadoconvocatoria.id, convocatoria.estadoconvocatoria.nombreestadoconvocatoria);
            const institucionDTO = new InstitucionDTO(convocatoria.institucion.id, convocatoria.institucion.nombreinstitucion);
        
            const tiempoDTO = new TiempoAcumplirDTO(convocatoria.tiempoacumplir.id, convocatoria.tiempoacumplir.descripcion);
            return new ConvocatoriaDTO(
                convocatoria.id,
                convocatoria.areapasantia,
                convocatoria.descripcionfunciones,
                convocatoria.requisitoscompetencias,
                convocatoria.horario_inicio,
                convocatoria.horario_fin,
                convocatoria.fechasolicitud,
                convocatoria.fechaseleccionpasante,
                convocatoria.duracion,
                estadoDTO,
                institucionDTO, // No incluimos la institución en este caso
                tiempoDTO
            );
        });

        console.log(`Convocatorias obtenidas correctamente para la institución con ID: ${idInstitucion}.`);
        return new ResponseDTO('C-0000', convocatoriasDTO, 'Convocatorias obtenidas correctamente');
    } catch (error) {
        console.error(`Error al obtener las convocatorias para la institución con ID: ${idInstitucion}.`, error);
        return new ResponseDTO('C-1002', null, `Error al obtener las convocatorias: ${error}`);
    }
};


const createConvocatoria = async (data) => {
    console.log('Creando una nueva convocatoria...');
    try {
        const convocatoria = await ConvocatoriaENT.create({
            areapasantia: data.areapasantia,
            descripcionfunciones: data.descripcionfunciones,
            requisitoscompetencias: data.requisitoscompetencias,
            horario_inicio: data.horario_inicio,
            horario_fin: data.horario_fin,
            fechasolicitud: data.fechasolicitud,
            fechaseleccionpasante: data.fechaseleccionpasante,
            duracion: data.duracion,
            estadoconvocatoria_id: data.estadoconvocatoria.id,
            institucion_id: data.institucion.id,
            tiempoacumplir_id: data.tiempoacumplir.id
        });
        // Insertar en historico después de crear la convocatoria
        await historicoService.insertHistoricoConvocatoria(convocatoria.dataValues, 'POST');
        console.log('Convocatoria creada correctamente.');
        return new ResponseDTO('C-0000', new ConvocatoriaDTO(
            convocatoria.id,
            convocatoria.areapasantia,
            convocatoria.descripcionfunciones,
            convocatoria.requisitoscompetencias,
            convocatoria.horario_inicio,
            convocatoria.horario_fin,
            convocatoria.fechasolicitud,
            convocatoria.fechaseleccionpasante,
            convocatoria.duracion,
            new EstadoConvocatoriaDTO(data.estadoconvocatoria.id, data.estadoconvocatoria.nombreestadoconvocatoria),
            new InstitucionDTO(data.institucion.id, data.institucion.nombreinstitucion),
            new TiempoAcumplirDTO(data.tiempoacumplir.id, data.tiempoacumplir.descripcion)
        ), 'Convocatoria creada correctamente');
    } catch (error) {
        console.error('Error al crear la convocatoria:', error);
        return new ResponseDTO('C-1003', null, `Error al crear la convocatoria: ${error}`);
    }
};

const updateConvocatoria = async (id, data) => {
    console.log(`Actualizando la convocatoria con ID: ${id}...`);
    try {
        const convocatoria = await ConvocatoriaENT.findByPk(id);
        if (!convocatoria) {
            console.log(`Convocatoria con ID: ${id} no encontrada.`);
            return new ResponseDTO('C-1004', null, 'Convocatoria no encontrada');
        }
        await convocatoria.update({
            areapasantia: data.areapasantia,
            descripcionfunciones: data.descripcionfunciones,
            requisitoscompetencias: data.requisitoscompetencias,
            horario_inicio: data.horario_inicio,
            horario_fin: data.horario_fin,
            fechasolicitud: data.fechasolicitud,
            fechaseleccionpasante: data.fechaseleccionpasante,
            duracion: data.duracion,
            estadoconvocatoria_id: data.estadoconvocatoria.id,
            institucion_id: data.institucion.id,
            tiempoacumplir_id: data.tiempoacumplir.id
        });
        // Insertar en historico después de actualizar una convocatoria
        await historicoService.insertHistoricoConvocatoria(convocatoria.dataValues, 'PUT');
        console.log('Convocatoria actualizada correctamente.');
        return new ResponseDTO('C-0000', new ConvocatoriaDTO(
            convocatoria.id,
            convocatoria.areapasantia,
            convocatoria.descripcionfunciones,
            convocatoria.requisitoscompetencias,
            convocatoria.horario_inicio,
            convocatoria.horario_fin,
            convocatoria.fechasolicitud,
            convocatoria.fechaseleccionpasante,
            convocatoria.duracion,
            new EstadoConvocatoriaDTO(data.estadoconvocatoria.id, data.estadoconvocatoria.nombreestadoconvocatoria),
            new InstitucionDTO(data.institucion.id, data.institucion.nombreinstitucion),
            new TiempoAcumplirDTO(data.tiempoacumplir.id, data.tiempoacumplir.descripcion)
        ), 'Convocatoria actualizada correctamente');
    } catch (error) {
        console.error(`Error al actualizar la convocatoria con ID: ${id}.`, error);
        return new ResponseDTO('C-1004', null, `Error al actualizar la convocatoria: ${error}`);
    }
};

const deleteConvocatoria = async (id) => {
    console.log(`Eliminando la convocatoria con ID: ${id}...`);
    try {
        const convocatoria = await ConvocatoriaENT.findByPk(id);
        if (!convocatoria) {
            console.log(`Convocatoria con ID: ${id} no encontrada.`);
            return new ResponseDTO('C-1005', null, 'Convocatoria no encontrada');
        }
        // Insertar en historico antes de eliminar la convocatoria
        await historicoService.insertHistoricoConvocatoria(convocatoria.dataValues, 'DELETE');
        await convocatoria.destroy();
        console.log('Convocatoria eliminada correctamente.');
        return new ResponseDTO('C-0000', convocatoria, 'Convocatoria eliminada correctamente');
    } catch (error) {
        console.error(`Error al eliminar la convocatoria con ID: ${id}.`, error);
        return new ResponseDTO('C-1005', null, `Error al eliminar la convocatoria: ${error}`);
    }
};

const getActiveConvocatorias = async () => {
    console.log('Obteniendo todas las convocatorias activas...');
    try {
        const convocatoriasActivas = await ConvocatoriaENT.findAll({
            where: { estadoconvocatoria_id: [1] },
            include: [
                { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
                { model: InstitucionENT, as: 'institucion' },
                { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
            ]
        });

        const convocatoriasActivasDTO = convocatoriasActivas.map(convocatoria => {
            const estadoDTO = new EstadoConvocatoriaDTO(convocatoria.estadoconvocatoria.id, convocatoria.estadoconvocatoria.nombreestadoconvocatoria);
            const institucionDTO = new InstitucionDTO(convocatoria.institucion.id, convocatoria.institucion.nombreinstitucion);
            const tiempoDTO = new TiempoAcumplirDTO(convocatoria.tiempoacumplir.id, convocatoria.tiempoacumplir.descripcion);
            return new ConvocatoriaDTO(
                convocatoria.id,
                convocatoria.areapasantia,
                convocatoria.descripcionfunciones,
                convocatoria.requisitoscompetencias,
                convocatoria.horario_inicio,
                convocatoria.horario_fin,
                convocatoria.fechasolicitud,
                convocatoria.fechaseleccionpasante,
                convocatoria.duracion,
                estadoDTO,
                institucionDTO,
                tiempoDTO
            );
        });

        console.log('Convocatorias activas obtenidas correctamente.');
        return new ResponseDTO('C-0000', convocatoriasActivasDTO, 'Convocatorias activas obtenidas correctamente');
    } catch (error) {
        console.error('Error al obtener las convocatorias activas:', error);
        return new ResponseDTO('C-1006', null, `Error al obtener las convocatorias activas: ${error}`);
    }
};

const getActiveConvocatoriasById = async (institucionId) => {
    console.log('Obteniendo todas las convocatorias activas...');
    try {
        const convocatoriasActivas = await ConvocatoriaENT.findAll({
            where: { estadoconvocatoria_id: [1],
                     institucion_id: institucionId
            },
            include: [
                { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
                { model: InstitucionENT, as: 'institucion' },
                { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
            ]
        });

        const convocatoriasActivasDTO = convocatoriasActivas.map(convocatoria => {
            const estadoDTO = new EstadoConvocatoriaDTO(convocatoria.estadoconvocatoria.id, convocatoria.estadoconvocatoria.nombreestadoconvocatoria);
            const institucionDTO = new InstitucionDTO(convocatoria.institucion.id, convocatoria.institucion.nombreinstitucion);
            const tiempoDTO = new TiempoAcumplirDTO(convocatoria.tiempoacumplir.id, convocatoria.tiempoacumplir.descripcion);
            return new ConvocatoriaDTO(
                convocatoria.id,
                convocatoria.areapasantia,
                convocatoria.descripcionfunciones,
                convocatoria.requisitoscompetencias,
                convocatoria.horario_inicio,
                convocatoria.horario_fin,
                convocatoria.fechasolicitud,
                convocatoria.fechaseleccionpasante,
                convocatoria.duracion,
                estadoDTO,
                institucionDTO,
                tiempoDTO
            );
        });

        console.log('Convocatorias activas obtenidas correctamente.');
        return new ResponseDTO('C-0000', convocatoriasActivasDTO, 'Convocatorias activas obtenidas correctamente');
    } catch (error) {
        console.error('Error al obtener las convocatorias activas:', error);
        return new ResponseDTO('C-1006', null, `Error al obtener las convocatorias activas: ${error}`);
    }
};

const getPendingConvocatoriasById = async (institucionId) => {
    console.log('Obteniendo todas las convocatorias PENDIENTES para la institución con ID: ${institucionId}...');
    try {
        const convocatoriasActivas = await ConvocatoriaENT.findAll({
            where: { estadoconvocatoria_id: [2],
                        institucion_id: institucionId
                }, // 2 = Pendiente
            include: [
                { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
                { model: InstitucionENT, as: 'institucion' },
                { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
            ]
        });

        const convocatoriasActivasDTO = convocatoriasActivas.map(convocatoria => {
            const estadoDTO = new EstadoConvocatoriaDTO(convocatoria.estadoconvocatoria.id, convocatoria.estadoconvocatoria.nombreestadoconvocatoria);
            const institucionDTO = new InstitucionDTO(convocatoria.institucion.id, convocatoria.institucion.nombreinstitucion);
            const tiempoDTO = new TiempoAcumplirDTO(convocatoria.tiempoacumplir.id, convocatoria.tiempoacumplir.descripcion);
            return new ConvocatoriaDTO(
                convocatoria.id,
                convocatoria.areapasantia,
                convocatoria.descripcionfunciones,
                convocatoria.requisitoscompetencias,
                convocatoria.horario_inicio,
                convocatoria.horario_fin,
                convocatoria.fechasolicitud,
                convocatoria.fechaseleccionpasante,
                convocatoria.duracion,
                estadoDTO,
                institucionDTO,
                tiempoDTO
            );
        });

        console.log('Convocatorias PENDIENTES obtenidas correctamente.');
        return new ResponseDTO('C-0000', convocatoriasActivasDTO, 'Convocatorias PENDIENTES obtenidas correctamente');
    } catch (error) {
        console.error('Error al obtener las convocatorias PENDIENTES:', error);
        return new ResponseDTO('C-1006', null, `Error al obtener las convocatorias PENDIENTES: ${error}`);
    }
};

const getPopularConvocatorias = async () => {
    console.log('Obteniendo convocatorias populares...');
    try {
        const convocatoriasPopulares = await sequelize.query(
            `SELECT 
                c.id,
                c.areapasantia,
                c.descripcionfunciones,
                c.requisitoscompetencias,
                c.horario_inicio,
                c.horario_fin,
                c.fechasolicitud,
                c.fechaseleccionpasante,
                c.duracion,
                c.estadoconvocatoria_id,
                c.institucion_id,
                c.tiempoacumplir_id,
                ta.descripcion AS tiempoacumplir_descripcion,
                e.nombreestadoconvocatoria,
                i.nombreinstitucion,
                COUNT(p.id) AS totalPostulaciones
            FROM 
                convocatoria c
            LEFT JOIN 
                postulacion p ON c.id = p.convocatoria_id
            LEFT JOIN
                tiempoacumplir ta ON c.tiempoacumplir_id = ta.id
            LEFT JOIN
                estadoconvocatoria e ON c.estadoconvocatoria_id = e.id
            LEFT JOIN
                institucion i ON c.institucion_id = i.id
            GROUP BY 
                c.id, c.areapasantia, c.descripcionfunciones, c.requisitoscompetencias, c.horario_inicio,
                c.horario_fin, c.fechasolicitud, c.fechaseleccionpasante, c.duracion, c.estadoconvocatoria_id,
                c.institucion_id, c.tiempoacumplir_id, ta.descripcion, e.nombreestadoconvocatoria, i.nombreinstitucion
            ORDER BY 
                totalPostulaciones DESC
            LIMIT 10;
            `,
            { type: sequelize.QueryTypes.SELECT }
        );

        // Mapear los resultados a objetos DTO
        const convocatoriasDTO = convocatoriasPopulares.map(convocatoria => {
            const estadoDTO = new EstadoConvocatoriaDTO(convocatoria.estadoconvocatoria_id, convocatoria.nombreestadoconvocatoria);
            const institucionDTO = new InstitucionDTO(convocatoria.institucion_id, convocatoria.nombreinstitucion);
            const tiempoDTO = new TiempoAcumplirDTO(convocatoria.tiempoacumplir_id, convocatoria.tiempoacumplir_descripcion);

            return new ConvocatoriaDTO(
                convocatoria.id,
                convocatoria.areapasantia,
                convocatoria.descripcionfunciones,
                convocatoria.requisitoscompetencias,
                convocatoria.horario_inicio,
                convocatoria.horario_fin,
                convocatoria.fechasolicitud,
                convocatoria.fechaseleccionpasante,
                convocatoria.duracion,
                estadoDTO,
                institucionDTO,
                tiempoDTO,
                convocatoria.totalPostulaciones
            );
        });

        console.log('Convocatorias populares obtenidas correctamente.');
        return new ResponseDTO('C-0000', convocatoriasDTO, 'Convocatorias populares obtenidas correctamente');
    } catch (error) {
        console.error('Error al obtener convocatorias populares:', error);
        return new ResponseDTO('C-1007', null, `Error al obtener convocatorias populares: ${error}`);
    }
};

const getSummaryOfConvocatorias = async (institucionId) => {
    console.log('Obteniendo resumen de convocatorias activas e inactivas...');
    try {
        const summary = await sequelize.query(
            `SELECT 
            SUM(CASE WHEN estadoconvocatoria_id = 1 THEN 1 ELSE 0 END) AS ConvocatoriasActivas,
            SUM(CASE WHEN estadoconvocatoria_id = 3 THEN 1 ELSE 0 END) AS ConvocatoriasInactivas
          FROM 
            convocatoria
          WHERE
              institucion_id=:institucionId;`,
            { replacements: { institucionId: institucionId },
            type: sequelize.QueryTypes.SELECT }
        );

        const summaryDTO = {
            ConvocatoriasActivas: summary[0].ConvocatoriasActivas,
            ConvocatoriasInactivas: summary[0].ConvocatoriasInactivas
        };

        console.log('Sumatoria de convocatorias obtenido correctamente.');
        return new ResponseDTO('CV-0000', summaryDTO, 'Sumatoria de convocatorias obtenido correctamente');
    } catch (error) {
        console.error('Error al obtener sumatoria de convocatorias:', error);
        return new ResponseDTO('CV-1008', null, `Error al obtener sumatoria de convocatorias: ${error}`);
    }
};


const getPendingConvocatorias = async () => {
    console.log('Obteniendo todas las convocatorias PENDIENTES...');
    try {
        const convocatoriasActivas = await ConvocatoriaENT.findAll({
            where: { estadoconvocatoria_id: [2] }, // 2 = Pendiente
            include: [
                { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
                { model: InstitucionENT, as: 'institucion' },
                { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
            ]
        });

        const convocatoriasActivasDTO = convocatoriasActivas.map(convocatoria => {
            const estadoDTO = new EstadoConvocatoriaDTO(convocatoria.estadoconvocatoria.id, convocatoria.estadoconvocatoria.nombreestadoconvocatoria);
            const institucionDTO = new InstitucionDTO(convocatoria.institucion.id, convocatoria.institucion.nombreinstitucion);
            const tiempoDTO = new TiempoAcumplirDTO(convocatoria.tiempoacumplir.id, convocatoria.tiempoacumplir.descripcion);
            return new ConvocatoriaDTO(
                convocatoria.id,
                convocatoria.areapasantia,
                convocatoria.descripcionfunciones,
                convocatoria.requisitoscompetencias,
                convocatoria.horario_inicio,
                convocatoria.horario_fin,
                convocatoria.fechasolicitud,
                convocatoria.fechaseleccionpasante,
                convocatoria.duracion,
                estadoDTO,
                institucionDTO,
                tiempoDTO
            );
        });

        console.log('Convocatorias PENDIENTES obtenidas correctamente.');
        return new ResponseDTO('C-0000', convocatoriasActivasDTO, 'Convocatorias PENDIENTES obtenidas correctamente');
    } catch (error) {
        console.error('Error al obtener las convocatorias PENDIENTES:', error);
        return new ResponseDTO('C-1006', null, `Error al obtener las convocatorias PENDIENTES: ${error}`);
    }
};

const getInactiveConvocatorias = async () => {
    console.log('Obteniendo todas las convocatorias INACTIVAS...');
    try {
        const convocatoriasActivas = await ConvocatoriaENT.findAll({
            where: { estadoconvocatoria_id: [3] }, // 3 = Inactivo
            include: [
                { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
                { model: InstitucionENT, as: 'institucion' },
                { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
            ]
        });

        const convocatoriasActivasDTO = convocatoriasActivas.map(convocatoria => {
            const estadoDTO = new EstadoConvocatoriaDTO(convocatoria.estadoconvocatoria.id, convocatoria.estadoconvocatoria.nombreestadoconvocatoria);
            const institucionDTO = new InstitucionDTO(convocatoria.institucion.id, convocatoria.institucion.nombreinstitucion);
            const tiempoDTO = new TiempoAcumplirDTO(convocatoria.tiempoacumplir.id, convocatoria.tiempoacumplir.descripcion);
            return new ConvocatoriaDTO(
                convocatoria.id,
                convocatoria.areapasantia,
                convocatoria.descripcionfunciones,
                convocatoria.requisitoscompetencias,
                convocatoria.horario_inicio,
                convocatoria.horario_fin,
                convocatoria.fechasolicitud,
                convocatoria.fechaseleccionpasante,
                convocatoria.duracion,
                estadoDTO,
                institucionDTO,
                tiempoDTO
            );
        });

        console.log('Convocatorias INACTIVAS obtenidas correctamente.');
        return new ResponseDTO('C-0000', convocatoriasActivasDTO, 'Convocatorias INACTIVAS obtenidas correctamente');
    } catch (error) {
        console.error('Error al obtener las convocatorias INACTIVAS:', error);
        return new ResponseDTO('C-1006', null, `Error al obtener las convocatorias INACTIVAS: ${error}`);
    }
};

const getInactiveConvocatoriasById = async (institucionId) => {
    console.log('Obteniendo todas las convocatorias INACTIVAS...');
    try {
        const convocatoriasActivas = await ConvocatoriaENT.findAll({
            where: { estadoconvocatoria_id: [3],
                    institucion_id: institucionId
            }, // 3 = Inactivo
            include: [
                { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
                { model: InstitucionENT, as: 'institucion' },
                { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
            ]
        });

        const convocatoriasActivasDTO = convocatoriasActivas.map(convocatoria => {
            const estadoDTO = new EstadoConvocatoriaDTO(convocatoria.estadoconvocatoria.id, convocatoria.estadoconvocatoria.nombreestadoconvocatoria);
            const institucionDTO = new InstitucionDTO(convocatoria.institucion.id, convocatoria.institucion.nombreinstitucion);
            const tiempoDTO = new TiempoAcumplirDTO(convocatoria.tiempoacumplir.id, convocatoria.tiempoacumplir.descripcion);
            return new ConvocatoriaDTO(
                convocatoria.id,
                convocatoria.areapasantia,
                convocatoria.descripcionfunciones,
                convocatoria.requisitoscompetencias,
                convocatoria.horario_inicio,
                convocatoria.horario_fin,
                convocatoria.fechasolicitud,
                convocatoria.fechaseleccionpasante,
                convocatoria.duracion,
                estadoDTO,
                institucionDTO,
                tiempoDTO
            );
        });

        console.log('Convocatorias INACTIVAS obtenidas correctamente.');
        return new ResponseDTO('C-0000', convocatoriasActivasDTO, 'Convocatorias INACTIVAS obtenidas correctamente');
    } catch (error) {
        console.error('Error al obtener las convocatorias INACTIVAS:', error);
        return new ResponseDTO('C-1006', null, `Error al obtener las convocatorias INACTIVAS: ${error}`);
    }
};

const activateConvocatoria = async (idConvocatoria) => {
    try {
        console.log(`Activando la convocatoria con ID: ${idConvocatoria}...`);
        
        // Encuentra la convocatoria por su ID
        const convocatoria = await ConvocatoriaENT.findByPk(idConvocatoria);
        if (!convocatoria) {
            console.log(`Convocatoria con ID: ${idConvocatoria} no encontrada.`);
            return new ResponseDTO("C-1002", {}, "Convocatoria no encontrada");
        }
        
        // Asume que '1' es el ID para el estado 'ACTIVA'
        const estadoActivaId = 1;
        
        // Actualiza el estado de la convocatoria
        await convocatoria.update({ estadoconvocatoria_id: estadoActivaId });
        
        // Vuelve a buscar la convocatoria para obtener datos actualizados
        const updatedConvocatoria = await ConvocatoriaENT.findByPk(idConvocatoria, {
            include: [
            { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
            { model: InstitucionENT, as: 'institucion' },
            { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
            ]
        });
    
        // Crea el DTO para la convocatoria actualizada
        const convocatoriaDTO = new ConvocatoriaDTO(
            updatedConvocatoria.id,
            updatedConvocatoria.areapasantia,
            updatedConvocatoria.descripcionfunciones,
            updatedConvocatoria.requisitoscompetencias,
            updatedConvocatoria.horario_inicio,
            updatedConvocatoria.horario_fin,
            updatedConvocatoria.fechasolicitud,
            updatedConvocatoria.fechaseleccionpasante,
            updatedConvocatoria.duracion,
            new EstadoConvocatoriaDTO(
            updatedConvocatoria.estadoconvocatoria.id,
            updatedConvocatoria.estadoconvocatoria.nombreestadoconvocatoria
            ),
            new InstitucionDTO(
            updatedConvocatoria.institucion.id,
            updatedConvocatoria.institucion.nombreinstitucion
            ),
            new TiempoAcumplirDTO(
            updatedConvocatoria.tiempoacumplir.id,
            updatedConvocatoria.tiempoacumplir.descripcion
            )
        );
        
        console.log(`Convocatoria con ID: ${idConvocatoria} ha sido activada.`);
        return new ResponseDTO("C-0001", convocatoriaDTO, "Convocatoria activada correctamente");
        
        } catch (error) {
        console.error(`Error al activar la convocatoria con ID: ${idConvocatoria}: ${error}`);
        return new ResponseDTO("C-1003", {}, `Error al activar la convocatoria: ${error}`);
    }
};

const rejectConvocatoria = async (idConvocatoria) => {
    try {
        console.log(`Rechazando la convocatoria con ID: ${idConvocatoria}...`);
        
        // Encuentra la convocatoria por su ID
        const convocatoria = await ConvocatoriaENT.findByPk(idConvocatoria);
        if (!convocatoria) {
            console.log(`Convocatoria con ID: ${idConvocatoria} no encontrada.`);
            return new ResponseDTO("C-1002", {}, "Convocatoria no encontrada");
        }
        
        // Asume que '3' es el ID para el estado 'INACTIVA'
        const estadoInactivaId = 3;
        
        // Actualiza el estado de la convocatoria
        await convocatoria.update({ estadoconvocatoria_id: estadoInactivaId });
        
        // Vuelve a buscar la convocatoria para obtener datos actualizados
        const updatedConvocatoria = await ConvocatoriaENT.findByPk(idConvocatoria, {
            include: [
            { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
            { model: InstitucionENT, as: 'institucion' },
            { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
            ]
        });
    
        // Crea el DTO para la convocatoria actualizada
        const convocatoriaDTO = new ConvocatoriaDTO(
            updatedConvocatoria.id,
            updatedConvocatoria.areapasantia,
            updatedConvocatoria.descripcionfunciones,
            updatedConvocatoria.requisitoscompetencias,
            updatedConvocatoria.horario_inicio,
            updatedConvocatoria.horario_fin,
            updatedConvocatoria.fechasolicitud,
            updatedConvocatoria.fechaseleccionpasante,
            updatedConvocatoria.duracion,
            new EstadoConvocatoriaDTO(
            updatedConvocatoria.estadoconvocatoria.id,
            updatedConvocatoria.estadoconvocatoria.nombreestadoconvocatoria
            ),
            new InstitucionDTO(
            updatedConvocatoria.institucion.id,
            updatedConvocatoria.institucion.nombreinstitucion
            ),
            new TiempoAcumplirDTO(
            updatedConvocatoria.tiempoacumplir.id,
            updatedConvocatoria.tiempoacumplir.descripcion
            )
        );
        
        console.log(`Convocatoria con ID: ${idConvocatoria} ha sido rechazada.`);
            return new ResponseDTO("C-0001", convocatoriaDTO, "Convocatoria rechazada correctamente");

        } catch (error) {
            console.error(`Error al rechazar la convocatoria con ID: ${idConvocatoria}: ${error}`);
            return new ResponseDTO("C-1003", {}, `Error al rechazar la convocatoria: ${error}`);
            }
};

const pendingConvocatoria = async (idConvocatoria) => {
    try {
        console.log(`Pendiente la convocatoria con ID: ${idConvocatoria}...`);
        
        // Encuentra la convocatoria por su ID
        const convocatoria = await ConvocatoriaENT.findByPk(idConvocatoria);
        if (!convocatoria) {
            console.log(`Convocatoria con ID: ${idConvocatoria} no encontrada.`);
            return new ResponseDTO("C-1002", {}, "Convocatoria no encontrada");
        }
        
        // Asume que '2' es el ID para el estado 'PENDIENTE'
        const estadoPendienteId = 2;
        
        // Actualiza el estado de la convocatoria
        await convocatoria.update({ estadoconvocatoria_id: estadoPendienteId });
        
        // Vuelve a buscar la convocatoria para obtener datos actualizados
        const updatedConvocatoria = await ConvocatoriaENT.findByPk(idConvocatoria, {
            include: [
            { model: EstadoConvocatoriaENT, as: 'estadoconvocatoria' },
            { model: InstitucionENT, as: 'institucion' },
            { model: TiempoAcumplirENT, as: 'tiempoacumplir' }
            ]
        });
    
        // Crea el DTO para la convocatoria actualizada
        const convocatoriaDTO = new ConvocatoriaDTO(
            updatedConvocatoria.id,
            updatedConvocatoria.areapasantia,
            updatedConvocatoria.descripcionfunciones,
            updatedConvocatoria.requisitoscompetencias,
            updatedConvocatoria.horario_inicio,
            updatedConvocatoria.horario_fin,
            updatedConvocatoria.fechasolicitud,
            updatedConvocatoria.fechaseleccionpasante,
            updatedConvocatoria.duracion,
            new EstadoConvocatoriaDTO(
            updatedConvocatoria.estadoconvocatoria.id,
            updatedConvocatoria.estadoconvocatoria.nombreestadoconvocatoria
            ),
            new InstitucionDTO(
            updatedConvocatoria.institucion.id,
            updatedConvocatoria.institucion.nombreinstitucion
            ),
            new TiempoAcumplirDTO(
            updatedConvocatoria.tiempoacumplir.id,
            updatedConvocatoria.tiempoacumplir.descripcion
            )
        );
        
        console.log(`Convocatoria con ID: ${idConvocatoria} ha sido pendiente.`);
        return new ResponseDTO("C-0001", convocatoriaDTO, "Convocatoria pendiente correctamente");

        } catch (error) {
            console.error(`Error al pendiente la convocatoria con ID: ${idConvocatoria}: ${error}`);
            return new ResponseDTO("C-1003", {}, `Error al pendiente la convocatoria: ${error}`);
            }
};



module.exports = {
    getAllConvocatorias,
    getConvocatoriaById,
    createConvocatoria,
    updateConvocatoria,
    deleteConvocatoria,
    getActiveConvocatorias,
    getPopularConvocatorias,
    getPendingConvocatorias,
    getInactiveConvocatorias,
    getConvocatoriasPorIdInstitucion,
    getSummaryOfConvocatorias,
    getActiveConvocatoriasById,
    getPendingConvocatoriasById,
    getInactiveConvocatoriasById,
    activateConvocatoria,
    rejectConvocatoria,
    pendingConvocatoria,
};
