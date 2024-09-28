const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");
const AdminuseiENT = require("./AdminuseiENT");
const InstitucionENT = require("./InstitucionENT");

const EstadoSolicitudInstitucionENT = sequelize.define(
  "EstadoSolicitudInstitucion",
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
    estadosolicitud: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "estadosolicitudinstitucion",
    timestamps: false,
  }
);

EstadoSolicitudInstitucionENT.belongsTo(AdminuseiENT, {
  foreignKey: "adminusei_id",
  as: "adminusei",
});

EstadoSolicitudInstitucionENT.belongsTo(InstitucionENT, {
  foreignKey: "institucion_id",
  as: "institucion",
});

module.exports = EstadoSolicitudInstitucionENT;
