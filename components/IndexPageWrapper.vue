<template>
  <div>
    <section class="hero background-dark">
      <div class="hero-body">
        <div class="container">
          <h1 v-if="manifest.title" class="title">{{ manifest.title }}</h1>
          <p>{{ manifest.description }}</p>
          <p v-if="manifest.vueVersions && manifest.vueVersions['2'] && manifest.vueVersions['3']" class="vue-versions">
            For Vue <a :href="manifest.vueVersions['2']">2</a> & <a :href="manifest.vueVersions['3']">3</a>!
          </p>
          <Repl class="repl" example="playground" />
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <h2>Installation</h2>
        <div style="display: flex; justify-content: space-around;">
          <pre>npm install {{manifest.name}}</pre>
          <pre>yarn add {{manifest.name}}</pre>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <h2>Examples</h2>
        <img v-for="img in examples" :src="img" style="max-width: 100%;" />
      </div>
    </section>
    <section>
      <div class="container features-list">
        <h2>Features</h2>
        <div class="feature">
          <h3>Easy to learn</h3>
        </div>
        <div class="feature">
          <h3>Grid snap</h3>
        </div>
        <div class="feature">
          <h3>In place editing</h3>
          Move nodes, resize them, connect links as curves or segments...
        </div>
        <div class="feature">
          <h3>Serialization/deserialization</h3>
        </div>
        <div class="feature">
          <h3>Various node types</h3>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
//import example2 from '../../images/example2.png';
//import example3 from '../../images/example3.png';

import Repl from '../components/Repl.vue';

defineProps<{
  manifest:Record<string, any>,
  examples: Array<string>,
}>();

</script>
  <style scoped>

  .hero {
    display: block;
    color: white;
    min-height: calc(100vh - 250px);
    height: initial;
    padding-top: 100px;
  }
  h1 {
    font-size: 50px;
    font-weight: lighter;
    margin: 0;
    padding-bottom: 0;
  }
  .hero p{
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .feature h3 {
    padding: 0;
    margin: 0;
  }
  .feature {
    border-bottom: 1px solid #ccc;
    padding: 20px;
  }
  .vue-versions {
    border-radius: 8px;
    border: 1px solid white;
    display: inline-block;
    padding: 10px;
    margin: auto;
  }
  .vue-versions a {
    color: white;
    font-weight: bold;
  }
  </style>
