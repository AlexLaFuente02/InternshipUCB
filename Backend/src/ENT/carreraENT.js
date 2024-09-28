// CarreraENT.js

const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db"); // Asegúrate de que la ruta sea correcta

const CarreraENT = sequelize.define(
  "Carrera",
  {
    nombrecarrera: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "carrera", // Nombre real de la tabla en la base de datos
    timestamps: false, // Desactivar las columnas createdAt y updatedAt
  }
);

module.exports = CarreraENT;
