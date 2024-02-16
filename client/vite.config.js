import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  sever:{
    proxy:{
      '/api':{
        target:'http://localhost:3000/',
        secure:false,
      },
    },
  },
  plugins: [react()],
})
