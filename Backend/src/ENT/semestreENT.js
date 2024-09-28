const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../database/db");

const SemestreENT = sequelize.define(
  "Semestre",
  {
    codigosemestre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "semestre",
    timestamps: false
  }
);

module.exports = SemestreENT;
