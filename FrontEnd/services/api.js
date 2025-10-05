import axios from 'axios'

// Para acesso normal 
  const api = axios.create({
      baseURL: 'http://192.168.1.2:3001',
  })


// const api = axios.create({
//      baseURL: 'https://88bd20289c9e.ngrok-free.app'
//  })
// rodar no terminal com ngrok http 3001( ou porta do servidor )
// npx expo start --tunnel
// Para acesso com expo tunnel
// const api = axios.create({
//     baseURL: 'https://157d9e275d75.ngrok-free.app'
// })

export default api