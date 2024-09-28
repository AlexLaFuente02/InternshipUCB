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
    }
  },
  {
    tableName: "historico_usuario",
    timestamps: false,
  }
);

module.exports = HistoricoUsuarioENT;
