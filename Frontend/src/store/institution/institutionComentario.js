import {defineStore} from 'pinia';
import {comentarioConvocatoria} from "../../services/institutionService";
import {createcomentarioConvocatoria} from "../../services/institutionService";

export const useCommentsByIDInternshipStoreinstitucion = defineStore({
    id: 'commentsByIDInternship',
    state: () => ({
        comments: [],
        isDataLoaded: false,
        comment:{}
    }),
    actions: {
        async loadCommentsByIdInternshipInstitution(idInternship) {
            this.comments = await comentarioConvocatoria(idInternship);
            this.isDataLoaded = true;
        },
        async createcomentarioConvocatoria(comment,idPostulation,idConvocatoria) {
            this.comment = {
                "comentario": comment,
                "postulacion": {
                    "id": idPostulation
                },
                "convocatoria": {
                    "id": idConvocatoria
                },
            }
            this.comment = await createcomentarioConvocatoria(this.comment);
            if (this.comment != null) {
                return true;
            } else {
                return false;
            }
        },
    },
});
