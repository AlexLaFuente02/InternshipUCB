import axios from 'axios';

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Cambia a tu URL base de backend
  timeout: 5000,
});

// Interceptor de solicitudes
axiosInstance.interceptors.request.use((config) => {
  // Bloquear solicitudes a endpoints de metadatos
  if (
    config.url.includes('169.254.169.254') ||
    config.url.includes('meta-data')
  ) {
    return Promise.reject(new Error('Acceso bloqueado a endpoints de metadatos.'));
  }
  return config;
});

// Exportar la instancia configurada
export default axiosInstance;
