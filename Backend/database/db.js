const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql", // El dialecto de la base de datos que estás utilizando
  host: "localhost",
  username: "root",
  password: "",
  database: "internshipdb", // Cambia esto al nombre de tu base de datos
  port: 3306, // Cambia esto al puerto de tu base de datos si es diferente
  timezone: "-04:00", // Esto establece la zona horaria para todas las operaciones de Sequelize
  dialectOptions: {
    dateStrings: true, // Esto evita que MySQL convierta las fechas a UTC
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente.");
  })
  .catch((error) => {
    console.error("Error de conexión a la base de datos:", error);
  });

module.exports = sequelize;
//miapikey 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
