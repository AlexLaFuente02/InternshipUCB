<template>
  <div class="container">
    <h1>Modificar Roles</h1>
    <div class="info">
      <p>Lista de USEI:</p>
    </div>
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
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.id }}</td>
          <td>{{ usuario.usuario_id.idusuario }}</td>
          <td>USEI</td> <!-- Dado que todos son administradores USEI -->
          <td>
            <input
              type="checkbox"
              v-model="usuario.habilitarVer"
              @change="toggleVer(usuario.id)"
              :id="'ver-' + usuario.id"
            />
          </td>
          <td>
            <input
              type="checkbox"
              v-model="usuario.habilitarModificar"
              @change="toggleModificar(usuario.id)"
              :id="'modificar-' + usuario.id"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="info">
      <p>Lista de USEI:</p>
    </div>
  </div>
</template>

<script>
import { actualizarPermisoModificar,actualizarPermisoVer, obtenerTodosUsuariosUsei } from "../../services/usei";

export default {
  name: "ModifyRoles",
  data() {
    return {
      usuarios: [] // Cambiado a array
    };
  },
  methods: {
    async fetchUsuarios() {
      try {
        const response = await obtenerTodosUsuariosUsei(); // Asegúrate de que este método sea el correcto
        if (response && response.result) {
          this.usuarios = response.result.map((usuario) => ({
            ...usuario,
            habilitarVer: usuario.habilitado_ver === 1, // Convertir a booleano
            habilitarModificar: usuario.habilitado_modific === 1 // Convertir a booleano
          }));
        }
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    },
    async fetchUsuariosInstituciones() {
      try {
        const response = await obtenerTodosUsuariosUsei(); // Asegúrate de que este método sea el correcto
        if (response && response.result) {
          this.usuarios = response.result.map((usuario) => ({
            ...usuario,
            habilitarVer: usuario.habilitado_ver === 1, // Convertir a booleano
            habilitarModificar: usuario.habilitado_modific === 1 // Convertir a booleano
          }));
        }
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    },
    async toggleVer(id) {
      const usuario = this.usuarios.find((u) => u.id === id);
      if (usuario) {
        console.log(`Usuario con ID ${id} - Habilitar Ver: ${usuario.habilitarVer}`);
        await actualizarPermisoVer(id);
      }
    },
    async toggleModificar(id) {
      try {
        const usuario = this.usuarios.find((u) => u.id === id);
        if (usuario) {
          console.log(`Usuario con ID ${id} - Habilitar Modificar: ${usuario.habilitarModificar}`);
          await actualizarPermisoModificar(id);
        }
      } catch (error){
        console.error("Error al cambiar el permiso:", error);
      }
    }
  },
  mounted() {
    this.fetchUsuarios();
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
  margin-bottom: 20px;
}

table {
  width: 80%; /* Cambia este valor para ajustar el ancho deseado */
  border-collapse: collapse;
  margin-bottom: 20px;
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