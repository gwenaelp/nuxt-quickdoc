<template>
  <div>
    <Header/>
    <slot/>
  </div>
</template>
<script>
import Header from '../components/Header.vue'
export default {
  components: {
    Header,
  }
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap');

body {
  --body-color: white;
  --background-color: #7957d5;
  --text-color: black;
  --dark-text-color: #fff;
  --dark-background-color-initial: rgb(55,170,232);
  --dark-background-color-2-initial: rgb(161,10,187);
  --dark-background-color: var(--dark-background-color-initial);
  --dark-background-color-2: var(--dark-background-color-2-initial);
  --dark-error-background-color: rgb(232,120,55);
  --dark-error-background-color-2: rgb(91,7,7);
  --primary-color-lighter: #a18dd8;
  --primary-color-darker: #714dd2;

  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  background-color: var(--body-color);
  color: var(--text-color);
}

body.dark {
  --body-color: #121212;
  --background-color: #7957d5;
  --text-color: #fff;
  --dark-text-color: #fff;
  --dark-background-color: color-mix(in srgb, var(--dark-background-color-initial) 40%, transparent);
  --dark-background-color-2: color-mix(in srgb, var(--dark-background-color-2-initial) 40%, transparent);
  --dark-error-background-color: rgb(232,120,55);
  --dark-error-background-color-2: rgb(91,7,7);
  --primary-color-lighter: #a18dd8;
  --primary-color-darker: #714dd2;
}

.container {
  max-width: 960px;
  margin: auto;
}

.background-dark {
  background: var(--dark-background-color);
  background: linear-gradient(48deg, var(--dark-background-color) 0%, var(--dark-background-color-2) 100%);
  color: white;
}
</style>
