import axios from 'axios';
import { rutaApi } from '../assets/apiConfig';
import { rutaUsei } from '../assets/apiConfig';
import { rutaAdminUsei } from '../assets/apiConfig';
import { publicAPIRoute } from '../assets/apiConfig';

export const loadUseiInstitution = async () => {
    /*Cambiar por la ruta de la api que corresponda*/
    //Se esta usando la ruta de la api de prueba
    const response = await axios.get(`${rutaUsei}/instituciones/activas`);
    return response.data;
}

export const loadUseiInstitutionPendent = async () => {
    const response = await axios.get(`${rutaUsei}/instituciones/pendientes`);
    return response.data;
}
export const loadUseiInstitutionRechazado = async () => {
  const response = await axios.get(`${rutaUsei}/instituciones/rechazadas`);
  return response.data;
}

export const loadUseiInformation = async (userId) => {
  const response = await axios.get(`${rutaAdminUsei}//usuarioAdmin/${userId}`);
  return response.data;
}
//para cambiar de estados instituciones
export const activateInstitution = async (institutionId) => {
    try {
      const response = await axios.put(`${rutaUsei}/institucion/activate/${institutionId}`);
      return response.data;
    } catch (error) {
      // Manejar errores aquí si es necesario
      throw error;
    }
  };

  export const rechazarInstitution = async (institutionId) => {
    try {
      const response = await axios.put(`${rutaUsei}/institucion/reject/${institutionId}`);
      return response.data;
    } catch (error) {
      // Manejar errores aquí si es necesario
      throw error;
    }
  };
  export const pendienteInstitution = async (institutionId) => {
    try {
      const response = await axios.put(`${rutaUsei}/institucion/pending/${institutionId}`);
      return response.data;
    } catch (error) {
      // Manejar errores aquí si es necesario
      throw error;
    }
  };



export const loadUseiInternship = async () => {
    /*Cambiar por la ruta de la api que corresponda*/
    //Se esta usando la ruta de la api de prueba
    const response = await axios.get(`${rutaUsei}/convocatorias/activas`);
    return response.data;
}

export const loadPendentinternship = async () => {
  const response = await axios.get(`${rutaUsei}/convocatorias/pendientes`);
  return response.data;
}

export const loadRechazadointernship = async () => {
  const response = await axios.get(`${rutaUsei}/convocatorias/inactivas`);
  return response.data;
}

//para cambiar de estados convocatorias
export const activateInternship = async (internshipId) => {
  try {
    const response = await axios.put(`${rutaUsei}/convocatoria/activate/${internshipId}`);
    return response.data;
  } catch (error) {
    // Manejar errores aquí si es necesario
    throw error;
  }
};

export const rechazarInternship = async (internshipId) => {
  try {
    const response = await axios.put(`${rutaUsei}/convocatoria/reject/${internshipId}`);
    return response.data;
  } catch (error) {
    // Manejar errores aquí si es necesario
    throw error;
  }
};
export const pendienteInternship = async (internshipId) => {
  try {
    const response = await axios.put(`${rutaUsei}/convocatoria/pending/${internshipId}`);
    return response.data;
  } catch (error) {
    // Manejar errores aquí si es necesario
    throw error;
  }
};

export const actualizarPermisoVer = async (internshipId) => {
  try {
    const response = await axios.put(`${rutaAdminUsei}/changeHabilitadoVer/${internshipId}`);
    return response.data;
  } catch (error) {
    // Manejar errores aquí si es necesario
    throw error;
  }
};

export const actualizarPermisoModificar = async (internshipId) => {
  try {
    const response = await axios.put(`${rutaAdminUsei}/changeHabilitadoModific/${internshipId}`);
    return response.data;
  } catch (error) {
    // Manejar errores aquí si es necesario
    throw error;
  }
};


export const obtenerTodosUsuariosUsei = async () => {
  try {
    const response = await axios.get(`${rutaAdminUsei}/`);
    const data = response.data;

    // Verifica el código correcto que esperas
    if (data && data.code === "AUSEI-0000") {
        return data; // Devuelve toda la respuesta para que puedas acceder al resultado en tu componente
    } else {
        console.error("Código de respuesta inesperado:", data.code);
        throw new Error("Código de respuesta inesperado"); // Lanza un error para manejarlo en el componente
    }
  } catch (error) {
      console.error("Hubo un error al cargar todos los usuarios:", error);
      throw error; // Lanza el error para que pueda ser manejado en el componente
  }
}

export const actualizarEstado = async (internshipId) => {
  try {
    const response = await axios.put(`${rutaAdminUsei}/changeHabilitadoModific/${internshipId}`);
    return response.data;
  } catch (error) {
    // Manejar errores aquí si es necesario
    throw error;
  }
};

export const createAdminUsei = async (adminUseiData) => {
  try {
    const response = await axios.post(`${publicAPIRoute}/adminusei`, adminUseiData);
    return response.data; // Devolver los datos de la respuesta de la API
  } catch (error) {
    console.error('Error al crear el AdminUSEI:', error);
    throw error; // Lanzar error para que sea capturado en el componente
  }
};
