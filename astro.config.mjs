import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import nodejs from '@astrojs/node';
// https://astro.build/config
export default defineConfig({
    integrations: [react()],
    adapter: nodejs({
        mode: 'middleware' // or 'standalone'
      }),
      output: 'hybrid',
});
