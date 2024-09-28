const HistoricoUsuarioENT = require("../ENT/HistoricoUsuarioENT");
const HistoricoUsuarioDTO = require("../DTO/HistoricoUsuarioDTO");

const insertHistoricoUsuario = async (userData) => {
  try {
    console.log("Insertando en historico_usuario...");
    await HistoricoUsuarioENT.create({
      id_u: userData.id,
      idusuario: userData.idusuario,
      contrasenia: userData.contrasenia,
      tipousuario_id: userData.tipousuario_id,
    });
    console.log("Usuario registrado en historico_usuario correctamente.");
  } catch (error) {
    console.error("Error al registrar Usuario en historico_usuario: ", error);
    throw error;
  }
};

const getAllUserHistory = async () => {
  try {
    console.log("Obteniendo todo el Historial de Usuarios...");
    const userHistories = await HistoricoUsuarioENT.findAll();
    return {
      code: "HU-0000",
      result: userHistories.map((userHistory) => new HistoricoUsuarioDTO(
        userHistory.id_h,
        userHistory.id_u,
        userHistory.idusuario,
        userHistory.contrasenia,
        // Aquí puedes convertir el id del tipo de usuario en un DTO si es necesario
        userHistory.tipousuario_id
      )),
      message: "Registros históricos de usuarios obtenidos correctamente.",
    };
  } catch (error) {
    console.error(`Error al obtener todos los registros Históricos de Usuarios: ${error}.`);
    throw error;
  }
};

const getUserHistoryById = async (id_h) => {
  try {
    console.log(`Obteniendo Historial de Usuario con ID: '${id_h}'...`);
    const userHistory = await HistoricoUsuarioENT.findByPk(id_h);
    if (!userHistory) {
      console.log(`El Historial de Usuario con ID: '${id_h}' no existe.`);
      throw new Error(`El Historial de Usuario con ID: '${id_h}' no existe.`);
    }
    return new HistoricoUsuarioDTO(
      userHistory.id_h,
      userHistory.id_u,
      userHistory.idusuario,
      userHistory.contrasenia,
      // Aquí también puedes convertir el id del tipo de usuario en un DTO
      userHistory.tipousuario_id
    );
  } catch (error) {
    console.error(`Error al obtener el Historial de Usuario con ID: '${id_h}': ${error}`);
    throw error;
  }
};

module.exports = {
  insertHistoricoUsuario,
  getAllUserHistory,
  getUserHistoryById,
};
