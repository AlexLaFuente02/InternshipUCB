const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");
const AdminuseiENT = require("./AdminuseiENT");
const ConvocatoriaENT = require("./ConvocatoriaENT");

const AprobacionConvocatoriaENT = sequelize.define(
  "AprobacionConvocatoria",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fechaaprobacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "aprobacionconvocatoria",
    timestamps: false,
  }
);

AprobacionConvocatoriaENT.belongsTo(AdminuseiENT, {
  foreignKey: "adminusei_id",
  as: "adminusei",
});

AprobacionConvocatoriaENT.belongsTo(ConvocatoriaENT, {
  foreignKey: "convocatoria_id",
  as: "convocatoria",
});

module.exports = AprobacionConvocatoriaENT;
