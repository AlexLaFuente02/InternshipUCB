<template>
    <div class="containerList">
        <div class="containerList__header">
            <div class="containerList__title">
                <h1>{{this.title}}</h1>
            </div>
            <div class="dataview__options">
                <div class="search__view">
                    <input
                    type="text" 
                    placeholder="Buscar por institución" 
                    v-model="searchTerms"
                    @input="handleSearch"

                    />
                    <div class="search__image">
                        <font-awesome-icon :icon="['fas', 'search']" size="2xl"/>
                    </div>
                </div>
                <div class="toggle__view">
                    <button class="List-view"
                    :class="{'selected': getMode, 'not-selected': !getMode}"
                    @click="toggleView(true)"
                    ><font-awesome-icon :icon="['fas', 'list']" size="2xl"/></button>
                    <button class="Grid-view"
                    :class="{'selected': !getMode, 'not-selected': getMode}"
                    @click="toggleView(false)"
                    ><font-awesome-icon :icon="['fas', 'th-large']" size="2xl"/></button>
                </div>
            </div>
        </div>
        <div class="containerList__cards__modeLIST" v-show="getMode">
            <CardModeList 
            v-for="(internship, index) in paginatedData"
            :key="internship.id" 
            :internship="internship" 
            @more-information="moreInformation"
            />
        </div>
        <div class="containerList__cards__modeGRID" v-show="!getMode">
            
            <Card 
            v-for="(internship, index) in paginatedData"
            :key="internship.id" 
            :internship="internship" 
            @more-information="moreInformation"
            />
        </div>
        <div class="containerList__footer">
            <div class="containerList__footer__pagination">
                <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
                <div class="containerList__footer__pagination__numbers">
                    <button 
                    v-for="page in pagesNumber"
                    :key="page"
                    @click="changePage(page)"
                    :class="{'active': currentPage === page}"

                    >{{page}}</button>
                </div>
                <button @click="nextPage" :disabled="currentPage === totalPages()">Siguiente</button>
            </div>
        </div>
    </div>
    
</template>
<script>
import Card from "@/components/common/Card.vue";
import CardModeList from "@/components/common/CardModeList.vue";
import { useModeViewStore } from '@/store/common/modeViewListStore';
export default {
    
    data() {
        return {
            listInterships:[],
            mode: true,
            titleList: "Pasantías",
            itemsPerPage: 6,
            currentPage: 1,
            searchTerms: '',

        };
    },
    components: {
        Card,
        CardModeList,
    },
    props: {
        list: {
            type: Object,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
    methods: {
        getData(){
            this.listInterships = this.list.filter((internship) => {
                return internship.institucion.nombreinstitucion.toLowerCase().includes(this.searchTerms.toLowerCase());
            });
            this.titleList =  this.title;
        },
        toggleView(value){
            if(this.mode !== value){
                useModeViewStore().toggleMode();
                this.mode = useModeViewStore().modeView;
            }
        },
        loadModeView(){
            useModeViewStore().loadMode();
            this.mode = useModeViewStore().modeView;
        },
        //Métodos para la paginación
        totalPages(){
            return Math.ceil(this.listInterships.length / this.itemsPerPage);
        },
        changePage(page){
            this.currentPage = page;
        },
        nextPage(){
            if(this.currentPage < this.totalPages()){
                this.currentPage++;
            }
        },
        prevPage(){
            if(this.currentPage > 1){
                this.currentPage--;
            }
        },
        handleSearch(){
            this.currentPage = 1;
            this.getData();
        },
        moreInformation(id){
            this.$emit('more-information', id);
        }
    },
    created(){
        this.loadModeView();
        this.getData();
    },
    computed: {
        getMode(){
            return useModeViewStore().modeView;
        },
        //Métodos para la paginación
        pagesNumber(){
            const totalVisiblePages = 3; // Puedes ajustar este valor según tus necesidades
            const totalAvailablePages = this.totalPages();

            let startPage = this.currentPage - Math.floor(totalVisiblePages / 2);
            startPage = Math.max(1, startPage);

            let endPage = startPage + totalVisiblePages - 1;
            endPage = Math.min(totalAvailablePages, endPage);

            const pages = [];
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            return pages;
        },
        paginatedData(){
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.listInterships.slice(start, end);
        },

    },
}
</script>
<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
.containerList{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1rem;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    
}
.dark-theme .containerList{
    background-color: #434B54;
}
.containerList__header{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}
.containerList__title{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
}
.dataview__options{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
.toggle__view{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 0.5rem;
}
.toggle__view button{
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0.3rem;
    border: 1px solid #D7D8D9;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.toggle__view button.selected{
    background-color: #4D9FDC;
    color: #fff;
}
.toggle__view button.selected:hover{
    background-color: #135AA9;
}
.toggle__view button.not-selected:hover{
    background-color: #D7D8D9;
}
.toggle__view button.not-selected{
    background-color: transparent;
}
.List-view{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
.Grid-view{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
}
.search__view{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.search__view button{
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    margin: 0 0.5rem;
}
.search__view button:hover{
    color: #4D9FDC;
}
.search__image{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-left: 0.2rem;
}

.containerList__cards__modeGRID{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
}
.containerList__cards__modeLIST{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}
/*Estilos para la paginación*/
.containerList__footer{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
}
.containerList__footer__pagination{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.containerList__footer__pagination button{
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    margin: 0 0.5rem;
    font-size: 1rem;
    font-weight: 400;
    padding: 0.3rem;
    border: 1px solid #D7D8D9;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    border-radius: 5px;
    color: #000;
}
.containerList__footer__pagination button:hover{
    background-color: #4D9FDC;
    color: #fff;
}
.containerList__footer__pagination button:disabled{
    background-color: #D7D8D9;
    color: #fff;
    cursor: not-allowed;
}
.containerList__footer__pagination button.active{
    background-color: #4D9FDC;
    color: #fff;
}
.containerList__footer__pagination__numbers{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.containerList__footer__pagination__numbers button{
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    margin: 0 0.5rem;
    font-size: 1rem;
    font-weight: 400;
    padding: 0.3rem;
    border: 1px solid #D7D8D9;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.containerList__footer__pagination__numbers button:hover{
    background-color: #4D9FDC;
    color: #fff;
}
.containerList__footer__pagination__numbers button.active{
    background-color: #4D9FDC;
    color: #fff;
}
/*Modo oscuro de la lista*/

.dark-theme .containerList__footer__pagination button{
    border: 1px solid #fff;
    color: #fff;

}
.dark-theme .containerList__footer__pagination button:hover{
    background-color: #4D9FDC;
    color: #fff;
}
.dark-theme .containerList__footer__pagination button.active{
    background-color: #4D9FDC;
    color: #fff;
}
.dark-theme .containerList__footer__pagination__numbers button{
    border: 1px solid #fff;
}
.dark-theme .containerList__footer__pagination__numbers button:hover{
    background-color: #4D9FDC;
    color: #fff;
}
.dark-theme .containerList__footer__pagination__numbers button.active{
    background-color: #4D9FDC;
    color: #fff;
}



/*Estilos para la paginación*/




/*Media Queries*/
/* Estilos para dispositivos pequeños (teléfonos) */
@media only screen and (max-width: 600px) {
  /* Estilos específicos para dispositivos pequeños */
  .search__view input{
    font-size: 0.40rem;
  }
.toggle__view button{
    padding: 0.1rem;
    font-size: 0.4rem;
}
    .containerList__footer__pagination button{
        font-size: 0.5rem;
    }
    .containerList__footer__pagination__numbers button{
        font-size: 0.3rem;
        margin: 0 0.2rem;
    }
    
    .containerList{
        padding: 0.1rem;
    }
    .containerList h1{
        font-size: 1rem;
    }
    
    

}

/* Estilos para tabletas */
@media only screen and (max-width: 1024px) {
  /* Estilos específicos para tabletas */
  .containerList{
      padding: 0.3rem;
  }
    .containerList__header{
        flex-direction: column;
    }
    .containerList__title{
        margin-bottom: 0.2rem;
        justify-content: center;

    }
    .dataview__options{
        justify-content: center;
        align-items: center;
        margin-bottom: 0.2rem;
    }
}

/* Estilos para dispositivos medianos */
@media only screen and (max-width: 1440px) {
  /* Estilos específicos para dispositivos medianos */
}

/* Estilos para dispositivos grandes (pantallas de escritorio) */
@media only screen and (max-width: 1441px) {
  /* Estilos específicos para dispositivos grandes */
}


</style>