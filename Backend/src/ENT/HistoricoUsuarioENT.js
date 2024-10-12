const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");

const HistoricoUsuarioENT = sequelize.define(
  "HistoricoUsuario",
  {
    id_h: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_u: { // Este es el cambio, antes era una clave foránea
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idusuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contrasenia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipousuario_id: { // Este también cambia de ser una clave foránea a un campo regular
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numero_intentos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creado: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    accion: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "historico_usuario",
    timestamps: false,
  }
);

module.exports = HistoricoUsuarioENT;
