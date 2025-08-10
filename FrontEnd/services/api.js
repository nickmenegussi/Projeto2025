import axios from 'axios'

// Para acesso normal 
 const api = axios.create({
     baseURL: 'http://192.168.1.16:3001'
 })


// const api = axios.create({
//     baseURL: 'https://e22dc161909e.ngrok-free.app'
// })
// rodar no terminal com ngrok http 3000
// Para acesso com expo tunnel
// const api = axios.create({
//     baseURL: 'https://157d9e275d75.ngrok-free.app'
// })

export default api