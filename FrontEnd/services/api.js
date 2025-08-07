import axios from 'axios'

// Para acesso normal 
// const api = axios.create({
//     baseURL: 'http://192.168.1.11:3001'
// })


const api = axios.create({
    baseURL: 'https://157d9e275d75.ngrok-free.app'
})

// Para acesso com expo tunnel
// const api = axios.create({
//     baseURL: 'https://157d9e275d75.ngrok-free.app'
// })

export default api