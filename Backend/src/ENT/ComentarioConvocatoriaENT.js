// ComentarioConvocatoriaENT.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");
const PostulacionENT = require("./PostulacionENT");
const ConvocatoriaENT = require("./ConvocatoriaENT");

const ComentarioConvocatoriaENT = sequelize.define(
  "ComentarioConvocatoria",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "comentarioconvocatoria",
    timestamps: false,
  }
);

ComentarioConvocatoriaENT.belongsTo(PostulacionENT, {
  foreignKey: "postulacion_id",
  as: "postulacion",
});

ComentarioConvocatoriaENT.belongsTo(ConvocatoriaENT, {
  foreignKey: "convocatoria_id",
  as: "convocatoria",
});

module.exports = ComentarioConvocatoriaENT;
