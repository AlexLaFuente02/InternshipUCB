const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");
const UsuarioENT = require("./UsuarioENT");
const SectorPertenenciaENT = require("./sectorPertenenciaENT"); // Asumiendo que tienes un modelo para sectorpertenencia

const InstitucionENT = sequelize.define(
  "Institucion",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreinstitucion: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    reseniainstitucion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    logoinstitucion: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    nombrecontacto: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    correocontacto: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    celularcontacto: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
  },
  {
    tableName: "institucion",
    timestamps: false,
  }
);

InstitucionENT.belongsTo(UsuarioENT, {
  foreignKey: "usuario_id",
  as: "usuario",
  targetKey: "id",
  required: false
});

InstitucionENT.belongsTo(SectorPertenenciaENT, {
  foreignKey: "sectorpertenencia_id",
  as: "sectorpertenencia",
  targetKey: "id",
  required: false
});

module.exports = InstitucionENT;
