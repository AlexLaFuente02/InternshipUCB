<template>
  <body>
    <form class="login">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
    </form>

    <a href="https://codepen.io/davinci/" target="_blank"
      >check my other pens</a
    >
  </body>
</template>

<script>
export default {};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:400,300);

/* Variables */
:root {
  --app-padding: 6vh;
  --app-width: 50vh;
  --app-height: 90vh;
  --detail-padding: 4vh;
  --heading-text-size: 4.8vh;
  --color-primary: #0f9ede;
  --color-secondary: #d0dff0;
  --color-text-secondary: rgba(black, 0.45);
  --color-border: #e3e3e3;
  --color-cal: #08b5cf;
  --color-heart: #9965aa;
  --color-steps: var(--color-primary);
  --color-temp: #f4814b;
  --view-delay: 2s;
  --duration: 0.6s;
  --segment-duration: 1.2s;
  --pulse-duration: 1.75s;
  --easing: cubic-bezier(0.77, 0, 0.175, 1);
  --stroke-width: 0.5vh;
}
</style>
