<template>
  <div class="container">
    
    <div class="header">
      <h1>Actividad de Usuarios</h1>
      <button @click="descargarJSON" class="btn-descargar">Descargar en JSON</button>
    </div>

    <!-- Tabla para mostrar el histórico de actividad de los usuarios -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Usuario</th>
          <th>Tipo de Usuario</th>
          <th>Creado</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <!-- Iterar sobre el historial de actividad -->
        <tr v-for="historial in historicos" :key="historial.id_h">
          <td>{{ historial.id_h }}</td>
          <td>{{ historial.idusuario }}</td>
          <td>{{ getTipoUsuario(historial.tipousuario_id) }}</td>
          <td>{{ formatFecha(historial.creado) }}</td>
          <td>{{ historial.accion }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { getUserHistory } from "@/services/common.js";

export default {
  name: "ShowActivity",
  data() {
    return {
      historicos: [], 
    };
  },
  mounted() {

    this.loadUserHistory();
  },
  methods: {
    async loadUserHistory() {
      try {
        const result = await getUserHistory();
        if (result) {
          this.historicos = result;
        }
      } catch (error) {
        console.error("Error al cargar el historial de usuarios:", error);
      }
    },

    getTipoUsuario(tipoUsuarioId) {
      switch (tipoUsuarioId) {
        case 1:
          return "Estudiante";
        case 2:
          return "Institución";
        case 3:
          return "Administrador";
        case 4:
          return "Administrador Usuarios";
        default:
          return "Desconocido";
      }
    },

    formatFecha(fecha) {
      const date = new Date(fecha);
      return date.toLocaleString(); 
    },

    // Método para descargar los datos en formato JSON
    descargarJSON() {
      const datosFiltrados = this.historicos.map(historial => ({
        ID: historial.id_h,
        Usuario: historial.idusuario,
        TipoUsuario: this.getTipoUsuario(historial.tipousuario_id),
        Creado: this.formatFecha(historial.creado),
        Accion: historial.accion,
      }));

      // Convertir los datos filtrados a JSON
      const datosJSON = JSON.stringify(datosFiltrados, null, 2); // Formato legible
      const blob = new Blob([datosJSON], { type: "application/json" }); // Crear un archivo Blob
      const url = URL.createObjectURL(blob); // Crear una URL temporal
      const link = document.createElement("a");
      link.href = url;
      link.download = "actividad_usuarios.json"; // Nombre del archivo
      link.click();
      URL.revokeObjectURL(url); // Limpia la URL temporal
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
  background-color: #458bd0;
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
</style>
