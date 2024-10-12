const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");
const UsuarioENT = require("./UsuarioENT");

const AdminuseiENT = sequelize.define(
  "AdminUSEI",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    habilitado_ver: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    habilitado_modific: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "adminusei",
    timestamps: false,
  }
);

AdminuseiENT.belongsTo(UsuarioENT, {
  foreignKey: "usuario_id",
  as: "usuario",
  targetKey: "id",
});

module.exports = AdminuseiENT;
