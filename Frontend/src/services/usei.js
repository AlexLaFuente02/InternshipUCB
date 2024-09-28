import axios from 'axios';
import { rutaApi } from '../assets/apiConfig';
import { rutaUsei } from '../assets/apiConfig';
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