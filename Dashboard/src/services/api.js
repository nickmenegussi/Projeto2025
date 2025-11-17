import axios from 'axios'
const whereIsRunning = 'local'
const isDev = whereIsRunning !== 'production'

const api = axios.create({
    baseURL: isDev ? 'http://192.168.1.21:3001'  : 'https://deploy-back-end-ceo.vercel.app' 
})
export default api