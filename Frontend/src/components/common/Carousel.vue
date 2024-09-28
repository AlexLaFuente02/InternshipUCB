<template>
  <div class="card">
      <Galleria 
      :value="images" 
      :numVisible="5" 
      containerStyle="max-width: 640px"
      :autoplayInterval="5000"
      :circular="true" 
      :autoPlay="true"
      :showThumbnails="false" :showIndicators="true">
      <template #item="slotProps">
          <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
      </template>
    </Galleria>
    </div>
</template>
<script>
import  Galleria  from 'primevue/galleria';

export default {
    name: "Carousel",
    components: {
        Galleria
    },
    props: {
      listImages: Array
    },
    data() {
        return {
            images:[],
        };
    },
    methods: {
      getData() {
        return this.listImages;
      },
      getImages() {
        return Promise.resolve(this.getData());
      },
    },
    mounted() {
      this.getImages().then((images) => {
        this.images = images;
      });
    },
}
</script>
<style scoped>
.card{
  margin-top: 15%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media screen and (max-width: 450px){
  
  .card{
      margin-top: 30%;
    }

}

@media screen and (max-width: 335px){
  
  .card{
      margin-top: 50%;
    }

}


</style>
