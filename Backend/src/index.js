const express = require("express");
const app = express();
const helmet = require('helmet');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const axios = require('axios');
//CORS - conexion entre servidores
const cors = require("cors");
//Seguridad
const passport = require("passport");
const session = require("express-session");
const { isAuthenticated, checkRole} = require("./services/authService"); // Importa el middleware isAuthenticated
//Swagger para documentar
const { swaggerDocs: V1SwaggerDocs } = require("./swagger");
//Fotos
const path = require('path');
app.use('/images', express.static(path.join(__dirname, '..', 'images')));

// Usa Helmet para mayor seguridad
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"], // Agrega dominios de scripts confiables
        styleSrc: ["'self'", "'unsafe-inline'"], // Permite estilos internos seguros
        imgSrc: ["'self'", "data:"], // Permite imágenes desde la app y data URIs
        connectSrc: ["'self'"], // Conexiones como APIs
        fontSrc: ["'self'", // Fuentes externas confiables
        objectSrc: ["'none'"], // Evita objetos como Flash o Applets
        frameSrc: ["'none'"], // Evita iframes
        upgradeInsecureRequests: [], // Convierte peticiones HTTP en HTTPS
      },
    },
  }),
);

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());
// Middleware para permitir CORS desde cualquier dominio
const corsOptions = {
  // Permitir explícitamente el origen del cliente
  origin: 'http://localhost:5173',
  credentials: true, // Esto es necesario para las cookies de sesión y los headers de autenticación
};
app.use(cors(corsOptions));
// Configuración de Passport
app.use(
  session({
    secret: "tu-secret-key", // Usa una clave secreta que sea única y segura
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // En producción, deberías estar usando https
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());


// Importa las rutas
const tipoUsuarioAPI = require("./API/tipoUsuarioAPI");
const UsuarioAPI = require("./API/usuarioAPI");
const estadoPostulacionAPI = require("./API/estadoPostulacionAPI");
const semestreAPI = require("./API/semestreAPI");
const sedeAPI = require("./API/sedeAPI");
const sectorPertenenciaAPI = require("./API/sectorPertenenciaAPI");
const carreraAPI = require("./API/carreraAPI");
const institucionAPI = require("./API/institucionAPI");
const estadoConvocatoriaAPI = require("./API/estadoConvocatoriaAPI");
const tiempoAcumplirAPI = require("./API/tiempoacumplirAPI");
const convocatoriaAPI = require("./API/convocatoriaAPI");
const adminuseiAPI = require("./API/adminuseiAPI");
const historicoUsuarioAPI = require("./API/historicoUsuarioAPI");
const historicoConvocatoriasAPI = require("./API/historicoConvocatoriasAPI");
const estudianteAPI = require("./API/estudianteAPI");
const postulacionAPI = require("./API/postulacionAPI");
const aprobacionConvocatoriaAPI = require("./API/aprobacionConvocatoriaAPI");
const estadoSolicitudInstitucionAPI = require("./API/estadoSolicitudInstitucionAPI");
const historicoPostulacionesAPI = require("./API/historicoPostulacionesAPI");
const comentarioConvocatoriaAPI = require("./API/comentarioConvocatoriaAPI");
const comentarioPostulanteAPI = require("./API/comentarioPostulanteAPI");
const analisisRiesgosAPI = require("./API/analisisRiesgosAPI");

const authAPI = require("./API/authAPI");

const studentRoutes = require('./routes/studentRoutes');
const instutionRoutes = require('./routes/institutionRoutes');
const useiRoutes = require('./routes/useiRoutes');
const publicRoutes = require('./routes/publicRoutes');



/* API ANTERIOR:*/
app.use("/adminUSEI", adminuseiAPI); //NO INCLUIR EN CONSUMOS PORQUE SOLO SE MANEJA DESDE BASE DE DATOS DE ADMINISTRADOR
app.use("/aprobacionConvocatoria", aprobacionConvocatoriaAPI);  //REVISAR UTILIDAD, NO SE USA EN FRONTEND
app.use("/carrera", carreraAPI);  //SIN AUTENTICACION PORQUE SE USA EN REGISTRO DE ESTUDIANTE, usa en FRONT
app.use("/convocatoria", convocatoriaAPI); //usado en FRONT por STUDENT(getall y getid), POST por INSTITUCION, GetAll,GetByID, PUT por USEI
app.use("/estadoConvocatoria", estadoConvocatoriaAPI); //No se usa en FRONT, util en Convocatorias    
app.use("/estadoPostulacion", estadoPostulacionAPI); //No se usa en FRONT, util en Convocatorias
app.use("/estadosolicitudinstitucion", estadoSolicitudInstitucionAPI); //Utilizable en FRONT por Instituciones para saber su estado de solicitud
app.use("/estudiante", estudianteAPI); //Post utilizado en FRONT para registro STUDENT, GET por admin?
app.use("/historicoConvocatorias", historicoConvocatoriasAPI); //futuro uso por ID de INSTITUCION**
app.use("/historicoPostulaciones", historicoPostulacionesAPI); //futuro uso por ID de STUDENT**
app.use("/historicoUsuario", historicoUsuarioAPI); //no tiene uso en FRONT, USEI
app.use("/institucion",  institucionAPI); //usado en FRONT para POST por INSTITUCION
app.use("/postulacion", postulacionAPI); //usado en FRONT por STUDENT(post), GetAll y GetID por INSTITUCION
app.use("/sectorPertenencia", sectorPertenenciaAPI); //SIN AUTENTICACION usado en FRONT getAll por INSTITUCION
app.use("/sede", sedeAPI); //SIN AUTENTICACION usado en FRONT getAll por STUDENT
app.use("/semestre", semestreAPI); //SIN AUTENTICACION usado en FRONT getAll por STUDENT
app.use("/tiempoacumplir", tiempoAcumplirAPI); //utilizado por INSTIUTICION en FRONT para POST
app.use("/tipoUsuario", tipoUsuarioAPI);  //no tiene uso en FRONT, USEI
app.use("/usuario", UsuarioAPI); //no tiene uso en FRONT, a no ser modificar contraseña**
app.use("/comentarioConvocatoria", comentarioConvocatoriaAPI); 
app.use("/comentarioPostulante", comentarioPostulanteAPI);
app.use("/analisisRiesgos", analisisRiesgosAPI);

app.use("/auth", authAPI); 


app.use('/student',isAuthenticated, checkRole(1), studentRoutes);
app.use('/institution',isAuthenticated, checkRole(2), instutionRoutes); 
app.use('/usei',isAuthenticated, checkRole(3), useiRoutes);
/*
app.use('/student', studentRoutes);
app.use('/institution', instutionRoutes);
app.use('/usei', useiRoutes);
*/

app.use('/public', publicRoutes);

app.use('/images', express.static(path.join(__dirname, '../..', 'images')));

app.use((req, res, next) => {
  const blockedHosts = ['169.254.169.254', 'localhost:5173', 'localhost:3000'];
  const requestUrl = req.originalUrl || '';
  const hostHeader = req.headers['host'] || '';

  // Bloquea si la URL o el host están relacionados con metadatos
  if (
    blockedHosts.some((host) => hostHeader.includes(host)) &&
    requestUrl.includes('meta-data')
  ) {
    console.log('Intento de acceso bloqueado a metadatos.');
    return res.status(403).json({ error: 'Acceso a metadatos bloqueado.' });
  }

  next();
});

//app.use('/public', publicRoutes);

// Ruta de inicio
app.get("/", (req, res) => {
  res.send("¡Bienvenido al API REST de INTERNSHIP!");
});
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
// Escucha en el puerto especificado
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  V1SwaggerDocs(app, PORT);
});




