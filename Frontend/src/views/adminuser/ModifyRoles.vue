<template>
  <div class="container">
    <h1>Modificar Roles</h1>
    <div class="info">
      <p>Lista de usuarios:</p>
    </div>
    <!-- Tabla para mostrar usuarios -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Usuario</th>
          <th>Tipo de Usuario</th>
          <th>Habilitar Ver</th>
          <th>Habilitar Modificar</th>
        </tr>
      </thead>
      <tbody>
        <!-- Iterar sobre los usuarios -->
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.id }}</td>
          <td>{{ usuario.idusuario }}</td>
          <td>{{ getTipoUsuario(usuario.tipousuario.id) }}</td>
          <td>
            <input type="checkbox" v-model="usuario.habilitarVer" @change="toggleVer(usuario.id)" />
          </td>
          <td>
            <input type="checkbox" v-model="usuario.habilitarModificar" @change="toggleModificar(usuario.id)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getAllUsers } from "@/services/common.js";

export default {
  name: "ModifyRoles",
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
          // Inicializar los checkboxes de habilitar ver y modificar con valores por defecto
          this.usuarios = users.map((usuario) => ({
            ...usuario,
            habilitarVer: false, // Valor por defecto
            habilitarModificar: false // Valor por defecto
          }));
        }
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    },
    toggleVer(id) {
      const usuario = this.usuarios.find((u) => u.id === id);
      if (usuario) {
        console.log(`Usuario con ID ${id} - Habilitar Ver: ${usuario.habilitarVer}`);
        // Implementar la lógica para habilitar o deshabilitar la opción "Ver"
      }
    },
    toggleModificar(id) {
      const usuario = this.usuarios.find((u) => u.id === id);
      if (usuario) {
        console.log(`Usuario con ID ${id} - Habilitar Modificar: ${usuario.habilitarModificar}`);
        // Implementar la lógica para habilitar o deshabilitar la opción "Modificar"
      }
    },
    getTipoUsuario(id) {
      switch (id) {
        case 1:
          return "Estudiante";
        case 2:
          return "Institución";
        case 3:
          return "Administrador";
        default:
          return "Desconocido";
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

input[type="checkbox"] {
  margin-right: 10px;
}
</style>
