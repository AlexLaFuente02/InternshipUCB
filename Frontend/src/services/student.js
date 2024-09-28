import axios from 'axios';
import { rutaApi } from '../assets/apiConfig';

//No hay API para cargar las convocatorias que tomó un estudiante
export const loadInternshipsByIdStudent = async () => {
    /*try {
        const response = await axios.get(`${rutaApi}/student/convocatorias/activas`, {
            withCredentials: true // Esto asegurará que se envíen las cookies de sesión
        });
        return response.data;
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cargar las convocatorias: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }*/
}
export const loadRequestsByIdStudent = async (idStudent) => {
    try {
        const response = await axios.get(`${rutaApi}/student/${idStudent}/postulaciones`);
        const data = response.data;
        if (data.code === "P-0000") {
            return data.result;
        }else{
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cargar las postulaciones: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}
export const loadRequestsByEstatus = async (idStudent, estatus) => {
    try {
        const response = await axios.get(`${rutaApi}/student/${idStudent}/postulaciones/${estatus}`);
        const data = response.data;
        if (data.code === "P-0000") {
            return data.result;
        }else{
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cargar las postulaciones: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}







export const loadInstitutions = async () => {
    try {
        const response = await axios.get(`${rutaApi}/student/institucion`);
        return response.data;
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cargar las instituciones: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}
export const loadInstitutionsByIdSector = async (idSector) => {
    try {
        const response = await axios.get(`${rutaApi}/student/sectores/${idSector}/instituciones`);
        const data = response.data;
        if (data.code === "I-0000") {
            return data.result;
        }else{
            return null;
        }
    }
    catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cargar las instituciones: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}




export const postStudent = async (studentData, token) => {
    try {
        const response = await axios.post(`${rutaApi}/estudiante`, studentData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = response.data;
        if (data.code === "E-0000") {
            alert("Estudiante creado exitosamente");
            return data;
        }
        else {
            alert("No se pudo crear el estudiante");
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al crear el estudiante: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
};
/*Servicio para solicitar el codigo de verificacion*/
export const postCode = async (email) => {
    try {
        const response = await axios.post(`${rutaApi}/public/sendEmail`, email,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }
        );
        const data = response.data;
        if (data.code === "E-0000") {
            alert("Se ha enviado el codigo de verificacion a su correo electronico");
            return data;
        }
        else {
            alert("No se pudo enviar el codigo de verificacion");
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al solicitar el codigo de verificacion: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
};
/*Servicio para verificar el codigo de verificacion*/
export const verifyCode = async (body) => {
    try {
        const response = await axios.post(`${rutaApi}/public/validateCode`, body,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }
        );
        const data = response.data;
        if (data.code === "E-0000") {
            alert("Codigo de verificacion correcto");
            return data;
        }
        else {
            alert("Codigo de verificacion incorrecto");
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al verificar el codigo de verificacion: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
};
//PUT para actualizar el usuario de un estudiante
export const putStudent = async (contrasenia, token) => {
    try {
        const response = await axios.put(`${rutaApi}/public/updatePassword`, contrasenia, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = response.data;
        if (data.code === "U-0000") {
            alert("Usuario actualizado exitosamente");
            return data;
        }
        else {
            alert("No se pudo actualizar el usuario");
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al actualizar el estudiante: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
};
export const popularInternships = async () => {
    try {
        const response = await axios.get(`${rutaApi}/student/convocatorias/populares`);
        const data = response.data;
        if (data.code === "C-0000") {
            return data.result;
        }else{
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cargar las convocatorias: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}
export const loadAllInternships = async () => {
    try {
        const response = await axios.get(`${rutaApi}/student/convocatoria`);
        const data = response.data;
        if (data.code === "C-0000") {
            return data.result;
        }else{
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cargar las convocatorias: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}
export const loadActiveInternships = async () => {
    try {
        const response = await axios.get(`${rutaApi}/student/convocatorias/activas`);
        const data = response.data;
        if (data.code === "C-0000") {
            return data.result;
        }else{
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cargar las convocatorias: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}
export const loadInternshipById = async (idInternship) => {
    try {
        const response = await axios.get(`${rutaApi}/student/convocatoria/${idInternship}`);
        const data = response.data;
        if (data.code === "C-0000") {
            return data.result;
        }else{
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cargar la convocatoria: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}
export const loadInstitutionById = async (idInstitution) => {
    try {
        const response = await axios.get(`${rutaApi}/student/institucion/${idInstitution}`);
        const data = response.data;
        if (data.code === "I-0000") {
            return data.result;
        }else{
            alert("No se pudo cargar la institucion");
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cargar la institucion: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}
export const loadRequestById = async (idRequest) => {
    try {
        const response = await axios.get(`${rutaApi}/student/postulacion/${idRequest}`);
        const data = response.data;
        if (data.code === "P-0000") {
            return data.result;
        }else{
            alert("No se pudo cargar la postulacion");
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cargar la postulacion: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}
export const postPostulation = async (postulationData) => {
    try {
        const response = await axios.post(`${rutaApi}/student/postulacion`, postulationData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        const data = response.data;
        if (data.code === "P-0000") {
            alert("Postulacion creada exitosamente");
            return data.result;
        }
        else if(data.code === "P-1005") {
            alert("Ya te has postulado a esta pasantia");
            return data.code;
            
        }
        else{
            alert("No se pudo crear la postulacion");
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al crear la postulacion: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}
export const getCommentsByIdInternship = async (idInternship) => {
    try {
        const response = await axios.get(`${rutaApi}/student/comentariopostulante/${idInternship}/`);
        const data = response.data;
        if (data.code === "C-0000") {
            console.log(data.result);
            return data.result;
        }else{
            alert("No se pudo cargar los comentarios");
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al cargar los comentarios: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}
export const postComment = async (commentData) => {
    try {
        const response = await axios.post(`${rutaApi}/student/comentariopostulante`, commentData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        const data = response.data;
        if (data.code === "C-0000") {
            alert("Comentario creado exitosamente");
            return data.result;
        }
        else{
            alert("No se pudo crear el comentario");
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, por ejemplo:
        console.error("Hubo un error al crear el comentario: ", error);
        throw error; // O reenviar el error para manejarlo en otro lugar
    }
}
