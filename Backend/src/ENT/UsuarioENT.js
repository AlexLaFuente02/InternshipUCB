const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");
const TipoUsuarioENT = require("./TipoUsuarioENT");


const UsuarioENT = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idusuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contrasenia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero_intentos:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3
    },
    estado:{
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "usuario",
    timestamps: false,
  }
);

UsuarioENT.belongsTo(TipoUsuarioENT, {
  foreignKey: "tipousuario_id",
  as: "tipousuario",
  targetKey: "id",
});

module.exports = UsuarioENT;
