const connection = require('../config/db')

exports.CreateReviewSociety = (req, res) => {

}

exports.ViewReviewSociety = (req, res) => {
    connection.query('SELECT * FROM ReviewSociety', (err,result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o servidor.',
                success: false,
                data: err
            })
        }

        return res.status(200).json({
            message: 'Avaliações carregadas com sucesso.',
            success: true,
            data: result
        })
    })
}

exports.UpdateReviewSociety = (req, res) => {
    
}

exports.DeleteReviewSociety = (req, res) => {

}