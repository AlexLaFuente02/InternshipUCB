import axios from '@/assets/axios';
import { rutaApi } from '../assets/apiConfig';
//Primer paso, que se comunica con el backend
export const loadCampuses = async () => {
    const response = await axios.get(`${rutaApi}/public/sede`);
    return response.data;
}
export const loadCareers = async () => {
    const response = await axios.get(`${rutaApi}/public/carrera`);
    return response.data;
}
export const loadSemester = async () => {
    const response = await axios.get(`${rutaApi}/public/semestre`);
    return response.data;
}
export const loadSector = async () => {
    const response = await axios.get(`${rutaApi}/public/sectorPertenencia`);
    return response.data;
}


export const getUserByIdUsuario = async (idUsuario) => {
    try {
        const response = await axios.get(`${rutaApi}/usuario/getUsuarioByIdUsuario/${idUsuario}`);
        const data = response.data;
        if (data.code === "U-0000") {
            return data.result;
        }else{
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cargar el usuario: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}

export const logout = async () => {
    try {
        const response = await axios.get(`${rutaApi}/auth/logout`);
        const data = response.data;
        if (data.code === "AUTH-0003") {
            alert("Cerraste sesión correctamente");
            return true;
        }else{
            alert("No se pudo cerrar sesión");
            return false;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cerrar sesión: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}
    

//LLAMADOS API
export const getUserHistory = async () => {
    try {
        const response = await axios.get(`${rutaApi}/historicoUsuario`);
        const data = response.data;
        if (data.code === "HU-0000") {
            return data.result;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Hubo un error al cargar el historial de usuarios: ", error);
        throw error; 
    }
};


export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${rutaApi}/usuario`);
        const data = response.data;
        if (data.code === "U-0000") {
            return data.result;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Hubo un error al cargar todos los usuarios: ", error);
        throw error; 
    }
};

export const changeEstadoActivado = async (idUsuario) => {
    try {
        const response = await axios.put(`${rutaApi}/usuario/changeEstadoActivado/${idUsuario}`);
        const data = response.data;
        if (data.code === "U-0000") {
            return data.result;
        }else{
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cargar el usuario: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}

export const changeEstadoBloqueado = async (idUsuario) => {
    try {
        const response = await axios.put(`${rutaApi}/usuario/changeEstadoBloqueado/${idUsuario}`);
        const data = response.data;
        if (data.code === "U-0000") {
            return data.result;
        }else{
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cargar el usuario: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}

export const changeEstadoEliminado = async (idUsuario) => {
    try {
        const response = await axios.put(`${rutaApi}/usuario/changeEstadoEliminado/${idUsuario}`);
        const data = response.data;
        if (data.code === "U-0000") {
            return data.result;
        }else{
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cargar el usuario: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}

//OBTENER HISTORICOS
export const getAllConvocatorias = async () => {
    try {
        const response = await axios.get(`${rutaApi}/historicoConvocatorias`);
        const data = response.data;
        if (data.code === "HC-0000") {
            return data.result;
        }else{
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cargar el historico de convocatorias: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}


export const getAllPostulaciones = async () => {
    try {
        const response = await axios.get(`${rutaApi}/historicoPostulaciones`);
        const data = response.data;
        if (data.code === "HP-0000") {
            return data.result;
        }else{
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cargar el historico de postulaciones: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}


export const postAnalisisRiesgos = async (analisisData) => {
    try {
        const response = await axios.post(`${rutaApi}/analisisRiesgos`, analisisData, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        const data = response.data;
        if (data.code === "AR-0000") {
            return data.result;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Hubo un error al enviar el análisis de riesgos: ", error);
        throw error; // Reenviar el error para manejarlo en otro lugar
    }
};
