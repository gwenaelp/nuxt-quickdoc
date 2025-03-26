<template>
  <div class="playground">
    <div class="menu">
      <section v-for="(section, name) in sections">
        <h3>{{ name }}</h3>
        <ul>
          <li v-for="example in section">
            <a :class="displayedExample === example ? 'selected': ''" @click="displayedExample = example">
              {{ example }}
            </a>
          </li>
        </ul>
      </section>
    </div>
    <Repl class="repl" :example="displayedExample" />
  </div>
</template>
<script setup lang="ts">
import { ref, Ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Repl from '../components/Repl.vue';

import { exampleImports } from '@/examples/index';

const router = useRouter();
const route = useRoute();

let displayedExample = ref('playground');
watch(displayedExample, (newExample: string) => {
  router.push({ query: { example: newExample } });
});
onMounted(() => {
  if (route.query.example) {
    displayedExample.value = route.query.example.toString();
  }
});

let sections: Ref<Record<string, any>> = ref({});

for (let e of Object.keys(exampleImports)) {
  const sectionName:string = exampleImports[e].section;
  if (sections.value[sectionName] === undefined) {
    sections.value[sectionName] = [];
  }
  sections.value[sectionName].push(e);
}
</script>
<style scoped>
.playground {
  display: flex;
  padding-top: 70px;
  justify-content: stretch;
  width: 100%;
}
.menu {
  width: 260px;
}

.repl {
  flex-grow: 1;
}
h3 {
  padding: 10px;
  padding-left: 10px;
  font-size: 18px;
  background-color: var(--dark-background-color);
  margin: 0;
}
ul {
  margin: 0;
  padding: 0;
}
a {
  padding: 8px 16px;
  display: block;
  border-bottom: 1px solid var(--dark-background-color);
  cursor: pointer;
}
a:hover {
  background: #4a4a4a50;
}
a.selected {
  background: #4a4a4aa0;
  font-weight: bold;
}
</style>
