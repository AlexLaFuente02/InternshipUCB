import { defineStore } from "pinia";
import { createInstitution } from "@/services/institutionService"; // Asegúrate de que el servicio esté correctamente importado

export const InstitutionRegisterStore = defineStore({
  id: "InstitutionRegister",
  state: () => ({
    nombreinstitucion: "",
    reseniainstitucion: "",
    logoinstitucion: null,
    nombrecontacto: "",
    correocontacto: "",
    celularcontacto: "",
    usuario: {
      id: null,
    },
    sectorpertenencia: {
      id: null,
    },
  }),
  actions: {
    setNombreInstitucion(nombreinstitucion) {
      this.nombreinstitucion = nombreinstitucion;
    },
    setReseniaInstitutcion(reseniainstitucion) {
      this.reseniainstitucion = reseniainstitucion;
    },
    setLogoInstitucion(file) {
      this.logoinstitucion = file;
    },
    setNombreContacto(nombrecontacto) {
      this.nombrecontacto = nombrecontacto;
    },
    setCorreoContacto(correocontacto) {
      this.correocontacto = correocontacto;
    },
    setCelularContacto(celularcontacto) {
      this.celularcontacto = celularcontacto;
    },

    async registerInstitution() {
      const formData = new FormData();
    
      formData.append('nombreinstitucion', this.nombreinstitucion);
      formData.append('reseniainstitucion', this.reseniainstitucion);
      formData.append('nombrecontacto', this.nombrecontacto);
      formData.append('correocontacto', this.correocontacto);
      formData.append('celularcontacto', this.celularcontacto);
      formData.append('estado', 'PENDIENTE');
    
      if (!this.sectorpertenencia.id) {
        console.error('El campo sectorpertenencia_id es requerido y no está presente.');
        throw new Error('El campo sectorpertenencia_id es requerido y no está presente.');
      }
      formData.append('sectorpertenencia_id', this.sectorpertenencia.id);
    
      if (this.logoinstitucion) {
        formData.append('logoinstitucion', this.logoinstitucion, this.logoinstitucion.name);
      }

      const response = await createInstitution(formData);
      console.log('Institución registrada: ', response);
      return response;
    },
    
  },
});
