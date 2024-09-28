const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");
const PostulacionENT = require("./PostulacionENT");
const ConvocatoriaENT = require("./ConvocatoriaENT");

const ComentarioPostulanteENT = sequelize.define(
  "ComentarioPostulante",
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
    tableName: "comentariopostulante",
    timestamps: false,
  }
);

ComentarioPostulanteENT.belongsTo(PostulacionENT, {
  foreignKey: "postulacion_id",
  as: "postulacion",
});

ComentarioPostulanteENT.belongsTo(ConvocatoriaENT, {
  foreignKey: "convocatoria_id",
  as: "convocatoria",
});

module.exports = ComentarioPostulanteENT;
