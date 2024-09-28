<template>
    <div class="container">
        <div class="container__title">
                <h1>REGISTRO DE USUARIOS</h1>
            </div>
        <div class="container_user_types">
            <UserTypes/>
        </div>
    </div>
</template>
<script>
import FooterCommon from '../../components/common/FooterCommon.vue';
import NavbarCommon from '../../components/common/NavbarCommon.vue';
import UserTypes from '@/components/common/UserTypes.vue';
export default {
    components:{
        NavbarCommon,
        FooterCommon,
        UserTypes
    }
}
</script>
<style scoped >
.container{
    padding: 5% 10%;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.container__title{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5%;
    text-align: center;
}
.container_user_types{
    display: flex;
    padding: 0 10%;
}

</style>
