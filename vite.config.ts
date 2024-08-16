import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env': env,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@vis/gl-react-google-maps': path.resolve(
          __dirname,
          'node_modules/@vis/gl-react-google-maps'
        ),
      },
    },
  };
});
