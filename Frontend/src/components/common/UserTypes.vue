<template>
    <div class="container">
        <div class="container__types">
            <div class="container__types__cards">
                <div class="container__types__cards__card">
                    <div class="container__types__cards__card__logo">
                        <router-link to="/student/register">
                            <font-awesome-icon :icon="['fas', 'book']" style="color: #838b8e;" size="6x"/>
                        </router-link>
                    </div>
                    <div class="container__types__cards__card__description">
                        <p>ENFOCADO A ESTUDIANTES DE LA U.C.B.</p>
                    </div>
                </div>
                <div class="container__types__cards__card">
                    <div class="container__types__cards__card__logo">
                        <router-link to="/institution/register">
                            <font-awesome-icon :icon="['fas', 'suitcase']" style="color: #838b8e;" size="6x"/>
                        </router-link>
                        
                    </div>
                    <div class="container__types__cards__card__description">
                        <p>ENFOCADO A INSTITUCIONES QUE QUIERAN ENVIAR SOLICITUDES DE PASANTÍAS.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

</script>
<style scoped>
.container{
    padding: 5% 10%;
    background-color: #FFF;
    border-radius: 10px;
}
.dark-theme .container{
    background-color: #434B54;
}
.container__types__cards{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
}
.container__types__cards__card{
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 30%;
}
.container__types__cards__card__logo{
    display: flex;
    justify-content: center;
    align-items: center;
}
.container__types__cards__card__description{
    margin-top: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
/*Cambiar el flex direction cuando la pantalla sea menor a 768px*/
@media screen and (max-width: 768px){
    .container__types__cards{
        flex-direction: column;
        
    }
    .container__types__cards__card{
        margin-bottom: 10%;
        width: 100%;
        height: 100%;
    }
}





/*Cuando esta activo el dark mode*/
.dark-theme .container{
    border: 1px solid #fff;
}

</style>