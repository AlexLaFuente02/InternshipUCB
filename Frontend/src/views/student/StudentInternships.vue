<template >
    <div class="container__student__internships">
        <div class="containerList__header">
            <div class="containerList__title">
                <h1>Pasantías</h1>
            </div>
            <div class="dataview__options">
                <div class="dropdown__view">
                    <Dropdown
                    :options="options"
                    :selectedValue="selected.label"
                    placeholderValue="Seleccione un opción"
                    @option-selected="updateListByOption"
                    />
                </div>
            </div>
        </div>
        <div class="content__internship">
            <CardList 
            :list="listIntershipsComputed"
            :title="title"
            v-if="everyInternshipsAreLoaded"
            @more-information="moreInformation"
            />
        </div>
    </div>
</template>
<script>
import {useInternshipsByIDStore } from "@/store/student/internshipsByIDStore";
import CardList from "@/components/common/CardList.vue";
import {useLoaderStore} from "@/store/common/loaderStore";
import Dropdown from "../../components/common/Dropdown.vue";
export default {
    name: "StudentInternships",
    components: {
        CardList,
        Dropdown
    },
    data() {
        return {
            listInterships: [],
            title: "Pasantías",
            everyInternshipsAreLoaded: false,
            options: [
                { id: 0, label: "Todas las Pasantías"},
                { id: 1, label: "Pasantías Populares"},
                { id: 2, label: "Pasantías Activas"}
            ],
            selected: { id: 0, label: "Todas las Pasantías"}
        }
    },
    methods: {
        async getInternships() {
            await useInternshipsByIDStore().loadAllInternships();
            this.listInterships = useInternshipsByIDStore().internships;
            this.everyInternshipsAreLoaded = true;
        },
        async updateListByOption(option) {
            useLoaderStore().activateLoader();
            this.everyInternshipsAreLoaded = false;
            switch(option.id) {
                case 0:
                    await this.getInternships();
                    break;
                case 1:
                    await useInternshipsByIDStore().loadPopularInternships();
                    this.listInterships = useInternshipsByIDStore().popularInternships;
                    this.everyInternshipsAreLoaded = true;
                    break;
                case 2:
                    await useInternshipsByIDStore().loadActiveInternships();
                    this.listInterships = useInternshipsByIDStore().activeInternships;
                    this.everyInternshipsAreLoaded = true;
                    break;
            }
            this.selected = option;
            useLoaderStore().desactivateLoader();
        },
        
        moreInformation(id){
            this.$router.push(`/student/ApplyForAnInternship/${id}`);
        }
    },
    computed: {
        listIntershipsComputed() {
            return this.listInterships;
        }
    },
    async mounted() {
        useLoaderStore().activateLoader();
        await this.getInternships();
        useLoaderStore().desactivateLoader();
    }
    
}
</script>
<style scoped>
.container__student__internships{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
}
.containerList__header{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

}
.dark-theme .containerList__header{
    background-color: #434B54;
}
.containerList__title{
    display: flex;
    margin-bottom: 0.5rem;
}
.dataview__options{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
.search__view{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.search__input{
    flex: 1 1 90%;
}
.search__image{
    flex: 1 1 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-left: 0.2rem;
}
.content__internship{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}
/* Estilos para dispositivos pequeños (teléfonos) */

@media only screen and (max-width: 600px) {
  /* Estilos específicos para dispositivos pequeños */
    .container__student__internships{
        padding: 0.5rem;
    }
    .dataview__options{
        flex-direction: column;
    }
    .search__view{
        margin-bottom: 0.5rem;
    }
}

/* Estilos para tabletas */
@media only screen and (min-width: 600px) and (max-width: 1024px) {
  /* Estilos específicos para tabletas */
    .container__student__internships{
        padding: 1rem;
    }
}

/* Estilos para dispositivos medianos */
@media only screen and (min-width: 1025px) and (max-width: 1440px) {
  /* Estilos específicos para dispositivos medianos */
  .container__student__internships{
    padding: 1.5rem;
  }
}

/* Estilos para dispositivos grandes (pantallas de escritorio) */
@media only screen and (min-width: 1441px) {
  /* Estilos específicos para dispositivos grandes */
}

</style>