const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");
const EstadoPostulacionENT = require("./EstadoPostulacionENT");
const EstudianteENT = require("./EstudianteENT");
const ConvocatoriaENT = require("./ConvocatoriaENT");

const HistoricoPostulacionesENT = sequelize.define("historico_postulaciones", {
    id_h: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_p: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fechapostulacion: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: "historico_postulaciones",
    timestamps: false,
});

// Establecer las relaciones
HistoricoPostulacionesENT.belongsTo(EstadoPostulacionENT, {
    foreignKey: "estadopostulacion_id",
    as: "estadopostulacion"
});
HistoricoPostulacionesENT.belongsTo(EstudianteENT, {
    foreignKey: "estudiante_id",
    as: "estudiante"
});
HistoricoPostulacionesENT.belongsTo(ConvocatoriaENT, {
    foreignKey: "convocatoria_id",
    as: "convocatoria"
});

module.exports = HistoricoPostulacionesENT;
