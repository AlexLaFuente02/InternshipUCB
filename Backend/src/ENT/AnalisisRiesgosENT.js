const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const AnalisisRiesgosENT = sequelize.define(
    'AnalisisRiesgos',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        aplicativo_sistema_servicio: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        amenaza_vulnerabilidad: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        consecuencia: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        probabilidad_inherente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        impacto_inherente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        riesgo_inherente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nivel_riesgo_inherente: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        tratamiento_riesgo_inherente: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        control: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        tipo_control: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        nivel_control: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        frecuencia_control: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        probabilidad_residual: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        impacto_residual: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        riesgo_residual: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nivel_riesgo_residual: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'analisis_riesgos',
        timestamps: false,
    }
);

module.exports = AnalisisRiesgosENT;
