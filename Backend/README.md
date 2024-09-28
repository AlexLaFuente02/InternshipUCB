# 🚀 Backend_Internship

## 📌 Descripción del proyecto:

**Internship by Cato** es una plataforma integral diseñada para transformar la forma en que se manejan las prácticas pre-profesionales y pasantías no curriculares. No solo optimiza y simplifica el proceso de publicación de convocatorias, sino que también ofrece un conjunto de herramientas robustas para diversas partes interesadas:

- **Para los Estudiantes**: Se convierte en un centro unificado donde pueden obtener información detallada sobre las convocatorias y seguir de cerca sus postulaciones, todo desde una sola página web.

- **Para las Instituciones y Empresas**: Les brinda una plataforma eficiente para gestionar sus convocatorias, desde la creación hasta la recepción de solicitudes de postulación, facilitando así la selección de candidatos ideales.

- **Para el Admin USEI**: Actúa como superusuario, otorgándole la capacidad de gestionar y aprobar empresas, así como validar y dar luz verde a sus convocatorias. Adicionalmente, se está trabajando en incorporar características analíticas, que ofrecerán estadísticas valiosas sobre estudiantes e instituciones para una mejor toma de decisiones.

Este enfoque multipropósito asegura que cada usuario, ya sea un estudiante, una institución o el administrador, tenga una experiencia personalizada y eficiente en la plataforma.


## 🎯 Objetivos del proyecto:

- Proporcionar endpoints para gestionar [ej. usuarios, estudiantes, instituciones, convocatorias, postulaciones, etc.].
- Asegurar la información del usuario mediante cifrado de contraseñas y autenticación. 
- Facilitar la integración con un frontend a través de CORS.
- Ofrecer documentación API a través de Swagger.

## 📣 Consideraciones importantes:

- Asegúrate de tener Node.js instalado para ejecutar el backend.
- La configuración de la base de datos debe estar correcta para conectarse al servidor MySQL.
- Las variables de entorno o los archivos de configuración no están incluidos en el repositorio debido a razones de seguridad.

## 💻 Tecnologías utilizadas:

- **Lenguaje de Programación**: JavaScript (Node.js).
- **Framework de Desarrollo**: Express.js.
- **Base de datos**: MySQL con Sequelize ORM.
- **Autenticación**: Bcrypt para cifrado de contraseñas, Passport para autenticación, y Passport-local para la estrategia de autenticación local.
- **Gestión de sesiones**: Express-session.
- **Documentación API**: Swagger-jsdoc y Swagger-ui-express.
- **Control de Versiones**: Git.

## 📂 Código fuente:

El código fuente del proyecto backend se encuentra alojado en nuestro repositorio GitHub en la carpeta de Backend. Se ha puesto especial énfasis en asegurar que el código esté organizado, bien estructurado para facilitar su lectura y mantenimiento.

## 🛠 Comandos para instalación:

1. Dentro de la carpeta ProyectoInternship:

```
cd Backend
```

2. Instalamos nodemon para crear la carpeta node_modules y package-lock.json (ignoradas por .gitignore):

```
npm install -D nodemon
```

3. Instalamos express:

```
npm i express
```

4. Instalamos mysql en el proyecto:

```
npm i mysql
```

5. Instalamos sequelize en el proyecto:

```
npm i sequelize
```

6. Instalamos mysql2 para sequelize en el proyecto:

```
npm i mysql2
```

7. Instalamos cors para hacer el consumo de la API en el frontend:

```
npm install cors
```

8. Instalacion de swagger-jsdoc y swagger-ui-express:

```
npm install swagger-jsdoc swagger-ui-express
```

9. Bcrypt para el cifrado de contraseñas:

   ```
   npm install bcrypt
   ```

10. Passport para la autenticación:
   ```
   npm install passport
   ```

11. Passport-local para la estrategia de autenticación local:
   ```
   npm install passport-local
   ```

12. Express-session para gestionar sesiones de usuario:
   ```
   npm install express-session
   ```
## Instalación de la Base de Datos con Docker 💾

Para facilitar la gestión de la base de datos y garantizar que el entorno sea consistente para todos los desarrolladores, recomendamos usar Docker. A continuación se detallan los pasos para inicializar la base de datos `internshipdb` con Docker:

1. **Iniciar una instancia de MySQL en Docker**:
   Esta instancia utilizará el puerto `3306` en tu máquina local, que corresponde al puerto configurado en tu aplicación. Asegúrate de que ningún otro servicio esté utilizando este puerto.
   
   ```bash
   docker run --name internshipdb-container -e MYSQL_ROOT_PASSWORD=admin -p 3306:3306 -d mysql:8
   ```

2. **Conéctate a la base de datos**:

   ```bash
   docker exec -it internshipdb-container mysql -u root -p
   ```

   Se te pedirá la contraseña. Introduce la que configuraste en el paso anterior ("admin").

3. **Crea la base de datos**:

   ```sql
   CREATE DATABASE internshipdb;
   ```

4. **Usa la base de datos**:

   ```sql
   USE internshipdb;
   ```

5. **Ejecuta el script de inicialización**:
   
   Copia el archivo `init.sql` (que se encuentra en la carpeta `database`) al contenedor:

Con estos pasos, tendrás tu base de datos internshipdb configurada y lista para ser utilizada.


## ⚙ Comandos para compilación:

1. SIEMPRE entrar a /Backend:

```
cd Backend
```

2. Para ejecutar como desarrollador:

```
npm run dev
```

---

Para más detalles o consultas sobre el proyecto, no dudes en contactarnos. ¡Gracias por usar nuestro backend! 🙏🎉

---
