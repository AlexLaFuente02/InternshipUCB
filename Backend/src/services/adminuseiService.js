const ResponseDTO = require("../DTO/ResponseDTO");
const AdminuseiENT = require("../ENT/AdminuseiENT");
const AdminuseiDTO = require("../DTO/AdminuseiDTO");
const UsuarioENT = require("../ENT/UsuarioENT");
const UsuarioDTO = require("../DTO/UsuarioDTO");

const getAllAdminsUSEI = async () => {
  console.log("Obteniendo todos los Administradores USEI...");
  try {
    const adminsUSEI = await AdminuseiENT.findAll({
      include: [{ model: UsuarioENT, as: "usuario" }],
    });
    const adminsUSEIDTO = adminsUSEI.map((adminusei) => {
      const usuarioDTO = new UsuarioDTO(
        adminusei.usuario.id,
        adminusei.usuario.idusuario,
        adminusei.usuario.tipousuario,
        adminusei.usuario.numero_intentos,
        adminusei.usuario.estado
      );
      return new AdminuseiDTO(adminusei.id, usuarioDTO, adminusei.habilitado_ver, adminusei.habilitado_modific);
    });
    console.log("Administradores USEI obtenidos correctamente.");
    return new ResponseDTO(
      "AUSEI-0000",
      adminsUSEIDTO,
      "Administradores USEI obtenidos correctamente."
    );
  } catch (error) {
    console.error(`Error al obtener todos los administradores USEI: ${error}`);
    return new ResponseDTO(
      "AUSEI-1000",
      null,
      `Error al obtener todos los administradores USEI: ${error}.`
    );
  }
};

const getAdminUSEIById = async (id) => {
  console.log(`Obteniendo el administrador USEI con ID: '${id}'...`);
  try {
    const adminUSEI = await AdminuseiENT.findByPk(id, {
      include: [{ model: UsuarioENT, as: "usuario" }],
    });
    if (!adminUSEI) {
      console.log(`El administrador USEI con ID: '${id}' no existe.`);
      return new ResponseDTO(
        "AUSEI-2000",
        null,
        `El administrador USEI con ID: '${id}' no existe.`
      );
    }
    const usuarioDTO = new UsuarioDTO(
      adminUSEI.usuario.id,
      adminUSEI.usuario.idusuario,
      adminUSEI.usuario.tipousuario,
      adminUSEI.usuario.numero_intentos,
      adminUSEI.usuario.estado,
    );
    const adminUSEIDTO = new AdminuseiDTO(adminUSEI.id, usuarioDTO, adminUSEI.habilitado_ver, adminUSEI.habilitado_modific);
    console.log("Administrador USEI obtenido correctamente.");
    return new ResponseDTO(
      "AUSEI-0000",
      adminUSEIDTO,
      "Administradores USEI obtenidos correctamente."
    );
  } catch (error) {
    console.error(
      `Error al obtener el Administrador USEI con ID: '${id}': ${error}.`
    );
    return new ResponseDTO(
      "AUSEI-2000",
      null,
      `Error al obtener el Administrador USEI con ID: '${id}': ${error}.`
    );
  }
};

const createAdminUSEI = async (adminUSEIData) => {
  console.log("Creando un nuevo Administrador USEI...");
  try {
    const nuevoAdminUSEI = await AdminuseiENT.create({
      usuario_id: adminUSEIData.usuario.id,
    });
    const usuarioDTO = new UsuarioDTO(
      adminUSEIData.usuario.id,
      adminUSEIData.usuario.idusuario,
      adminUSEIData.usuario.tipousuario,
      adminUSEIData.usuario.numero_intentos,
      adminUSEIData.usuario.estado
    );
    const nuevoAdminUSEIDTO = new AdminuseiDTO(nuevoAdminUSEI.id, usuarioDTO, nuevoAdminUSEI.habilitado_ver, nuevoAdminUSEI.habilitado_modific);
    console.log("Administrador USEI creado correctamente.");
    return new ResponseDTO(
      "AUSEI-0000",
      nuevoAdminUSEIDTO,
      "Administrador USEI creado correctamente."
    );
  } catch (error) {
    console.error(`Error al crear el Administrador USEI: ${error}.`);
    return new ResponseDTO(
      "AUSEI-3000",
      null,
      `Error al crear el Administrador USEI: ${error}.`
    );
  }
};

const updateAdminUSEI = async (id, adminUSEIData) => {
  console.log(`Actualizando Administrador USEI con ID: '${id}'...`);
  try {
    const adminUSEI = await AdminuseiENT.findByPk(id);
    if (!adminUSEI) {
      console.log(`El administrador USEI con ID: '${id}' no existe.`);
      return new ResponseDTO(
        "AUSEI-4000",
        null,
        `El administrador USEI con ID: '${id}' no existe.`
      );
    }
    await adminUSEI.update({
      usuario_id: adminUSEIData.usuario.id,
      habilitado_ver: adminUSEIData.habilitado_ver,
      habilitado_modific: adminUSEIData.habilitado_modific,
    });
    console.log(
      `Administrador USEI con ID: '${id}' actualizado correctamente.`
    );
    return new ResponseDTO(
      "AUSEI-0000",
      adminUSEI,
      `Administrador USEI con ID: '${id}' actualizado correctamente.`
    );
  } catch (error) {
    console.error(
      `Error al actualizar el Administrador USEI con ID: '${id}': ${error}`
    );
    return new ResponseDTO(
      "AUSEI-4000",
      null,
      `Error al actualizar el Administrador USEI con ID: '${id}': ${error}`
    );
  }
};

const deleteAdminUSEI = async (id) => {
  console.log(`Eliminando Administrador USEI con ID: '${id}'...`);
  try {
    const adminUSEI = await AdminuseiENT.findByPk(id);
    if (!adminUSEI) {
      console.log(`El administrador USEI con ID: '${id}' no existe.`);
      return new ResponseDTO(
        "AUSEI-5000",
        null,
        `El administrador USEI con ID: '${id}' no existe.`
      );
    }
    await adminUSEI.destroy();
    console.log(`Administrador USEI con ID: '${id}' eliminado correctamente.`);
    return new ResponseDTO(
      "AUSEI-0000",
      adminUSEI,
      `Administrador USEI con ID: '${id}' eliminado correctamente.`
    );
  } catch (error) {
    console.error(
      `Error al eliminar el Administrador USEI con ID: '${id}': ${error}`
    );
    return new ResponseDTO(
      "AUSEI-5000",
      null,
      `Error al eliminar el Administrador USEI con ID: '${id}': ${error}`
    );
  }
};

const changeHabilitadoVer = async (id) => {
  console.log(`Cambiando permisos de Administrador con ID: ${id}...`);
  try {
    const adminUSEI = await AdminuseiENT.findByPk(id, {
      include: [
        { model: UsuarioENT, as: "usuario"},
      ],
    });
    if (!adminUSEI) {
      console.log(`Administrador con ID: ${id} no encontrada.`);
      return new ResponseDTO("I-1004", null, "Administrador no encontrado");
    }

    // Actualizar el estado de la institución a 'RECHAZADO'
    if (adminUSEI.habilitado_ver == 0) {
      await adminUSEI.update({
        habilitado_ver: 1,
      });
    } else if (adminUSEI.habilitado_ver == 1) {
      await adminUSEI.update({
        habilitado_ver: 0,
      });
    }
    
    console.log(
      `Permiso de administrador USEI con ID: '${id}' actualizado correctamente.`
    );

    
    return new ResponseDTO(
      "AUSEI-0000",
      adminUSEI,
      `Permiso de administrador USEI con ID: '${id}' actualizado correctamente.`
    );
  } catch (error) {
    console.error(
      `Error al actualizar el Permiso de Administrador USEI con ID: '${id}': ${error}`
    );
    return new ResponseDTO(
      "AUSEI-4000",
      null,
      `Error al actualizar el Permiso de Administrador USEI con ID: '${id}': ${error}`
    );
  }
};

const changeHabilitadoModific = async (id) => {
  console.log(`Cambiando permisos de Administrador con ID: ${id}...`);
  try {
    const adminUSEI = await AdminuseiENT.findByPk(id, {
      include: [
        { model: UsuarioENT, as: "usuario"},
      ],
    });
    if (!adminUSEI) {
      console.log(`Administrador con ID: ${id} no encontrada.`);
      return new ResponseDTO("I-1004", null, "Administrador no encontrado");
    }

    // Actualizar el estado de la institución a 'RECHAZADO'
    if (adminUSEI.habilitado_modific == 0) {
      await adminUSEI.update({
        habilitado_modific: 1,
      });
    } else if (adminUSEI.habilitado_modific == 1) {
      await adminUSEI.update({
        habilitado_modific: 0,
      });
    }
    console.log(
      `Permiso de administrador USEI con ID: '${id}' actualizado correctamente.`
    );
    return new ResponseDTO(
      "AUSEI-0000",
      adminUSEI,
      `Permiso de administrador USEI con ID: '${id}' actualizado correctamente.`
    );
  } catch (error) {
    console.error(
      `Error al actualizar el Permiso de Administrador USEI con ID: '${id}': ${error}`
    );
    return new ResponseDTO(
      "AUSEI-4000",
      null,
      `Error al actualizar el Permiso de Administrador USEI con ID: '${id}': ${error}`
    );
  }
};

const getAdminUSEIByUserId = async (userId) => {
  console.log(`Obteniendo el administrador USEI con ID de Usuario: '${userId}'...`);
  try {
    const adminUSEI = await AdminuseiENT.findOne({
      where: { usuario_id: userId },
      include: [{ model: UsuarioENT, as: "usuario" }],
    });
    if (!adminUSEI) {
      console.log(`El administrador USEI con ID de Usuario: '${userId}' no existe.`);
      return new ResponseDTO(
        "AUSEI-2000",
        null,
        `El administrador USEI con ID de Usuario: '${userId}' no existe.`
      );
    }
    const usuarioDTO = new UsuarioDTO(
      adminUSEI.usuario.id,
      adminUSEI.usuario.idusuario,
      adminUSEI.usuario.tipousuario,
      adminUSEI.usuario.numero_intentos,
      adminUSEI.usuario.estado,
    );
    const adminUSEIDTO = new AdminuseiDTO(
      adminUSEI.id,
      usuarioDTO,
      adminUSEI.habilitado_ver,
      adminUSEI.habilitado_modific
    );
    console.log("Administrador USEI obtenido correctamente.");
    return new ResponseDTO(
      "AUSEI-0000",
      adminUSEIDTO,
      "Administradores USEI obtenidos correctamente."
    );
  } catch (error) {
    console.error(
      `Error al obtener el Administrador USEI con ID de Usuario: '${userId}': ${error}.`
    );
    return new ResponseDTO(
      "AUSEI-2000",
      null,
      `Error al obtener el Administrador USEI con ID de Usuario: '${userId}': ${error}.`
    );
  }
};


module.exports = {
  getAllAdminsUSEI,
  getAdminUSEIById,
  createAdminUSEI,
  updateAdminUSEI,
  deleteAdminUSEI,
  changeHabilitadoVer,
  changeHabilitadoModific,
  getAdminUSEIByUserId,
};
