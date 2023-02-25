import { defineConfig, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

import path from 'path';

if (!process.env.TARGET || !['ui', 'core'].includes(process.env.TARGET)) {
  throw new Error('process.env.TARGET is required.');
}

const resolve = {
  alias: {
    '@ui': path.resolve(__dirname, './src/ui'),
    '@core': path.resolve(__dirname, './src/core'),
  },
};

const uiConfig: UserConfigExport = {
  build: {
    emptyOutDir: false,
    target: ['es6', 'chrome60', 'firefox60', 'safari11', 'edge18'],
    lib: {
      entry: {
        ui: './index.html',
      },
      formats: ['cjs'],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve,
  define: {
    'process.env': {
      NODE_ENV: process.env.NODE_ENV ?? '"production"',
    },
  },
  plugins: [
    react(),
    viteSingleFile({
      removeViteModuleLoader: true,
    }),
  ],
};

const coreConfig: UserConfigExport = {
  build: {
    emptyOutDir: false,
    target: ['es6', 'chrome60', 'firefox60', 'safari11', 'edge18'],
    lib: {
      entry: {
        core: './src/core/index.ts',
      },
      formats: ['cjs'],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve,
};

export default defineConfig(process.env.TARGET === 'ui' ? uiConfig : coreConfig);
