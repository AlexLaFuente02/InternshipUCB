/*CREATE TABLE sede (
    id int AUTO_INCREMENT PRIMARY KEY,
    nombresede varchar(100) NOT NULL
);*/

const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");

const SedeENT = sequelize.define(
    "Sede",
    {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        nombresede: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    },
    {
        tableName: "sede",
        timestamps: false,
    }
);

module.exports = SedeENT;


