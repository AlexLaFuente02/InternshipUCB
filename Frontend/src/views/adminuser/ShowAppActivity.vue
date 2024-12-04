<template>
    <div class="container">
      <div class="header">
        <h1>Actividad de Aplicación</h1>
        <button @click="descargarJSON" class="btn-descargar">Descargar en JSON</button>
      </div>
  
      <!-- Combobox para seleccionar la tabla -->
      <div class="combobox-container">
        <label for="tabla-select">Seleccionar tabla:</label>
        <select id="tabla-select" v-model="tablaSeleccionada" @change="cambiarTabla">
          <option value="convocatoria">Convocatoria</option>
          <option value="postulaciones">Postulaciones</option>
        </select>
      </div>
  
      <!-- Tabla dinámica -->
      <table>
        <thead>
          <tr>
            <th v-for="(columna, index) in columnas" :key="index">{{ columna }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(fila, index) in filas" :key="index">
            <td>{{ index + 1 }}</td> <!-- ID autoincremental -->
            <td>{{ fila.Usuario }}</td>
            <td v-if="tablaSeleccionada === 'convocatoria'">{{ fila.Institución }}</td> <!-- Solo para Convocatorias -->
            <td v-if="tablaSeleccionada === 'postulaciones'">{{ fila.Nombre }}</td>
            <td>{{ fila["Fecha Acción"] }}</td>
            <td class="accion">{{ fila.Acción }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { getAllConvocatorias, getAllPostulaciones } from "@/services/common.js";
  
  export default {
    name: "ShowActivity",
    data() {
      return {
        tablaSeleccionada: "convocatoria", 
        columnas: ["ID", "Usuario", "Institución", "Fecha Acción", "Acción"], 
        filas: [], 
      };
    },
    mounted() {
      this.cambiarTabla(); 
    },
    methods: {
      async cargarConvocatorias() {
        try {
          const data = await getAllConvocatorias();
          if (data) {
            this.filas = data.map(item => ({
              Usuario: item.institucion_id?.usuario?.idusuario || "No definido", 
              Institución: item.institucion_id?.nombreinstitucion || "No definida", 
              "Fecha Acción": item.fecha_accion || "No definida", 
              Acción: item.accion || "No definida", 
            }));
          }
        } catch (error) {
          console.error("Error al cargar las convocatorias: ", error);
        }
      },
      async cargarPostulaciones() {
        try {
          const data = await getAllPostulaciones();
          if (data) {
            this.filas = data.map(item => ({
              Usuario: item.estudiante_id?.usuario_id?.idusuario || "No definido", 
              Nombre: `${item.estudiante_id?.nombres || "No definido"} ${item.estudiante_id?.apellidopaterno || ""} ${item.estudiante_id?.apellidomaterno || ""}`,
              "Fecha Acción": item.fecha_accion || "No definida", 
              Acción: item.accion || "No definida", 
            }));
          }
        } catch (error) {
          console.error("Error al cargar las postulaciones: ", error);
        }
      },
      cambiarTabla() {
        if (this.tablaSeleccionada === "convocatoria") {
          this.columnas = ["ID", "Usuario", "Institución", "Fecha Acción", "Acción"];
          this.cargarConvocatorias();
        } else if (this.tablaSeleccionada === "postulaciones") {
          this.columnas = ["ID", "Usuario", "Nombre", "Fecha Acción", "Acción"];
          this.cargarPostulaciones();
        }
      },
      descargarJSON() {
      const datosDescarga = this.filas.map((fila, index) => {
        if (this.tablaSeleccionada === "convocatoria") {
          return {
            ID: index + 1,
            Usuario: fila.Usuario,
            Institución: fila.Institución,
            "Fecha Acción": fila["Fecha Acción"],
            Acción: fila.Acción,
          };
        } else if (this.tablaSeleccionada === "postulaciones") {
          return {
            ID: index + 1,
            Usuario: fila.Usuario,
            Nombre: fila.Nombre,
            "Fecha Acción": fila["Fecha Acción"],
            Acción: fila.Acción,
          };
        }
      });

      const datosJSON = JSON.stringify(datosDescarga, null, 2);
      const blob = new Blob([datosJSON], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${this.tablaSeleccionada}.json`;
      link.click();
      URL.revokeObjectURL(url);
    },
  },
};
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
    padding-bottom: 100px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
  }
  
  .header h1 {
    flex: 1;
    text-align: center;
    margin: 0;
  }
  
  .btn-descargar {
    padding: 10px 15px;
    background-color: #458bd0;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .btn-descargar:hover {
    background-color: #336aa8;
  }
  
  .combobox-container {
    width: 80%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    align-items: center;
  }
  
  .combobox-container label {
    margin-right: 10px;
  }
  
  .combobox-container select {
    padding: 5px 10px;
    font-size: 14px;
  }
  
  table {
    width: 80%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  th {
    background-color: #458bd0;
    color: white;
    padding: 8px;
    border: 2px solid black;
  }
  
  td {
    border: 2px solid black;
    padding: 8px;
    text-align: left;
    color: black;
  }
  
  td.accion {
    max-width: 300px;
    word-wrap: break-word;
    word-break: break-word;
    white-space: normal;
  }
  </style>
  