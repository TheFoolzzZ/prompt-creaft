import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { enterDevPlugin, enterProdPlugin } from 'vite-plugin-enter-dev';

// https://vite.dev/config/
export default defineConfig({
  plugins: [...enterProdPlugin(), ...enterDevPlugin(), react()],
})
