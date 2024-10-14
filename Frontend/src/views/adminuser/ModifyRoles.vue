<template>
  <div class="container">
    <h1>Modificar Roles</h1>

    <!-- Combobox para seleccionar el tipo de usuario -->
    <div class="info">
      <label for="roleSelector">Seleccionar Tipo de Usuario:</label>
      <select id="roleSelector" v-model="selectedRole" @change="onRoleChange">
        <option value="usei">Administrador USEI</option>
        <option value="institucion">Institución</option>
      </select>
    </div>

    <!-- Tabla dinámica según el tipo de usuario seleccionado -->
    <table v-if="selectedRole === 'usei'">
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
          <td>USEI</td>
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

    <!-- Tabla para Instituciones -->
    <table v-if="selectedRole === 'institucion'">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre de la Empresa</th>
          <th>Habilitar Agregar Convocatoria</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="institucion in institucionesActivas" :key="institucion.id">
          <td>{{ institucion.id }}</td>
          <td>{{ institucion.nombreinstitucion }}</td>
          <td>
            <input
              type="checkbox"
              v-model="institucion.habilitarAgregarConvocatoria"
              @change="toggleAgregarConvocatoria(institucion.id)"
              :id="'convocatoria-' + institucion.id"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {actualizarPermisoModificar, actualizarPermisoVer, obtenerTodosUsuariosUsei,} from "../../services/usei";
import {getAllInstituciones,actualizarAgregarConv,} from "../../services/institutionService.js";

export default {
  name: "ModifyRoles",
  data() {
    return {
      usuarios: [], // Lista de usuarios (USEI o Instituciones)
      instituciones: [], // Lista de todas las instituciones
      selectedRole: "usei", // Rol seleccionado por defecto
    };
  },
  computed: {
    institucionesActivas() {
      // Filtrar instituciones que están activas
      const activas = this.instituciones.filter((institucion) => institucion.estado === "ACTIVO");
      console.log("Instituciones activas:", activas);
      return activas;
    },
  },
  methods: {
    async fetchUsuariosUsei() {
      try {
        const response = await obtenerTodosUsuariosUsei();
        if (response && response.result) {
          this.usuarios = response.result.map((usuario) => ({
            ...usuario,
            habilitarVer: usuario.habilitado_ver === 1, // Convertir a booleano
            habilitarModificar: usuario.habilitado_modific === 1, // Convertir a booleano
          }));
        }
      } catch (error) {
        console.error("Error al obtener los usuarios USEI:", error);
      }
    },
    async fetchUsuariosInstitucion() {
  try {
    const instituciones = await getAllInstituciones();
    
    // Mostrar lo que devuelve la función getAllInstituciones
    console.log("Instituciones obtenidas desde la API:", instituciones);

    if (instituciones) {
      // Solo guardamos las instituciones, el filtro se aplica en 'institucionesActivas'
      this.instituciones = instituciones.map((institucion) => ({
        ...institucion,
        habilitarAgregarConvocatoria: institucion.habilitado_agregarconvocatoria === true, // Convertir a booleano
      }));

      // Mostrar lo que se guardó en this.instituciones
      console.log("Instituciones guardadas para la tabla:", this.instituciones);
    }
  } catch (error) {
    console.error("Error al obtener las instituciones:", error);
  }
}
,
    onRoleChange() {
      // Cambiar los usuarios según el rol seleccionado
      if (this.selectedRole === "usei") {
        this.fetchUsuariosUsei();
      } else if (this.selectedRole === "institucion") {
        this.fetchUsuariosInstitucion();
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
      const usuario = this.usuarios.find((u) => u.id === id);
      if (usuario) {
        console.log(
          `Usuario con ID ${id} - Habilitar Modificar: ${usuario.habilitarModificar}`
        );
        await actualizarPermisoModificar(id);
      }
    },
    async toggleAgregarConvocatoria(id) {
  const institucion = this.instituciones.find((i) => i.id === id);
  if (institucion) {
    // Convertir el valor booleano a 1 o 0
    const habilitado = institucion.habilitarAgregarConvocatoria ? 1 : 0;
    console.log(
      `Institución con ID ${id} - Habilitar Agregar Convocatoria: ${habilitado}`
    );
    try {
      // Aquí aseguramos que estamos pasando el valor correcto (1 o 0)
      const response = await actualizarAgregarConv(id, habilitado);
      console.log('Permiso de agregar convocatoria actualizado exitosamente');
    } catch (error) {
      console.log('Error al actualizar el permiso de agregar convocatoria:', error);
    }
  }
}
,
  },
  mounted() {
    this.fetchUsuariosUsei(); // Cargar los usuarios de USEI por defecto
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
}

.info {
  width: 80%;
  text-align: left;
  margin-bottom: 20px;
}

table {
  width: 80%;
  border-collapse: collapse;
  margin-bottom: 20px;
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

input[type="checkbox"] {
  margin-right: 10px;
}
</style>
