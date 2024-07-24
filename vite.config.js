import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/repository-name/',  // Replace with your repository name
  plugins: [react()],
});
