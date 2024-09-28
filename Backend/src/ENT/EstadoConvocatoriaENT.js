const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");

const EstadoConvocatoriaENT = sequelize.define(
  "EstadoConvocatoria",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreestadoconvocatoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "estadoconvocatoria",
    timestamps: false,
  }
);

module.exports = EstadoConvocatoriaENT;
