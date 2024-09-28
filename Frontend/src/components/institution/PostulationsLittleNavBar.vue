<template>
  <nav>
    <button v-for="(item, key, index) in data" :key="index">
      <a
        :style="{ '--hue': `${item.hue}deg`, '--r': `${r}px`, '--t': `${t}s` }"
        class="item"
        @click="emitFilter(key)"
      >
        <span class="icon mono" aria-hidden="true">{{ item.ico }}</span>
        <span class="icon grey" aria-hidden="true">{{ item.ico }}</span>
        {{ key }}
      </a>
    </button>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      r: 5,
      t: 0.3,
      data: {
        "Postulaciones aprobadas": { ico: "✅", hue: 120 },
        "Postulaciones pendientes": { ico: "⏳", hue: 60 },
        "Postulaciones rechazadas": { ico: "❌", hue: 0 },
        Todo: { ico: "🌎", hue: 180 },
      },
    };
  },
  methods: {
    emitFilter(key) {
      this.$emit("filter-postulations", key);
    },
  },
};
</script>

<style scoped>
body,
nav,
a {
  display: grid;
}

body {
  margin: 0;
  height: 100vh;
  background: #333;
}

nav {
  grid-auto-flow: column;
  place-self: center;
  margin-bottom: 1rem;
}
button {
  background: none;
  padding: 0;
  margin: 0.2rem;
}

.item {
  --hl: 0;
  width: 7em;
  color: hsl(var(--hue), calc(var(--hl) * 100%), 65%);
  text-align: center;
  text-decoration: none;
  transition: color var(--t);

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus {
    --hl: 1;
  }
}

.icon {
  grid-area: 1 / 1;
  place-self: center;
  font-size: 2.5em;
}

.mono {
  transform: translate(calc(var(--hl) * 0.375em), calc(var(--hl) * -0.25em))
    rotate(calc(var(--hl) * 22.5deg));
  opacity: var(--hl);
  transition: 0.3s;
  &[id*="blur"] {
    position: fixed;
    bottom: 100vh;
  }
}

.midl {
  color: transparent;
  backdrop-filter: blur(var(--r));
  -webkit-mask: linear-gradient(red 0 0) text;
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  opacity: calc(var(--hl) * 0.5);
  transition: 0.3s;
  mask: linear-gradient(red 0 0) text;
}

.grey {
  filter: grayscale(1) opacity(0.35);
}
@media only screen and (max-width: 320px) {
  .item {
    font-size: 0.35rem;
  }
}

/* Estilos para dispositivos pequeños (teléfonos) */
@media only screen and (min-width: 321px) and (max-width: 600px) {
  .item {
    font-size: 0.5rem;
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
