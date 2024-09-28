const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");
const EstadoConvocatoriaENT = require("./EstadoConvocatoriaENT");
const InstitucionENT = require("./InstitucionENT");
const TiempoAcumplirENT = require("./TiempoACumplirENT");

const ConvocatoriaENT = sequelize.define(
  "Convocatoria",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    areapasantia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcionfunciones: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    requisitoscompetencias: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    horario_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    horario_fin: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    fechasolicitud: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fechaseleccionpasante: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    duracion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "convocatoria",
    timestamps: false,
  }
);

ConvocatoriaENT.belongsTo(EstadoConvocatoriaENT, {
  foreignKey: "estadoconvocatoria_id",
  as: "estadoconvocatoria",
  targetKey: "id",
});

ConvocatoriaENT.belongsTo(InstitucionENT, {
  foreignKey: "institucion_id",
  as: "institucion",
  targetKey: "id",
});

ConvocatoriaENT.belongsTo(TiempoAcumplirENT, {
  foreignKey: "tiempoacumplir_id",
  as: "tiempoacumplir",
  targetKey: "id",
});

module.exports = ConvocatoriaENT;
