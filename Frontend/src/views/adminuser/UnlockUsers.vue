<template>
  <div class="container">
    <h1>Desbloqueo de Usuarios</h1>
    <div class="info">
      <p>Lista de usuarios bloqueados:</p>
    </div>
    <!-- Tabla para mostrar usuarios -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Usuario</th>
          <th>Tipo de Usuario</th>
          <th>Número de Intentos</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <!-- Iterar sobre los usuarios -->
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.id }}</td>
          <td>{{ usuario.idusuario }}</td>
          <td>{{ getTipoUsuario(usuario.tipousuario.id) }}</td>
          <td>{{ usuario.numero_intentos }}</td>
          <td>{{ usuario.estado }}</td>
          <td>
            <button @click="desbloquearUsuario(usuario.id)">Desbloquear</button>
            <button @click="bloquearUsuario(usuario.id)">Bloquear</button>
            <button @click="eliminarUsuario(usuario.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getAllUsers } from "@/services/common.js";
import { changeEstadoActivado, changeEstadoEliminado, changeEstadoBloqueado} from "../../services/common";

export default {
  name: "UnlockUsers",
  data() {
    return {
      usuarios: [] // Inicia vacía y se llenará con los datos obtenidos
    };
  },
  methods: {
    async fetchUsuarios() {
      try {
        const users = await getAllUsers();
        if (users) {
          this.usuarios = users; // Asigna los usuarios obtenidos
        }
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    },
    async desbloquearUsuario(id) {
      console.log(`Desbloquear usuario con ID: ${id}`);
      await changeEstadoActivado(id);
      this.fetchUsuarios();
    },
    async bloquearUsuario(id) {
      console.log(`Bloquear usuario con ID: ${id}`);
      await changeEstadoBloqueado(id);
      this.fetchUsuarios();
    },
    async eliminarUsuario(id) {
      console.log(`Eliminar usuario con ID: ${id}`);
      await changeEstadoEliminado(id);
      this.fetchUsuarios();
    },
    getTipoUsuario(id) {
      switch (id) {
        case 1:
          return 'Estudiante';
        case 2:
          return 'Institución';
        case 3:
          return 'Administrador';
        case 4:
          return "Administrador Usuarios";
        default:
          return 'Desconocido';
      }
    }
  },
  mounted() {
    this.fetchUsuarios(); // Cargar los usuarios al montar el componente
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

.info {
  width: 80%; /* Alinea el texto con el inicio de la tabla */
  text-align: left;
  margin-bottom: 10px;
}

table {
  width: 80%; /* Cambia este valor para ajustar el ancho deseado */
  border-collapse: collapse;
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
