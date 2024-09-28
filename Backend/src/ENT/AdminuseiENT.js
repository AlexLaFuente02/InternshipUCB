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
