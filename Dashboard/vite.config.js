import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import withMt from "@material-tailwind/html/utils/withMt";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
})
