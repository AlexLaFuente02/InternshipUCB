const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../database/db");

const EstadoPostulacionENT = sequelize.define(
  "EstadoPostulacion",
  {
    nombreestadopostulacion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "estadopostulacion",
    timestamps: false
  }
);

module.exports = EstadoPostulacionENT;
