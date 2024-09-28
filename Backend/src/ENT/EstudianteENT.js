const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");
const CarreraENT = require("./CarreraENT");
const SedeENT = require("./SedeENT");
const SemestreENT = require("./semestreENT");

const EstudianteENT = sequelize.define(
  "Estudiante",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    nombres: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellidopaterno: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellidomaterno: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    carnetidentidad: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    correoelectronico: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    celularcontacto: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    graduado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    carrera_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    semestre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sede_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    aniograduacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    linkcurriculumvitae: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "estudiante",
    timestamps: false,
  }
);

EstudianteENT.belongsTo(CarreraENT, {
  foreignKey: "carrera_id",
  as: "carrera",
  targetKey: "id",
});

EstudianteENT.belongsTo(SemestreENT, {
  foreignKey: "semestre_id",
  as: "semestre",
  targetKey: "id",
});

EstudianteENT.belongsTo(SedeENT, {
  foreignKey: "sede_id",
  as: "sede",
  targetKey: "id",
});

module.exports = EstudianteENT;
