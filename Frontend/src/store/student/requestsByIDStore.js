import {loadRequestsByIdStudent} from '../../services/student';
import { defineStore } from "pinia";
import {loadRequestsByEstatus} from '../../services/student';
import {loadRequestById} from '../../services/student';
import {postPostulation} from '../../services/student';
export const useRequestsByIDStore = defineStore({
    id: "requestsByID",
    state: () => ({
        requests: [],
        isDataLoaded: false,
        requestsAccepted: [],
        requestsRejected: [],
        requestsPending: [],
        isDataLoadedByEstatus: false,
        request: null,
        postulationData: {},
        requestPostulation: null,
    }),
    actions: {
        async loadRequestsByIdStudent(idStudent) {
                this.requests = await loadRequestsByIdStudent(idStudent);
                if(this.requests === null){
                    this.requests = [];
                }
                this.isDataLoaded = true;
        },
        async loadRequestsByEstatus(idStudent, estatus) {
                this.requests = await loadRequestsByEstatus(idStudent, estatus);
                if(estatus === 1){
                    this.requestsAccepted = this.requests;
                }
                else if(estatus === 3){
                    this.requestsRejected = this.requests;
                }
                else if(estatus === 2){
                    this.requestsPending = this.requests;
                }
                this.isDataLoadedByEstatus = true;
        },
        async loadRequestById(idRequest) {
            this.request = await loadRequestById(idRequest);
            if(this.request === null){
                this.request = [];
            }
        },
        async postPostulation2() {
            this.requestPostulation= await postPostulation(this.postulationData);
        }
        
    },
});