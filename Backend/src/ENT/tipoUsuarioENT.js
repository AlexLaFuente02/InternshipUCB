const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../database/db"); // Asegúrate de que la ruta sea correcta

const TipoUsuarioENT = sequelize.define(
  "tipousuario",
  {
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "tipousuario", // Nombre real de la tabla en la base de datos
    timestamps: false // Desactivar las columnas createdAt y updatedAt
  }
);

module.exports = TipoUsuarioENT;
