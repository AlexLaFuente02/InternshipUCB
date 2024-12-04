<template>
  <div class="container">
    <div class="header">
      <h1>Lista de Análisis de Riesgos</h1>
    </div>

    <table>
      <thead>
        <tr>
          <th>Aplicativo</th>
          <th>Vulnerabilidad</th>
          <th>Riesgo Inherente</th>
          <th>Nivel de Riesgo</th>
          <th>Tratamiento</th>
          <th>Controles</th>
          <th>Riesgo Residual</th>
          <th>Nivel de Riesgo Residual</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(riesgo, index) in riesgos" :key="riesgo.id">
          <td>{{ riesgo.aplicativo }}</td>
          <td>{{ riesgo.vulnerabilidad }}</td>
          <td>{{ riesgo.riesgoInherente }}</td>
          <td>{{ riesgo.nivelRiesgo }}</td>
          <td>{{ riesgo.tratamiento }}</td>
          <td>{{ riesgo.controles }}</td>
          <td>{{ riesgo.riesgoResidual }}</td>
          <td>{{ riesgo.nivelRiesgoResidual }}</td>
          <td class="actions">
            <font-awesome-icon
              icon="eye"
              class="action-icon view"
              @click="abrirModalVer(riesgo)"
            />
            <font-awesome-icon
              icon="edit"
              class="action-icon edit"
              @click="abrirModalEditar(riesgo)"
            />
            <font-awesome-icon
              icon="trash"
              class="action-icon delete"
              @click="eliminarItem(riesgo.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <ModalEdit
      v-if="modalVisible"
      :visible="modalVisible"
      :id="riesgoSeleccionado?.id"
      :viewOnly="soloVista"
      @cerrar-modal="cerrarModal"
      @guardar-cambios="guardarCambios"
    />

  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { getAllAnalisisRiesgos, deleteAnalisisRiesgos } from "@/services/common.js";
import ModalEdit from "../../components/adminuser/modalEdit.vue";

export default {
  components: {
    FontAwesomeIcon,
    ModalEdit,
  },
  data() {
    return {
      riesgos: [], // Lista dinámica de riesgos
      modalVisible: false, // Controla la visibilidad del modal
      riesgoSeleccionado: null, // Riesgo actualmente seleccionado para editar
      soloVista: true,
    };
  },
  methods: {
    async cargarRiesgos() {
      try {
        const data = await getAllAnalisisRiesgos();
        if (data) {
          this.riesgos = data.map((item) => ({
            id: item.id,
            aplicativo: item.aplicativo_sistema_servicio || "No definido",
            vulnerabilidad: item.amenaza_vulnerabilidad || "No definida",
            riesgoInherente: item.riesgo_inherente || 0,
            nivelRiesgo: item.nivel_riesgo_inherente || "No definido",
            tratamiento: item.tratamiento_riesgo_inherente || "No definido",
            controles: item.control || "No definido",
            riesgoResidual: item.riesgo_residual || 0,
            nivelRiesgoResidual: item.nivel_riesgo_residual || "No definido",
          }));
        }
      } catch (error) {
        console.error("Error al cargar los riesgos:", error);
      }
    },
    abrirModalVer(id) {
      console.log("ID del riesgo seleccionado:", id);
      this.soloVista = true;
      this.riesgoSeleccionado = id; // Pasa el ID del riesgo al modal
      this.modalVisible = true;
    },
    abrirModalEditar(id) {
      console.log("ID del riesgo seleccionado:", id); // Verifica que se está pasando el ID
      this.soloVista = false;
      this.riesgoSeleccionado = id; // Solo guarda el ID seleccionado
      this.modalVisible = true; // Abre el modal
    },
    cerrarModal() {
      this.modalVisible = false; 
    },
    async guardarCambios(riesgoEditado) {
      const index = this.riesgos.findIndex((r) => r.id === riesgoEditado.id);
      if (index !== -1) {
        this.riesgos[index] = riesgoEditado; // Actualiza la tabla localmente
      }
      this.modalVisible = false; // Cierra el modal
      await this.cargarRiesgos(); // Actualiza la lista completa desde el servidor
    },
    async eliminarItem(id) {
      if (confirm("¿Deseas eliminar este análisis de riesgo?")) {
        try {
          const response = await deleteAnalisisRiesgos(id);
          if (response && response.code === "AR-0000") {
            alert("Análisis de riesgo eliminado correctamente.");
            await this.cargarRiesgos();
          } else {
            alert("No se pudo eliminar el análisis de riesgo.");
          }
        } catch (error) {
          console.error("Error al eliminar el análisis de riesgo:", error);
          alert("Ocurrió un error al intentar eliminar el análisis de riesgo.");
        }
      }
    },
  },
  mounted() {
    this.cargarRiesgos(); // Carga los riesgos al montar el componente
  },
};
</script>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
  text-align: center;
  padding: 40px;
}

h1 {
  font-size: 24px;
  color: #515c67;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #458bd0;
  color: white;
  padding: 10px;
  text-align: left;
}

td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.actions {
  text-align: match-parent;
}

.action-icon {
  cursor: pointer;
  margin: 0 2px;
}

.action-icon.view {
  color: #4c4caf;
}

.action-icon.edit {
  color: #4caf50;
}

.action-icon.delete {
  color: #f44336;
}

.action-icon:hover {
  transform: scale(1.2);
}
</style>
