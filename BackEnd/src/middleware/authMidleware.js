// improtar o web token que iremos utilizar
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    // pegar o token através do header da requisicao que pegaremos atraves do bearer <token>
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

    if(!token){
            return res.status(401).json({
            success: false,
            message: 'Token não fornecido. Acesso negado.',
            loginRequired: true
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // decodificar o token
        req.data = decoded
        next()
    } catch(err){
        return res.status(401).json({
            success: false,
            message: 'Sessão expirada, por favor, faça login novamente.',
            loginRequired: true

        })
    }
}

module.exports = authMiddleware