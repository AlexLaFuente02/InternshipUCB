<template >
    <div class="ArrowCards">
      <div class="olcards">
        <li :style="{ '--cardColor': Arrow.color }"
        v-for="request in requests" :key="request.id">
          <div class="content">
            <div class="icon">
              {{ this.Arrow.icon  }}
            </div>
            <div class="title">
              
                {{ request.convocatoria_id.areapasantia }}
              
            </div>
            <div class="text">
                Fecha cierre de convocatoria: {{ request.convocatoria_id.fechaseleccionpasante }}
              <br>
              Fecha de solicitud: {{ request.fechapostulacion }}
            
              
            </div>
          </div>
        </li>
      </div>
	</div>
</template>
<script>
export default {
    props:{
        listRequests:{
            type: Array,
            required: true,
        },
        type: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            requests: [],
            listArrows: [
                {
                    id: 1,
                    title: 'Rechazado',
                    icon: '😞',
                    color: '#fc374e',
                },
                {
                    id: 2,
                    title: 'Aceptado',
                    icon: '😁',
                    color: '#36aeb3',
                },
                {
                    id: 3,
                    title: 'Pendiente',
                    icon: '🤷',
                    color: '#f15f0e',
                },
                {
                    id: 4,
                    title: 'Todo',
                    icon: '🌎',
                    color: '#162d59',
                },
            ],
            Arrow: null,
        };
    },
    methods: {
        getData(){
            this.requests = this.listRequests;
            this.Arrow = this.type;
        },
    },
    created() {
        this.getData();
    },
}
</script>
<style scoped>
.ArrowCards {
  display: flex;
  justify-content: center;
  height: 100%;
  overflow-y: scroll;
}


.olcards,
.olcards * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.olcards {
  list-style: none;
  counter-reset: cardCount;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  --cardsGap: 1rem;
  gap: var(--cardsGap);
  padding-bottom: var(--cardsGap);
  width: 100%;
}
.olcards li {
  position: relative;
  width: 100%;
  counter-increment: cardCount;
  display: flex;
  color: white;
  --labelOffset: 1rem;
  --arrowClipSize: 1.5rem;
  margin-top: var(--labelOffset);
}

.olcards li::before {
  content: counter(cardCount, decimal-leading-zero);
  background: #162d59;
  color: var(--cardColor);
  font-size: 2em;
  font-weight: 700;
  transform: translateY(calc(-1 * var(--labelOffset)));
  display: flex;
  justify-content: center;
  align-items: center;
  padding-inline: 0.5em;
  border-radius: 50%;
  margin-right: 0.5em;
}

.olcards li .content {
  background-color: var(--cardColor);
  --inlinePadding: 1em;
  --boxPadding: 0.5em;
  --leftPadding: 0.01rem;
  display: grid;
  padding: var(--boxPadding) calc(var(--inlinePadding) + var(--arrowClipSize))
    var(--boxPadding) calc(var(--leftPadding) + var(--labelOffset));
  grid-template-areas:
    "icon title"
    "icon text";
  gap: 0.25em 1em;
  clip-path: polygon(
    0 0,
    calc(100% - var(--arrowClipSize)) 0,
    100% 50%,
    calc(100% - var(--arrowClipSize)) 100%,
    calc(100% - var(--arrowClipSize)) calc(100% + var(--cardsGap)),
    0 calc(100% + var(--cardsGap))
  );
  position: relative;
}
.olcards li .content::before {
  content: "";
  position: absolute;
  width: var(--labelOffset);
  height: var(--labelOffset);
  background: var(--cardColor);
  left: 0;
  bottom: 0;
  clip-path: polygon(0 0, 100% 0, 0 100%);
  filter: brightness(0.75);
}
.olcards li .content::after {
  content: "";
  position: absolute;
  height: var(--cardsGap);
  width: var(--cardsGap);
  background: linear-gradient(to right, rgba(0, 0, 0, 0.25), transparent 50%);
  left: 0;
  top: 100%;
}
.olcards li .icon {
  grid-area: icon;
  align-self: center;
  font-size: 2em;
}
.olcards li .content .title {
  grid-area: title;
  font-size: 1.25em;
  /* font-weight: 700; */
}
.olcards li .content .text {
  grid-area: text;
}
/*Estilos para dispositivos muy pequeños*/
@media only screen and (max-width: 320px) {
  .icon {
    display: none;
  }
  .content {
    text-align: center;
    font-size: 0.35rem;
    width: auto;
  }
  .olcards li::before {
    display: none;
  }
  .olcards li .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5em 2rem 0.5em 2rem;
    clip-path: polygon(
      0 0,
      calc(100% - var(--arrowClipSize)) 0,
      100% 50%,
      calc(100% - var(--arrowClipSize)) 100%,
      calc(100% - var(--arrowClipSize)) calc(100% + var(--cardsGap)),
      0 calc(100% + var(--cardsGap))
    );
  }
  .title{
    width: auto;
  }
  .text{
    width: auto;
  }
  
}

/* Estilos para dispositivos pequeños (teléfonos) */
@media only screen and (min-width: 321px) and (max-width: 600px) {
  
  .content {
    text-align: center;
    font-size: 0.50rem;
    width: auto;
  }
  .olcards li::before {
    display: none;
  }
  .olcards li .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5em 2rem 0.5em 2rem;
    clip-path: polygon(
      0 0,
      calc(100% - var(--arrowClipSize)) 0,
      100% 50%,
      calc(100% - var(--arrowClipSize)) 100%,
      calc(100% - var(--arrowClipSize)) calc(100% + var(--cardsGap)),
      0 calc(100% + var(--cardsGap))
    );
  }
  .title{
    width: auto;
  }
  .text{
    width: auto;
  }
}

/* Estilos para tabletas */
@media only screen and (min-width: 601px) and (max-width: 1024px) {
  /* Estilos específicos para tabletas */
}

/* Estilos para dispositivos medianos */
@media only screen and (min-width: 1025px) and (max-width: 1440px) {
  /* Estilos específicos para dispositivos medianos */
}

/* Estilos para dispositivos grandes (pantallas de escritorio) */
@media only screen and (min-width: 1441px) {
  /* Estilos específicos para dispositivos grandes */
}

</style>