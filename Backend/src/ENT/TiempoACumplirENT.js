const { Model, DataTypes } = require('sequelize');
const sequelize = require("../../database/db");

class TiempoAcumplir extends Model {}

TiempoAcumplir.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'TiempoAcumplir',
    tableName: 'tiempoacumplir',
    timestamps: false
});

module.exports = TiempoAcumplir;
