const SedeDTO = require('../DTO/SedeDTO');
const ResponseDTO = require('../DTO/ResponseDTO');
const SedeENT = require('../ENT/SedeENT');

const getAll = async () => {
    console.log('Obteniendo todas las sedes...');
    try {
        const sedes = await SedeENT.findAll();
        // Mapear los resultados a objetos SedeDTO
        const sedesDTO = sedes.map((sede) => new SedeDTO(sede.id, sede.nombresede));
        console.log('Sedes obtenidas correctamente.');
        return new ResponseDTO('S-0000', sedesDTO, 'Sedes obtenidas correctamente');
    } catch (error) {
        console.error('Error al obtener todas las sedes:', error);
        return new ResponseDTO('S-1001', null, 'Error al obtener todas las sedes');
    }
    };

//GetbyId mapeando a SedeDTO:
const getById = async (id) => {
    console.log(`Obteniendo la sede con ID: ${id}...`);
    try {
        const sede = await SedeENT.findByPk(id);
        if (!sede) {
            console.log(`Sede con ID: ${id} no encontrada.`);
            return new ResponseDTO('S-1002', null, 'Sede no encontrada');
        }
        console.log('Sede obtenida correctamente.');
        return new ResponseDTO('S-0000', new SedeDTO(sede.id, sede.nombresede), 'Sede obtenida correctamente');
    } catch (error) {
        console.error(`Error al obtener la sede con ID: ${id}.`, error);
        return new ResponseDTO('S-1002', null, 'Error al obtener la sede');
    }
};

const create = async (nombresede) => {
    console.log(`Creando una nueva sede: ${nombresede}...`);
    try {
        const nuevaSede = await SedeENT.create({ nombresede });
        console.log('Sede creada correctamente.');
        return new ResponseDTO('S-0000', new SedeDTO(nuevaSede.id, nuevaSede.nombresede), 'Sede creada correctamente');
    } catch (error) {
        console.error(`Error al crear la sede: ${nombresede}.`, error);
        return new ResponseDTO('S-1003', null, 'Error al crear la sede');
    }
};

const update = async (id, nombresede) => {
    console.log(`Actualizando la sede con ID: ${id}...`);
    try {
        const sede = await SedeENT.findByPk(id);
        if (!sede) {
            console.log(`Sede con ID: ${id} no encontrada.`);
            return new ResponseDTO('S-1004', null, 'Sede no encontrada');
        }

        sede.nombresede = nombresede;
        await sede.save();

        console.log('Sede actualizada correctamente.');
        return new ResponseDTO('S-0000', new SedeDTO(sede.id, sede.nombresede), 'Sede actualizada correctamente');
    } catch (error) {
        console.error(`Error al actualizar la sede con ID: ${id}.`, error);
        return new ResponseDTO('S-1004', null, 'Error al actualizar la sede');
    }
};

const remove = async (id) => {
    console.log(`Eliminando la sede con ID: ${id}...`);
    try {
        const sede = await SedeENT.findByPk(id);
        if (!sede) {
            console.log(`Sede con ID: ${id} no encontrada.`);
            return new ResponseDTO('S-1005', null, 'Sede no encontrada');
        }

        await sede.destroy();

        console.log('Sede eliminada correctamente.');
        return new ResponseDTO('S-0000', null, 'Sede eliminada correctamente');
    } catch (error) {
        console.error(`Error al eliminar la sede con ID: ${id}.`, error);
        return new ResponseDTO('S-1005', null, 'Error al eliminar la sede');
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};
