<template>
  <div class="container">
    <h1>Actividad de Usuarios</h1>
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
import axios from 'axios';
import { getUserHistory } from "@/services/common.js"; 

export default {
  name: "ShowActivity",
  data() {
    return {
      historicos: [], // Almacena los datos de la API
    };
  },
  mounted() {
    // Consumir la API cuando el componente sea montado
    this.loadUserHistory()
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
    // Método para traducir el tipo de usuario
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
    // Método para formatear la fecha
    formatFecha(fecha) {
      const date = new Date(fecha);
      return date.toLocaleString(); // Convertir la fecha a un formato legible
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra el contenido horizontalmente */
  padding-top: 50px;
  padding-bottom: 100px;
}

table {
  width: 80%; /* Cambia este valor para ajustar el ancho deseado */
  border-collapse: collapse;
  margin: 20px 0;
}

th {
  background-color: #458bd0; /* Azul claro */
  color: white; /* Letras blancas */
  padding: 8px;
  border: 2px solid black;
}

td {
  border: 2px solid black;
  padding: 8px;
  text-align: left;
  color: black; /* Letras de color negro para los datos */
}

button {
  margin-right: 10px;
}
</style>
