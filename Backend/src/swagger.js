const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

//Metadata info about our API
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "INTERNSHIP BY UCB API",
      version: "1.0.0",
    },
  },
  apis: [
    "src/API/authAPI.js",
    "src/API/usuarioAPI.js",
    "src/API/carreraAPI.js",
    "src/API/historicoConvocatoriasAPI.js",
    "src/API/historicoPostulacionesAPI.js",
    "src/API/estudianteAPI.js",
    "src/API/postulacionAPI.js",
    "src/API/tiempoACumplirAPI.js",
    "src/API/TipoUsuarioAPI.js",
    "src/API/estadoConvocatoriaAPI.js",
    "src/API/aprobacionConvocatoriaAPI.js",
    "src/API/estadoSolicitudInstitucionAPI.js",
    "src/API/institucionAPI.js",
    "src/API/sectorPertenenciaAPI.js",
    "src/API/convocatoriaAPI.js",
    "src/API/adminuseiAPI.js",
    "src/API/estadoPostulacionAPI.js",
    "src/API/sedeAPI.js",
    "src/API/semestreAPI.js",
    "src/API/historicoUsuarioAPI.js",
    "src/DTO/ResponseDTO.js",
    "src/DTO/UsuarioDTO.js",
    "src/DTO/CarreraDTO.js",
    "src/DTO/historicoConvocatoriasDTO.js",
    "src/DTO/historicoPostulacionesDTO.js",
    "src/DTO/TiempoACumplirDTO.js",
    "src/DTO/TipoUsuarioDTO.js",
    "src/DTO/EstadoConvocatoriaDTO.js",
    "src/DTO/EstudianteDTO.js",
    "src/DTO/PostulacionDTO.js",
    "src/DTO/AprobacionConvocatoriaDTO.js",
    "src/DTO/EstadoSolicitudInstitucionDTO.js",
    "src/DTO/InstitucionDTO.js",
    "src/DTO/SectorPertenenciaDTO.js",
    "src/DTO/ConvocatoriaDTO.js",
    "src/DTO/HistoricoUsuarioDTO.js",
    "src/DTO/AdminuseiDTO.js",
    "src/DTO/EstadoPostulacionDTO.js",
    "src/DTO/SedeDTO.js",
    "src/DTO/SemestreDTO.js",
    
    // Add more API and service pairs as needed
  ],
};

//Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our Docs
const swaggerDocs = (app, port) => {
  app.use(
    "/internshipByUCB/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec)
  );
  app.get("/internshipByUCB/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `📄 Version 1 Docs are Available at http://localhost:${port}/internshipByUCB/docs`
  );
};

module.exports = { swaggerDocs };
