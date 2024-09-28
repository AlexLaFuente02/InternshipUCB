import {defineStore} from 'pinia';
import {getCommentsByIdInternship} from "../../services/student";
import {postComment} from "../../services/student";

export const useCommentsByIDInternshipStore = defineStore({
    id: 'commentsByIDInternship',
    state: () => ({
        comments: [],
        isDataLoaded: false,
        comment:{}
    }),
    actions: {
        async loadCommentsByIdInternship(idInternship) {
            this.comments = await getCommentsByIdInternship(idInternship);
            this.isDataLoaded = true;
        },
        async postComment(comment,idPostulation,idConvocatoria) {
            this.comment = {
                "comentario": comment,
                "postulacion": {
                    "id": idPostulation
                },
                "convocatoria": {
                    "id": idConvocatoria
                },
            }
            this.comment = await postComment(this.comment);
            if (this.comment != null) {
                return true;
            } else {
                return false;
            }
        },
    },
});
