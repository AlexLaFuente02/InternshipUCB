<template>
    <div class="form-container">
      <h1>Crear Usuario Administrador USEI</h1>
      <form @submit.prevent="submitForm">
        <!-- ID del Usuario -->
        <div class="input-group">
          <label for="IDUsuario">Usuario:</label>
          <input type="text" v-model="usuario.IDUsuario" id="IDUsuario" required />
        </div>
  
        <!-- Contraseña del Usuario -->
        <div class="input-group">
          <label for="Contraseña">Contraseña:</label>
          <input type="password" v-model="usuario.Contrasenia" id="Contraseña" required />
        </div>
  
        <!-- Tipo de Usuario fijo -->
        <div class="input-group">
          <label for="TipoUsuario">Tipo de Usuario:</label>
          <input type="text" id="TipoUsuario" value="Administrador" readonly />
        </div>
  
        <!-- Permisos para ver y modificar en contenedores separados -->
        <div class="permissions-group">
          <label><strong>PERMISOS:</strong></label>
          <div class="checkboxes">
            <div class="checkbox-container">
              <label for="habilitado_ver" class="small-label">Habilitar ver:</label>
              <input type="checkbox" v-model="adminUSEI.habilitado_ver" id="habilitado_ver" class="small-checkbox" />
            </div>
            <div class="checkbox-container">
              <label for="habilitado_modific" class="small-label">Habilitar modificar:</label>
              <input type="checkbox" v-model="adminUSEI.habilitado_modific" id="habilitado_modific" class="small-checkbox" />
            </div>
          </div>
        </div>
  
        <!-- Botón para enviar el formulario -->
        <div class="button-group">
          <button type="submit">Agregar</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        usuario: {
          IDUsuario: '',
          Contrasenia: '',
          TipoUsuario_ID: 2, 
          estado: 'ACTIVADO',  
        },
        adminUSEI: {
          habilitado_ver: false,
          habilitado_modific: false,
        },
      };
    },
    methods: {
      async submitForm() {
        try {
          const newUser = {
            ...this.usuario,
            habilitado_ver: this.adminUSEI.habilitado_ver ? 1 : 0,
            habilitado_modific: this.adminUSEI.habilitado_modific ? 1 : 0,
          };
  
          // Llamada a la API para crear el usuario
          const response = await axios.post('/api/adminUSEI', newUser);
          console.log('Usuario creado:', response.data);
        } catch (error) {
          console.error('Error al crear el usuario:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Ajustar la altura del contenedor del formulario */
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    width: 40%;
    margin: 0 auto;
    min-height: 570px; /* Para llenar la pantalla y empujar el footer hacia abajo */
  }
  
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
  }
  
  .input-group {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  label {
    font-weight: bold;
  }
  
  input[type="text"], input[type="password"] {
    width: 60%; /* Ajuste de ancho para los campos */
    padding: 8px;
    font-size: 16px;
    border: 2px black solid;
  }
  
  input[readonly] {
  background-color: #f0f0f0; /* Fondo gris claro para modo claro */
  color: #000; /* Texto negro para modo claro */
  cursor: not-allowed;
}

  
  .permissions-group {
    margin-bottom: 15px;
    width: 100%;
    text-align: left;
  }
  
  .checkboxes {
    display: flex;
    justify-content: center; /* Centrar los checkboxes */
    align-items: center; /* Alinear los contenedores verticalmente en el centro */
    gap: 40px; /* Añadir espacio entre los contenedores */
    white-space: nowrap; /* Evitar que el texto se divida en dos líneas */
  }
  
  .checkbox-container {
    display: flex;
    align-items: center; /* Alinear la etiqueta y el checkbox en el centro verticalmente */
    padding-top: 10px;
  }
  
  .small-label {
    font-size: 14px;
    margin-right: 10px;
  }
  
  .small-checkbox {
    transform: scale(1); /* Tamaño normal para los checkboxes */
  }
  
  .button-group {
    margin-top: 20px;
  }
  
  button {
    width: 150px;
    padding: 10px;
    background-color: #458bd0;
    color: white;
    border: 2px solid black;
    cursor: pointer;
    font-size: 16px;
    text-align: center;
  }
  
  button:hover {
    background-color: #357abd;
  }
  </style>
  