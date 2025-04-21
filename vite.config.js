import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
          @use "./src/styles/variables" as *;
          @use "./src/styles/mixins" as *;
        `,
            },
        },
    },
});
