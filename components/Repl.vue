<script lang="ts" setup>
//https://github.com/bcakmakoglu/vue-flow/blob/master/docs/components/DocsRepl.vue
import { watch } from 'vue';
import { ReplStore, Repl as VueRepl } from '@vue/repl';
import '@vue/repl/style.css';
import CodeMirror from '@vue/repl/codemirror-editor';
import { exampleImports } from '@/examples';
//const exampleImports = {};
import manifest from '../../package.json';

const props = defineProps<{
  example: keyof typeof exampleImports;
  mainFile?: string;
  dependencies?: Record<string, string>;
}>()

const repositoryUrl = manifest.repository.url;

// Remove the protocol and domain
const pathWithoutProtocol = repositoryUrl.replace(/^https?:\/\//, '');
// Remove the ".git" extension
const pathWithoutGitExtension = pathWithoutProtocol.replace(/\.git$/, '');
// Split the path into parts
const pathParts = pathWithoutGitExtension.split('/');
// Combine the last two parts to form the package name
const packageName = `${pathParts[pathParts.length - 1]}`;


let css = `@import url('https://unpkg.com/vue-diagrams@latest/dist/vue-diagrams.css');`;

const store = new ReplStore({
  showOutput: true,
  outputMode: 'preview',
})


const files: Record<string, (typeof imports)[keyof typeof imports]> = {}
const imports = exampleImports[props.example]? exampleImports[props.example].files : {'App.vue': ''};
let additionalImports: Object = ('additionalImports' in imports ? imports.additionalImports : {}) as Object;

for (const example of Object.keys(imports).filter((i) => i !== 'additionalImports')) {
  if (example.includes('css')) {
    css += `${imports[example as keyof typeof imports]}`
  } else {
    files[example] = imports[example as keyof typeof imports]
  }
}

await store.setVueVersion('3.2.37')
const setFiles = async (files, css) => {
  await store.setFiles(
    {
      ...files,
      'main.css': css,
    },
    props.mainFile ?? 'App.vue',
  );
};

await setFiles(files, css);

// pre-set import map
const loadImportMap = () => {
  store.setImportMap({
    imports: {
      ['vue-diagrams']: `https://unpkg.com/vue-diagrams@latest`,
      ...additionalImports,
    },
  } as any);
};

loadImportMap();


watch(() => props.example, async (newExample) => {
  // Handle the case where the "example" prop changes
  // You may want to update the REPL environment or take other actions

  // For example, update the files and imports based on the new example
  let newImports = exampleImports[newExample].files;
  const newFiles: Record<string, (typeof imports)[keyof typeof imports]> = {};
  let newCss = `@import url('https://unpkg.com/vue-diagrams@latest/dist/vue-diagrams.css')`;

  for (const example of Object.keys(newImports).filter((i) => i !== 'additionalImports')) {
    if (example.includes('css')) {
      newCss += `${newImports[example as keyof typeof newImports]}`
    } else {
      newFiles[example] = newImports[example as keyof typeof newImports];
    }
  }
  await setFiles(newFiles, newCss);
  additionalImports = ('additionalImports' in imports ? imports.additionalImports : {}) as Object;
  loadImportMap();
});
</script>
<template>
  <VueRepl
    :clear-console="true"
    :editor="CodeMirror"
    :auto-resize="true"
    :store="store"
    :show-compile-output="false"
    :show-import-map="false"
    @keydown.ctrl.s.prevent
    @keydown.meta.s.prevent
  />
</template>

<style>
.vue-repl {
  --vh: 100vh;
  height: calc(var(--vh) - 72px);
}
</style>
