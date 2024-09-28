import axios from 'axios';
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
    

