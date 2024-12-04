<template>
    <div class="modal-overlay" v-if="visible">
      <div class="modal-container">
        <div class="modal-header">
          <h2>{{ viewOnly ? "Vista de Análisis de Riesgo" : "Editar Análisis de Riesgo" }}</h2>
        </div>
        <div class="modal-content">
          <!-- Formulario -->
          <form @submit.prevent="guardarCambios">
            <!-- Aplicativos Sistemas Servicios -->
            <div class="input-group">
              <label for="sistemas-servicios">Aplicativos Sistemas Servicios:</label>
              <input
                type="text"
                id="sistemas-servicios"
                v-model="riesgoEditado.aplicativo"
                :readonly="viewOnly"
              />
            </div>
  
            <!-- Amenaza Vulnerabilidad -->
            <div class="input-group">
              <label for="vulnerabilidad">Amenaza Vulnerabilidad:</label>
              <input
                type="text"
                id="vulnerabilidad"
                v-model="riesgoEditado.vulnerabilidad"
                :readonly="viewOnly"
              />
            </div>
  
            <!-- Consecuencia -->
            <div class="input-group">
              <label for="consecuencia">Consecuencia:</label>
              <input
                type="text"
                id="consecuencia"
                v-model="riesgoEditado.consecuencia"
                :readonly="viewOnly"
              />
            </div>
  
            <!-- Riesgo Inherente -->
            <div class="input-row">
              <div class="field">
                <label for="probabilidad">Probabilidad:</label>
                <select
                  id="probabilidad"
                  v-model="riesgoEditado.probabilidad"
                  @change="calcularRiesgos"
                  :disabled="viewOnly"
                >
                  <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
                </select>
              </div>
              <div class="field">
                <label for="impacto">Impacto:</label>
                <select
                  id="impacto"
                  v-model="riesgoEditado.impacto"
                  @change="calcularRiesgos"
                  :disabled="viewOnly"
                >
                  <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
                </select>
              </div>
              <div class="field">
                <label for="riesgo-inherente">Riesgo Inherente:</label>
                <input
                  type="number"
                  id="riesgo-inherente"
                  v-model="riesgoEditado.riesgoInherente"
                  readonly
                />
              </div>
              <div class="field">
                <label for="nivel-riesgo">Nivel de Riesgo:</label>
                <input
                  type="text"
                  id="nivel-riesgo"
                  v-model="riesgoEditado.nivelRiesgo"
                  readonly
                />
              </div>
            </div>
  
            <!-- Controles -->
            <div class="input-group">
              <label for="controles">Controles:</label>
              <input
                type="text"
                id="controles"
                v-model="riesgoEditado.controles"
                :readonly="viewOnly"
              />
            </div>
  
            <!-- Tipo, Nivel y Frecuencia -->
            <div class="input-row">
              <div class="field">
                <label for="tipo">Tipo:</label>
                <select id="tipo" v-model="riesgoEditado.tipo" :disabled="viewOnly">
                  <option value="Preventivo">Preventivo</option>
                  <option value="Detectivo">Detectivo</option>
                  <option value="Correctivo">Correctivo</option>
                </select>
              </div>
              <div class="field">
                <label for="nivel">Nivel:</label>
                <select id="nivel" v-model="riesgoEditado.nivel" :disabled="viewOnly">
                  <option value="Automático">Automático</option>
                  <option value="Semiautomático">Semiautomático</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div class="field">
                <label for="frecuencia">Frecuencia:</label>
                <select id="frecuencia" v-model="riesgoEditado.frecuencia" :disabled="viewOnly">
                  <option value="Diario">Diario</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Mensual">Mensual</option>
                  <option value="Anual">Anual</option>
                  <option value="Por Evento">Por Evento</option>
                </select>
              </div>
            </div>
  
            <!-- Riesgo Residual -->
            <div class="input-row">
              <div class="field">
                <label for="probabilidad-residual">Probabilidad Residual:</label>
                <select
                  id="probabilidad-residual"
                  v-model="riesgoEditado.probabilidadResidual"
                  @change="calcularRiesgos"
                  :disabled="viewOnly"
                >
                  <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
                </select>
              </div>
              <div class="field">
                <label for="impacto-residual">Impacto Residual:</label>
                <select
                  id="impacto-residual"
                  v-model="riesgoEditado.impactoResidual"
                  @change="calcularRiesgos"
                  :disabled="viewOnly"
                >
                  <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
                </select>
              </div>
              <div class="field">
                <label for="riesgo-residual">Riesgo Residual:</label>
                <input
                  type="number"
                  id="riesgo-residual"
                  v-model="riesgoEditado.riesgoResidual"
                  readonly
                />
              </div>
              <div class="field">
                <label for="nivel-riesgo-residual">Nivel de Riesgo Residual:</label>
                <input
                  type="text"
                  id="nivel-riesgo-residual"
                  v-model="riesgoEditado.nivelRiesgoResidual"
                  readonly
                />
              </div>
            </div>
  
            <!-- Botones de Acción -->
            <div class="button-group">
              <button v-if="!viewOnly" type="submit">Guardar</button>
              <button type="button" @click="$emit('cerrar-modal')">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
import { getAnalisisRiesgosById, putAnalisisRiesgos } from "@/services/common.js";

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    id: {
      type: Number, // Recibe solo el ID del riesgo
      required: true,
    },
    viewOnly: {
      type: Boolean, // Determina si el modal está en modo solo vista
      default: true,
    },
  },
  data() {
    return {
      riesgoEditado: {
        aplicativo: "",
        vulnerabilidad: "",
        consecuencia: "",
        probabilidad: null,
        impacto: null,
        riesgoInherente: null,
        nivelRiesgo: "",
        tratamiento: "",
        controles: "",
        tipo: "",
        nivel: "",
        frecuencia: "",
        probabilidadResidual: null,
        impactoResidual: null,
        riesgoResidual: null,
        nivelRiesgoResidual: "",
      },
      cargando: true, // Para manejar el estado de carga
    };
  },
  watch: {
    id: {
      immediate: true, // Ejecutar inmediatamente si el ID cambia
      async handler(newId) {
        if (newId) {
          try {
            this.cargando = true;
            const data = await getAnalisisRiesgosById(newId);
            if (data) {
              this.riesgoEditado = {
                aplicativo: data.aplicativo_sistema_servicio || "",
                vulnerabilidad: data.amenaza_vulnerabilidad || "",
                consecuencia: data.consecuencia || "",
                probabilidad: data.probabilidad_inherente || null,
                impacto: data.impacto_inherente || null,
                riesgoInherente: data.riesgo_inherente || null,
                nivelRiesgo: data.nivel_riesgo_inherente || "",
                tratamiento: data.tratamiento_riesgo_inherente || "",
                controles: data.control || "",
                tipo: data.tipo_control || "",
                nivel: data.nivel_control || "",
                frecuencia: data.frecuencia_control || "",
                probabilidadResidual: data.probabilidad_residual || null,
                impactoResidual: data.impacto_residual || null,
                riesgoResidual: data.riesgo_residual || null,
                nivelRiesgoResidual: data.nivel_riesgo_residual || "",
              };
            } else {
              console.error("No se pudieron cargar los datos del análisis de riesgo.");
            }
          } catch (error) {
            console.error("Error al cargar los datos del análisis de riesgo:", error);
          } finally {
            this.cargando = false;
          }
        }
      },
    },
  },
  methods: {
    calcularRiesgos() {
      if (this.riesgoEditado.probabilidad && this.riesgoEditado.impacto) {
        this.riesgoEditado.riesgoInherente =
          this.riesgoEditado.probabilidad * this.riesgoEditado.impacto;
        this.riesgoEditado.nivelRiesgo = this.calcularNivelRiesgo(
          this.riesgoEditado.riesgoInherente
        );
      }

      if (
        this.riesgoEditado.probabilidadResidual &&
        this.riesgoEditado.impactoResidual
      ) {
        this.riesgoEditado.riesgoResidual =
          this.riesgoEditado.probabilidadResidual *
          this.riesgoEditado.impactoResidual;
        this.riesgoEditado.nivelRiesgoResidual = this.calcularNivelRiesgo(
          this.riesgoEditado.riesgoResidual
        );
      }
    },
    calcularNivelRiesgo(valor) {
      if (valor <= 4) return "Bajo";
      if (valor >= 5 && valor <= 9) return "Moderado";
      if (valor > 9 && valor < 20) return "Alto";
      if (valor >= 20) return "Extremo";
      return "Verifique valores";
    },
    async guardarCambios() {
      if (this.viewOnly) {
        console.warn("El modal está en modo de solo vista. No se puede guardar.");
        return;
      }

      try {
        const payload = {
          aplicativo_sistema_servicio: this.riesgoEditado.aplicativo,
          amenaza_vulnerabilidad: this.riesgoEditado.vulnerabilidad,
          consecuencia: this.riesgoEditado.consecuencia,
          probabilidad_inherente: this.riesgoEditado.probabilidad,
          impacto_inherente: this.riesgoEditado.impacto,
          riesgo_inherente: this.riesgoEditado.riesgoInherente,
          nivel_riesgo_inherente: this.riesgoEditado.nivelRiesgo,
          tratamiento_riesgo_inherente: this.riesgoEditado.tratamiento,
          control: this.riesgoEditado.controles,
          tipo_control: this.riesgoEditado.tipo,
          nivel_control: this.riesgoEditado.nivel,
          frecuencia_control: this.riesgoEditado.frecuencia,
          probabilidad_residual: this.riesgoEditado.probabilidadResidual,
          impacto_residual: this.riesgoEditado.impactoResidual,
          riesgo_residual: this.riesgoEditado.riesgoResidual,
          nivel_riesgo_residual: this.riesgoEditado.nivelRiesgoResidual,
        };

        const updatedData = await putAnalisisRiesgos(this.id, payload);
        if (updatedData) {
          alert("Cambios guardados correctamente.");
          this.$emit("guardar-cambios", updatedData);
          this.cerrarModal();
        } else {
          alert("No se pudo guardar el análisis de riesgo.");
        }
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
        alert("Ocurrió un error al guardar los cambios.");
      }
    },
    cerrarModal() {
      this.$emit("cerrar-modal");
    },
  },
};
</script>
  
  
<style scoped>
    .modal-overlay {
    position: fixed; /* Fija el modal en relación a la ventana del navegador */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
    display: flex;
    align-items: center; /* Centra verticalmente */
    justify-content: center; /* Centra horizontalmente */
    z-index: 1000; /* Asegura que el modal se sobreponga a otros elementos */
    }

    .modal-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Alinea el contenido al principio */
    padding: 20px;
    height: 90%; /* Tamaño del modal */
    width: 90%;
    background-color: #f8f9fa; /* Fondo claro */
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 2000; /* Más alto que la superposición */
    overflow-y: auto; /* Permite desplazarse si el contenido excede */
    }

  
  .dark-theme .modal-container {
    background-color: #2c2f33; /* Fondo oscuro */
    color: #ffffff; /* Texto claro */
    box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
  }
  

  .input-group,
  .input-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px; /* Espaciado entre elementos */
    margin-bottom: 15px;
    width: 100%; /* Asegura que ocupe el ancho disponible */
  }
  
  .field {
    flex: 1; /* Cada campo ocupa el mismo espacio */
    min-width: 150px; /* Evita que los campos sean demasiado pequeños */
    max-width: calc(33.33% - 10px); /* Limita el ancho para que quepan 3 por fila */
    box-sizing: border-box; /* Incluye padding y bordes en el cálculo del ancho */
  }
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
    font-size: 14px;
    color: #515c67; /* Texto oscuro */
  }
  
  .dark-theme label {
    color: #ffffff; /* Texto claro en modo oscuro */
  }
  
  input,
  select {
    width: 100%; /* Se adapta al ancho del contenedor */
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #ffffff; /* Fondo claro */
    color: #000000; /* Texto oscuro */
  }
  
  .dark-theme input,
  .dark-theme select {
    background-color: #3c4043; /* Fondo oscuro */
    color: #ffffff; /* Texto claro */
    border: 1px solid #555555; /* Borde oscuro */
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #458bd0; /* Azul claro */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #357abd; /* Azul oscuro */
  }
  
  .button-group {
    display: flex;
    justify-content: flex-end; /* Alinea los botones a la derecha */
    gap: 15px; /* Espaciado entre botones */
    width: 100%;
  }
  </style>
  
  