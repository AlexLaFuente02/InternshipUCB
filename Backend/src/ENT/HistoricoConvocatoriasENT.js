const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");
const EstadoConvocatoriaENT = require("./EstadoConvocatoriaENT");
const InstitucionENT = require("./InstitucionENT");
const TiempoAcumplirENT = require("./TiempoACumplirENT");

const HistoricoConvocatoriasENT = sequelize.define("historico_convocatorias", {
    id_h: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_c: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    areapasantia: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcionfunciones: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    requisitoscompetencias: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    horario_inicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    horario_fin: {
        type: DataTypes.TIME,
        allowNull: false
    },
    fechasolicitud: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fechaseleccionpasante: DataTypes.DATEONLY,
    accion: {
        type: DataTypes.ENUM,
        values: ['post', 'put', 'delete'],
        allowNull: false
    },
    fecha_accion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: "historico_convocatorias",
    timestamps: false,
});

// Establecer las relaciones
HistoricoConvocatoriasENT.belongsTo(EstadoConvocatoriaENT, {
    foreignKey: "estadoconvocatoria_id",
    as: "estadoconvocatoria"
});

HistoricoConvocatoriasENT.belongsTo(InstitucionENT, {
    foreignKey: "institucion_id",
    as: "institucion"
});

HistoricoConvocatoriasENT.belongsTo(TiempoAcumplirENT, {
    foreignKey: "tiempoacumplir_id",
    as: "tiempoacumplir"
});

module.exports = HistoricoConvocatoriasENT;
