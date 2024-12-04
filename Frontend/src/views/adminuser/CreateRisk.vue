<template>
    <div class="form-container">
      <h1>Datos del Riesgo</h1>
      <form @submit.prevent="submitForm">
        <!-- Aplicativos Sistemas Servicios -->
        <div class="input-group">
          <label for="sistemas-servicios">Aplicativos Sistemas Servicios:</label>
          <input type="text" id="sistemas-servicios" v-model="datos.aplicativos" />
        </div>
  
        <!-- Amenaza Vulnerabilidad -->
        <div class="input-group">
          <label for="vulnerabilidad">Amenaza Vulnerabilidad:</label>
          <input type="text" id="vulnerabilidad" v-model="datos.vulnerabilidad" />
        </div>
  
        <!-- Consecuencia -->
        <div class="input-group">
          <label for="consecuencia">Consecuencia:</label>
          <input type="text" id="consecuencia" v-model="datos.consecuencia" />
        </div>
  
        <!-- Riesgo -->
        <div class="input-row">
          <div class="field">
            <label for="probabilidad">Probabilidad:</label>
            <select id="probabilidad" v-model="datos.probabilidad" @change="calcularRiesgos">
              <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          <div class="field">
            <label for="impacto">Impacto:</label>
            <select id="impacto" v-model="datos.impacto" @change="calcularRiesgos">
              <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          <div class="field">
            <label for="riesgo-inherente">Riesgo Inherente:</label>
            <input
              type="number"
              id="riesgo-inherente"
              v-model="datos.riesgoInherente"
              readonly
            />
          </div>
          <div class="field">
            <label for="nivel-riesgo">Nivel de Riesgo:</label>
            <input
              type="text"
              id="nivel-riesgo"
              v-model="datos.nivelRiesgo"
              readonly
            />
          </div>
          <div class="field">
            <label for="tratamiento-riesgo-inherente">Tratamiento de R.I.:</label>
            <select id="tratamiento-riesgo-inherente" v-model="datos.tratamientoRiesgo">
                <option value="Eliminar">Eliminar</option>
                <option value="Mitigar">Mitigar</option>
                <option value="Transferir">Transferir</option>
                <option value="Aceptar">Aceptar</option>
            </select>
            </div>
        </div>
  
        <!-- Controles -->
        <div class="input-group">
          <label for="controles">Controles:</label>
          <input type="text" id="controles" v-model="datos.controles" />
        </div>
  
        <!-- Tipo, Nivel y Frecuencia -->
        <div class="input-row">
          <div class="field">
            <label for="tipo">Tipo:</label>
            <select id="tipo" v-model="datos.tipo">
              <option value="Preventivo">Preventivo</option>
              <option value="Detectivo">Detectivo</option>
              <option value="Correctivo">Correctivo</option>
            </select>
          </div>
          <div class="field">
            <label for="nivel">Nivel:</label>
            <select id="nivel" v-model="datos.nivel">
              <option value="Automático">Automático</option>
              <option value="Semiautomático">Semiautomático</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div class="field">
            <label for="frecuencia">Frecuencia:</label>
            <select id="frecuencia" v-model="datos.frecuencia">
              <option value="Diario">Diario</option>
              <option value="Semanal">Semanal</option>
              <option value="Mensual">Mensual</option>
              <option value="Anual">Anual</option>
              <option value="Por Evento">Por Evento</option>
            </select>
          </div>
        </div>
  
        <!-- Residual -->
        <div class="input-row">
          <div class="field">
            <label for="probabilidad-residual">Probabilidad Residual:</label>
            <select
              id="probabilidad-residual"
              v-model="datos.probabilidadResidual"
              @change="calcularRiesgos"
            >
              <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          <div class="field">
            <label for="impacto-residual">Impacto Residual:</label>
            <select
              id="impacto-residual"
              v-model="datos.impactoResidual"
              @change="calcularRiesgos"
            >
              <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          <div class="field">
            <label for="riesgo-residual">Riesgo Residual:</label>
            <input
              type="number"
              id="riesgo-residual"
              v-model="datos.riesgoResidual"
              readonly
            />
          </div>
          <div class="field">
            <label for="nivel-riesgo-residual">Nivel de Riesgo Residual:</label>
            <input
              type="text"
              id="nivel-riesgo-residual"
              v-model="datos.nivelRiesgoResidual"
              readonly
            />
          </div>
        </div>
  
        <!-- Botón de enviar -->
        <div class="button-group">
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  </template>
  
  

<script>
  import { postAnalisisRiesgos } from '@/services/common.js';
  
  export default {
    data() {
      return {
        datos: {
          aplicativos: "",
          vulnerabilidad: "",
          consecuencia: "",
          probabilidad: 1,
          impacto: 1,
          riesgoInherente: null,
          nivelRiesgo: "",
          controles: "",
          tipo: "Preventivo",
          nivel: "Automático",
          frecuencia: "Por Evento",
          probabilidadResidual: 1,
          impactoResidual: 1,
          riesgoResidual: null,
          nivelRiesgoResidual: "",
        },
      };
    },
    methods: {
      calcularRiesgos() {
        if (this.datos.probabilidad && this.datos.impacto) {
          this.datos.riesgoInherente = this.datos.probabilidad * this.datos.impacto;
          this.datos.nivelRiesgo = this.calcularNivelRiesgo(this.datos.riesgoInherente);
        }
  
        if (this.datos.probabilidadResidual && this.datos.impactoResidual) {
          this.datos.riesgoResidual =
            this.datos.probabilidadResidual * this.datos.impactoResidual;
          this.datos.nivelRiesgoResidual = this.calcularNivelRiesgo(
            this.datos.riesgoResidual
          );
        }
      },
    limpiarCampos() {
        this.datos = {
            aplicativos: "",
            vulnerabilidad: "",
            consecuencia: "",
            probabilidad: 1, // Restablece el valor inicial
            impacto: 1, // Restablece el valor inicial
            riesgoInherente: null,
            nivelRiesgo: "",
            controles: "",
            tipo: "Preventivo", // Valor inicial predeterminado
            nivel: "Automático", // Valor inicial predeterminado
            frecuencia: "Por Evento", // Valor inicial predeterminado
            probabilidadResidual: 1, // Restablece el valor inicial
            impactoResidual: 1, // Restablece el valor inicial
            riesgoResidual: null,
            nivelRiesgoResidual: "",
        };
    },
      calcularNivelRiesgo(valor) {
        if (valor <= 4) return "Bajo";
        if (valor >= 5 && valor <= 9) return "Moderado";
        if (valor > 9 && valor < 20) return "Alto";
        if (valor >= 20) return "Extremo";
        return "Verifique valores";
      },
      async submitForm() {
        // Validación: Verificar que todos los campos estén llenos
        const camposRequeridos = [
          "aplicativos",
          "vulnerabilidad",
          "consecuencia",
          "controles",
        ];
  
        const camposVacios = camposRequeridos.filter(
          (campo) => !this.datos[campo].trim()
        );
  
        if (camposVacios.length > 0) {
          alert(
            `Por favor, completa todos los campos. Faltan: ${camposVacios.join(", ")}`
          );
          return;
        }
  
        try {
          // Preparar los datos para el envío
          const payload = {
            aplicativo_sistema_servicio: this.datos.aplicativos,
            amenaza_vulnerabilidad: this.datos.vulnerabilidad,
            consecuencia: this.datos.consecuencia,
            probabilidad_inherente: this.datos.probabilidad,
            impacto_inherente: this.datos.impacto,
            riesgo_inherente: this.datos.riesgoInherente,
            nivel_riesgo_inherente: this.datos.nivelRiesgo,
            tratamiento_riesgo_inherente: this.datos.tratamientoRiesgo,
            control: this.datos.controles,
            tipo_control: this.datos.tipo,
            nivel_control: this.datos.nivel,
            frecuencia_control: this.datos.frecuencia,
            probabilidad_residual: this.datos.probabilidadResidual,
            impacto_residual: this.datos.impactoResidual,
            riesgo_residual: this.datos.riesgoResidual,
            nivel_riesgo_residual: this.datos.nivelRiesgoResidual,
          };
  
          const response = await postAnalisisRiesgos(payload);
          if (response) {
                alert("Análisis de riesgo enviado correctamente.");
                this.limpiarCampos(); // Llama a la función para limpiar los campos
          } else {
                alert("Error al enviar el análisis de riesgo.");
          }
        } catch (error) {
          console.error("Error al enviar el análisis de riesgos:", error);
          alert("Ocurrió un error al enviar el análisis de riesgos.");
        }
      },
    },
  };
</script>
  
  
  
<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  width: 80%;
  margin: 0 auto;
  background-color: #f8f9fa; /* Fondo claro por defecto */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dark-theme .form-container {
  background-color: #2c2f33; /* Fondo oscuro */
  color: #ffffff; /* Texto claro */
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
}

h1 {
  font-size: 24px;
  color: #515c67; /* Color del texto claro */
  margin-bottom: 20px;
}

.dark-theme h1 {
  color: #ffffff; /* Texto claro en modo oscuro */
}

.input-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  width: 100%;
}

.input-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.field {
  flex: 1;
  min-width: 200px;
  font-size: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  font-size: 15px;
  color: #515c67; /* Texto oscuro por defecto */
}

.dark-theme label {
  color: #ffffff; /* Texto claro en modo oscuro */
}

input,
select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 2px solid #ddd;
  border-radius: 5px;
  background-color: #ffffff; /* Fondo claro */
  color: #000000; /* Texto oscuro */
}

.dark-theme input,
.dark-theme select {
  background-color: #3c4043; /* Fondo oscuro */
  color: #ffffff; /* Texto claro */
  border: 2px solid #555555; /* Borde oscuro */
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

.dark-theme button {
  background-color: #458bd0; /* Azul adaptado para modo oscuro */
}

.dark-theme button:hover {
  background-color: #458bd0; /* Azul oscuro para hover */
}


</style>
  