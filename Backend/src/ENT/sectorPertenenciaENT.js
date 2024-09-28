const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../database/db");

const SectorPertenenciaENT = sequelize.define(
  "SectorPertenencia",
  {
    nombresectorpertenencia: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "sectorpertenencia",
    timestamps: false
  }
);

module.exports = SectorPertenenciaENT;
