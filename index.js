import { defineNuxtModule, addTemplate } from '@nuxt/kit'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineNuxtModule({
  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'playground',
        path: '/playground',
        file: path.resolve(__dirname, './pages/playground.vue'),
      });
    },
  },
})
